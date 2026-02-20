import {useState, useEffect} from 'react'
import {GlitchText} from './GlitchText'
import {useLanguage} from '../contexts/LanguageContext'
import {ProjectService} from '../services/projectService'
import type {Project} from '../lib/supabase'

interface ProjectsProps {
    onOpenModal: (projectId: string) => void
}

export const Projects = ({ onOpenModal }: ProjectsProps) => {
    const [activeProject, setActiveProject] = useState<string | null>(null)
    const [projects, setProjects] = useState<Project[]>([])
    const [loading, setLoading] = useState(false)
    const [activeTab, setActiveTab] = useState<string>('backend')
    const {language, t} = useLanguage()

    const projectTabs = [
        { id: 'backend', name: t('projects.tab.backend') },
        { id: 'frontend', name: t('projects.tab.frontend') },
        /*{ id: 'personal', name: t('projects.tab.personal') },*/
    ]

    const filteredProjects = projects.filter(
        (project) => project.project_type === activeTab,
    )
    
    // Fetch projects from Supabase
    useEffect(() => {
        void (async () => {
            try {
                setLoading(true)
                const projectData = await ProjectService.getProjectsByLanguage(language)
                setProjects(projectData || [])
            } catch (error) {
                console.error('Failed to fetch projects:', error)
                setProjects([])
            } finally {
                setLoading(false)
            }
        })();
    }, [language])
    const handleMouseEnter = (id: string) => {
        setActiveProject(id)
    }
    const handleMouseLeave = () => {
        setActiveProject(null)
    }
    return (
        <section
            id="projects"
            className={`py-12 md:py-20 ${language === 'ko' ? 'font-ko' : 'font-en'}`}
        >
            <div className="container mx-auto px-4">
                <div className="mb-8 md:mb-12 text-center">
                    <GlitchText
                        key={language}
                        text={t('projects.title')}
                        className={`text-2xl sm:text-3xl md:text-4xl font-bold mb-4 ${language === 'ko' ? 'font-point-ko' : 'font-point-en'}`}
                    />
                    <div className={`w-24 h-1 mx-auto bg-hot-pink ${language === 'ko' ? 'w-28' : 'w-40'}`}></div>
                </div>

                {/* Project type tabs */}
                <div className="flex justify-center mb-6 md:mb-8 border-b border-gray-800">
                    {projectTabs.map((tab) => (
                        <button
                            key={tab.id}
                            className={`px-4 md:px-6 py-2 font-mono text-xs md:text-sm transition-colors duration-300 relative whitespace-nowrap ${activeTab === tab.id ? 'text-hot-pink border-b-2 border-hot-pink' : 'text-gray-400 hover:text-electric-blue'}`}
                            onClick={() => setActiveTab(tab.id)}
                        >
                            {tab.name}
                            {activeTab === tab.id && (
                                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-hot-pink to-electric-blue"></span>
                            )}
                        </button>
                    ))}
                </div>

                {loading && (
                    <div className="text-center py-8">
                        <div className="text-electric-blue">Loading projects...</div>
                    </div>
                )}
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                    {filteredProjects.map((project, index) => (
                        <div
                            key={project.project_id}
                            className="group relative overflow-hidden border border-gray-800 rounded-md cursor-pointer bg-gray-900 transition-all duration-300 hover:border-electric-blue/50"
                            onMouseEnter={() => handleMouseEnter(project.project_id)}
                            onMouseLeave={handleMouseLeave}
                            onClick={() => onOpenModal(project.project_id)}
                        >
                            {/* Top accent line */}
                            <div className="h-[2px] w-full bg-gradient-to-r from-hot-pink via-electric-blue to-hot-pink opacity-60 group-hover:opacity-100 transition-opacity"></div>

                            <div className="p-4 md:p-6 relative">
                                {/* Category & Index */}
                                <div className="flex items-center justify-between mb-3">
                                    <span className="text-[10px] md:text-xs text-electric-blue font-mono px-1.5 py-0.5 bg-electric-blue/10 border border-electric-blue/30 rounded">
                                        {project.category?.[language]}
                                    </span>
                                    <span className="text-[10px] md:text-xs text-hot-pink font-mono">
                                        {t('projects.project')}.{String(index + 1).padStart(2, '0')}
                                    </span>
                                </div>

                                {/* Title */}
                                <h3 className="text-lg md:text-xl font-bold mb-2 group-hover:text-electric-blue transition-colors">
                                    {project.title?.[language]}
                                </h3>

                                {/* Summary */}
                                <p className="text-gray-400 text-xs md:text-sm line-clamp-2 mb-4">
                                    {project.summary?.[language] || project.background?.[language]}
                                </p>

                                {/* Tech tags */}
                                {project.technologies && project.technologies.length > 0 && (
                                    <div className="flex flex-wrap gap-1.5 mb-4">
                                        {project.technologies.slice(0, 5).map((tech, techIndex) => (
                                            <span
                                                key={techIndex}
                                                className="text-[10px] md:text-xs text-gray-400 font-mono px-1.5 py-0.5 bg-gray-800/80 border border-gray-700 rounded-full"
                                            >
                                                {tech.name}
                                            </span>
                                        ))}
                                        {project.technologies.length > 5 && (
                                            <span className="text-[10px] md:text-xs text-gray-500 font-mono px-1.5 py-0.5">
                                                +{project.technologies.length - 5}
                                            </span>
                                        )}
                                    </div>
                                )}

                                {/* Footer */}
                                <div className="flex justify-between items-center pt-3 border-t border-gray-800">
                                    <span className="text-[10px] md:text-xs text-gray-500 font-mono">
                                        {project.status?.[language]}
                                    </span>
                                    <span className="text-[10px] md:text-xs text-white font-mono group-hover:text-electric-blue transition-colors">
                                        {t('projects.viewDetails')} &gt;
                                    </span>
                                </div>
                            </div>

                            {activeProject === project.project_id && (
                                <div className="absolute inset-0 border-2 border-electric-blue pointer-events-none rounded-md"></div>
                            )}
                        </div>
                    ))}
                </div>
            </div>


            <style jsx global>{`
                .chromatic-aberration {
                    text-shadow: 2px 0 0 rgba(255, 0, 255, 0.5),
                    -2px 0 0 rgba(0, 255, 255, 0.5);
                    position: relative;
                }

                .chromatic-aberration::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: inherit;
                    opacity: 0.5;
                    transform: translateX(-4px);
                    filter: blur(1px);
                    mix-blend-mode: screen;
                    background-color: rgba(255, 0, 255, 0.5);
                }

                .chromatic-aberration::after {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: inherit;
                    opacity: 0.5;
                    transform: translateX(4px);
                    filter: blur(1px);
                    mix-blend-mode: screen;
                    background-color: rgba(0, 255, 255, 0.5);
                }
            `}</style>
        </section>
    )
}
