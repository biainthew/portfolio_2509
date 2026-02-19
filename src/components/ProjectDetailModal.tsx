import {useEffect, useState} from 'react'
import {
    ChevronLeftIcon,
    ChevronRightIcon,
    XIcon,
    ExternalLinkIcon,
    CodeIcon,
    InfoIcon,
    UserIcon,
    WrenchIcon,
    CheckCircleIcon,
} from 'lucide-react'
import { SiGithub } from "react-icons/si";
import {useLanguage} from '../contexts/LanguageContext'
import {ProjectService} from '../services/projectService'
import type {Project} from '../lib/supabase'

const formatYearMonth = (date: string | null): string => {
    if (!date) return ''
    // Handle ISO timestamps like "2024-09-01T00:00:00.000Z" and simple dates like "2024-09-01"
    const match = date.match(/^(\d{4})-(\d{2})/)
    return match ? `${match[1]}-${match[2]}` : date
}

interface ProjectDetailModalProps {
    isOpen: boolean
    onClose: () => void
    projectId: string | null
    onNavigateToProject: (projectId: string) => void
}

export const ProjectDetailModal = ({
                                       isOpen,
                                       onClose,
                                       projectId,
                                   }: ProjectDetailModalProps) => {
    const {language, t} = useLanguage()
    const [activeImage, setActiveImage] = useState<number>(0)
    const [isLoading, setIsLoading] = useState(true)
    const [project, setProject] = useState<Project | null>(null)
    const [error, setError] = useState<string | null>(null)
    const [activeTab, setActiveTab] = useState<
        'overview' | 'tasks' | 'troubleshooting'
    >('overview')

    useEffect(() => {
        if (isOpen && projectId) {
            setActiveImage(0)
            setActiveTab('overview')
            setIsLoading(true)
            setError(null)

            void (async () => {
                try {
                    const projectData = await ProjectService.getProjectById(projectId, language)
                    if (projectData) {
                        setProject(projectData)
                    } else {
                        setError('Project not found')
                    }
                } catch (err) {
                    console.error('Error fetching project:', err)
                    setError('Failed to load project data')
                } finally {
                    setIsLoading(false)
                }
            })();
        }
    }, [isOpen, projectId, language])

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'unset'
        }
        return () => {
            document.body.style.overflow = 'unset'
        }
    }, [isOpen])

    const handleNextImage = () => {
        if (project?.gallery_url) {
            const length = project?.gallery_url?.length ?? 0;
            if (length > 0) {
                setActiveImage((prev) => (prev + 1) % length);
            }
        }
    }

    const handlePrevImage = () => {
        if (project?.gallery_url) {
            const length = project?.gallery_url?.length ?? 0;
            if (length > 0) {
                setActiveImage((prev) => (prev - 1 + length) % length)
            }
        }
    }

    if (!isOpen) return null

    if (error) {
        return (
            <div className="fixed inset-0 z-[99999] overflow-y-auto">
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose}></div>
                <div className="relative w-full h-full flex items-center justify-center">
                    <div className="bg-black/90 border border-red-500 rounded-lg p-8 m-4">
                        <h2 className="text-xl font-bold text-red-400 mb-4">Error</h2>
                        <p className="text-gray-300 mb-4">{error}</p>
                        <button
                            onClick={onClose}
                            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    if (!project && !isLoading && !error) return null

    // DEBUG: 날짜 데이터 확인용 (확인 후 삭제)
    console.log('DEBUG start_date:', project?.start_date, typeof project?.start_date)
    console.log('DEBUG end_date:', project?.end_date, typeof project?.end_date)
    console.log('DEBUG formatYearMonth result:', formatYearMonth(project?.start_date ?? null), '~', formatYearMonth(project?.end_date ?? null))

    const sortedHighlights = project?.highlights
        ?.slice()
        .sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0)) ?? []

    return (
        <div className="fixed inset-0 z-[99999] overflow-y-auto">
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black/80 backdrop-blur-sm"
                onClick={onClose}
            ></div>
            {/* Modal Content */}
            <div
                className={`relative w-full h-full ${language === 'ko' ? 'font-ko' : 'font-en'}`}
            >
                <div className="relative min-h-screen max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
                    <div className="bg-black/90 border border-gray-800 rounded-lg shadow-xl overflow-hidden">
                        {/* Close button */}
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 z-50 p-2 rounded-full bg-black/50 border border-gray-700 text-gray-300 hover:text-hot-pink hover:border-hot-pink transition-colors"
                        >
                            <XIcon size={20}/>
                        </button>
                        {/* Fixed Project Links Sidebar */}
                        {project?.links && project.links.length > 0 && !isLoading && (
                            <div
                                className="hidden md:flex fixed left-0 top-1/2 transform -translate-y-1/2 z-40 flex-col gap-4 pl-4 md:pl-8">
                                <div
                                    className="bg-black/80 backdrop-blur-sm border border-gray-800 rounded-lg p-3 shadow-lg flex flex-col gap-4">
                                    {project?.links?.find(link => link.type === 'github') && (
                                        <a
                                            href={project.links.find(link => link.type === 'github')!.url!}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center justify-center w-12 h-12 bg-hot-pink hover:bg-hot-pink/80 rounded-full group relative"
                                            aria-label="GitHub Repository"
                                        >
                                            <SiGithub size={24} className="text-white"/>
                                            <span
                                                className="absolute left-full ml-2 px-2 py-1 bg-hot-pink text-white text-xs font-mono rounded opacity-0 group-hover:opacity-100 whitespace-nowrap transition-opacity">
                                                GitHub
                                            </span>
                                        </a>
                                    )}
                                    {project?.links?.find(link => link.type === 'live') && (
                                        <a
                                            href={project.links.find(link => link.type === 'live')!.url!}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center justify-center w-12 h-12 bg-electric-blue hover:bg-electric-blue/80 rounded-full group relative"
                                            aria-label="Live Demo"
                                        >
                                            <ExternalLinkIcon size={24} className="text-white"/>
                                            <span
                                                className="absolute left-full ml-2 px-2 py-1 bg-electric-blue text-white text-xs font-mono rounded opacity-0 group-hover:opacity-100 whitespace-nowrap transition-opacity">
                                                {language === 'en' ? 'Live Demo' : '라이브 데모'}
                                            </span>
                                        </a>
                                    )}
                                    {project?.links?.find(link => link.type === 'docs') && (
                                        <a
                                            href={project.links.find(link => link.type === 'docs')!.url!}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center justify-center w-12 h-12 bg-gray-700 hover:bg-gray-600 rounded-full group relative"
                                            aria-label="Documentation"
                                        >
                                            <CodeIcon size={24} className="text-white"/>
                                            <span
                                                className="absolute left-full ml-2 px-2 py-1 bg-gray-700 text-white text-xs font-mono rounded opacity-0 group-hover:opacity-100 whitespace-nowrap transition-opacity">
                                                {language === 'en' ? 'Docs' : '문서'}
                                            </span>
                                        </a>
                                    )}
                                </div>
                            </div>
                        )}
                        {isLoading ? (
                            <div className="flex items-center justify-center h-screen">
                                <div className="relative w-16 h-16">
                                    <div
                                        className="absolute inset-0 border-4 border-t-hot-pink border-r-electric-blue border-b-hot-pink border-l-electric-blue rounded-full animate-spin"></div>
                                    <div
                                        className="absolute inset-2 border-2 border-t-electric-blue border-r-hot-pink border-b-electric-blue border-l-hot-pink rounded-full animate-spin-slow"></div>
                                </div>
                            </div>
                        ) : (
                            <div className="overflow-y-auto pb-12" style={{height: 'calc(100vh - 66px)'}}>
                                {/* Header Section */}
                                <div
                                    className="relative bg-gray-900/70 border-b border-electric-blue/30 backdrop-blur-sm">
                                    <div className="container mx-auto px-4 py-4 md:py-6">
                                        <div className="flex flex-col gap-3 md:gap-4">
                                            <div>
                                                <span
                                                    className="inline-block px-1.5 py-0.5 md:px-2 md:py-1 bg-electric-blue/20 border border-electric-blue/40 text-electric-blue text-[10px] md:text-xs font-mono rounded mb-2">
                                                    {project?.category?.[language]}
                                                </span>
                                                <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold">
                                                    {project?.title?.[language]}
                                                </h1>
                                                <div className="flex flex-wrap items-center gap-2 mt-2">
                                                    <span className="text-gray-400 font-mono text-xs md:text-sm">
                                                        {project?.subtitle?.[language]}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="flex flex-wrap gap-1.5 md:gap-2">
                                                {project?.tag?.[language] &&
                                                    project?.tag[language].map((tag, index) => (
                                                        <span
                                                            key={index}
                                                            className="px-1.5 py-0.5 md:px-2 md:py-1 bg-gray-800/80 border border-gray-700 text-gray-300 text-[10px] md:text-xs font-mono rounded-full"
                                                        >
                                                            {tag}
                                                        </span>
                                                    ))}
                                                <span
                                                    className="px-1.5 py-0.5 md:px-2 md:py-1 bg-hot-pink/20 border border-hot-pink/40 text-hot-pink text-[10px] md:text-xs font-mono rounded-full">
                                                    {project?.start_date && project?.end_date ? `${formatYearMonth(project.start_date)} ~ ${formatYearMonth(project.end_date)}` : ''}
                                                </span>
                                                <span
                                                    className="px-1.5 py-0.5 md:px-2 md:py-1 bg-electric-blue/20 border border-electric-blue/40 text-electric-blue text-[10px] md:text-xs font-mono rounded-full flex items-center">
                                                    <span
                                                        className="w-1 h-1 md:w-1.5 md:h-1.5 rounded-full bg-electric-blue mr-1"></span>
                                                    {project?.status?.[language]}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* Floating Project Links for Mobile */}
                                {project?.links && project.links.length > 0 && (
                                    <div className="md:hidden fixed bottom-4 right-4 z-40 flex flex-col gap-3">
                                        <div
                                            className="bg-black/80 backdrop-blur-sm border border-gray-800 rounded-full p-2 shadow-lg flex gap-2">
                                            {project?.links?.find(link => link.type === 'github') && (
                                                <a
                                                    href={project.links.find(link => link.type === 'github')!.url!}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex items-center justify-center w-10 h-10 bg-hot-pink hover:bg-hot-pink/80 rounded-full"
                                                    aria-label="GitHub Repository"
                                                >
                                                    <SiGithub size={20} className="text-white"/>
                                                </a>
                                            )}
                                            {project?.links?.find(link => link.type === 'live') && (
                                                <a
                                                    href={project.links.find(link => link.type === 'live')!.url!}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex items-center justify-center w-10 h-10 bg-electric-blue hover:bg-electric-blue/80 rounded-full"
                                                    aria-label="Live Demo"
                                                >
                                                    <ExternalLinkIcon size={20} className="text-white"/>
                                                </a>
                                            )}
                                            {project?.links?.find(link => link.type === 'docs') && (
                                                <a
                                                    href={project.links.find(link => link.type === 'docs')!.url!}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex items-center justify-center w-10 h-10 bg-gray-700 hover:bg-gray-600 rounded-full"
                                                    aria-label="Documentation"
                                                >
                                                    <CodeIcon size={20} className="text-white"/>
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                )}
                                {/* Main Content */}
                                <div className="container mx-auto px-4 py-4 md:py-8">
                                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-8">
                                        {/* Left Sidebar - Navigation */}
                                        <div className="lg:col-span-3">
                                            <div className="lg:sticky lg:top-8">
                                                <nav className="flex lg:flex-col gap-2 lg:space-y-1 overflow-x-auto pb-2 lg:pb-0">
                                                    <button
                                                        onClick={() => setActiveTab('overview')}
                                                        className={`flex-shrink-0 lg:w-full text-left px-3 md:px-4 py-2 md:py-3 rounded-md flex items-center space-x-2 md:space-x-3 transition-colors text-xs md:text-sm ${activeTab === 'overview' ? 'bg-gray-800 text-electric-blue border-l-2 border-electric-blue' : 'hover:bg-gray-900 text-gray-400 border border-gray-700 lg:border-0'}`}
                                                    >
                                                        <InfoIcon size={16} className="md:w-[18px] md:h-[18px]"/>
                                                        <span className="font-mono whitespace-nowrap">
                                                            {t('projectDetail.tab.overview')}
                                                        </span>
                                                    </button>
                                                    <button
                                                        onClick={() => setActiveTab('tasks')}
                                                        className={`flex-shrink-0 lg:w-full text-left px-3 md:px-4 py-2 md:py-3 rounded-md flex items-center space-x-2 md:space-x-3 transition-colors text-xs md:text-sm ${activeTab === 'tasks' ? 'bg-gray-800 text-hot-pink border-l-2 border-hot-pink' : 'hover:bg-gray-900 text-gray-400 border border-gray-700 lg:border-0'}`}
                                                    >
                                                        <UserIcon size={16} className="md:w-[18px] md:h-[18px]"/>
                                                        <span className="font-mono whitespace-nowrap">
                                                            {t('projectDetail.tab.tasks')}
                                                        </span>
                                                    </button>
                                                    {project?.project_type !== 'frontend' && (
                                                    <button
                                                        onClick={() => setActiveTab('troubleshooting')}
                                                        className={`flex-shrink-0 lg:w-full text-left px-3 md:px-4 py-2 md:py-3 rounded-md flex items-center space-x-2 md:space-x-3 transition-colors text-xs md:text-sm ${activeTab === 'troubleshooting' ? 'bg-gray-800 text-hot-pink border-l-2 border-hot-pink' : 'hover:bg-gray-900 text-gray-400 border border-gray-700 lg:border-0'}`}
                                                    >
                                                        <WrenchIcon size={16} className="md:w-[18px] md:h-[18px]"/>
                                                        <span className="font-mono whitespace-nowrap">
                                                            {t('projectDetail.tab.troubleshooting')}
                                                        </span>
                                                    </button>
                                                    )}
                                                </nav>
                                            </div>
                                        </div>
                                        {/* Main Content Area */}
                                        <div className="lg:col-span-9">
                                            {/* ========== TAB 1: Overview ========== */}
                                            {activeTab === 'overview' && (
                                                <div>
                                                    {/* Project Info Cards - 4 per row on PC, 2 per row on mobile/tablet */}
                                                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-6 md:mb-8">
                                                        {project?.client ? (
                                                            <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-3 md:p-5">
                                                                <h3 className="text-xs md:text-sm text-gray-400 font-mono uppercase mb-1 md:mb-2">
                                                                    {t('projectDetail.client')}
                                                                </h3>
                                                                <p className="text-sm md:text-lg">{project.client[language]}</p>
                                                            </div>
                                                        ) : (
                                                            <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-3 md:p-5">
                                                                <h3 className="text-xs md:text-sm text-gray-400 font-mono uppercase mb-1 md:mb-2">
                                                                    {t('projectDetail.projectType')}
                                                                </h3>
                                                                <p className="text-sm md:text-lg">
                                                                    {language === 'en' ? 'Open Source' : '오픈 소스'}
                                                                </p>
                                                            </div>
                                                        )}
                                                        <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-3 md:p-5">
                                                            <h3 className="text-xs md:text-sm text-gray-400 font-mono uppercase mb-1 md:mb-2">
                                                                {t('projectDetail.timeline')}
                                                            </h3>
                                                            <p className="text-sm md:text-lg">
                                                                {project?.start_date && project?.end_date ? `${formatYearMonth(project.start_date)} ~ ${formatYearMonth(project.end_date)}` : ''}
                                                            </p>
                                                        </div>
                                                        <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-3 md:p-5">
                                                            <h3 className="text-xs md:text-sm text-gray-400 font-mono uppercase mb-1 md:mb-2">
                                                                {t('projectDetail.role')}
                                                            </h3>
                                                            <p className="text-sm md:text-lg">{project?.role?.[language]}</p>
                                                        </div>
                                                        {project?.team_size && (
                                                            <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-3 md:p-5">
                                                                <h3 className="text-xs md:text-sm text-gray-400 font-mono uppercase mb-1 md:mb-2">
                                                                    {t('projectDetail.teamSize')}
                                                                </h3>
                                                                <p className="text-sm md:text-lg">{project.team_size[language]}</p>
                                                            </div>
                                                        )}
                                                    </div>

                                                    {/* Highlight Cards (핵심 성과) - frontend 제외 */}
                                                    {project?.project_type !== 'frontend' && sortedHighlights.length > 0 && (
                                                        <div className="mb-6 md:mb-8">
                                                            <h2 className="text-xl md:text-2xl font-bold mb-3 md:mb-4">
                                                                {t('projectDetail.highlights')}
                                                            </h2>
                                                            <div className="flex flex-wrap gap-3 md:gap-4">
                                                                {sortedHighlights.map((highlight, index) => (
                                                                    <div
                                                                        key={index}
                                                                        className="flex-1 min-w-0 basis-[calc(33.333%-0.667rem)] bg-gradient-to-br from-gray-900/80 to-gray-800/50 border border-hot-pink/30 rounded-lg p-4 md:p-6 text-center"
                                                                    >
                                                                        <p className="text-lg sm:text-xl md:text-xl lg:text-2xl font-bold text-electric-blue mb-1 md:mb-2">
                                                                            {highlight.value?.[language]}
                                                                        </p>
                                                                        <p className="text-xs md:text-sm text-gray-300">
                                                                            {highlight.label?.[language]}
                                                                        </p>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    )}

                                                    {/* Background & Problem */}
                                                    {project?.background && (
                                                        <div className="mb-6 md:mb-8">
                                                            <h2 className="text-xl md:text-2xl font-bold mb-3 md:mb-4">
                                                                {t('projectDetail.background')}
                                                            </h2>
                                                            <p className="text-gray-300 text-sm md:text-base" style={{lineHeight: '2.25'}}>
                                                                {project.background[language]}
                                                            </p>
                                                        </div>
                                                    )}

                                                    {/* Tech Stack */}
                                                    {project?.technologies && project.technologies.length > 0 && (
                                                        <div className="mb-6 md:mb-8">
                                                            <h2 className="text-xl md:text-2xl font-bold mb-3 md:mb-4">
                                                                {t('projectDetail.techStack')}
                                                            </h2>
                                                            <div className="flex flex-wrap gap-2 md:gap-3">
                                                                {project.technologies.map((tech, index) => (
                                                                    <div
                                                                        key={index}
                                                                        className="flex items-center gap-2 bg-gray-900/50 border border-gray-800 rounded-full px-3 py-1.5 md:px-4 md:py-2"
                                                                    >
                                                                        {tech.icon && (
                                                                            <img
                                                                                src={tech.icon}
                                                                                alt={tech.name || ""}
                                                                                className="w-4 h-4 md:w-5 md:h-5 object-contain"
                                                                            />
                                                                        )}
                                                                        <span className="text-xs md:text-sm font-mono text-gray-300">
                                                                            {tech.name}
                                                                        </span>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    )}

                                                    {/* Gallery */}
                                                    {project?.gallery_url && project.gallery_url.length > 0 && (
                                                        <div>
                                                            <h2 className="text-xl md:text-2xl font-bold mb-3 md:mb-4">
                                                                {t('projectDetail.gallery')}
                                                            </h2>
                                                            <div className="space-y-3 md:space-y-4">
                                                                <div className="relative">
                                                                    <div className="aspect-[16/9] overflow-hidden border border-gray-800 rounded-lg">
                                                                        <img
                                                                            src={project.gallery_url[activeImage]}
                                                                            alt={`${project.title?.[language]} gallery image ${activeImage + 1}`}
                                                                            className="w-full h-full object-cover"
                                                                        />
                                                                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-60"></div>
                                                                    </div>
                                                                    <button
                                                                        onClick={handlePrevImage}
                                                                        className="absolute top-1/2 left-2 md:left-4 transform -translate-y-1/2 w-8 h-8 md:w-10 md:h-10 rounded-full bg-black/50 flex items-center justify-center hover:bg-hot-pink/80 transition-colors"
                                                                    >
                                                                        <ChevronLeftIcon size={20} className="md:w-6 md:h-6"/>
                                                                    </button>
                                                                    <button
                                                                        onClick={handleNextImage}
                                                                        className="absolute top-1/2 right-2 md:right-4 transform -translate-y-1/2 w-8 h-8 md:w-10 md:h-10 rounded-full bg-black/50 flex items-center justify-center hover:bg-hot-pink/80 transition-colors"
                                                                    >
                                                                        <ChevronRightIcon size={20} className="md:w-6 md:h-6"/>
                                                                    </button>
                                                                    <div className="absolute bottom-2 right-2 md:bottom-4 md:right-4 bg-black/70 px-2 py-0.5 md:px-3 md:py-1 rounded-full font-mono text-xs md:text-sm">
                                                                        {activeImage + 1} / {project.gallery_url.length}
                                                                    </div>
                                                                </div>
                                                                <div className="flex flex-wrap gap-1.5 md:gap-2">
                                                                    {project.gallery_url.map((image, index) => (
                                                                        <button
                                                                            key={index}
                                                                            onClick={() => setActiveImage(index)}
                                                                            className={`w-14 h-14 md:w-20 md:h-20 rounded-md overflow-hidden border-2 ${activeImage === index ? 'border-hot-pink' : 'border-gray-800'} transition-colors`}
                                                                        >
                                                                            <img
                                                                                src={image}
                                                                                alt={`Thumbnail ${index + 1}`}
                                                                                className="w-full h-full object-cover"
                                                                            />
                                                                        </button>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            )}

                                            {/* ========== TAB 2: Tasks (담당 업무) ========== */}
                                            {activeTab === 'tasks' && (
                                                <div>
                                                    <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 flex items-center">
                                                        <span className="w-1.5 md:w-2 h-6 md:h-8 bg-hot-pink mr-2 md:mr-3"></span>
                                                        {t('projectDetail.tasksTitle')}
                                                    </h2>
                                                    <div className="space-y-6 md:space-y-8">
                                                        {project?.contributions
                                                            ?.slice()
                                                            .sort((a, b) => Number(b.percentage || 0) - Number(a.percentage || 0))
                                                            .map((item, index) => (
                                                            <div
                                                                key={index}
                                                                className="bg-gray-900/30 border border-gray-800 rounded-lg p-4 md:p-6"
                                                            >
                                                                {/* Area & Percentage */}
                                                                <div className="flex items-center justify-between mb-3 md:mb-4">
                                                                    <h3 className="text-lg md:text-xl font-bold text-electric-blue">
                                                                        {item.area?.[language]}
                                                                    </h3>
                                                                    <span className="font-mono text-sm md:text-base text-hot-pink">
                                                                        {item.percentage}%
                                                                    </span>
                                                                </div>
                                                                {/* Progress bar */}
                                                                <div className="h-2 bg-gray-800 rounded-full overflow-hidden mb-3 md:mb-4">
                                                                    <div
                                                                        className="h-full bg-gradient-to-r from-electric-blue to-hot-pink rounded-full"
                                                                        style={{ width: `${item.percentage}%` }}
                                                                    ></div>
                                                                </div>
                                                                {/* Description */}
                                                                {item.description && (
                                                                    <p className="text-gray-300 text-sm md:text-base mb-3 md:mb-4">
                                                                        {item.description[language]}
                                                                    </p>
                                                                )}
                                                                {/* Tasks checklist */}
                                                                {item.tasks?.[language] && item.tasks[language].length > 0 && (
                                                                    <div className="border-t border-gray-800 pt-3 md:pt-4">
                                                                        <h4 className="text-sm md:text-base font-bold text-gray-200 mb-2 md:mb-3">
                                                                            {t('projectDetail.tasksList')}
                                                                        </h4>
                                                                        <ul className="space-y-1.5 md:space-y-2">
                                                                            {item.tasks[language].map((task, taskIndex) => (
                                                                                <li key={taskIndex} className="flex items-start gap-2">
                                                                                    <CheckCircleIcon size={16} className="text-hot-pink mt-0.5 flex-shrink-0 md:w-[18px] md:h-[18px]"/>
                                                                                    <span className="text-gray-300 text-xs md:text-sm">
                                                                                        {task}
                                                                                    </span>
                                                                                </li>
                                                                            ))}
                                                                        </ul>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}

                                            {/* ========== TAB 3: Troubleshooting (문제해결) - frontend 제외 ========== */}
                                            {project?.project_type !== 'frontend' && activeTab === 'troubleshooting' && (
                                                <div>
                                                    <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 flex items-center">
                                                        <span className="w-1.5 md:w-2 h-6 md:h-8 bg-electric-blue mr-2 md:mr-3"></span>
                                                        {t('projectDetail.troubleshootingTitle')}
                                                    </h2>
                                                    <div className="space-y-4 md:space-y-6">
                                                        {project?.troubles?.map((trouble, index) => (
                                                            <div
                                                                key={index}
                                                                className="bg-gray-900/30 border border-gray-800 rounded-lg p-4 md:p-6"
                                                            >
                                                                {/* Title */}
                                                                {trouble.title && (
                                                                    <h3 className="text-base md:text-lg font-bold text-white mb-4 md:mb-5 pb-2 border-b border-gray-700">
                                                                        {trouble.title[language]}
                                                                    </h3>
                                                                )}
                                                                {/* Situation */}
                                                                <div className="mb-4 md:mb-5">
                                                                    <h4 className="text-sm md:text-base font-bold mb-1.5 md:mb-2 text-hot-pink">
                                                                        {t('projectDetail.situation')}
                                                                    </h4>
                                                                    <p className="text-gray-300 text-sm md:text-base">
                                                                        {trouble.situation?.[language]}
                                                                    </p>
                                                                </div>
                                                                {/* Cause Analysis */}
                                                                {trouble.cause && (
                                                                    <div className="mb-4 md:mb-5">
                                                                        <h4 className="text-sm md:text-base font-bold mb-1.5 md:mb-2 text-yellow-400">
                                                                            {t('projectDetail.causeAnalysis')}
                                                                        </h4>
                                                                        <p className="text-gray-300 text-sm md:text-base">
                                                                            {trouble.cause[language]}
                                                                        </p>
                                                                    </div>
                                                                )}
                                                                {/* Approach & Reason */}
                                                                <div className="mb-4 md:mb-5">
                                                                    <h4 className="text-sm md:text-base font-bold mb-1.5 md:mb-2 text-electric-blue">
                                                                        {t('projectDetail.approach')}
                                                                    </h4>
                                                                    <p className="text-gray-300 text-sm md:text-base">
                                                                        {trouble.approach?.[language]}
                                                                    </p>
                                                                </div>
                                                                {/* Result */}
                                                                <div className="p-3 md:p-4 bg-electric-blue/10 border border-electric-blue/30 rounded-lg">
                                                                    <h4 className="text-sm md:text-base font-bold mb-1 md:mb-1.5 text-white">
                                                                        {t('projectDetail.result')}
                                                                    </h4>
                                                                    <p className="text-gray-300 text-sm md:text-base">
                                                                        {trouble.result?.[language]}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <style jsx>{`
                .animate-spin-slow {
                    animation: spin 3s linear infinite;
                }

                @keyframes spin {
                    from {
                        transform: rotate(0deg);
                    }
                    to {
                        transform: rotate(360deg);
                    }
                }
            `}</style>
        </div>
    )
}
