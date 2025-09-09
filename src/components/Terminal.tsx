import { useEffect, useState } from 'react'
import { useLanguage } from '../contexts/LanguageContext'
export const Terminal = () => {
    const [text, setText] = useState('')
    const [cursorVisible, setCursorVisible] = useState(true)
    const { language, t } = useLanguage()
    const terminalText = `
${t('terminal.init')}
${t('terminal.loading')}
${t('terminal.name')}
${t('terminal.skills')}
${t('terminal.status')}
${t('terminal.execute')}
  `
    useEffect(() => {
        // Reset text when language changes
        setText('')
        let index = 0
        const timer = setInterval(() => {
            setText(terminalText.substring(0, index))
            index++
            if (index > terminalText.length) {
                clearInterval(timer)
            }
        }, 30)
        const cursorTimer = setInterval(() => {
            setCursorVisible((prev) => !prev)
        }, 500)
        return () => {
            clearInterval(timer)
            clearInterval(cursorTimer)
        }
    }, [terminalText])
    return (
        <section
            id="terminal"
            className={`py-16 ${language === 'ko' ? 'font-ko' : 'font-en'}`}
        >
            <div className="max-w-3xl mx-auto">
                <div className="bg-gray-900 rounded-md overflow-hidden">
                    <div className="bg-gray-800 px-4 py-2 flex items-center">
                        <div className="flex space-x-2">
                            <div className="w-3 h-3 rounded-full bg-red-500"></div>
                            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                            <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        </div>
                        <div className="text-xs text-gray-400 ml-4 font-mono">
                            terminal@cyberfolio:~
                        </div>
                    </div>
                    <div className="p-4 font-mono text-sm text-electric-blue leading-relaxed">
                        {text}
                        <span className={`inline-block w-2 h-4 bg-hot-pink ml-1 ${cursorVisible ? 'opacity-100' : 'opacity-0'}`}></span>
                    </div>
                </div>
            </div>
        </section>
    )
}
