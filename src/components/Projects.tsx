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
    const [isGlitching, setIsGlitching] = useState(false)
    const [projects, setProjects] = useState<Project[]>([])
    const [loading, setLoading] = useState(false)
    const {language, t} = useLanguage()
    
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
        if (Math.random() > 0.7) {
            setIsGlitching(true)
            setTimeout(() => setIsGlitching(false), 300)
        }
    }
    const handleMouseLeave = () => {
        setActiveProject(null)
    }
    return (
        <section
            id="projects"
            className={`py-20 ${language === 'ko' ? 'font-ko' : 'font-en'}`}
        >
            <div className="container mx-auto px-4">
                <div className="mb-12 text-center">
                    <GlitchText
                        key={language}
                        text={t('projects.title')}
                        className={`text-4xl font-bold mb-4 ${language === 'ko' ? 'font-point-ko' : 'font-point-en'}`}
                    />
                    <div className={`w-24 h-1 mx-auto bg-hot-pink ${language === 'ko' ? 'w-28' : 'w-40'}`}></div>
                </div>
                
                {loading && (
                    <div className="text-center py-8">
                        <div className="text-electric-blue">Loading projects...</div>
                    </div>
                )}
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {projects.map((project, index) => (
                        <div
                            key={project.project_id}
                            className="group relative overflow-hidden border border-gray-800 rounded-md flex flex-col cursor-pointer"
                            onMouseEnter={() => handleMouseEnter(project.project_id)}
                            onMouseLeave={handleMouseLeave}
                            onClick={() => onOpenModal(project.project_id)}
                        >
                            <div
                                className={`relative h-64 overflow-hidden ${activeProject === project.project_id && isGlitching ? 'animate-glitch' : ''}`}
                            >
                                <img
                                    src={project.image || ""}
                                    alt={project.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div
                                    className={`absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70 ${activeProject === project.project_id ? 'chromatic-aberration' : ''}`}
                                ></div>
                            </div>
                            <div className="p-6 bg-gray-900 relative flex-1">
                                <div className="text-xs text-electric-blue mb-2">
                                    {project.category}
                                </div>
                                <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                                <p className="text-gray-400 text-sm flex-1">{project.description}</p>
                                <div className="mt-4 flex justify-between items-center">
                                    <span className="text-xs text-hot-pink">{t('projects.project')}.{index + 1}</span>
                                    <span
                                        className="text-xs text-white font-mono">{t('projects.viewDetails')} &gt;</span>
                                </div>
                            </div>
                            {activeProject === project.project_id && (
                                <div
                                    className="absolute inset-0 border-2 border-electric-blue pointer-events-none"></div>
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
