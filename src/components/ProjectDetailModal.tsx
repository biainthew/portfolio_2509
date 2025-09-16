import {useEffect, useState} from 'react'
import {
    ChevronLeftIcon,
    ChevronRightIcon,
    XIcon,
    GithubIcon,
    ExternalLinkIcon,
    CodeIcon,
    InfoIcon,
} from 'lucide-react'
import {useLanguage} from '../contexts/LanguageContext'
import {ProjectService} from '../services/projectService'
import type {Project} from '../lib/supabase'

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
        'overview' | 'contribution' | 'troubleshooting'
    >('overview')
    // Fetch project data when modal opens
    useEffect(() => {
        if (isOpen && projectId) {
            setActiveImage(0)
            setActiveTab('overview')
            setIsLoading(true)
            setError(null)

            const fetchProject = async () => {
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
            }

            fetchProject()
        }
    }, [isOpen, projectId, language])

    // Disable body scroll when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'unset'
        }

        // Cleanup function to restore scroll when component unmounts
        return () => {
            document.body.style.overflow = 'unset'
        }
    }, [isOpen])
    const handleNextImage = () => {
        if (project?.gallery_url) {
            setActiveImage((prev) => (prev + 1) % project?.gallery_url.length)
        }
    }

    const handlePrevImage = () => {
        if (project?.gallery_url) {
            setActiveImage(
                (prev) =>
                    (prev - 1 + project?.gallery_url.length) % project?.gallery_url.length,
            )
        }
    }

    if (!isOpen) return null

    // 에러 상태 표시
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

    // 프로젝트가 없거나 로딩 중일 때는 기존 로딩 UI 표시
    if (!project && !isLoading && !error) return null
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
                                className="fixed left-0 top-1/2 transform -translate-y-1/2 z-40 flex flex-col gap-4 pl-4 md:pl-8">
                                <div
                                    className="bg-black/80 backdrop-blur-sm border border-gray-800 rounded-lg p-3 shadow-lg">
                                    {project?.links?.find(link => link.type === 'github') && (
                                        <a
                                            href={project?.links?.find(link => link.type === 'github')?.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center justify-center w-12 h-12 bg-hot-pink hover:bg-hot-pink/80 rounded-full mb-4 group relative"
                                            aria-label="GitHub Repository"
                                        >
                                            <GithubIcon size={24} className="text-white"/>
                                            <span
                                                className="absolute left-full ml-2 px-2 py-1 bg-hot-pink text-white text-xs font-mono rounded opacity-0 group-hover:opacity-100 whitespace-nowrap transition-opacity">
                                                {language === 'en' ? 'GitHub' : 'GitHub'}
                                            </span>
                                        </a>
                                    )}
                                    {project?.links?.find(link => link.type === 'live') && (
                                        <a
                                            href={project?.links?.find(link => link.type === 'live')?.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center justify-center w-12 h-12 bg-electric-blue hover:bg-electric-blue/80 rounded-full mb-4 group relative"
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
                                            href={project?.links?.find(link => link.type === 'docs')?.url}
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
                                    <div className="container mx-auto px-4 py-6">
                                        <div className="flex flex-col gap-4">
                                            <div>
                                                <h1
                                                    className="text-3xl md:text-4xl font-bold"
                                                >
                                                    {project?.title}
                                                </h1>
                                                <div className="flex items-center mt-2">
                                                    <span
                                                        className="inline-block px-2 py-1 bg-electric-blue/20 border border-electric-blue/40 text-electric-blue text-xs font-mono rounded">
                                                        {project?.category}
                                                    </span>
                                                    <span className="ml-3 text-gray-400 font-mono text-sm">
                                                        {project?.subtitle}
                                                    </span>
                                                </div>
                                            </div>
                                            {/* Additional tags/chips */}
                                            <div className="flex flex-wrap gap-2 mt-2">
                                                {project?.tag &&
                                                    project?.tag.map((tag, index) => (
                                                        <span
                                                            key={index}
                                                            className="px-2 py-1 bg-gray-800/80 border border-gray-700 text-gray-300 text-xs font-mono rounded-full"
                                                        >
                                                            {tag}
                                                        </span>
                                                    ))}
                                                <span
                                                    className="px-2 py-1 bg-hot-pink/20 border border-hot-pink/40 text-hot-pink text-xs font-mono rounded-full">
                                                    {project?.start_date && project?.end_date ? `${project.start_date} ~ ${project.end_date}` : ''}
                                                </span>
                                                <span
                                                    className="px-2 py-1 bg-electric-blue/20 border border-electric-blue/40 text-electric-blue text-xs font-mono rounded-full flex items-center">
                                                    <span
                                                        className="w-1.5 h-1.5 rounded-full bg-electric-blue mr-1"></span>
                                                    {project?.status}
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
                                                    href={project?.links?.find(link => link.type === 'github')?.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex items-center justify-center w-10 h-10 bg-hot-pink hover:bg-hot-pink/80 rounded-full"
                                                    aria-label="GitHub Repository"
                                                >
                                                    <GithubIcon size={20} className="text-white"/>
                                                </a>
                                            )}
                                            {project?.links?.find(link => link.type === 'live') && (
                                                <a
                                                    href={project?.links?.find(link => link.type === 'live')?.url}
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
                                                    href={project?.links?.find(link => link.type === 'docs')?.url}
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
                                <div className="container mx-auto px-4 py-8">
                                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                                        {/* Left Sidebar - Navigation */}
                                        <div className="lg:col-span-3">
                                            <div className="sticky top-8">
                                                <nav className="space-y-1">
                                                    <button
                                                        onClick={() => setActiveTab('overview')}
                                                        className={`w-full text-left px-4 py-3 rounded-md flex items-center space-x-3 transition-colors ${activeTab === 'overview' ? 'bg-gray-800 text-electric-blue border-l-2 border-electric-blue' : 'hover:bg-gray-900 text-gray-400'}`}
                                                    >
                                                        <InfoIcon size={18}/>
                                                        <span className="font-mono text-sm">
                                                            {language === 'en'
                                                                ? 'PROJECT OVERVIEW'
                                                                : '프로젝트 개요'}
                                                        </span>
                                                    </button>
                                                    <button
                                                        onClick={() => setActiveTab('contribution')}
                                                        className={`w-full text-left px-4 py-3 rounded-md flex items-center space-x-3 transition-colors ${activeTab === 'contribution' ? 'bg-gray-800 text-hot-pink border-l-2 border-hot-pink' : 'hover:bg-gray-900 text-gray-400'}`}
                                                    >
                                                        <CodeIcon size={18}/>
                                                        <span className="font-mono text-sm">
                                                            {language === 'en' ? 'CONTRIBUTION' : '기여도'}
                                                        </span>
                                                    </button>
                                                    <button
                                                        onClick={() => setActiveTab('troubleshooting')}
                                                        className={`w-full text-left px-4 py-3 rounded-md flex items-center space-x-3 transition-colors ${activeTab === 'troubleshooting' ? 'bg-gray-800 text-hot-pink border-l-2 border-hot-pink' : 'hover:bg-gray-900 text-gray-400'}`}
                                                    >
                                                        <ChevronRightIcon size={18}/>
                                                        <span className="font-mono text-sm">
                                                            {language === 'en' ? 'CHALLENGES' : '문제 해결'}
                                                        </span>
                                                    </button>
                                                </nav>
                                                {/* Project Image Preview */}
                                                <div className="mt-8 border border-gray-800 rounded-lg overflow-hidden">
                                                    <img
                                                        src={project?.image}
                                                        alt={project?.title}
                                                        className="w-full h-auto"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        {/* Main Content Area */}
                                        <div className="lg:col-span-9">
                                            {/* Overview Tab */}
                                            {activeTab === 'overview' && (
                                                <div>
                                                    {/* Hero Image */}
                                                    <div
                                                        className="aspect-[16/9] mb-8 overflow-hidden border border-gray-800 rounded-lg relative"
                                                    >
                                                        <img
                                                            src={project?.image}
                                                            alt={project?.title}
                                                            className="w-full h-full object-cover"
                                                        />
                                                        <div
                                                            className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-60"></div>
                                                    </div>
                                                    {/* Project Overview */}
                                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                                                        {project?.client && (
                                                            <div
                                                                className="bg-gray-900/50 border border-gray-800 rounded-lg p-5">
                                                                <h3 className="text-sm text-gray-400 font-mono uppercase mb-2">
                                                                    {t('projectDetail.client')}
                                                                </h3>
                                                                <p className="text-lg">{project?.client}</p>
                                                            </div>
                                                        )}
                                                        {!project?.client && (
                                                            <div
                                                                className="bg-gray-900/50 border border-gray-800 rounded-lg p-5">
                                                                <h3 className="text-sm text-gray-400 font-mono uppercase mb-2">
                                                                    {language === 'en'
                                                                        ? 'PROJECT TYPE'
                                                                        : '프로젝트 유형'}
                                                                </h3>
                                                                <p className="text-lg">
                                                                    {language === 'en'
                                                                        ? 'Open Source'
                                                                        : '오픈 소스'}
                                                                </p>
                                                            </div>
                                                        )}
                                                        <div
                                                            className="bg-gray-900/50 border border-gray-800 rounded-lg p-5">
                                                            <h3 className="text-sm text-gray-400 font-mono uppercase mb-2">
                                                                {t('projectDetail.role')}
                                                            </h3>
                                                            <p className="text-lg">{project?.role}</p>
                                                        </div>
                                                        <div
                                                            className="bg-gray-900/50 border border-gray-800 rounded-lg p-5">
                                                            <h3 className="text-sm text-gray-400 font-mono uppercase mb-2">
                                                                {t('projectDetail.timeline')}
                                                            </h3>
                                                            <p className="text-lg">{project?.start_date && project?.end_date ? `${project.start_date} ~ ${project.end_date}` : ''}</p>
                                                        </div>
                                                    </div>
                                                    {/* Project Description */}
                                                    <div className="mb-8">
                                                        <h2 className="text-2xl font-bold mb-4">
                                                            {language === 'en'
                                                                ? 'Project Description'
                                                                : '프로젝트 설명'}
                                                        </h2>
                                                        <p className="text-gray-300 mb-6">
                                                            {project?.description}
                                                        </p>
                                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                            <div>
                                                                <h3 className="text-xl font-bold mb-3 text-electric-blue">
                                                                    {t('projectDetail.challenge')}
                                                                </h3>
                                                                <p className="text-gray-300">
                                                                    {project?.challenge}
                                                                </p>
                                                            </div>
                                                            <div>
                                                                <h3 className="text-xl font-bold mb-3 text-hot-pink">
                                                                    {t('projectDetail.solution')}
                                                                </h3>
                                                                <p className="text-gray-300">
                                                                    {project?.solution}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {/* Key Features */}
                                                    <div className="mb-8">
                                                        <h2 className="text-2xl font-bold mb-4">
                                                            {language === 'en' ? 'Key Features' : '주요 기능'}
                                                        </h2>
                                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                            {project?.result?.map((feature, index) => (
                                                                <div key={index} className="flex items-start">
                                                                    <div
                                                                        className="flex-shrink-0 w-6 h-6 rounded-full border border-hot-pink flex items-center justify-center mr-3 mt-0.5">
                                                                        <span className="text-hot-pink text-xs">
                                                                            {index + 1}
                                                                        </span>
                                                                    </div>
                                                                    <span className="text-gray-300">
                                                                        {feature}
                                                                    </span>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                    {/* Tech Stack - Redesigned to be more compact */}
                                                    <div className="mb-8">
                                                        <h2 className="text-2xl font-bold mb-4">
                                                            {t('projectDetail.techStack')}
                                                        </h2>
                                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                            {project?.technologies?.map((tech, index) => (
                                                                <div
                                                                    key={index}
                                                                    className="bg-gray-900/30 border border-gray-800 rounded-lg p-4 flex items-start"
                                                                >
                                                                    <div
                                                                        className="w-10 h-10 bg-gray-900/70 border border-gray-800 rounded-lg flex items-center justify-center p-1.5 mr-4 flex-shrink-0">
                                                                        <img
                                                                            src={tech.icon}
                                                                            alt={tech.name}
                                                                            className="w-full h-full object-contain"
                                                                        />
                                                                    </div>
                                                                    <div>
                                                                        <h3 className="text-sm font-bold text-electric-blue mb-1">
                                                                            {tech.name}
                                                                        </h3>
                                                                        <p className="text-xs text-gray-400">
                                                                            {tech.description}
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                    {/* Results Section */}
                                                    <div className="mb-8">
                                                        <h2 className="text-2xl font-bold mb-4">
                                                            {language === 'en'
                                                                ? 'Results & Impact'
                                                                : '결과 및 영향'}
                                                        </h2>
                                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                            {project?.result?.map((result, index) => (
                                                                <div
                                                                    key={index}
                                                                    className="bg-gray-900/50 border border-gray-800 rounded-lg p-4"
                                                                >
                                                                    <div className="flex items-center">
                                                                        <div
                                                                            className="w-8 h-8 rounded-full bg-hot-pink/20 flex items-center justify-center mr-3">
                                                                            <span
                                                                                className="text-hot-pink text-sm font-bold">
                                                                                {index + 1}
                                                                            </span>
                                                                        </div>
                                                                        <p className="text-gray-300 text-sm">
                                                                            {result}
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                    {/* Gallery - Moved thumbnails back to bottom */}
                                                    <div>
                                                        <h2 className="text-2xl font-bold mb-4">
                                                            {language === 'en'
                                                                ? 'Project Gallery'
                                                                : '프로젝트 갤러리'}
                                                        </h2>
                                                        <div className="space-y-4">
                                                            {/* Main image */}
                                                            <div className="relative">
                                                                <div
                                                                    className="aspect-[16/9] overflow-hidden border border-gray-800 rounded-lg"
                                                                >
                                                                    <img
                                                                        src={project?.gallery_url?.[activeImage]}
                                                                        alt={`${project?.title} gallery image ${activeImage + 1}`}
                                                                        className="w-full h-full object-cover"
                                                                    />
                                                                    <div
                                                                        className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-60"></div>
                                                                </div>
                                                                {/* Navigation arrows */}
                                                                <button
                                                                    onClick={handlePrevImage}
                                                                    className="absolute top-1/2 left-4 transform -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 flex items-center justify-center hover:bg-hot-pink/80 transition-colors"
                                                                >
                                                                    <ChevronLeftIcon size={24}/>
                                                                </button>
                                                                <button
                                                                    onClick={handleNextImage}
                                                                    className="absolute top-1/2 right-4 transform -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 flex items-center justify-center hover:bg-hot-pink/80 transition-colors"
                                                                >
                                                                    <ChevronRightIcon size={24}/>
                                                                </button>
                                                                {/* Image counter */}
                                                                <div
                                                                    className="absolute bottom-4 right-4 bg-black/70 px-3 py-1 rounded-full font-mono text-sm">
                                                                    {activeImage + 1} / {project?.gallery_url?.length || 0}
                                                                </div>
                                                            </div>
                                                            {/* Thumbnails at bottom */}
                                                            <div className="flex flex-wrap gap-2">
                                                                {project?.gallery_url?.map((image, index) => (
                                                                    <button
                                                                        key={index}
                                                                        onClick={() => setActiveImage(index)}
                                                                        className={`w-20 h-20 rounded-md overflow-hidden border-2 ${activeImage === index ? 'border-hot-pink' : 'border-gray-800'} transition-colors`}
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
                                                </div>
                                            )}
                                            {/* Contribution Tab */}
                                            {activeTab === 'contribution' && (
                                                <div>
                                                    <h2 className="text-2xl font-bold mb-6 flex items-center">
                                                        <span className="w-2 h-8 bg-hot-pink mr-3"></span>
                                                        {language === 'en'
                                                            ? 'CONTRIBUTION BREAKDOWN'
                                                            : '기여도 분석'}
                                                    </h2>
                                                    <div className="space-y-6">
                                                        {project?.contributions?.map((item, index) => (
                                                            <div
                                                                key={index}
                                                                className="bg-gray-900/30 border border-gray-800 rounded-lg p-6"
                                                            >
                                                                <h3 className="text-xl font-bold mb-3 text-electric-blue">
                                                                    {item.area}
                                                                </h3>
                                                                <div className="mb-4">
                                                                    <div
                                                                        className="flex justify-between items-center mb-2">
                                                                        <span className="font-mono text-sm">
                                                                            {language === 'en'
                                                                                ? 'Contribution Level'
                                                                                : '기여도'}
                                                                        </span>
                                                                        <span
                                                                            className="font-mono text-xs text-hot-pink">
                                                                            {item.percentage}%
                                                                        </span>
                                                                    </div>
                                                                    <div
                                                                        className="h-3 bg-gray-800 rounded-full overflow-hidden">
                                                                        <div
                                                                            className="h-full bg-gradient-to-r from-electric-blue to-hot-pink rounded-full"
                                                                            style={{
                                                                                width: `${item.percentage}%`,
                                                                            }}
                                                                        ></div>
                                                                    </div>
                                                                </div>
                                                                <p className="text-gray-300">
                                                                    {item.description}
                                                                </p>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                            {/* Troubleshooting Tab */}
                                            {activeTab === 'troubleshooting' && (
                                                <div>
                                                    <h2 className="text-2xl font-bold mb-6 flex items-center">
                                                        <span className="w-2 h-8 bg-electric-blue mr-3"></span>
                                                        {language === 'en'
                                                            ? 'TECHNICAL CHALLENGES & SOLUTIONS'
                                                            : '기술적 과제 및 해결책'}
                                                    </h2>
                                                    <div
                                                        className="bg-gray-900/30 border border-gray-800 rounded-lg p-6">
                                                        <div className="mb-6">
                                                            <h3 className="text-xl font-bold mb-3 text-hot-pink">
                                                                {language === 'en' ? 'The Challenge' : '문제'}
                                                            </h3>
                                                            <p className="text-gray-300">
                                                                {project?.challenge}
                                                            </p>
                                                        </div>
                                                        <div className="mb-6">
                                                            <h3 className="text-xl font-bold mb-3 text-electric-blue">
                                                                {language === 'en' ? 'The Solution' : '해결책'}
                                                            </h3>
                                                            <p className="text-gray-300">
                                                                {project?.solution}
                                                            </p>
                                                        </div>
                                                        <div
                                                            className="p-5 bg-electric-blue/10 border border-electric-blue/30 rounded-lg">
                                                            <h4 className="text-lg font-bold mb-2 text-electric-blue">
                                                                {language === 'en' ? 'Impact' : '영향'}
                                                            </h4>
                                                            <p className="text-gray-300">
                                                                {project?.solution}
                                                            </p>
                                                        </div>
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
