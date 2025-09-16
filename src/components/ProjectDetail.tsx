import {useEffect, useState} from 'react'
import {useParams, Link, useNavigate} from 'react-router-dom'
import {
    ArrowLeftIcon,
    ArrowRightIcon,
    ArrowUpIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
} from 'lucide-react'
//import {GlitchText} from './GlitchText'
import {useLanguage} from '../contexts/LanguageContext'

// interface Technology {
//     name: string
//     type: 'frontend' | 'backend' | 'database' | 'design'
//     icon: string
// }

export const ProjectDetail = () => {
    const {id} = useParams<{
        id: string
    }>()
    const navigate = useNavigate()
    const {language, t} = useLanguage()
    const [activeImage, setActiveImage] = useState<number>(0)
    const [isGlitching, setIsGlitching] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    // Simulate loading effect
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false)
        }, 1000)
        // Random glitch effect
        const glitchInterval = setInterval(() => {
            if (Math.random() > 0.8) {
                setIsGlitching(true)
                setTimeout(() => setIsGlitching(false), 300)
            }
        }, 4000)
        return () => {
            clearTimeout(timer)
            clearInterval(glitchInterval)
        }
    }, [])
    // Project data
    const projectsData = {
        en: [
            {
                id: 1,
                title: 'NEURAL INTERFACE',
                subtitle: 'Advanced Biometric System',
                category: 'UI DESIGN',
                client: 'Hyundai Elevator',
                role: 'Lead UI Designer & Frontend Developer',
                timeline: 'Jan 2023 - June 2023',
                status: 'COMPLETED',
                image:
                    'https://images.unsplash.com/photo-1558481795-7f0a7c906f5e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
                description:
                    'Experimental neural interface design with advanced biometric feedback systems.',
                challenge:
                    'The client needed a revolutionary interface for their next-generation elevator control systems that would incorporate biometric authentication, predictive movement patterns, and a seamless user experience that could be understood by users of all technical backgrounds.',
                solution:
                    'We developed a neural interface that uses advanced algorithms to learn user behavior patterns and predict destinations. The system incorporates facial recognition, voice commands, and gesture controls to provide a completely hands-free experience.',
                keyFeatures: [
                    'Biometric authentication system with 99.9% accuracy',
                    'Predictive AI that learns user patterns',
                    'Voice and gesture control interface',
                    'Real-time system health monitoring',
                    'Emergency response protocols',
                    'Adaptive lighting based on time of day',
                ],
                technologies: [
                    {
                        name: 'React',
                        type: 'frontend',
                        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
                    },
                    {
                        name: 'TypeScript',
                        type: 'frontend',
                        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
                    },
                    {
                        name: 'Three.js',
                        type: 'frontend',
                        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/threejs/threejs-original.svg',
                    },
                    {
                        name: 'Node.js',
                        type: 'backend',
                        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
                    },
                    {
                        name: 'TensorFlow',
                        type: 'backend',
                        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg',
                    },
                    {
                        name: 'MongoDB',
                        type: 'database',
                        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg',
                    },
                    {
                        name: 'Figma',
                        type: 'design',
                        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg',
                    },
                ],
                gallery: [
                    'https://images.unsplash.com/photo-1558481795-7f0a7c906f5e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
                    'https://images.unsplash.com/photo-1507146153580-69a1fe6d8aa1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
                    'https://images.unsplash.com/photo-1563089145-599997674d42?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
                    'https://images.unsplash.com/photo-1617791160505-6f00504e3519?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
                    'https://images.unsplash.com/photo-1626544827763-d516dce335e2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
                ],
                mockups: [
                    {
                        device: 'Desktop',
                        image:
                            'https://images.unsplash.com/photo-1558481795-7f0a7c906f5e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
                    },
                    {
                        device: 'Tablet',
                        image:
                            'https://images.unsplash.com/photo-1507146153580-69a1fe6d8aa1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
                    },
                    {
                        device: 'Mobile',
                        image:
                            'https://images.unsplash.com/photo-1563089145-599997674d42?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
                    },
                ],
                results: [
                    'Reduced elevator wait time by 35%',
                    'Increased user satisfaction rating from 76% to 94%',
                    'Decreased energy consumption by 28%',
                    'Implemented in 15 high-rise buildings worldwide',
                ],
                nextProject: 2,
                prevProject: 4,
            },
            // Additional projects would be defined here
        ],
        ko: [
            {
                id: 1,
                title: '신경 인터페이스',
                subtitle: '고급 생체 인식 시스템',
                category: 'UI 디자인',
                client: '현대 엘리베이터',
                role: '수석 UI 디자이너 & 프론트엔드 개발자',
                timeline: '2023년 1월 - 2023년 6월',
                status: '완료',
                image:
                    'https://images.unsplash.com/photo-1558481795-7f0a7c906f5e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
                description:
                    '고급 생체 인식 피드백 시스템을 갖춘 실험적 신경 인터페이스 디자인.',
                challenge:
                    '클라이언트는 생체 인증, 예측 이동 패턴 및 모든 기술 배경을 가진 사용자가 이해할 수 있는 원활한 사용자 경험을 통합할 차세대 엘리베이터 제어 시스템을 위한 혁신적인 인터페이스가 필요했습니다.',
                solution:
                    '사용자 행동 패턴을 학습하고 목적지를 예측하는 고급 알고리즘을 사용하는 신경 인터페이스를 개발했습니다. 이 시스템은 완전한 핸즈프리 경험을 제공하기 위해 얼굴 인식, 음성 명령 및 제스처 제어를 통합합니다.',
                keyFeatures: [
                    '99.9% 정확도의 생체 인증 시스템',
                    '사용자 패턴을 학습하는 예측 AI',
                    '음성 및 제스처 제어 인터페이스',
                    '실시간 시스템 상태 모니터링',
                    '긴급 대응 프로토콜',
                    '시간대별 적응형 조명',
                ],
                technologies: [
                    {
                        name: 'React',
                        type: 'frontend',
                        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
                    },
                    {
                        name: 'TypeScript',
                        type: 'frontend',
                        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
                    },
                    {
                        name: 'Three.js',
                        type: 'frontend',
                        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/threejs/threejs-original.svg',
                    },
                    {
                        name: 'Node.js',
                        type: 'backend',
                        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
                    },
                    {
                        name: 'TensorFlow',
                        type: 'backend',
                        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg',
                    },
                    {
                        name: 'MongoDB',
                        type: 'database',
                        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg',
                    },
                    {
                        name: 'Figma',
                        type: 'design',
                        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg',
                    },
                ],
                gallery: [
                    'https://images.unsplash.com/photo-1558481795-7f0a7c906f5e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
                    'https://images.unsplash.com/photo-1507146153580-69a1fe6d8aa1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
                    'https://images.unsplash.com/photo-1563089145-599997674d42?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
                    'https://images.unsplash.com/photo-1617791160505-6f00504e3519?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
                    'https://images.unsplash.com/photo-1626544827763-d516dce335e2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
                ],
                mockups: [
                    {
                        device: '데스크톱',
                        image:
                            'https://images.unsplash.com/photo-1558481795-7f0a7c906f5e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
                    },
                    {
                        device: '태블릿',
                        image:
                            'https://images.unsplash.com/photo-1507146153580-69a1fe6d8aa1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
                    },
                    {
                        device: '모바일',
                        image:
                            'https://images.unsplash.com/photo-1563089145-599997674d42?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
                    },
                ],
                results: [
                    '엘리베이터 대기 시간 35% 감소',
                    '사용자 만족도 평가가 76%에서 94%로 증가',
                    '에너지 소비 28% 감소',
                    '전 세계 15개 고층 건물에 구현',
                ],
                nextProject: 2,
                prevProject: 4,
            },
            // Additional projects would be defined here
        ],
    }
    const projects = language === 'en' ? projectsData.en : projectsData.ko
    const project = projects.find((p) => p.id === Number(id))
    if (!project && !isLoading) {
        navigate('/404')
        return null
    }
    const handleNextImage = () => {
        if (project) {
            setActiveImage((prev) => (prev + 1) % project.gallery.length)
        }
    }
    const handlePrevImage = () => {
        if (project) {
            setActiveImage(
                (prev) =>
                    (prev - 1 + (project?.gallery.length || 0)) %
                    (project?.gallery.length || 1),
            )
        }
    }
    const navigateToProject = (projectId: number) => {
        navigate(`/project/${projectId}`)
        window.scrollTo(0, 0)
    }
    return (
        <div
            className={`w-full min-h-screen bg-black text-gray-200 ${language === 'ko' ? 'font-ko' : 'font-en'}`}
        >
            {isLoading ? (
                <div className="flex items-center justify-center h-screen">
                    <div className="relative w-16 h-16">
                        <div
                            className="absolute inset-0 border-4 border-t-hot-pink border-r-electric-blue border-b-hot-pink border-l-electric-blue rounded-full animate-spin"></div>
                        <div
                            className="absolute inset-2 border-2 border-t-electric-blue border-r-hot-pink border-b-electric-blue border-l-hot-pink rounded-full animate-spin-slow"></div>
                    </div>
                </div>
            ) : project ? (
                <>
                    {/* Header Section */}
                    <div className="relative bg-gray-900/70 border-b border-electric-blue/30 backdrop-blur-sm">
                        <div className="container mx-auto px-4 py-6">
                            <div
                                className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                                <div>
                                    <Link
                                        to="/"
                                        className="inline-flex items-center text-electric-blue hover:text-hot-pink mb-4 transition-colors"
                                    >
                                        <ChevronLeftIcon size={20}/>
                                        <span className="ml-1 font-mono text-sm">
                      {t('projects.backToProjects')}
                    </span>
                                    </Link>
                                    <h1
                                        className={`text-3xl md:text-4xl font-bold ${isGlitching ? 'animate-glitch' : ''}`}
                                    >
                                        {project.title}
                                    </h1>
                                    <div className="flex items-center mt-2">
                    <span
                        className="inline-block px-2 py-1 bg-electric-blue/20 border border-electric-blue/40 text-electric-blue text-xs font-mono rounded">
                      {project.category}
                    </span>
                                        <span className="ml-3 text-gray-400 font-mono text-sm">
                      {project.subtitle}
                    </span>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-2">
                                    {project.prevProject && (
                                        <button
                                            onClick={() => navigateToProject(project.prevProject)}
                                            className="p-2 border border-gray-700 rounded hover:border-electric-blue hover:text-electric-blue transition-colors"
                                        >
                                            <ChevronLeftIcon size={20}/>
                                        </button>
                                    )}
                                    {project.nextProject && (
                                        <button
                                            onClick={() => navigateToProject(project.nextProject)}
                                            className="p-2 border border-gray-700 rounded hover:border-electric-blue hover:text-electric-blue transition-colors"
                                        >
                                            <ChevronRightIcon size={20}/>
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Hero Section with Mockups */}
                    <section className="py-12 relative">
                        <div className="absolute inset-0 z-0">
                            <div
                                className="h-full w-full bg-[radial-gradient(rgba(var(--color-electric-blue),0.05)_1px,transparent_1px)] bg-[size:20px_20px]"></div>
                        </div>
                        <div className="container mx-auto px-4 relative z-10">
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                {project.mockups.map((mockup, index) => (
                                    <div key={index} className="relative group">
                                        <div
                                            className={`aspect-[16/9] overflow-hidden border border-gray-800 rounded-lg ${index === 0 ? 'lg:col-span-2' : ''} ${isGlitching && index === 0 ? 'animate-glitch' : ''}`}
                                        >
                                            <img
                                                src={mockup.image}
                                                alt={`${project.title} on ${mockup.device}`}
                                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                            />
                                            <div
                                                className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-60"></div>
                                            <div className="absolute bottom-0 left-0 p-4">
                        <span
                            className="inline-block px-2 py-1 bg-hot-pink/20 border border-hot-pink/40 text-hot-pink text-xs font-mono rounded">
                          {mockup.device}
                        </span>
                                            </div>
                                        </div>
                                        {/* Device frame overlay */}
                                        <div className="absolute inset-0 pointer-events-none">
                                            {mockup.device === 'Desktop' ||
                                            mockup.device === '데스크톱' ? (
                                                <div
                                                    className="absolute top-0 left-0 right-0 h-6 bg-gray-900/70 border-b border-gray-700 rounded-t-lg flex items-center px-3">
                                                    <div className="flex space-x-1.5">
                                                        <div className="w-2.5 h-2.5 rounded-full bg-hot-pink"></div>
                                                        <div className="w-2.5 h-2.5 rounded-full bg-gray-500"></div>
                                                        <div
                                                            className="w-2.5 h-2.5 rounded-full bg-electric-blue"></div>
                                                    </div>
                                                </div>
                                            ) : mockup.device === 'Mobile' ||
                                            mockup.device === '모바일' ? (
                                                <>
                                                    <div
                                                        className="absolute top-2 left-1/2 transform -translate-x-1/2 w-1/4 h-1 bg-gray-700 rounded-full"></div>
                                                    <div
                                                        className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-1/6 h-1 bg-gray-700 rounded-full"></div>
                                                </>
                                            ) : (
                                                <>
                                                    <div
                                                        className="absolute top-1/2 left-1 transform -translate-y-1/2 w-1 h-6 bg-gray-700 rounded-full"></div>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                    {/* Project Overview */}
                    <section className="py-12 bg-gray-900/30">
                        <div className="container mx-auto px-4">
                            <div className="max-w-5xl mx-auto">
                                <h2 className="text-2xl font-bold mb-8 flex items-center">
                                    <span className="w-2 h-8 bg-hot-pink mr-3"></span>
                                    {t('projectDetail.overview')}
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                                    <div className="bg-gray-900/70 border border-gray-800 rounded-lg p-6">
                                        <h3 className="text-sm text-gray-400 font-mono uppercase mb-2">
                                            {t('projectDetail.client')}
                                        </h3>
                                        <p className="text-lg">{project.client}</p>
                                    </div>
                                    <div className="bg-gray-900/70 border border-gray-800 rounded-lg p-6">
                                        <h3 className="text-sm text-gray-400 font-mono uppercase mb-2">
                                            {t('projectDetail.role')}
                                        </h3>
                                        <p className="text-lg">{project.role}</p>
                                    </div>
                                    <div className="bg-gray-900/70 border border-gray-800 rounded-lg p-6">
                                        <h3 className="text-sm text-gray-400 font-mono uppercase mb-2">
                                            {t('projectDetail.timeline')}
                                        </h3>
                                        <p className="text-lg">{project.timeline}</p>
                                    </div>
                                    <div className="bg-gray-900/70 border border-gray-800 rounded-lg p-6">
                                        <h3 className="text-sm text-gray-400 font-mono uppercase mb-2">
                                            {t('projectDetail.status')}
                                        </h3>
                                        <div className="flex items-center">
                      <span
                          className={`inline-block w-2 h-2 rounded-full ${project.status === 'COMPLETED' || project.status === '완료' ? 'bg-hot-pink' : 'bg-electric-blue'} mr-2`}
                      ></span>
                                            <p className="text-lg">{project.status}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    {/* Technology Stack */}
                    <section className="py-12">
                        <div className="container mx-auto px-4">
                            <div className="max-w-5xl mx-auto">
                                <h2 className="text-2xl font-bold mb-8 flex items-center">
                                    <span className="w-2 h-8 bg-electric-blue mr-3"></span>
                                    {t('projectDetail.techStack')}
                                </h2>
                                <div className="space-y-8">
                                    <div>
                                        <h3 className="text-sm text-gray-400 font-mono uppercase mb-4">
                                            {t('projectDetail.frontend')}
                                        </h3>
                                        <div className="flex flex-wrap gap-4">
                                            {project.technologies
                                                .filter((tech) => tech.type === 'frontend')
                                                .map((tech, index) => (
                                                    <div
                                                        key={index}
                                                        className="flex flex-col items-center"
                                                    >
                                                        <div
                                                            className="w-16 h-16 bg-gray-900/70 border border-gray-800 rounded-lg flex items-center justify-center p-3 group hover:border-electric-blue transition-colors">
                                                            <img
                                                                src={tech.icon}
                                                                alt={tech.name}
                                                                className="w-full h-full object-contain group-hover:animate-pulse"
                                                            />
                                                        </div>
                                                        <span className="mt-2 text-xs font-mono">
                              {tech.name}
                            </span>
                                                    </div>
                                                ))}
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="text-sm text-gray-400 font-mono uppercase mb-4">
                                            {t('projectDetail.backend')}
                                        </h3>
                                        <div className="flex flex-wrap gap-4">
                                            {project.technologies
                                                .filter((tech) => tech.type === 'backend')
                                                .map((tech, index) => (
                                                    <div
                                                        key={index}
                                                        className="flex flex-col items-center"
                                                    >
                                                        <div
                                                            className="w-16 h-16 bg-gray-900/70 border border-gray-800 rounded-lg flex items-center justify-center p-3 group hover:border-hot-pink transition-colors">
                                                            <img
                                                                src={tech.icon}
                                                                alt={tech.name}
                                                                className="w-full h-full object-contain group-hover:animate-pulse"
                                                            />
                                                        </div>
                                                        <span className="mt-2 text-xs font-mono">
                              {tech.name}
                            </span>
                                                    </div>
                                                ))}
                                        </div>
                                    </div>
                                    {project.technologies.filter(
                                        (tech) => tech.type === 'database',
                                    ).length > 0 && (
                                        <div>
                                            <h3 className="text-sm text-gray-400 font-mono uppercase mb-4">
                                                {t('projectDetail.database')}
                                            </h3>
                                            <div className="flex flex-wrap gap-4">
                                                {project.technologies
                                                    .filter((tech) => tech.type === 'database')
                                                    .map((tech, index) => (
                                                        <div
                                                            key={index}
                                                            className="flex flex-col items-center"
                                                        >
                                                            <div
                                                                className="w-16 h-16 bg-gray-900/70 border border-gray-800 rounded-lg flex items-center justify-center p-3 group hover:border-electric-blue transition-colors">
                                                                <img
                                                                    src={tech.icon}
                                                                    alt={tech.name}
                                                                    className="w-full h-full object-contain group-hover:animate-pulse"
                                                                />
                                                            </div>
                                                            <span className="mt-2 text-xs font-mono">
                                {tech.name}
                              </span>
                                                        </div>
                                                    ))}
                                            </div>
                                        </div>
                                    )}
                                    {project.technologies.filter((tech) => tech.type === 'design')
                                        .length > 0 && (
                                        <div>
                                            <h3 className="text-sm text-gray-400 font-mono uppercase mb-4">
                                                {t('projectDetail.design')}
                                            </h3>
                                            <div className="flex flex-wrap gap-4">
                                                {project.technologies
                                                    .filter((tech) => tech.type === 'design')
                                                    .map((tech, index) => (
                                                        <div
                                                            key={index}
                                                            className="flex flex-col items-center"
                                                        >
                                                            <div
                                                                className="w-16 h-16 bg-gray-900/70 border border-gray-800 rounded-lg flex items-center justify-center p-3 group hover:border-hot-pink transition-colors">
                                                                <img
                                                                    src={tech.icon}
                                                                    alt={tech.name}
                                                                    className="w-full h-full object-contain group-hover:animate-pulse"
                                                                />
                                                            </div>
                                                            <span className="mt-2 text-xs font-mono">
                                {tech.name}
                              </span>
                                                        </div>
                                                    ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </section>
                    {/* Project Description */}
                    <section className="py-12 bg-gray-900/30">
                        <div className="container mx-auto px-4">
                            <div className="max-w-5xl mx-auto">
                                <h2 className="text-2xl font-bold mb-8 flex items-center">
                                    <span className="w-2 h-8 bg-hot-pink mr-3"></span>
                                    {t('projectDetail.description')}
                                </h2>
                                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                                    <div className="lg:col-span-2">
                                        <div className="sticky top-24">
                                            <div className="space-y-8">
                                                <div>
                                                    <h3 className="text-xl font-bold mb-4 text-electric-blue">
                                                        {t('projectDetail.challenge')}
                                                    </h3>
                                                    <p className="text-gray-300">{project.challenge}</p>
                                                </div>
                                                <div>
                                                    <h3 className="text-xl font-bold mb-4 text-hot-pink">
                                                        {t('projectDetail.solution')}
                                                    </h3>
                                                    <p className="text-gray-300">{project.solution}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="lg:col-span-3">
                                        <h3 className="text-xl font-bold mb-4">
                                            {t('projectDetail.keyFeatures')}
                                        </h3>
                                        <ul className="space-y-4">
                                            {project.keyFeatures.map((feature, index) => (
                                                <li key={index} className="flex">
                                                    <div
                                                        className="flex-shrink-0 w-6 h-6 rounded-full border border-hot-pink flex items-center justify-center mr-3">
                            <span className="text-hot-pink text-xs">
                              {index + 1}
                            </span>
                                                    </div>
                                                    <span className="text-gray-300">{feature}</span>
                                                </li>
                                            ))}
                                        </ul>
                                        <div className="mt-12">
                                            <h3 className="text-xl font-bold mb-4">
                                                {t('projectDetail.results')}
                                            </h3>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                {project.results.map((result, index) => (
                                                    <div
                                                        key={index}
                                                        className="bg-gray-900/70 border border-gray-800 rounded-lg p-4"
                                                    >
                                                        <div className="flex items-center">
                                                            <div
                                                                className="w-10 h-10 rounded-full bg-hot-pink/20 flex items-center justify-center mr-3">
                                <span className="text-hot-pink text-lg font-bold">
                                  {index + 1}
                                </span>
                                                            </div>
                                                            <p className="text-gray-300">{result}</p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    {/* Image Gallery */}
                    <section className="py-12">
                        <div className="container mx-auto px-4">
                            <div className="max-w-5xl mx-auto">
                                <h2 className="text-2xl font-bold mb-8 flex items-center">
                                    <span className="w-2 h-8 bg-electric-blue mr-3"></span>
                                    {t('projectDetail.gallery')}
                                </h2>
                                <div className="relative">
                                    {/* Main image */}
                                    <div
                                        className={`aspect-[16/9] overflow-hidden border border-gray-800 rounded-lg ${isGlitching ? 'animate-glitch' : ''}`}
                                    >
                                        <img
                                            src={project.gallery[activeImage]}
                                            alt={`${project.title} gallery image ${activeImage + 1}`}
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
                                        {activeImage + 1} / {project.gallery.length}
                                    </div>
                                </div>
                                {/* Thumbnails */}
                                <div className="mt-4 flex space-x-2 overflow-x-auto pb-2">
                                    {project.gallery.map((image, index) => (
                                        <button
                                            key={index}
                                            onClick={() => setActiveImage(index)}
                                            className={`flex-shrink-0 w-20 h-20 rounded-md overflow-hidden border-2 ${activeImage === index ? 'border-hot-pink' : 'border-gray-800'}`}
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
                    </section>
                    {/* Navigation */}
                    <section className="py-12 bg-gray-900/30">
                        <div className="container mx-auto px-4">
                            <div className="max-w-5xl mx-auto">
                                <div className="flex flex-col md:flex-row justify-between items-center">
                                    {project.prevProject && (
                                        <button
                                            onClick={() => navigateToProject(project.prevProject)}
                                            className="w-full md:w-auto bg-gray-900/70 border border-gray-800 rounded-lg p-6 flex items-center justify-between md:justify-start hover:border-electric-blue transition-colors mb-4 md:mb-0"
                                        >
                                            <ArrowLeftIcon size={20} className="mr-4"/>
                                            <div className="text-left">
                                                <div className="text-sm text-gray-400 font-mono">
                                                    {t('projectDetail.previousProject')}
                                                </div>
                                                <div className="text-lg font-bold">
                                                    {projects.find((p) => p.id === project.prevProject)
                                                        ?.title || ''}
                                                </div>
                                            </div>
                                        </button>
                                    )}
                                    <Link
                                        to="/"
                                        className="hidden md:flex items-center justify-center w-12 h-12 rounded-full border border-gray-800 hover:border-hot-pink transition-colors"
                                    >
                                        <ArrowUpIcon size={20}/>
                                    </Link>
                                    {project.nextProject && (
                                        <button
                                            onClick={() => navigateToProject(project.nextProject)}
                                            className="w-full md:w-auto bg-gray-900/70 border border-gray-800 rounded-lg p-6 flex items-center justify-between md:justify-end hover:border-electric-blue transition-colors"
                                        >
                                            <div className="text-right">
                                                <div className="text-sm text-gray-400 font-mono">
                                                    {t('projectDetail.nextProject')}
                                                </div>
                                                <div className="text-lg font-bold">
                                                    {projects.find((p) => p.id === project.nextProject)
                                                        ?.title || ''}
                                                </div>
                                            </div>
                                            <ArrowRightIcon size={20} className="ml-4"/>
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </section>
                </>
            ) : null}
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
