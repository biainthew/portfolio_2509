import {useState, useEffect} from 'react'
import {GlitchText} from './GlitchText'
import {useLanguage} from '../contexts/LanguageContext'
import {ProjectService} from '../services/projectService'
import type {Project} from '../lib/supabase'

interface ProjectsProps {
    onOpenModal: (projectId: string) => void
}

// 정적 데이터는 더 이상 사용하지 않음 - DB에서만 데이터를 가져옴
// interface StaticProject {
//     id: number
//     title: string
//     category: string
//     image: string
//     description: string
// }

// type ProjectData = Project | StaticProject

// Helper functions to safely access ID properties - 이제 Project 타입만 사용
// const getProjectId = (project: ProjectData): string => {
//     if ('project_id' in project) {
//         return project.project_id
//     }
//     return project.id.toString()
// }

// const getProjectKey = (project: ProjectData): string | number => {
//     if ('project_id' in project) {
//         return project.project_id
//     }
//     return project.id
// }

// 기존 정적 데이터 (주석처리 - DB 사용)
/*
const projectsData = {
        en: [
            {
                id: 1,
                title: 'SCRM',
                category: 'Web App',
                image:
                    'https://images.unsplash.com/photo-1558481795-7f0a7c906f5e?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
                description:
                    'Hyundai Elevator digital contract platform. Handled front-end development, built PDF generation system based on user input data, conducted QA testing, and maintained notification systems including SMS and email.',
            },
            {
                id: 2,
                title: 'SDCS',
                category: 'Responsive Web',
                image:
                    'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
                description:
                    'Hyundai Elevator Direct contract platform. Designed UI/UX, converted Figma files to HTML/CSS, and developed PDF report generation system.',
            },
            {
                id: 3,
                title: 'RUNTI',
                category: 'Web App',
                image:
                    'https://images.unsplash.com/photo-1569974498991-d3c12a504f95?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
                description: 'React-based workflow automation platform. Integrated Gmail API webhooks and built automated file collection features.',
            },
            {
                id: 4,
                title: 'TM App',
                category: 'Mobile Web',
                image:
                    'https://images.unsplash.com/photo-1569974498991-d3c12a504f95?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
                description: 'Vue.js logistics management platform. Created UI design and converted Figma files to HTML/CSS for mobile-responsive interface.',
            },
            {
                id: 5,
                title: 'SMP',
                category: 'Web App',
                image:
                    'https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
                description:
                    'SaaS management platform development. Designed interfaces and converted Figma files to HTML/CSS.',
            },
            {
                id: 6,
                title: 'Smart Logistics Platform',
                category: 'Web App',
                image:
                    'https://images.unsplash.com/photo-1569974498991-d3c12a504f95?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
                description: 'Logistics management system for transportation, orders, and warehouse management. Converted Figma files to HTML/CSS.',
            },
            {
                id: 7,
                title: 'QR Manager',
                category: 'Web App',
                image:
                    'https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
                description:
                    'QR-based inspection management system. Converted Figma files to HTML/CSS.',
            },
            {
                id: 8,
                title: 'Safety Management Productization',
                category: 'Web App',
                image:
                    'https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
                description:
                    'Risk assessment system with customized UI/UX for different user types and data protection features. Converted Figma files to HTML/CSS.',
            },
            {
                id: 9,
                title: 'Supply Chain Management Productization',
                category: 'Web App',
                image:
                    'https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
                description:
                    'Subscription-based supply chain management system for warehouse management. Converted Figma files to HTML/CSS.',
            },
            {
                id: 10,
                title: 'SCRM Mod Quotation',
                category: 'Web App',
                image:
                    'https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
                description:
                    'Hyundai Elevator SCRM quotation standardization project. Converted Figma files to HTML/CSS.',
            },
        ],
        ko: [
            {
                id: 1,
                title: 'SCRM',
                category: '웹 앱',
                image:
                    'https://images.unsplash.com/photo-1558481795-7f0a7c906f5e?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
                description:
                    '현대엘리베이터 전자계약 시스템으로 해당 프로젝트에서 퍼블리싱, 입력 데이터 기반 소견서 PDF 생성 시스템 기획 및 개발, QA, 알림톡/메일 시스템 유지보수 및 확장을 담당했습니다.',
            },
            {
                id: 2,
                title: 'SDCS',
                category: '반응형 웹',
                image:
                    'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
                description:
                    '현대엘리베이터 다이렉트 전자계약 시스템으로 해당 프로젝트에서 디자인, 퍼블리싱, 입력 데이터 기반 소견서 PDF 생성 시스템 기획 및 개발을 담당했습니다.',
            },
            {
                id: 3,
                title: 'RUNTI',
                category: '웹 앱',
                image:
                    'https://images.unsplash.com/photo-1569974498991-d3c12a504f95?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
                description: 'React 기반 워크플로우 자동화 시스템으로 해당 프로젝트에서 Gmail API Webhook 연동, 첨부파일 자동 수집 기능 개발을 담당했습니다.',
            },
            {
                id: 4,
                title: 'TM 앱',
                category: '모바일 웹',
                image:
                    'https://images.unsplash.com/photo-1569974498991-d3c12a504f95?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
                description: 'Vue.js 기반 물류 운송 관리 시스템으로 해당 프로젝트에서 디자인, 퍼블리싱을 담당했습니다.',
            },
            {
                id: 5,
                title: 'SMP',
                category: '웹 앱',
                image:
                    'https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
                description:
                    'SaaS 관리 플랫폼 시스템 개발 프로젝트로 해당 프로젝트에서 디자인 및 퍼블리싱을 담당했습니다.',
            },
            {
                id: 6,
                title: '스마트물류플랫폼',
                category: '웹 앱',
                image:
                    'https://images.unsplash.com/photo-1569974498991-d3c12a504f95?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
                description: '물류 운송, 주문, 창고관리 시스템으로 해당 프로젝트에서 퍼블리싱을 담당했습니다.',
            },
            {
                id: 7,
                title: 'QR 매니저',
                category: '웹 앱',
                image:
                    'https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
                description:
                    'QR 스캔 기반 점검 관리 시스템으로 해당 프로젝트에서 퍼블리싱을 담당했습니다.',
            },
            {
                id: 8,
                title: '안전관리 제품화',
                category: '웹 앱',
                image:
                    'https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
                description:
                    '위험성 평가 시스템의 사용자별 맞춤 UI/UX와 데이터 보호 기능을 구현한 프로젝트로 해당 프로젝트에서 퍼블리싱을 담당했습니다.',
            },
            {
                id: 9,
                title: '공급망관리 제품화',
                category: '웹 앱',
                image:
                    'https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
                description:
                    '물류창고 관리 구독 서비스 기반 공급망 관리 시스템 제품화 프로젝트로 해당 프로젝트에서 퍼블리싱을 담당했습니다.',
            },
            {
                id: 10,
                title: 'SCRM Mod 견적',
                category: '웹 앱',
                image:
                    'https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
                description:
                    '현대엘리베이터 SCRM 시스템의 견적 표준화 프로젝트로 해당 프로젝트에서 퍼블리싱을 담당했습니다.',
            },
        ],
    }
*/

export const Projects = ({ onOpenModal }: ProjectsProps) => {
    const [activeProject, setActiveProject] = useState<string | null>(null)
    const [isGlitching, setIsGlitching] = useState(false)
    const [projects, setProjects] = useState<Project[]>([])
    const [loading, setLoading] = useState(false)
    const {language, t} = useLanguage()
    
    // Fetch projects from Supabase
    useEffect(() => {
        const fetchProjects = async () => {
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
        }
        
        fetchProjects()
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
                                    src={project.image}
                                    alt={project.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div
                                    className={`absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70 ${activeProject === project.project_id ? 'chromatic-aberration' : ''}`}
                                ></div>
                            </div>
                            <div className="p-6 bg-gray-900 relative z-10">
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
