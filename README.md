# Cyber Portfolio

A futuristic, cyberpunk-themed portfolio website built with React, TypeScript, and Tailwind CSS. Features bilingual support (English/Korean), animated UI components, and a terminal-like interface.

## ✨ Features

- **🎨 Cyberpunk Design**: Neon colors, glitch effects, and futuristic UI components
- **🌐 Bilingual Support**: Dynamic language switching between English and Korean
- **⚡ Interactive Terminal**: Animated typing effect with realistic cursor blinking
- **🎯 Glitch Effects**: Random glitch animations for enhanced visual appeal
- **📱 Responsive Design**: Optimized for all device sizes
- **🎭 Styled Components**: Custom animations and visual effects

## 🛠️ Tech Stack

- **Frontend**: React 19+ with TypeScript
- **Styling**: Tailwind CSS v3 with custom animations
- **Build Tool**: Vite
- **Fonts**: Share Tech Mono, Styrene A, Pretendard
- **Routing**: React Router DOM

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd untitled
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🎨 Components

### Core Components
- **Header**: Navigation with language toggle
- **Hero**: Main landing section with glitch text effects
- **Terminal**: Interactive terminal with typing animation
- **Projects**: Project showcase with hover effects
- **Footer**: Contact information and links

### UI Components
- **GlitchText**: Animated text with cyberpunk glitch effect
- **ScanlineOverlay**: Retro CRT scanline effect
- **LanguageToggle**: Bilingual switcher with smooth transitions

## 🌍 Internationalization

The app supports English and Korean languages with:
- Dynamic content switching
- Language-specific fonts
- Smooth transition animations
- Persistent language preference

## 🎭 Animations & Effects

- **Glitch Animation**: Random text and visual glitches
- **Typing Effect**: Terminal-like character-by-character text rendering
- **Chromatic Aberration**: RGB shift effects on hover
- **Neon Glow**: Electric blue and hot pink accent colors
- **Scanline Effect**: Retro CRT monitor overlay

## 📁 Project Structure

```
src/
├── components/          # UI Components
│   ├── Header.tsx
│   ├── Hero.tsx
│   ├── Terminal.tsx
│   ├── Projects.tsx
│   ├── Footer.tsx
│   ├── GlitchText.tsx
│   ├── ScanlineOverlay.tsx
│   └── LanguageToggle.tsx
├── contexts/           # React Contexts
│   └── LanguageContext.tsx
├── types/              # TypeScript Types
│   └── language.ts
├── App.tsx             # Main App Component
├── AppRouter.tsx       # Router Configuration
└── index.css          # Global Styles & Tailwind
```

## 🎨 Color Scheme

- **Electric Blue**: `rgb(0, 230, 255)` - Primary accent
- **Hot Pink**: `rgb(255, 0, 128)` - Secondary accent  
- **Background**: Black with gradient overlays
- **Text**: Gray-200 for readability

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
