import React, { useEffect, useState } from 'react'
import { useLanguage } from '../contexts/LanguageContext'
export const LanguageToggle: React.FC = () => {
    const { language, setLanguage, t } = useLanguage()
    const [isGlitching, setIsGlitching] = useState(false)
    const toggleLanguage = () => {
        // Trigger glitch effect
        setIsGlitching(true)
        // Switch language after a short delay
        setTimeout(() => {
            setLanguage(language === 'en' ? 'ko' : 'en')
            setIsGlitching(false)
        }, 300)
    }
    // Random glitch effect
    useEffect(() => {
        const interval = setInterval(() => {
            if (Math.random() > 0.9) {
                setIsGlitching(true)
                setTimeout(() => setIsGlitching(false), 200)
            }
        }, 5000)
        return () => clearInterval(interval)
    }, [])
    return (
        <div
            className={`language-toggle ${isGlitching ? 'glitching' : ''}`}
            onClick={toggleLanguage}
        >
            <div className="language-switch relative">
                <div className={`toggle-track ${language === 'ko' ? 'toggled' : ''}`}>
                    <div className="toggle-indicator font-ko">
            <span
                className={`toggle-text ${language === 'en' ? 'active' : ''}`}
            >
              {t('language.en')}
            </span>
                        <span
                            className={`toggle-text ${language === 'ko' ? 'active' : ''}`}
                        >
              {t('language.ko')}
            </span>
                    </div>
                </div>
            </div>
            <style jsx>{`
        .language-toggle {
          position: relative;
          cursor: pointer;
          margin-left: 20px;
          user-select: none;
        }
        .toggle-track {
          background: rgba(20, 20, 30, 0.8);
          border: 1px solid rgba(var(--color-hot-pink), 0.4);
          border-radius: 4px;
          height: 28px;
          width: 56px;
          position: relative;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }
        .toggle-track::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(
            45deg,
            rgba(var(--color-electric-blue), 0.1),
            rgba(var(--color-hot-pink), 0.1)
          );
          opacity: 0.5;
          z-index: 0;
        }
        .toggle-indicator {
          position: relative;
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0 6px;
          z-index: 1;
        }
        .toggle-text {
          font-size: 12px;
          font-weight: bold;
          transition: all 0.3s ease;
          opacity: 0.5;
          letter-spacing: 1px;
        }
        .toggle-text.active {
          opacity: 1;
          color: rgb(var(--color-hot-pink));
          text-shadow: 0 0 8px rgba(var(--color-hot-pink), 0.8);
        }
        .glitching {
          animation: toggle-glitch 0.3s ease;
        }
        @keyframes toggle-glitch {
          0% {
            transform: translate(0);
          }
          20% {
            transform: translate(-2px, 1px);
            filter: hue-rotate(90deg);
          }
          40% {
            transform: translate(2px, -1px);
            filter: hue-rotate(180deg);
          }
          60% {
            transform: translate(-1px, -1px);
            filter: hue-rotate(270deg);
          }
          80% {
            transform: translate(1px, 1px);
            filter: hue-rotate(360deg);
          }
          100% {
            transform: translate(0);
          }
        }
      `}</style>
        </div>
    )
}
