import { useState } from 'react'
import { GlitchText } from './GlitchText'
import { useLanguage } from '../contexts/LanguageContext'
export const Footer = () => {
    const [hoverIndex, setHoverIndex] = useState<number | null>(null)
    const { language, t } = useLanguage()
    const socialLinks = [
        {
            label: 'GITHUB',
            url: '#',
        },
        {
            label: 'TWITTER',
            url: '#',
        },
        {
            label: 'LINKEDIN',
            url: '#',
        },
        {
            label: 'DRIBBBLE',
            url: '#',
        },
    ]
    return (
        <footer
            id="contact"
            className={`py-16 border-t border-gray-800 relative overflow-hidden ${language === 'ko' ? 'font-ko' : 'font-en'}`}
        >
            <div className="container mx-auto px-4">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        <div>
                            <GlitchText
                                text={t('footer.connect')}
                                className={`text-3xl font-bold mb-4 ${language === 'ko' ? 'font-point-ko' : 'font-point-en'}`}
                            />
                            <div className="w-16 h-1 bg-hot-pink mb-6"></div>
                            <div className="text-gray-400 mb-6">
                                <p>{t('footer.ready')}</p>
                                <p className="mt-2">
                                    {t('footer.contact')}{' '}
                                    <span className="text-electric-blue">{t('footer.email')}</span>
                                </p>
                            </div>
                            <ul className="flex flex-wrap gap-4">
                                {socialLinks.map((link, index) => (
                                    <li key={index}>
                                        <a
                                            href={link.url}
                                            className={`inline-block px-4 py-2 border ${hoverIndex === index ? 'border-hot-pink text-hot-pink' : 'border-gray-700 text-gray-400'} text-sm transition-colors duration-300 relative`}
                                            onMouseEnter={() => setHoverIndex(index)}
                                            onMouseLeave={() => setHoverIndex(null)}
                                        >
                                            {link.label}
                                            {hoverIndex === index && (
                                                <span className="absolute -inset-px border border-hot-pink animate-pulse pointer-events-none"></span>
                                            )}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="text-center md:text-right">
                            <div className="inline-block p-8 border border-gray-800 bg-gray-900/50 relative">
                                <div className="ascii-art font-mono text-xs leading-none text-electric-blue opacity-70">
                    <pre>{`
     ______     __  __     ______     ______     ______    
    /\\  ___\\   /\\ \\_\\ \\   /\\  == \\   /\\  ___\\   /\\  == \\   
    \\ \\ \\____  \\ \\____ \\  \\ \\  __<   \\ \\  __\\   \\ \\  __<   
     \\ \\_____\\  \\/\\_____\\  \\ \\_\\ \\_\\  \\ \\_____\\  \\ \\_\\ \\_\\ 
      \\/_____/   \\/_____/   \\/_/ /_/   \\/_____/   \\/_/ /_/ 
                    `}</pre>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-16 pt-8 border-t border-gray-800 text-center">
                <p className="text-gray-500 font-mono text-xs">
                    <span className="animate-flicker">■</span> @2025
                    &nbsp;
                    <span className="animate-flicker">■</span> All rights reserved
                </p>
            </div>
            <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-electric-blue/5 to-transparent"></div>
        </footer>
    )
}
