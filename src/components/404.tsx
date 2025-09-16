import {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import {GlitchText} from './GlitchText'
import {useLanguage} from '../contexts/LanguageContext'
import {ArrowLeftIcon, AlertTriangleIcon, TerminalIcon} from 'lucide-react'

export const NotFound = () => {
    const {language} = useLanguage()
    const [glitching, setGlitching] = useState(false)
    const [showTerminal, setShowTerminal] = useState(false)
    const [terminalText, setTerminalText] = useState<string[]>([])
    useEffect(() => {
        // Reset states to prevent duplication in StrictMode
        setTerminalText([])
        setShowTerminal(false)

        // Random glitch effect
        const glitchInterval = setInterval(() => {
            if (Math.random() > 0.7) {
                setGlitching(true)
                setTimeout(() => setGlitching(false), 300)
            }
        }, 3000)

        // Simulate terminal typing effect
        const terminalTimeout = setTimeout(() => {
            setShowTerminal(true)
            const lines = [
                '> SYSTEM ERROR: PAGE_NOT_FOUND',
                '> RUNNING DIAGNOSTICS...',
                '> ERROR CODE: 404',
                '> LOCATION: UNDEFINED',
                '> ATTEMPTING TO RECOVER...',
                '> RECOVERY FAILED',
                '> SUGGEST MANUAL NAVIGATION TO HOME',
            ]
            let currentLine = 0
            const terminalInterval = setInterval(() => {
                if (currentLine < lines.length) {
                    setTerminalText((prev) => [...prev, lines[currentLine]])
                    currentLine++
                } else {
                    clearInterval(terminalInterval)
                }
            }, 500)
        }, 1000)

        return () => {
            clearInterval(glitchInterval)
            clearTimeout(terminalTimeout)
        }
    }, [])
    return (
        <div
            className={`w-full min-h-screen bg-black text-gray-200 ${language === 'ko' ? 'font-ko' : 'font-en'}`}
        >
            {/* Background grid */}
            <div className="absolute inset-0 z-0 grid-bg opacity-30"></div>
            {/* Scanline effect */}
            <div className="absolute inset-0 z-10 pointer-events-none scanline-effect"></div>
            {/* Content */}
            <div className="relative z-20 container mx-auto px-4 flex justify-center min-h-screen items-center wrapper">
                <div className={`text-center mb-8 w-2/5 ${glitching ? 'animate-glitch' : ''}`}>
                    <div className="flex items-center justify-center mb-6">
                        <div className="relative">
                            <div className="absolute -inset-1 bg-hot-pink/30 blur-md rounded-full"></div>
                            <div className="relative">
                                <AlertTriangleIcon size={64} className="text-hot-pink"/>
                            </div>
                        </div>
                    </div>
                    <GlitchText
                        text="404"
                        className="text-9xl font-bold mb-4 tracking-wider"
                        intensity="high"
                    />
                    <h2 className="text-2xl md:text-4xl font-bold mb-4 text-electric-blue">
                        {language === 'en' ? 'SYSTEM MALFUNCTION' : '시스템 오류'}
                    </h2>
                    <p className="text-lg text-gray-400 max-w-lg mx-auto mb-8">
                        {language === 'en'
                            ? 'Page not found'
                            : '페이지를 찾을 수 없습니다.'}
                    </p>
                    <Link
                        to="/"
                        className="inline-flex items-center cyber-button bg-transparent border-2 border-electric-blue text-electric-blue px-8 py-3 font-mono relative overflow-hidden group"
                    >
                        <ArrowLeftIcon size={18} className="mr-2"/>
                        <span className="relative z-10">
                          {language === 'en'
                              ? 'BACK TO HOME'
                              : '메인페이지로 가기'}
                        </span>
                        <span
                            className="absolute inset-0 bg-electric-blue transform scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300"></span>
                        <span
                            className="absolute inset-0 bg-hot-pink opacity-0 group-hover:opacity-30 transition-opacity duration-300 delay-100"></span>
                    </Link>
                </div>
                {/* Terminal section */}
                {showTerminal && (
                    <div className="w-1/2 max-w-2xl bg-gray-900/70 border border-gray-800 rounded-md overflow-hidden">
                        <div className="flex items-center bg-gray-800/70 px-4 py-2">
                            <TerminalIcon size={16} className="text-hot-pink mr-2"/>
                            <span className="font-mono text-sm text-gray-400">system_log.exe</span>
                        </div>
                        <div className="p-4 font-mono text-sm">
                            {terminalText.map((line, index) => (
                                <div
                                    key={index}
                                    className={`mb-2 ${index === terminalText.length - 1 ? 'text-hot-pink' : 'text-electric-blue'}`}
                                    style={{
                                        animation: `fadeIn 300ms ${index * 100}ms forwards`,
                                    }}
                                >
                                    {line}
                                    {index === terminalText.length - 1 && (
                                        <span className="inline-block w-2 h-4 bg-hot-pink ml-1 animate-pulse"></span>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
            <style jsx>{`
                .wrapper {
                    height: calc(100% - 6rem);
                }

                .scanline-effect {
                    background: linear-gradient(
                            to bottom,
                            transparent 50%,
                            rgba(0, 0, 0, 0.3) 50%
                    );
                    background-size: 100% 4px;
                    animation: scanlines 1s steps(60) infinite;
                }

                .grid-bg {
                    background-image: linear-gradient(
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
                }

                .cyber-button:hover span:first-of-type {
                    color: black;
                }

                @keyframes scanlines {
                    from {
                        background-position: 0 0;
                    }
                    to {
                        background-position: 0 100%;
                    }
                }

                @keyframes fadeIn {
                    from {
                        opacity: 0;
                    }
                    to {
                        opacity: 1;
                    }
                }
            `}</style>
        </div>
    )
}
