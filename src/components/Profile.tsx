import { useEffect, useState } from 'react'
import { GlitchText } from './GlitchText'
import { useLanguage } from '../contexts/LanguageContext'
interface Skill {
    name: string
    level: number
    category: string
}
export const Profile = () => {
    const { language, t } = useLanguage()
    const [activeCategory, setActiveCategory] = useState<string>('frontend')
    const [glitchSkill, setGlitchSkill] = useState<number | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    useEffect(() => {
        // Simulate data loading with cyberpunk effect
        const timer = setTimeout(() => {
            setIsLoading(false)
        }, 1000)
        // Random glitch effect on skills
        const glitchInterval = setInterval(() => {
            if (Math.random() > 0.7) {
                const randomIndex = Math.floor(Math.random() * skills.length)
                setGlitchSkill(randomIndex)
                setTimeout(() => setGlitchSkill(null), 300)
            }
        }, 3000)
        return () => {
            clearTimeout(timer)
            clearInterval(glitchInterval)
        }
    }, [])
    const skills: Skill[] = [
        // Frontend
        {
            name: 'React',
            level: 80,
            category: 'frontend',
        },
        {
            name: 'Vue',
            level: 80,
            category: 'frontend',
        },
        {
            name: 'JavaScript / Jquery',
            level: 90,
            category: 'frontend',
        },
        {
            name: 'TypeScript',
            level: 80,
            category: 'frontend',
        },
        {
            name: 'HTML',
            level: 100,
            category: 'frontend',
        },
        {
            name: 'JPA',
            level: 90,
            category: 'frontend',
        },
        {
            name: 'CSS / SCSS',
            level: 100,
            category: 'frontend',
        },
        // Design
        {
            name: 'Figma',
            level: 100,
            category: 'design',
        },
        {
            name: 'Responsive Design',
            level: 90,
            category: 'design',
        },
        {
            name: 'Web/App Design',
            level: 90,
            category: 'design',
        },
        {
            name: 'Publishing',
            level: 100,
            category: 'design',
        },
        // Backend
        {
            name: 'Java & Spring Boot',
            level: 90,
            category: 'backend',
        },
        {
            name: 'Oracle / MySQL / MariaDB',
            level: 90,
            category: 'backend',
        },
        {
            name: 'JPA / TypeORM',
            level: 80,
            category: 'backend',
        },
        {
            name: 'Node.js',
            level: 70,
            category: 'backend',
        },
        {
            name: 'Docker / Jenkins',
            level: 70,
            category: 'backend',
        },
    ]
    const categories = [
        {
            id: 'backend',
            name: t('profile.category.backend'),
        },
        {
            id: 'frontend',
            name: t('profile.category.frontend'),
        },
        {
            id: 'design',
            name: t('profile.category.design'),
        },
    ]
    const filteredSkills = skills.filter(
        (skill) => skill.category === activeCategory,
    )
    return (
        <section
            id="profile"
            className={`py-20 relative ${language === 'ko' ? 'font-ko' : 'font-en'}`}
        >
            {/* Background grid effect */}
            <div className="absolute inset-0 z-0">
                <div className="h-full w-full bg-[radial-gradient(rgba(var(--color-electric-blue),0.1)_1px,transparent_1px)] bg-[size:20px_20px]"></div>
            </div>
            <div className="container mx-auto px-4 relative z-10">
                <div className="mb-12 text-center">
                    <GlitchText
                        key={language}
                        text={t('profile.title')}
                        className={`text-4xl font-bold mb-4 ${language === 'ko' ? 'font-point-ko' : 'font-point-en'}`}
                        intensity="medium"
                    />
                    <div className={`w-24 h-1 mx-auto bg-hot-pink ${language === 'ko' ? 'w-14' : 'w-64'}`}></div>
                    <p className="mt-6 max-w-2xl mx-auto text-gray-400">
                        {t('profile.description')}
                    </p>
                </div>
                {/* Profile card */}
                <div className="mx-auto bg-gray-900/70 border border-gray-800 backdrop-blur-sm rounded-lg overflow-hidden">
                    <div className="p-6 md:p-8">
                        {/* Stats display */}
                        <div className="flex flex-col md:flex-row gap-8">
                            {/* Left column - Bio */}
                            <div className="md:w-1/3">
                                <div className="relative mb-6 overflow-hidden rounded-md">
                                    <div className="aspect-square bg-gradient-to-br from-electric-blue/20 to-hot-pink/20 flex items-center justify-center">
                                        <div className="text-6xl font-bold text-center opacity-30">
                                            {'{'}
                                            <span className="text-hot-pink">DEV</span>
                                            {'}'}
                                        </div>
                                        {/* Scanline effect */}
                                        <div className="absolute inset-0 bg-scanline pointer-events-none"></div>
                                    </div>
                                </div>
                                <div className="terminal-output font-mono text-xs text-electric-blue mb-4 p-3 bg-black/50 border border-gray-800 rounded">
                                    <div>{`> ${t('profile.codeSnippet.line1')}`}</div>
                                    <div>{`> ${t('profile.codeSnippet.line2')}`}</div>
                                    <div>{`> ${t('profile.codeSnippet.line3')}`}</div>
                                    <div className="text-hot-pink">{`> ${t('profile.codeSnippet.line4')}`}</div>
                                </div>
                                <div className="flex flex-wrap gap-2 mt-4">
                                    {['HTML5', 'CSS3', 'JavaScript', 'React', 'Node.js'].map(
                                        (tag, index) => (
                                            <span
                                                key={index}
                                                className="px-2 py-1 bg-gray-800 border border-gray-700 text-xs font-mono text-gray-400 rounded"
                                            >
                        {tag}
                      </span>
                                        ),
                                    )}
                                </div>
                            </div>
                            {/* Right column - Skills */}
                            <div className="md:w-2/3">
                                {/* Category tabs */}
                                <div className="flex mb-6 border-b border-gray-800">
                                    {categories.map((category) => (
                                        <button
                                            key={category.id}
                                            className={`px-4 py-2 font-mono text-sm transition-colors duration-300 relative ${activeCategory === category.id ? 'text-hot-pink border-b-2 border-hot-pink' : 'text-gray-400 hover:text-electric-blue'}`}
                                            onClick={() => setActiveCategory(category.id)}
                                        >
                                            {category.name}
                                            {activeCategory === category.id && (
                                                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-hot-pink to-electric-blue"></span>
                                            )}
                                        </button>
                                    ))}
                                </div>
                                {/* Skills with progress bars */}
                                <div
                                    className={`transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
                                >
                                    {filteredSkills.map((skill, index) => (
                                        <div
                                            key={index}
                                            className={`mb-4 ${glitchSkill === index ? 'animate-glitch' : ''}`}
                                        >
                                            <div className="flex justify-between items-center mb-1">
                                                <span className="font-mono text-sm">{skill.name}</span>
                                                <span className="font-mono text-xs text-gray-500">
                          {skill.level}%
                        </span>
                                            </div>
                                            <div className="h-2 bg-gray-800 rounded-sm overflow-hidden relative">
                                                <div
                                                    className="absolute top-0 left-0 h-full bg-gradient-to-r from-electric-blue to-hot-pink"
                                                    style={{
                                                        width: `${skill.level}%`,
                                                    }}
                                                ></div>
                                                {/* Glitch effect on hover */}
                                                <div className="absolute top-0 left-0 h-full w-full opacity-0 hover:opacity-30 bg-white mix-blend-overlay transition-opacity"></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                {/* Loading state */}
                                {isLoading && (
                                    <div className="flex flex-col gap-4">
                                        {[1, 2, 3, 4, 5].map((_, index) => (
                                            <div key={index} className="animate-pulse">
                                                <div className="flex justify-between items-center mb-1">
                                                    <div className="h-4 bg-gray-800 rounded w-24"></div>
                                                    <div className="h-3 bg-gray-800 rounded w-8"></div>
                                                </div>
                                                <div className="h-2 bg-gray-800 rounded-sm w-full"></div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    {/* Bottom stats bar */}
                    <div className="px-6 py-4 bg-black/30 border-t border-gray-800 flex flex-wrap justify-between items-center gap-4">
                        <div className="flex items-center">
                            <div className="w-2 h-2 bg-hot-pink rounded-full mr-2 animate-pulse"></div>
                            <span className="font-mono text-xs text-gray-400">
                {t('profile.status')}:
                <span className="text-electric-blue ml-1">
                  {t('profile.statusValue')}
                </span>
              </span>
                        </div>
                        <div className="font-mono text-xs text-gray-500">
                            ID: CYB-DEV-
                            {Math.floor(Math.random() * 10000)
                                .toString()
                                .padStart(4, '0')}
                        </div>
                    </div>
                </div>
            </div>
            <style jsx>{`
        .bg-scanline {
          background: repeating-linear-gradient(
            to bottom,
            transparent,
            transparent 2px,
            rgba(0, 0, 0, 0.3) 2px,
            rgba(0, 0, 0, 0.3) 4px
          );
        }
      `}</style>
        </section>
    )
}
