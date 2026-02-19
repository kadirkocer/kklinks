# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**kklinks** is a modern, animated social links page featuring a dynamic circular layout with floating social media icons orbiting around a video avatar. Built as a single-page React application and deployed to Cloudflare Pages.

Live demo: https://kadirkocer.com/

## Development Commands

```bash
# Start development server (port 5173)
npm run dev

# Build for production
npm run build

# Preview production build locally (port 4173)
npm run preview

# Deploy-ready build for Cloudflare Pages
npm run build
```

## Tech Stack

- **React 18** with JSX
- **Vite 5** (build tool with HMR)
- **Tailwind CSS 3** (utility-first styling)
- **TypeScript** (config only, source files are JSX)
- **Motion library** (v12.23.26) for animations
- **Lucide React** for additional icons (though most icons are custom SVG)

## Architecture

### Single Component Application

This is a single-page application with a minimal component structure:

- **src/main.jsx**: Entry point with React root render and ErrorBoundary wrapper
- **src/App.jsx**: Main `ProfileLinks` component containing all UI logic
- **src/ErrorBoundary.jsx**: Class component for catching React errors in production/development
- **src/index.css**: Global Tailwind directives and custom CSS animations

### App.jsx Core Architecture

The main component follows a self-contained design pattern with:

1. **Inline SVG Icons**: Custom icons defined as functional components in `ICONS` object
2. **Social Links Configuration**: `SOCIAL_LINKS` array with URL, icon, and brand color for each platform
3. **Responsive Calculations**: `calculateDimensions()` function computes layout sizes based on viewport
4. **Orbital Positioning**: `getPosition()` calculates equal distribution around a circle using trigonometry

Key state management:
- `mounted`: Controls entrance animations
- `hoveredIndex`: Tracks which social icon is being hovered
- `centerHovered`: Tracks hover state of center avatar video
- `dimensions`: Stores responsive radius, icon sizes, and center size

### Styling System

The project uses a hybrid approach:
- **Tailwind CSS**: For utility classes and responsive design
- **Inline styles**: For dynamic values (positions, colors, animations) that depend on state or calculations
- **Custom CSS animations**: Defined in `index.css` for complex effects

Custom animations include:
- `orbital-float`: Organic floating movement for social icons
- `breathe`: Pulsing glow effect for center avatar
- `shimmer`: Border animation on hover
- `fade-in-up`: Entrance animation

### Video Asset Handling

The center avatar uses `public/video/kk.mp4` referenced via `import.meta.env.BASE_URL` to ensure correct path resolution when deployed behind a configurable base path.

## Build Configuration

### Vite Configuration (vite.config.ts)

- **Base path**: `/` by default (can be overridden with `VITE_BASE_PATH`)
- **Path alias**: `@` maps to `./src`
- **Build optimizations**:
  - Drops console logs and debuggers in production
  - Splits React vendor code into separate chunk for caching
  - Disables sourcemaps in production
  - Uses esbuild for fast minification

### Tailwind Configuration (tailwind.config.js)

- Dark mode support via class strategy
- Custom CSS variables for colors (`--border`, `--background`, etc.)
- Scans `index.html` and all JS/JSX/TS/TSX files in `src/`

## Cloudflare Pages Deployment

The project is configured for Cloudflare Pages deployment:
1. Build command: `npm run build`
2. Build output directory: `dist`
3. Base path defaults to `/`

## Responsive Design

The application calculates dimensions dynamically based on viewport size with breakpoints:
- **Mobile small** (`< 400px`): Tighter orbit, smaller icons
- **Mobile large** (`400-600px`): Slightly larger spacing
- **Tablet** (`600-900px`): More spacious layout
- **Desktop** (`> 900px`): Maximum comfortable size with absolute limits

Minimum touch target size of 48px is enforced for accessibility.

## State & Interaction Patterns

- Window resize listener recalculates dimensions in real-time
- Mount animation delayed by 100ms for smooth entrance
- Hover states trigger scale transforms with cubic-bezier easing
- Tooltip positioning adapts based on icon position (above or below)

## Important Constraints

- Video file must be MP4 format for broad browser support
- All animations use CSS for performance (GPU-accelerated)
- No routing library needed (single page application)
- No backend or API calls
- No test suite currently implemented
