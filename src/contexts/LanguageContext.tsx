import React, { useState, createContext, useContext } from 'react'
import type { ReactNode } from 'react'
import type { Language } from '../types/language'
interface LanguageContextType {
  language: Language
  setLanguage: (language: Language) => void
  t: (key: string) => string
}
const translations = {
  en: {
    // Header
    'nav.home': 'HOME',
    'nav.projects': 'PROJECTS',
    'nav.terminal': 'TERMINAL',
    'nav.contact': 'CONTACT',
    // Hero
    'hero.title': 'FUTURE_INTERFACE',
    'hero.subtitle1': 'DESIGNING DIGITAL REALITIES',
    'hero.subtitle2': 'CODING THE FUTURE',
    'hero.subtitle3': 'HACKING THE VISUAL MATRIX',
    'hero.button1': 'EXPLORE WORK',
    'hero.button2': 'CONTACT',
    // Terminal
    'terminal.init': '> INIT SYSTEM',
    'terminal.loading': '> LOADING PROFILE DATA...',
    'terminal.name': '> NAME: CYBER DEVELOPER',
    'terminal.skills':
      '> SKILLS: FRONTEND DEVELOPMENT, UI/UX DESIGN, CREATIVE CODING',
    'terminal.status': '> STATUS: AVAILABLE FOR WORK',
    'terminal.execute': '> EXECUTING PORTFOLIO.EXE...',
    // Projects
    'projects.title': 'PROJECTS',
    'projects.viewDetails': 'VIEW_DETAILS',
    'projects.project': 'PROJECT',
    // Footer
    'footer.connect': 'CONNECT',
    'footer.ready': 'READY TO COLLABORATE ON THE NEXT DIGITAL FRONTIER?',
    'footer.contact': 'CONTACT:',
    'footer.email': 'CYBER@PORTFOLIO.NET',
    'footer.copyright': 'SYSTEM.COPYRIGHT.2023',
    'footer.rights': 'ALL_RIGHTS_RESERVED',
    // Language Toggle
    'language.en': 'EN',
    'language.ko': 'KO',
  },
  ko: {
    // Header
    'nav.home': '홈',
    'nav.projects': '프로젝트',
    'nav.terminal': '터미널',
    'nav.contact': '연락처',
    // Hero
    'hero.title': '미래_인터페이스',
    'hero.subtitle1': '디지털 현실 디자인',
    'hero.subtitle2': '미래를 코딩하다',
    'hero.subtitle3': '시각적 매트릭스 해킹',
    'hero.button1': '작업 살펴보기',
    'hero.button2': '연락하기',
    // Terminal
    'terminal.init': '> 시스템 초기화',
    'terminal.loading': '> 프로필 데이터 로딩 중...',
    'terminal.name': '> 이름: 사이버 개발자',
    'terminal.skills': '> 기술: 프론트엔드 개발, UI/UX 디자인, 창의적 코딩',
    'terminal.status': '> 상태: 작업 가능',
    'terminal.execute': '> PORTFOLIO.EXE 실행 중...',
    // Projects
    'projects.title': '프로젝트',
    'projects.viewDetails': '상세 보기',
    'projects.project': '프로젝트',
    // Footer
    'footer.connect': '연결하기',
    'footer.ready': '다음 디지털 프론티어에서 협업할 준비가 되셨나요?',
    'footer.contact': '연락처:',
    'footer.email': 'CYBER@PORTFOLIO.NET',
    'footer.copyright': '시스템.저작권.2023',
    'footer.rights': '모든_권리_보유',
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
}> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en')
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
