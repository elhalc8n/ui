# `@elhalc8n/ui` — Modern Glassy Admin Dashboard & Component Suite

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-v20%2B-green)](https://nodejs.org/)
[![npm workspaces](https://img.shields.io/badge/Workspaces-npm-red)](https://docs.npmjs.com/cli/using-npm/workspaces)

> Modern Glassmorphism Component Suite and Admin Dashboard templates for React (Vite SPA), Next.js (App Router), and Laravel 11/12 (Inertia.js + React).

---

## Highlights

- **Modern Glassmorphism Design:** Translucent layered frosted surfaces, subtle 1px specular borders, and ambient mesh gradients.
- **Accessibility & Contrast:** High contrast text (WCAG $\ge$ 4.5:1) and automated fallback for `prefers-reduced-transparency`.
- **Performance Optimized:** GPU-efficient 60 FPS backdrop rendering with a 3-layer active blur budget.
- **Cross-Framework Support:** Ready-to-use navigation abstractions for React Router, Next.js `<Link>`, and Inertia.js `<Link>`.
- **Integrated Monorepo:** Powered by standard Node.js **npm workspaces** with Linux-friendly `kebab-case.tsx` conventions.

---

## Monorepo Structure

```text
ui/
├── packages/
│   └── ui/                     # Core Package: @elhalc8n/ui
│       ├── src/
│       │   ├── primitives/     # GlassCard, GlassButton, GlassInput, etc.
│       │   ├── navigation/     # AppSidebar, TopNavbar, CommandPalette
│       │   ├── data-display/   # DataTable, StatMetricCard, ChartContainer
│       │   ├── layouts/        # DashboardLayout, AuthLayout
│       │   └── styles/         # glass-theme.css (Tokens & Mesh Gradients)
├── apps/
│   ├── docs/                   # Interactive Documentation & Live Sandbox
│   ├── react-vite/             # Admin Template: React SPA + Vite
│   ├── nextjs-app/             # Admin Template: Next.js (App Router)
│   └── laravel-inertia/        # Admin Template: Laravel + Inertia.js (React)
├── tsconfig.base.json          # Shared strict TypeScript configuration
└── package.json                # npm workspaces root configuration
```

---

## Getting Started

### 1. Prerequisites
- **Node.js**: v20 or v22+
- **npm**: v10+

### 2. Installation
Clone the repository and install all workspace dependencies from root:

```bash
git clone https://github.com/elhalc8n/ui.git
cd ui
npm install
```

### 3. Development Commands

| Command | Description |
| :--- | :--- |
| `npm run build:ui` | Build the `@elhalc8n/ui` core package (ESM + CJS + Types) |
| `npm run dev:docs` | Launch the interactive documentation & sandbox (`apps/docs`) |
| `npm run dev:react` | Start the React (Vite) admin dashboard template |
| `npm run dev:next` | Start the Next.js admin dashboard template |
| `npm run dev:laravel` | Start the Laravel Inertia frontend dev server |
| `npm run typecheck` | Run TypeScript type checks across all workspaces |

---

## Surface Layers & Visual Tokens

| Layer | Visual Role | Specifications (Dark Mode) |
| :--- | :--- | :--- |
| **Layer 0: Base Canvas** | Ambient background with radial glow | `bg-slate-950` with subtle cyan/indigo/rose gradients |
| **Layer 1: Glass Shell** | Sidebar, Topbar, Navbar | `bg-slate-900/65 backdrop-blur-md border-white/10 shadow-lg` |
| **Layer 2: Glass Card** | Widget containers, metric cards, tables | `bg-slate-900/50 backdrop-blur-sm border-white/10 shadow-md` |
| **Layer 3: Interactive Glass** | Modals, Drawers, Dropdowns, Command Palette | `bg-slate-900/85 backdrop-blur-xl border-white/15 shadow-2xl` |
| **Layer 4: Solid Action** | Primary CTAs, status badges, readable text | High contrast solid accents (`indigo-600`, `emerald-500`) |

---

## License

This project is licensed under the [MIT License](LICENSE).
Created with by elhalc8n.

