import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { GlitchText } from './GlitchText'
import { LanguageToggle } from './LanguageToggle'
import { useLanguage } from '../contexts/LanguageContext'
export const Header = () => {
    const [hoverIndex, setHoverIndex] = useState<number | null>(null)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
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

    const handleMobileNavClick = () => {
        setIsMobileMenuOpen(false)
    }

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 h-20 py-6 px-4 border-b border-electric-blue/30 backdrop-blur-sm bg-black/80 ${language === 'ko' ? 'font-ko' : 'font-en'}`}
            style={{
                height: '80px',
                contain: 'layout style',
                willChange: 'auto'
            }}
        >
            <div className="container mx-auto flex justify-between items-center">
                <div className="flex items-center">
                    <div className="w-8 h-8 md:w-10 md:h-10 rounded-sm bg-gradient-to-br from-electric-blue to-hot-pink mr-2 md:mr-3 relative overflow-hidden flex items-center justify-center">
                        <span className="text-white font-mono text-sm md:text-base font-bold animate-terminal-cursor">_</span>
                    </div>
                    <GlitchText
                        key={language}
                        text="AibOS"
                        className="text-xl md:text-2xl font-bold tracking-wider"
                    />
                </div>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center">
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

                {/* Mobile Menu Button & Language Toggle */}
                <div className="flex md:hidden items-center gap-2">
                    <LanguageToggle />
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="p-2 text-gray-400 hover:text-electric-blue transition-colors"
                        aria-label="Toggle menu"
                    >
                        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Navigation Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden absolute top-20 left-0 right-0 bg-black/95 border-b border-electric-blue/30 backdrop-blur-sm">
                    <nav className="container mx-auto px-4 py-4">
                        <ul className="flex flex-col space-y-4">
                            {navItems.map((item, index) => (
                                <li key={index}>
                                    <a
                                        href={item.href}
                                        onClick={handleMobileNavClick}
                                        className="block py-2 text-gray-400 hover:text-electric-blue transition-colors duration-300 border-b border-gray-800"
                                    >
                                        {item.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>
            )}
        </header>
    )
}
