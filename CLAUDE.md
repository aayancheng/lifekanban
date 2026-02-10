# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

LifeKanban is a personal life event management app with Kanban boards for three domains: Health, Family, and Learning. Currently a client-side-only React app (Phase 1 complete) with all data persisted in browser localStorage. No backend exists yet.

- **GitHub:** https://github.com/aayancheng/lifekanban
- **Deployment:** Vercel with auto-deploy on push to `main`

## Development Commands

```bash
npm install          # Install dependencies
npm run dev          # Dev server at http://localhost:3000
npm run build        # TypeScript check + Vite production build
npm run preview      # Preview production build locally
npm run lint         # ESLint (zero warnings enforced)
```

No test framework is configured yet.

## Architecture

### Tech Stack

React 18 + TypeScript 5 + Vite 5 + Tailwind CSS 3 + dnd-kit (drag-and-drop) + React Router 6

### Provider Nesting Order (src/App.tsx)

Providers must be nested in this order — inner providers depend on outer ones:

```
BrowserRouter → HistoryProvider → TasksProvider → TimeTrackingProvider → Layout → Routes
```

`TasksContext` uses `HistoryContext` to record actions for undo/redo, so `HistoryProvider` must wrap `TasksProvider`.

### Routing

| Route | Component | Description |
|---|---|---|
| `/` | KanbanBoard | All tasks view |
| `/:domain` | KanbanBoard | Domain-specific board: `health`, `family`, or `learning` |
| `/board/:domain?` | BoardRedirect | Legacy route - redirects to `/:domain` or `/` |

All routes are client-side. Domain filtering is handled via URL params in KanbanBoard. Navigation component provides domain quick-links (no duplicate filters in KanbanBoard itself). Vercel is configured with a catch-all rewrite to `index.html` in `vercel.json`.

### State Management

Three React Context providers in `src/contexts/`:

- **TasksContext** — CRUD for tasks, integrates with HistoryContext for undo tracking. Uses `useLocalStorage` for persistence.
- **HistoryContext** — Undo/redo stack (max 20 actions). Tracks create/update/delete/move actions with previous and new state snapshots.
- **TimeTrackingContext** — Single active timer constraint. Updates elapsed time every second via `setInterval`.

### localStorage Keys

Defined as constants in `src/hooks/useLocalStorage.ts` via `STORAGE_KEYS`:

- `lifekanban_tasks` — Task array
- `lifekanban_goals` — Goal array (not yet implemented)
- `lifekanban_history` — Undo/redo action history
- `lifekanban_history_index` — Current position in history
- `lifekanban_settings` — User preferences (not yet implemented)

### Key Types (src/types/index.ts)

- `Domain`: `'health' | 'family' | 'learning'`
- `TaskStatus`: `'todo' | 'in_progress' | 'done'`
- `Priority`: `'high' | 'medium' | 'low'`
- `Task`: Core entity with `timeTracking: TimeTracking` (sessions array + active state)
- `HistoryAction`: Tracks entity changes for undo/redo

## Project Structure

Feature-based organization — group by feature, not by type:

```
src/
  features/
    kanban/       KanbanBoard.tsx, KanbanColumn.tsx — board with dnd-kit
    tasks/        TaskCard.tsx, TaskModal.tsx — card display and create/edit form
    templates/    taskTemplates.ts — 9 pre-defined templates (3 per domain)
  components/     Shared UI: Layout, Navigation, Modal, Button, Card
  contexts/       TasksContext, HistoryContext, TimeTrackingContext
  hooks/          useLocalStorage (persistence), useKeyboardShortcuts (global hotkeys)
  utils/          helpers.ts — formatDate, formatDuration, getDomainColor, etc.
  types/          TypeScript type definitions
```

## Design System

Aesthetic: "Calm Productivity" — warm neutrals with domain-specific accent colors.

### Fonts (loaded from Google Fonts CDN in index.css)

- **Display:** Fraunces (serif) — headings, stats
- **Body:** DM Sans (sans-serif) — text, labels, UI

### Domain Colors

| Domain | Color | Hex | Light |
|---|---|---|---|
| Health | Emerald | `#059669` | `#D1FAE5` |
| Family | Blue | `#2563EB` | `#DBEAFE` |
| Learning | Violet | `#7C3AED` | `#EDE9FE` |

### Priority Colors

High: `#DC2626` (red) · Medium: `#D97706` (amber) · Low: `#6B7280` (gray)

### Custom CSS Classes (defined in src/index.css)

`.card`, `.task-card`, `.kanban-column`, `.btn-primary`, `.btn-secondary`, `.input`, `.nav-link`, `.stat-card`, `.domain-health`, `.domain-family`, `.domain-learning`

### Animation Classes

`.animate-fade-in`, `.animate-slide-in`, `.animate-scale-in`, `.animate-pulse-soft` with `.stagger-1` through `.stagger-6` for delays.

Custom Tailwind shadows: `shadow-soft`, `shadow-soft-lg`, `shadow-glow-health`, `shadow-glow-family`, `shadow-glow-learning`.

## Important Patterns

### Modal System

All modals use React Portal (`createPortal` from `react-dom`) to render directly to `document.body`. This prevents modals from being constrained by parent containers with CSS transforms (e.g., draggable task cards). The Modal component has a max-width of `max-w-3xl` (768px) for comfortable editing without overwhelming the screen.

### Drag and Drop

Uses `@dnd-kit/core` with `PointerSensor` and `TouchSensor`. The `KanbanBoard` manages drag state and calls `moveTask()` on drop. `DragOverlay` provides visual feedback during drag. Task cards have transform properties applied during drag, which is why modals must use portals to avoid being constrained.

### Keyboard Shortcuts

Global shortcuts registered in `Layout.tsx` via `useKeyboardShortcuts` hook. Shortcuts are disabled when an input/textarea is focused. Key bindings: `n`/`c` (new task), `d` (dashboard), `k` (board), `h`/`f`/`l` (domain boards), `?` (help), `Ctrl+Z` (undo), `Ctrl+Shift+Z` (redo), `Esc` (close modals).

### Timer Constraint

Only one timer can run at a time across all tasks. Starting a new timer automatically stops any running timer. Timer state lives in `TimeTrackingContext`, not in individual task objects.

## Development Notes

- Build command is `tsc && vite build` — TypeScript errors will fail the build and Vercel deployment
- Strict TypeScript: `noUnusedLocals` and `noUnusedParameters` are enabled — clean up unused imports
- The `timeout` type must be `ReturnType<typeof setTimeout>`, not `NodeJS.Timeout` (Vite/browser environment)
- No test framework configured — when adding tests, Vitest is the natural choice for Vite projects

## Roadmap

- **Phase 1 (Complete):** Client-side app with localStorage persistence
- **Phase 2 (Planned):** Calendar integration, goals system, advanced analytics, filtering/sorting
- **Phase 3 (Future):** Backend with Node.js/Express + PostgreSQL; localStorage migration utility
