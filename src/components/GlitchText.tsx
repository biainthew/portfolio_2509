import React, { useEffect, useState } from 'react'
interface GlitchTextProps {
    text: string
    className?: string
    intensity?: 'low' | 'medium' | 'high'
}
export const GlitchText: React.FC<GlitchTextProps> = ({
                                                          text,
                                                          className = '',
                                                          intensity = 'medium',
                                                      }) => {
    const [isGlitching, setIsGlitching] = useState(false)
    const [displayText, setDisplayText] = useState(text)
    const glitchCharacters = '!<>-_\\/[]{}—=+*^?#________'
    useEffect(() => {
        const glitchProbability =
            intensity === 'low' ? 0.01 : intensity === 'medium' ? 0.03 : 0.05
        const intervalId = setInterval(() => {
            if (Math.random() < glitchProbability) {
                setIsGlitching(true)
                let iterations = 0
                const maxIterations =
                    intensity === 'low' ? 2 : intensity === 'medium' ? 3 : 5
                const glitchIntervalId = setInterval(() => {
                    setDisplayText(
                        text
                            .split('')
                            .map((char) => {
                                if (Math.random() < 0.3) {
                                    return glitchCharacters[
                                        Math.floor(Math.random() * glitchCharacters.length)
                                        ]
                                }
                                return char
                            })
                            .join(''),
                    )
                    iterations++
                    if (iterations >= maxIterations) {
                        clearInterval(glitchIntervalId)
                        setDisplayText(text)
                        setIsGlitching(false)
                    }
                }, 100)
            }
        }, 2000)
        return () => clearInterval(intervalId)
    }, [text, intensity])
    return (
        <span
            className={`font-mono inline-block ${isGlitching ? 'text-hot-pink' : ''} ${className}`}
            style={{
                textShadow: isGlitching
                    ? '0.05em 0 0 rgba(255,0,255,0.75), -0.025em -0.05em 0 rgba(0,255,255,0.75), 0.025em 0.05em 0 rgba(0,255,0,0.75)'
                    : 'none',
                animation: isGlitching ? 'glitch 500ms infinite' : 'none',
            }}
        >
      {displayText}
    </span>
    )
}
