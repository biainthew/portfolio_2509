import { useEffect, useState } from 'react'
import { GlitchText } from './GlitchText'
import { TypeAnimation } from 'react-type-animation'
import { useLanguage } from '../contexts/LanguageContext'
export const Hero = () => {
    const [glitchActive, setGlitchActive] = useState(false)
    const { language, t } = useLanguage()
    useEffect(() => {
        const interval = setInterval(() => {
            setGlitchActive(true)
            setTimeout(() => setGlitchActive(false), 200)
        }, 5000)
        return () => clearInterval(interval)
    }, [])
    return (
        <section
            id="home"
            className={`py-12 md:py-20 relative px-4 ${language === 'ko' ? 'font-ko' : 'font-en'}`}
        >
            <div className="grid-bg absolute inset-0 z-0"></div>
            <div className="relative z-10 max-w-4xl mx-auto text-center">
                <div className={`mb-4 md:mb-6 ${glitchActive ? 'animate-glitch' : ''} ${language === 'ko' ? 'font-point-ko' : 'font-point-en'}`}>
                    <GlitchText
                        key={language}
                        text={t('hero.title')}
                        className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-2 tracking-tighter"
                        intensity="high"
                    />
                </div>
                <div className={`text-electric-blue text-base sm:text-lg md:text-xl lg:text-2xl mb-6 md:mb-8 opacity-80 ${language === 'ko' ? 'font-ko' : 'font-code'}`}>
                    <TypeAnimation
                        key={language}
                        sequence={[
                            t('hero.subtitle1'),
                            2000,
                            t('hero.subtitle2'),
                            2000,
                            t('hero.subtitle3'),
                            2000,
                        ]}
                        wrapper="span"
                        speed={50}
                        repeat={Infinity}
                    />
                </div>
                <div className={`flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 mt-6 md:mt-10 ${language === 'ko' ? 'font-point-ko' : 'font-point-en'}`}>
                    <button
                        className="cyber-button bg-transparent border-2 border-electric-blue text-electric-blue px-6 md:px-8 py-2.5 md:py-3 text-sm md:text-base relative overflow-hidden group w-full sm:w-48 md:w-56"
                        onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                    >
                        <span className="relative z-10">{t('hero.button1')}</span>
                        <span className="absolute inset-0 bg-electric-blue transform scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300"></span>
                        <span className="absolute inset-0 bg-hot-pink opacity-0 group-hover:opacity-30 transition-opacity duration-300 delay-100"></span>
                    </button>
                    <button
                        className="cyber-button bg-transparent border-2 border-hot-pink text-hot-pink px-6 md:px-8 py-2.5 md:py-3 text-sm md:text-base relative overflow-hidden group w-full sm:w-48 md:w-56"
                        onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                    >
                        <span className="relative z-10">{t('hero.button2')}</span>
                        <span className="absolute inset-0 bg-hot-pink transform scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300"></span>
                        <span className="absolute inset-0 bg-electric-blue opacity-0 group-hover:opacity-30 transition-opacity duration-300 delay-100"></span>
                    </button>
                </div>
            </div>
            <style jsx global>{`
                .grid-bg {
                    background-image:
                            linear-gradient(
                                    to right,
                                    rgba(0, 230, 255, 0.07) 1px,
                                    transparent 1px
                            ),
                            linear-gradient(
                                    to bottom,
                                    rgba(0, 230, 255, 0.07) 1px,
                                    transparent 1px
                            );
                    background-size: 40px 40px;
                    transform: perspective(500px) rotateX(30deg);
                    transform-origin: center top;
                    height: 100%;
                    top: 30%;
                    opacity: 0.5;
                }
                .cyber-button:hover span:first-of-type {
                    color: black;
                }
            `}</style>
        </section>
    )
}
