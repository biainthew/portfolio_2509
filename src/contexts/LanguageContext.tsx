import React, {useState, createContext, useContext} from 'react'
import type {ReactNode} from 'react'
import type {Language} from '../types/language'

interface LanguageContextType {
    language: Language
    setLanguage: (language: Language) => void
    t: (key: string) => string
}

const translations = {
    en: {
        // Header
        'nav.home': 'HOME',
        'nav.profile': 'PROFILE',
        'nav.projects': 'PROJECTS',
        'nav.contact': 'CONTACT',
        // Hero
        'hero.title': 'HELLO',
        'hero.subtitle1': 'CREATING HIGH QUALITY WEB SERVICES FROM DESIGN TO DEVELOPMENT',
        'hero.subtitle2': 'ALWAYS FOCUSING ON USER EXPERIENCE',
        'hero.subtitle3': 'DRAWING THE BIG PICTURE OF PROJECTS WITH FULL STACK CAPABILITIES',
        'hero.button1': 'EXPLORE WORK',
        'hero.button2': 'CONTACT',
        // Terminal
        'terminal.init': '> INIT SYSTEM',
        'terminal.loading': '> LOADING PROFILE DATA...',
        'terminal.name': '> NAME: WEB DEVELOPER LEE BIA',
        'terminal.skills':
            '> SKILLS: BACKEND DEVELOPMENT, FRONTEND DEVELOPMENT, UI/UX DESIGN, CREATIVE CODING',
        'terminal.status': '> STATUS: AVAILABLE FOR WORK',
        'terminal.execute': '> EXECUTING PORTFOLIO.EXE...',
        // Profile
        'profile.title': 'SKILL MATRIX',
        'profile.description':
            'Creating engaging digital experiences through interactive design and intuitive user interfaces. Proficient in front-end development, creative design, and back-end development.',
        'profile.category.backend': 'BACKEND',
        'profile.category.frontend': 'FRONTEND',
        'profile.category.design': 'DESIGN',
        'profile.status': 'STATUS',
        'profile.statusValue': 'ONLINE',
        'profile.codeSnippet.line1': 'class WebDeveloper {',
        'profile.codeSnippet.line2': '  constructor() {',
        'profile.codeSnippet.line3': '    this.passion = "creative coding";',
        'profile.codeSnippet.line4': '  }',
        // Projects
        'projects.title': 'PROJECTS',
        'projects.viewDetails': 'VIEW_DETAILS',
        'projects.project': 'PROJECT',
        'projects.tab.backend': 'BACKEND',
        'projects.tab.frontend': 'FRONTEND',
        'projects.tab.personal': 'PERSONAL',
        'projects.backToProjects': 'BACK TO HOME',
        // Project Detail
        'projectDetail.overview': 'PROJECT OVERVIEW',
        'projectDetail.client': 'CLIENT',
        'projectDetail.role': 'ROLE',
        'projectDetail.timeline': 'TIMELINE',
        'projectDetail.status': 'STATUS',
        'projectDetail.techStack': 'TECHNOLOGY STACK',
        'projectDetail.frontend': 'FRONTEND',
        'projectDetail.backend': 'BACKEND',
        'projectDetail.database': 'DATABASE',
        'projectDetail.design': 'DESIGN TOOLS',
        'projectDetail.description': 'PROJECT DESCRIPTION',
        'projectDetail.challenge': 'THE CHALLENGE',
        'projectDetail.solution': 'THE SOLUTION',
        'projectDetail.keyFeatures': 'KEY FEATURES',
        'projectDetail.results': 'RESULTS & IMPACT',
        'projectDetail.gallery': 'PROJECT GALLERY',
        'projectDetail.previousProject': 'PREVIOUS PROJECT',
        'projectDetail.nextProject': 'NEXT PROJECT',
        // Footer
        'footer.connect': 'CONNECT',
        'footer.ready': 'Looking forward to new projects and collaboration opportunities. Feel free to contact me anytime!',
        'footer.contact': 'CONTACT :',
        'footer.email': 'lba0507@gmail.com',
        'footer.copyright': '&copy;2025',
        'footer.rights': 'ALL_RIGHTS_RESERVED',
        // Language Toggle
        'language.en': 'EN',
        'language.ko': 'KO',
    },
    ko: {
        // Header
        'nav.home': '홈',
        'nav.profile': '프로필',
        'nav.projects': '프로젝트',
        'nav.contact': '연락처',
        // Hero
        'hero.title': '안녕하세요',
        'hero.subtitle1': '디자인부터 개발까지 완성도 높은 웹 서비스를 만듭니다.',
        'hero.subtitle2': '사용자 경험을 최우선으로 생각합니다.',
        'hero.subtitle3': '다양한 경험을 기반으로 프로젝트의 전체적인 그림을 그립니다.',
        'hero.button1': '작업 살펴보기',
        'hero.button2': '연락하기',
        // Terminal
        'terminal.init': '> 시스템 초기화',
        'terminal.loading': '> 프로필 데이터 로딩 중...',
        'terminal.name': '> 이름: 웹 개발자 이비아',
        'terminal.skills': '> 기술: 백엔드 개발, 프론트엔드 개발, UI/UX 디자인, 창의적 코딩',
        'terminal.status': '> 상태: 작업 가능',
        'terminal.execute': '> PORTFOLIO.EXE 실행 중...',
        // Profile
        'profile.title': '스킬',
        'profile.description':
            '사용자와 상호작용하는 인터페이스와 직관적인 디자인으로 긍정적인 사용자 경험을 만드는 것이 목표입니다. 백엔드 개발, 프론트엔드 개발 그리고 창의적 디자인에 모두 능숙합니다.',
        'profile.category.backend': '백엔드',
        'profile.category.frontend': '프론트엔드',
        'profile.category.design': '디자인',
        'profile.status': '상태',
        'profile.statusValue': '온라인',
        'profile.codeSnippet.line1': 'class WebDeveloper {',
        'profile.codeSnippet.line2': '  constructor() {',
        'profile.codeSnippet.line3': '    this.passion = "creative coding";',
        'profile.codeSnippet.line4': '  }',
        // Projects
        'projects.title': '프로젝트',
        'projects.viewDetails': '상세 보기',
        'projects.project': '프로젝트',
        'projects.tab.backend': '백엔드',
        'projects.tab.frontend': '프론트엔드',
        'projects.tab.personal': '개인 프로젝트',
        'projects.backToProjects': '돌아가기',
        // Project Detail
        'projectDetail.overview': '프로젝트 개요',
        'projectDetail.client': '클라이언트',
        'projectDetail.role': '역할',
        'projectDetail.timeline': '기간',
        'projectDetail.status': '상태',
        'projectDetail.techStack': '기술 스택',
        'projectDetail.frontend': '프론트엔드',
        'projectDetail.backend': '백엔드',
        'projectDetail.database': '데이터베이스',
        'projectDetail.design': '디자인 도구',
        'projectDetail.description': '프로젝트 설명',
        'projectDetail.challenge': '과제',
        'projectDetail.solution': '해결책',
        'projectDetail.keyFeatures': '주요 기능',
        'projectDetail.results': '결과 및 영향',
        'projectDetail.gallery': '프로젝트 갤러리',
        'projectDetail.previousProject': '이전 프로젝트',
        'projectDetail.nextProject': '다음 프로젝트',
        // Footer
        'footer.connect': '연락하기',
        'footer.ready': '새로운 프로젝트와 협업 기회를 기다리고 있습니다. 언제든지 연락해 주세요!',
        'footer.contact': '연락처:',
        'footer.email': 'lba0507@gmail.com',
        'footer.copyright': '&copy;2025',
        'footer.rights': 'ALL_RIGHTS_RESERVED',
        // Language Toggle
        'language.en': 'EN',
        'language.ko': 'KO',
    },
}
const LanguageContext = createContext<LanguageContextType | undefined>(
    undefined,
)
export const LanguageProvider: React.FC<{
    children: ReactNode
}> = ({children}) => {
    const [language, setLanguage] = useState<Language>('ko')
    const t = (key: string): string => {
        return (translations[language] as Record<string, string>)[key] || key
    }
    return (
        <LanguageContext.Provider
            value={{
                language,
                setLanguage,
                t,
            }}
        >
            {children}
        </LanguageContext.Provider>
    )
}
export const useLanguage = (): LanguageContextType => {
    const context = useContext(LanguageContext)
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider')
    }
    return context
}
