# Cyber Portfolio

A futuristic, cyberpunk-themed portfolio website built with React, TypeScript, and Tailwind CSS. Features bilingual support (English/Korean), animated UI components, and a terminal-like interface.

## ✨ Features

- **🎨 Cyberpunk Design**: Neon colors, glitch effects, and futuristic UI components
- **🌐 Bilingual Support**: Dynamic language switching between English and Korean
- **⚡ Interactive Terminal**: Animated typing effect with realistic cursor blinking
- **🎯 Glitch Effects**: Random glitch animations for enhanced visual appeal
- **📱 Responsive Design**: Optimized for all device sizes
- **🎭 Styled Components**: Custom animations and visual effects
- **🗄️ Database Integration**: Dynamic content management with Supabase
- **🔒 Secure Data**: Row Level Security (RLS) policies for data protection

## 🛠️ Tech Stack

- **Frontend**: React 19+ with TypeScript
- **Backend**: Supabase (PostgreSQL database)
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

3. Set up environment variables
```bash
# Create .env file in root directory
cp .env.example .env

# Add your Supabase credentials
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Start the development server
```bash
npm run dev
```

5. Open your browser and navigate to `http://localhost:5173`

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
- **Projects**: Project showcase with hover effects and database integration
- **ProjectDetailModal**: Full project details with gallery and technical information
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

## 🗄️ Database Integration

This project uses Supabase as the backend database to dynamically manage project content.

### Database Schema

```sql
-- Projects table
project (
  project_id: UUID (Primary Key)
  lang: VARCHAR ('en' | 'ko')
  title: VARCHAR
  subtitle: VARCHAR
  category: VARCHAR
  client: VARCHAR
  role: VARCHAR
  start_date: VARCHAR
  end_date: VARCHAR
  status: VARCHAR
  description: TEXT
  challenge: TEXT
  solution: TEXT
  image: VARCHAR (URL)
  tag: TEXT[] (Array)
  gallery_url: TEXT[] (Array)
  result: TEXT[] (Array)
  created_at: TIMESTAMP
  edited_at: TIMESTAMP
)

-- Related tables with foreign key relationships
link (link_id, type, url, project_id)
technology (technology_id, name, type, icon, description, project_id)  
contribution (contribution_id, area, percentage, description, project_id)
```

### Data Service Layer

- **ProjectService**: Centralized service for all project-related database operations
- **Language-specific queries**: Automatically filters content by selected language
- **Normalized data structure**: Separate tables for links, technologies, and contributions
- **Error handling**: Comprehensive error catching and logging

### Key Features

- **Dynamic Content**: Project data is fetched from Supabase in real-time
- **Bilingual Support**: Content automatically switches based on language selection
- **Detailed Project Views**: Rich project information including galleries, tech stacks, and contributions
- **Secure Access**: Row Level Security (RLS) policies protect data integrity

## 📁 Project Structure

```
src/
├── components/          # UI Components
│   ├── Header.tsx
│   ├── Hero.tsx
│   ├── Terminal.tsx
│   ├── Projects.tsx
│   ├── ProjectDetailModal.tsx
│   ├── Footer.tsx
│   ├── GlitchText.tsx
│   ├── ScanlineOverlay.tsx
│   └── LanguageToggle.tsx
├── contexts/           # React Contexts
│   └── LanguageContext.tsx
├── lib/                # External Services
│   └── supabase.ts     # Supabase client & types
├── services/           # Business Logic
│   └── projectService.ts # Project CRUD operations
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

## 📈 Recent Updates

### 2025-09-16: Supabase Database Integration
- ✅ **Complete Database Migration**: Moved from static JSON to Supabase PostgreSQL
- ✅ **Normalized Schema**: Separated projects, links, technologies, and contributions
- ✅ **Type Safety**: Full TypeScript integration with Supabase types
- ✅ **Dynamic Content**: Real-time project data fetching
- ✅ **Modal Enhancement**: Rich project detail modals with galleries
- ✅ **Timeline Fields**: Updated from single `timeline` to `start_date` + `end_date` fields
- ✅ **RLS Security**: Implemented Row Level Security policies for data protection
- ✅ **Error Handling**: Comprehensive error management and user feedback
- ✅ **Code Cleanup**: Removed static fallback data and debug logging

### Technical Improvements
- **Database Structure**: Normalized 4-table schema for scalability
- **Service Layer**: Centralized `ProjectService` for all database operations  
- **Language Support**: Automatic language filtering for bilingual content
- **Performance**: Optimized queries with proper indexing and ordering
- **Security**: Public read access with secure RLS policies

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
