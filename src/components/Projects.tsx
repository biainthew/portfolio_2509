import { useState } from 'react'
import { GlitchText } from './GlitchText'
import { useLanguage } from '../contexts/LanguageContext'
// interface Project {
//     id: number
//     title: string
//     category: string
//     image: string
//     description: string
// }
export const Projects = () => {
    const [activeProject, setActiveProject] = useState<number | null>(null)
    const [isGlitching, setIsGlitching] = useState(false)
    const { language, t } = useLanguage()
    // Project data with language-specific fields
    const projectsData = {
        en: [
            {
                id: 1,
                title: 'NEURAL INTERFACE',
                category: 'UI DESIGN',
                image:
                    'https://images.unsplash.com/photo-1558481795-7f0a7c906f5e?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
                description:
                    'Experimental neural interface design with advanced biometric feedback systems.',
            },
            {
                id: 2,
                title: 'CYBERDECK',
                category: 'WEB APP',
                image:
                    'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
                description:
                    'Interactive dashboard for monitoring digital systems across multiple networks.',
            },
            {
                id: 3,
                title: 'NEON DISTRICT',
                category: '3D DESIGN',
                image:
                    'https://images.unsplash.com/photo-1569974498991-d3c12a504f95?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
                description:
                    'Urban environment visualization with procedurally generated architecture.',
            },
            {
                id: 4,
                title: 'DATA NEXUS',
                category: 'API DESIGN',
                image:
                    'https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
                description:
                    'Secure data transfer protocol with quantum encryption algorithms.',
            },
        ],
        ko: [
            {
                id: 1,
                title: '신경 인터페이스',
                category: 'UI 디자인',
                image:
                    'https://images.unsplash.com/photo-1558481795-7f0a7c906f5e?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
                description:
                    '고급 생체 인식 피드백 시스템을 갖춘 실험적 신경 인터페이스 디자인.',
            },
            {
                id: 2,
                title: '사이버덱',
                category: '웹 앱',
                image:
                    'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
                description:
                    '여러 네트워크에서 디지털 시스템을 모니터링하는 대화형 대시보드.',
            },
            {
                id: 3,
                title: '네온 디스트릭트',
                category: '3D 디자인',
                image:
                    'https://images.unsplash.com/photo-1569974498991-d3c12a504f95?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
                description: '절차적으로 생성된 건축물이 있는 도시 환경 시각화.',
            },
            {
                id: 4,
                title: '데이터 넥서스',
                category: 'API 디자인',
                image:
                    'https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
                description:
                    '양자 암호화 알고리즘을 사용한 안전한 데이터 전송 프로토콜.',
            },
        ],
    }
    const projects = language === 'en' ? projectsData.en : projectsData.ko
    const handleMouseEnter = (id: number) => {
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
                        text={t('projects.title')}
                        className={`text-4xl font-bold mb-4 ${language === 'ko' ? 'font-point-ko' : 'font-point-en'}`}
                    />
                    <div className="w-24 h-1 mx-auto bg-hot-pink"></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {projects.map((project) => (
                        <div
                            key={project.id}
                            className="group relative overflow-hidden border border-gray-800 rounded-md"
                            onMouseEnter={() => handleMouseEnter(project.id)}
                            onMouseLeave={handleMouseLeave}
                        >
                            <div
                                className={`relative h-64 overflow-hidden ${activeProject === project.id && isGlitching ? 'animate-glitch' : ''}`}
                            >
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div
                                    className={`absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70 ${activeProject === project.id ? 'chromatic-aberration' : ''}`}
                                ></div>
                            </div>
                            <div className="p-6 bg-gray-900 relative z-10">
                                <div className="text-xs text-electric-blue mb-2">
                                    {project.category}
                                </div>
                                <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                                <p className="text-gray-400 text-sm">{project.description}</p>
                                <div className="mt-4 flex justify-between items-center">
                  <span className="text-xs text-hot-pink">
                    {t('projects.project')}.{project.id}
                  </span>
                                    <span className="text-xs text-gray-500 font-mono">
                    {t('projects.viewDetails')} &gt;
                  </span>
                                </div>
                            </div>
                            {activeProject === project.id && (
                                <div className="absolute inset-0 border-2 border-electric-blue pointer-events-none"></div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
            <style jsx global>{`
                .chromatic-aberration {
                    text-shadow:
                            2px 0 0 rgba(255, 0, 255, 0.5),
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
