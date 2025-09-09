import { useEffect, useState } from 'react'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { Projects } from './components/Projects'
import { Terminal } from './components/Terminal'
import { Profile } from './components/Profile'
import { Footer } from './components/Footer'
import { ScanlineOverlay } from './components/ScanlineOverlay'
import { LanguageProvider } from './contexts/LanguageContext'
function App() {
    const [glitching, setGlitching] = useState(false)
    useEffect(() => {
        // Random glitch effect trigger
        const glitchInterval = setInterval(() => {
            if (Math.random() > 0.7) {
                setGlitching(true)
                setTimeout(() => setGlitching(false), 500)
            }
        }, 3000)
        return () => clearInterval(glitchInterval)
    }, [])
    return (
        <LanguageProvider>
            <div className="relative w-full min-h-screen bg-black text-gray-200 overflow-hidden">
                <ScanlineOverlay />
                <div className={`relative z-10 ${glitching ? 'animate-glitch' : ''}`}>
                    <Header />
                    <main className="container mx-auto px-4">
                        <Hero />
                        <Terminal />
                        <Profile />
                        <Projects />
                    </main>
                    <Footer />
                </div>
            </div>
        </LanguageProvider>
    )
}
 export default App