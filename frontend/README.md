# TaskMan — Landing Page

A responsive landing page for a task management SaaS product, built with React 19 and Vite.

## Tech Stack

- **React 19** — UI components
- **Vite 8** — dev server and bundler
- **Plain CSS** — custom styles with CSS variables, animations, and responsive breakpoints

## Project Structure

```
src/
├── components/
│   ├── Hero.jsx        # Hero section with animated illustration cards
│   ├── Logos.jsx       # Client logo grid with staggered entrance animation
│   ├── Navbar.jsx      # Top navigation bar
│   ├── Benefits.jsx    # Features/benefits section
│   ├── Why.jsx         # Why choose us section
│   ├── Signup.jsx      # Email signup CTA section
│   └── Footer.jsx      # Footer
├── hooks/
│   ├── useSignup.js    # Email form state and validation
│   └── useIntersectionObserver.js
├── styles/
│   ├── style.css       # Main stylesheet
│   └── animations.css  # Keyframe animations
└── assets/
    ├── hero/           # Hero SVGs (shapes + illustration cards)
    └── logos/          # Client brand logos
```

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start local dev server at `http://localhost:5173` |
| `npm run build` | Build for production into `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint |
