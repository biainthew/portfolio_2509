import { useEffect, useState } from 'react'
import {ScanlineOverlay} from "./ScanlineOverlay.tsx";
import {Header} from "./Header.tsx";
import {Hero} from "./Hero.tsx";
import {Terminal} from "./Terminal.tsx";
import {Profile} from "./Profile.tsx";
import {Projects} from "./Projects.tsx";
import {Footer} from "./Footer.tsx";
import {ProjectDetailModal} from "./ProjectDetailModal.tsx";

export const Main = () => {
    const [glitching, setGlitching] = useState(false)
    const [modalOpen, setModalOpen] = useState(false)
    const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null)
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

    // Modal handlers
    const openProjectModal = (projectId: string) => {
        setSelectedProjectId(projectId)
        setModalOpen(true)
    }

    const closeProjectModal = () => {
        setModalOpen(false)
    }

    const navigateToProject = (projectId: string) => {
        setSelectedProjectId(projectId)
    }
    return (
        <>
            <div className="relative w-full min-h-screen bg-black text-gray-200 overflow-hidden pt-24">
                <ScanlineOverlay />
                <Header />
                <div className={`relative z-10 ${glitching ? 'animate-glitch' : ''}`}>
                    <main className="container mx-auto px-4">
                        <Hero />
                        <Terminal />
                        <Profile />
                        <Projects onOpenModal={openProjectModal} />
                    </main>
                    <Footer />
                </div>
            </div>
            
            {/* Project Detail Modal - rendered outside main container */}
            <ProjectDetailModal
                isOpen={modalOpen}
                onClose={closeProjectModal}
                projectId={selectedProjectId}
                onNavigateToProject={navigateToProject}
            />
        </>
    )
}