# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Dev server on localhost:3000
npm run build    # Production build to ./build
npm run preview  # Preview production build
npm start        # Alias for dev server
```

## Architecture

Personal portfolio site (luketmillar.com) built with Vite 6, React 19, TypeScript 5.7 (strict), styled-components 6, and react-router-dom v7.

**Import paths** use `src` as baseUrl — imports are relative to `src/` (e.g., `import X from 'projects/golf'`).

### Routing

- `/` — Home (landing page with hero + project showcase)
- `/project/*` — ProjectsRouter (`src/projects/index.tsx`) maps to individual projects

### Projects

Each project under `src/projects/` is a self-contained interactive demo:

- **golf** — Physics-based golf game using matter-js. MVC pattern: `World.ts` (physics state), `View.ts` (canvas rendering), `Controller.ts` (orchestration). Has levels system and tools (aimer/shooter).
- **minesweeper** — Classic minesweeper using React components + custom EventEmitter model + React Context for state.
- **marquee** — Split-flap display with animation. Has a Creator sub-UI for editing messages.
- **bouncingBalls / fallingBalls** — Canvas physics demos using the shared canvasScene infrastructure.
- **color-palette** — Color extraction from images using colorthief.

### Shared Canvas Infrastructure (`src/projects/canvasScene/`)

Reusable MVC framework for canvas-based projects:
- `Coordinates.ts` — DPI-aware screen/world coordinate conversion, `useSizes` hook
- `FullscreenCanvas.tsx` — Canvas component
- `InputHandler.tsx` — Mouse/touch event abstraction
- `Model/` — Shape primitives (Circle, Rectangle, Line), World, Collision, Forces
- `View/` — Canvas renderers for each shape type

### Other Shared Code

- `src/hooks/` — `useFrameTime` (rAF loop), `useWindowSize`, `EventEmitter` (typed pub/sub)
- `src/colors/` — RGB/Hex/HSV converters and color constants
- `src/common/` — `FileDragDrop` component, `useTextCopier` hook
