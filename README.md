# TaskMan — Landing Page

A responsive landing page for a task management SaaS product, built with React 19 and Vite.

## Tech Stack

- **React 19** — UI components
- **Vite 8** — dev server and bundler
- **Node.js + Express** — backend API
- **Plain CSS** — custom styles with CSS variables, animations, and responsive breakpoints

## Project Structure

```
landing-page/
├── frontend/               # React + Vite app
│   ├── src/
│   │   ├── components/     # Hero, Navbar, Logos, Benefits, Why, Signup, Footer
│   │   ├── hooks/          # useSignup, useIntersectionObserver
│   │   ├── styles/         # style.css, animations.css
│   │   └── assets/         # SVGs and images
│   └── index.html
└── backend/                # Express API
    ├── controllers/
    ├── models/
    ├── routes/
    └── server.js
```

## Getting Started

### Frontend

```bash
cd frontend
npm install
npm run dev
```

### Backend

```bash
cd backend
npm install
npm run dev      # development (auto-restart with nodemon)
# or
npm start        # production
```

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start frontend dev server at `http://localhost:5173` |
| `npm run build` | Build frontend for production |
| `npm run preview` | Preview the production build |
| `npm run dev` (backend) | Start backend with nodemon (auto-restart) |
| `npm start` (backend) | Start backend for production |
