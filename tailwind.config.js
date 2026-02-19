export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ["'Share Tech Mono'", "monospace"],
                mono: ["'Share Tech Mono'", "monospace"],
            },
            colors: {
                "electric-blue": "rgb(var(--color-electric-blue))",
                "hot-pink": "rgb(var(--color-hot-pink))",
            },
            animation: {
                glitch: "glitch 500ms infinite",
                flicker: "flicker 2s infinite",
                "terminal-cursor": "blink 1s step-end infinite",
            },
            keyframes: {
                blink: {
                    "0%, 100%": { opacity: "1" },
                    "50%": { opacity: "0" },
                },
            },
        },
    },
    plugins: [],
};