# Cyberpunk Portfolio

> A cyberpunk-themed developer portfolio website — from design to development

**English** | [한국어](./README_KO.md)

## Introduction

A personal portfolio website with a cyberpunk aesthetic. Featuring glitch effects, scanline overlays, neon colors, and retro-futuristic visual elements to showcase projects, skills, and profile.

## Preview

### Key Sections

| Section | Description |
|---------|-------------|
| Hero | Main intro with typewriter animation |
| Terminal | Terminal-style profile introduction |
| Skill Matrix | Categorized tech stack with progress bars |
| Projects | Project card grid gallery |
| Project Detail | Tab-based project detail modal |

## Tech Stack

### Frontend

| Technology | Version | Purpose |
|------------|---------|---------|
| React | 19.1.1 | UI framework |
| TypeScript | 5.8.3 | Type safety |
| Vite | 7.1.2 | Build tool & dev server |
| Tailwind CSS | 3.4.17 | Utility-first styling |
| React Router DOM | 7.8.2 | Client-side routing |
| styled-jsx | 5.1.7 | Scoped CSS-in-JS |

### Backend & Database

| Technology | Purpose |
|------------|---------|
| Supabase | PostgreSQL-based BaaS (Backend as a Service) |

### UI & Animation

| Technology | Purpose |
|------------|---------|
| lucide-react | SVG icons |
| react-icons | Additional icon sets (GitHub, etc.) |
| react-type-animation | Typewriter animation effect |

## Features

- **Cyberpunk UI** — Glitch text, scanlines, chromatic aberration, and retro-futuristic design
- **Bilingual Support** — Korean/English toggle (both UI text and database content)
- **Project Gallery** — Card-based project listing with detail modal
- **Project Details** — Tabbed view with Overview, Contribution, and Troubleshooting
- **Skill Matrix** — Backend / Frontend / Design categorized skill display
- **Responsive Design** — Mobile-first, adapts from mobile to desktop
- **Terminal Intro** — Terminal-style profile with typing animation

## Project Structure

```
portfolio_2509/
├── src/
│   ├── components/          # React UI components
│   │   ├── Main.tsx         # Main layout orchestrator
│   │   ├── Header.tsx       # Fixed navigation header
│   │   ├── Hero.tsx         # Landing intro section
│   │   ├── Terminal.tsx     # Terminal-style introduction
│   │   ├── Profile.tsx      # Skill matrix display
│   │   ├── Projects.tsx     # Project grid gallery
│   │   ├── ProjectDetailModal.tsx  # Project detail modal
│   │   ├── Footer.tsx       # Contact & footer
│   │   ├── GlitchText.tsx   # Glitch text effect
│   │   ├── LanguageToggle.tsx    # Language switcher
│   │   ├── ScanlineOverlay.tsx   # Scanline overlay effect
│   │   └── 404.tsx          # Not found page
│   ├── contexts/
│   │   └── LanguageContext.tsx    # i18n context with translations
│   ├── services/
│   │   └── projectService.ts     # Supabase data fetching service
│   ├── lib/
│   │   └── supabase.ts      # Supabase client & TypeScript interfaces
│   ├── types/
│   │   └── language.ts      # Language type definitions
│   ├── App.tsx              # Root component
│   ├── index.tsx            # Entry point
│   └── index.css            # Global styles & fonts
├── index.html               # HTML entry
├── vite.config.ts           # Vite configuration
├── tailwind.config.js       # Tailwind theme customization
├── tsconfig.json            # TypeScript configuration
├── postcss.config.js        # PostCSS configuration
└── package.json             # Dependencies & scripts
```

## Database Schema

Built on Supabase (PostgreSQL), using a `LocalizedText` JSONB field pattern for bilingual content.

| Table | Description |
|-------|-------------|
| `project` | Core project info (title, description, category, status, etc.) |
| `link` | Project external links (GitHub, live demo, docs) |
| `technology` | Tech stack per project |
| `contribution` | Contribution areas with percentages |
| `trouble` | Technical challenges and solutions |

```typescript
// Bilingual field example
interface LocalizedText {
  ko: string;
  en: string;
}
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Supabase project (for database)

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/portfolio_2509.git
cd portfolio_2509

# Install dependencies
npm install
```

### Environment Variables

Create a `.env` file in the project root:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Development Server

```bash
npm run dev
```

Open `http://localhost:5173` in your browser.

### Build

```bash
# Production build
npm run build

# Preview the build
npm run preview
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | TypeScript compile + production build |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

## Customization

### Color Theme

Modify the cyberpunk color palette in `tailwind.config.js`:

```javascript
colors: {
  'electric-blue': '#00E6FF',
  'hot-pink': '#FF0080',
}
```

### Fonts

Different fonts are applied based on the selected language:

- **English**: Styrene A, Share Tech Mono
- **Korean**: Orbit, Galmuri
- **Code**: D2Coding

## License

This project was built for personal portfolio purposes.

## Contact

- Email: lba0507@gmail.com
