import { useState } from 'react'
import { GlitchText } from './GlitchText'
import { LanguageToggle } from './LanguageToggle'
import { useLanguage } from '../contexts/LanguageContext'
export const Header = () => {
    const [hoverIndex, setHoverIndex] = useState<number | null>(null)
    const { language, t } = useLanguage()
    const navItems = [
        {
            label: t('nav.home'),
            href: '#home',
        },
        {
            label: t('nav.profile'),
            href: '#profile',
        },
        {
            label: t('nav.projects'),
            href: '#projects',
        },
        {
            label: t('nav.contact'),
            href: '#contact',
        },
    ]
    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 py-6 px-4 border-b border-electric-blue/30 backdrop-blur-sm bg-black/80 ${language === 'ko' ? 'font-ko' : 'font-en'}`}
        >
            <div className="container mx-auto flex justify-between items-center">
                <div className="flex items-center">
                    <div className="w-10 h-10 rounded-sm bg-hot-pink mr-3 relative overflow-hidden">
                        <div className="absolute inset-0 flex items-center justify-center text-black font-mono text-xs">
                            &lt; / &gt;
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-br from-electric-blue to-hot-pink opacity-50"></div>
                    </div>
                    <GlitchText
                        key={language}
                        text="LEE.BIA"
                        className="text-2xl font-bold tracking-wider"
                    />
                </div>
                <div className="flex items-center">
                    <nav>
                        <ul className="flex space-x-6">
                            {navItems.map((item, index) => (
                                <li key={index}>
                                    <a
                                        href={item.href}
                                        className={`text-sm relative ${hoverIndex === index ? 'text-hot-pink' : 'text-gray-400 hover:text-electric-blue'} transition-colors duration-300`}
                                        onMouseEnter={() => setHoverIndex(index)}
                                        onMouseLeave={() => setHoverIndex(null)}
                                    >
                                        {item.label}
                                        {hoverIndex === index && (
                                            <span className="absolute -inset-1 bg-hot-pink/10 blur-sm rounded-sm"></span>
                                        )}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </nav>
                    <LanguageToggle />
                </div>
            </div>
        </header>
    )
}
