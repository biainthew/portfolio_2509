# Cyberpunk Portfolio

> 디자인부터 개발까지, 사이버펑크 테마의 개발자 포트폴리오 웹사이트

[English](./README.md) | **한국어**

## 소개

사이버펑크 스타일의 개인 포트폴리오 웹사이트입니다. 글리치 이펙트, 스캔라인 오버레이, 네온 컬러 등 레트로-퓨처리스틱한 비주얼 요소와 함께 프로젝트, 스킬, 프로필을 소개합니다.

## 미리보기

### 주요 화면

| 섹션 | 설명 |
|------|------|
| Hero | 타이핑 애니메이션이 적용된 메인 인트로 |
| Terminal | 터미널 스타일의 프로필 소개 |
| Skill Matrix | 카테고리별 기술 스택 프로그레스 바 |
| Projects | 프로젝트 카드 그리드 갤러리 |
| Project Detail | 탭 기반 프로젝트 상세 모달 |

## 기술 스택

### Frontend

| 기술 | 버전 | 용도 |
|------|------|------|
| React | 19.1.1 | UI 프레임워크 |
| TypeScript | 5.8.3 | 타입 안전성 |
| Vite | 7.1.2 | 빌드 도구 & 개발 서버 |
| Tailwind CSS | 3.4.17 | 유틸리티 기반 스타일링 |
| React Router DOM | 7.8.2 | 클라이언트 사이드 라우팅 |
| styled-jsx | 5.1.7 | 스코프 CSS-in-JS |

### Backend & 데이터베이스

| 기술 | 용도 |
|------|------|
| Supabase | PostgreSQL 기반 BaaS (Backend as a Service) |

### UI & 애니메이션

| 기술 | 용도 |
|------|------|
| lucide-react | SVG 아이콘 |
| react-icons | 추가 아이콘 세트 (GitHub 등) |
| react-type-animation | 타이핑 애니메이션 효과 |

## 주요 기능

- **사이버펑크 UI** - 글리치 텍스트, 스캔라인, 색수차 효과 등 레트로-퓨처리스틱 디자인
- **다국어 지원** - 한국어/영어 전환 (UI 텍스트 + DB 데이터 모두 지원)
- **프로젝트 갤러리** - 카드 형태의 프로젝트 목록 및 상세 모달
- **프로젝트 상세 정보** - 개요, 기여도, 트러블슈팅 탭으로 구성
- **스킬 매트릭스** - 백엔드/프론트엔드/디자인 카테고리별 기술 현황
- **반응형 디자인** - 모바일부터 데스크톱까지 대응
- **터미널 인트로** - 터미널 스타일의 프로필 타이핑 애니메이션

## 프로젝트 구조

```
portfolio_2509/
├── src/
│   ├── components/          # React UI 컴포넌트
│   │   ├── Main.tsx         # 메인 레이아웃
│   │   ├── Header.tsx       # 고정 네비게이션 헤더
│   │   ├── Hero.tsx         # 메인 인트로 섹션
│   │   ├── Terminal.tsx     # 터미널 스타일 소개
│   │   ├── Profile.tsx      # 스킬 매트릭스
│   │   ├── Projects.tsx     # 프로젝트 그리드
│   │   ├── ProjectDetailModal.tsx  # 프로젝트 상세 모달
│   │   ├── Footer.tsx       # 연락처 & 푸터
│   │   ├── GlitchText.tsx   # 글리치 텍스트 효과
│   │   ├── LanguageToggle.tsx    # 언어 전환 토글
│   │   ├── ScanlineOverlay.tsx   # 스캔라인 효과
│   │   └── 404.tsx          # 404 페이지
│   ├── contexts/
│   │   └── LanguageContext.tsx    # 다국어 Context (번역 데이터 포함)
│   ├── services/
│   │   └── projectService.ts     # Supabase 데이터 조회 서비스
│   ├── lib/
│   │   └── supabase.ts      # Supabase 클라이언트 & 인터페이스
│   ├── types/
│   │   └── language.ts      # 언어 타입 정의
│   ├── App.tsx              # 루트 컴포넌트
│   ├── index.tsx            # 엔트리 포인트
│   └── index.css            # 글로벌 스타일 & 폰트
├── index.html               # HTML 엔트리
├── vite.config.ts           # Vite 설정
├── tailwind.config.js       # Tailwind 테마 커스터마이징
├── tsconfig.json            # TypeScript 설정
├── postcss.config.js        # PostCSS 설정
└── package.json             # 의존성 & 스크립트
```

## 데이터베이스 구조

Supabase(PostgreSQL) 기반으로, 다국어를 위한 `LocalizedText` JSONB 필드 패턴을 사용합니다.

| 테이블 | 설명 |
|--------|------|
| `project` | 프로젝트 기본 정보 (제목, 설명, 카테고리, 상태 등) |
| `link` | 프로젝트 외부 링크 (GitHub, 라이브 데모, 문서) |
| `technology` | 프로젝트별 기술 스택 |
| `contribution` | 기여 영역 및 비율 |
| `trouble` | 기술적 과제 및 해결책 |

```typescript
// 다국어 필드 예시
interface LocalizedText {
  ko: string;
  en: string;
}
```

## 시작하기

### 사전 요구사항

- Node.js 18+
- npm 또는 yarn
- Supabase 프로젝트 (데이터베이스)

### 설치

```bash
# 저장소 클론
git clone https://github.com/your-username/portfolio_2509.git
cd portfolio_2509

# 의존성 설치
npm install
```

### 환경 변수 설정

프로젝트 루트에 `.env` 파일을 생성합니다.

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 개발 서버 실행

```bash
npm run dev
```

브라우저에서 `http://localhost:5173` 으로 접속합니다.

### 빌드

```bash
# 프로덕션 빌드
npm run build

# 빌드 미리보기
npm run preview
```

## 스크립트

| 명령어 | 설명 |
|--------|------|
| `npm run dev` | 개발 서버 실행 |
| `npm run build` | TypeScript 컴파일 + 프로덕션 빌드 |
| `npm run preview` | 빌드 결과 미리보기 |
| `npm run lint` | ESLint 코드 검사 |

## 커스터마이징

### 색상 테마

`tailwind.config.js`에서 사이버펑크 컬러 팔레트를 수정할 수 있습니다.

```javascript
colors: {
  'electric-blue': '#00E6FF',
  'hot-pink': '#FF0080',
}
```

### 폰트

언어별로 다른 폰트가 적용됩니다.

- **영문**: Styrene A, Share Tech Mono
- **한국어**: Orbit, Galmuri
- **코드**: D2Coding

## 라이선스

이 프로젝트는 개인 포트폴리오 용도로 제작되었습니다.

## 연락처

- Email: lba0507@gmail.com
