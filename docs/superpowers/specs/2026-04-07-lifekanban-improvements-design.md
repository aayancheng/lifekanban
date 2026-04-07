# LifeKanban Improvements Design

**Date:** 2026-04-07
**Scope:** 4 improvements across 2 PRs
**Repo:** https://github.com/aayancheng/lifekanban

---

## Overview

Four improvements to LifeKanban, delivered in two PRs:

- **PR 1:** PWA conversion (install to home screen, offline support)
- **PR 2:** Fix broken search + data export/import + error boundaries

---

## PR 1: PWA Conversion

### Goal
Make LifeKanban installable as a standalone app on desktop and mobile, with offline support so the board loads without a network connection.

### Approach
Use `vite-plugin-pwa` (Workbox-based) — industry standard for Vite PWAs. All changes are additive; no existing components modified except `vite.config.ts` and `index.html`.

### Caching Strategy

| Resource | Strategy | Rationale |
|---|---|---|
| JS/CSS/fonts (hashed filenames) | `CacheFirst`, 1-year expiry | Safe — Vite fingerprints these, stale content is never served |
| Google Fonts | `StaleWhileRevalidate` | Instant cached load, background update |
| HTML (navigation) | `NetworkFirst`, fallback to cached `index.html` | App loads offline; fresh content preferred when online |

### Web App Manifest

```json
{
  "name": "LifeKanban",
  "short_name": "LifeKanban",
  "description": "Personal life event management with Kanban boards",
  "theme_color": "#FAF8F5",
  "background_color": "#FAF8F5",
  "display": "standalone",
  "start_url": "/",
  "icons": [
    { "src": "/pwa-192.png", "sizes": "192x192", "type": "image/png" },
    { "src": "/pwa-512.png", "sizes": "512x512", "type": "image/png" }
  ]
}
```

### Install Prompt Component

A small dismissable banner component (`src/components/InstallPrompt.tsx`) that:
- Listens for the browser's `beforeinstallprompt` event
- Shows a banner: "Add LifeKanban to your home screen" with Install + Dismiss buttons
- On dismiss, sets `lifekanban_install_dismissed: true` in localStorage — never shown again
- Rendered inside `Layout.tsx`

### New Files
- `public/pwa-192.png` — 192×192 app icon (generated from `favicon.svg`)
- `public/pwa-512.png` — 512×512 app icon (generated from `favicon.svg`)
- `src/components/InstallPrompt.tsx` — install banner component

### Modified Files
- `package.json` — add `vite-plugin-pwa` dev dependency
- `vite.config.ts` — register `VitePWA` plugin with manifest + Workbox config
- `index.html` — add `theme-color` meta, `description` meta, `apple-touch-icon` link

---

## PR 2: Search + Export/Import + Error Boundaries

### 2a. Fix Broken Search

**Problem:** The search input in `Navigation.tsx` renders but does nothing — no filtering is wired up.

**Solution:** Use URL query params (`?q=searchterm`) as the search state. No new context needed.

- `Navigation.tsx`: read `?q` from URL via `useSearchParams`; on input change, call `setSearchParams({ q: value })` (debounced 150ms). Clear `?q` when input is empty.
- `KanbanBoard.tsx`: read `?q` via `useSearchParams`; filter the displayed task list by matching `title` or `description` (case-insensitive substring match) before passing to columns.

Domain filtering (URL path) and search filtering (`?q`) compose independently — both can be active at once.

### 2b. Data Export / Import

**Problem:** All data lives in localStorage only — no backup, no restore. One browser clear = data loss.

**UI placement:** Small "Export" and "Import" buttons added to the right side of the navigation bar, between search and the right edge.

**Export flow:**
1. Read `lifekanban_tasks`, `lifekanban_history`, `lifekanban_history_index` from localStorage
2. Wrap in: `{ version: 1, exportedAt: <ISO string>, data: { tasks, history, historyIndex } }`
3. Serialize to JSON, create a Blob, trigger browser download as `lifekanban-backup-YYYY-MM-DD.json`

**Import flow:**
1. Hidden `<input type="file" accept=".json">` triggered by "Import" button click
2. Parse file as JSON
3. Validate: must have `data.tasks` as an array — reject otherwise with an `alert()`
4. Write `data.tasks`, `data.history`, `data.historyIndex` back to the correct localStorage keys
5. Call `window.location.reload()` to re-initialize all contexts from fresh storage

**Modified files:** `Navigation.tsx` only (export/import logic lives there alongside the buttons).

### 2c. Error Boundaries

**Problem:** An unhandled React render error crashes the entire app to a blank screen.

**Solution:** A React class component `ErrorBoundary` using `componentDidCatch`.

**New file:** `src/components/ErrorBoundary.tsx`

```
ErrorBoundary renders:
  - "Something went wrong" heading
  - Error message (from error.message)
  - "Reload" button → window.location.reload()
  - Styled with existing .card class, centered on screen
```

**Placement in App.tsx:**
1. Outer `ErrorBoundary` wraps everything — catches any provider or routing errors
2. Inner `ErrorBoundary` wraps `<KanbanBoard>` — isolates board crashes from the nav

**Modified files:** `App.tsx` (add two `ErrorBoundary` wrappers), `src/components/ErrorBoundary.tsx` (new).

---

## File Change Summary

### PR 1 — PWA
| File | Change |
|---|---|
| `package.json` | Add `vite-plugin-pwa` dev dep |
| `vite.config.ts` | Register VitePWA plugin |
| `index.html` | Add theme-color, description, apple-touch-icon |
| `public/pwa-192.png` | New — app icon 192×192 |
| `public/pwa-512.png` | New — app icon 512×512 |
| `src/components/InstallPrompt.tsx` | New — install banner |
| `src/components/Layout.tsx` | Render InstallPrompt |

### PR 2 — Search + Export/Import + Error Boundaries
| File | Change |
|---|---|
| `src/components/Navigation.tsx` | Wire search to URL params; add export/import buttons |
| `src/features/kanban/KanbanBoard.tsx` | Read `?q` param and filter tasks |
| `src/components/ErrorBoundary.tsx` | New — class component |
| `src/App.tsx` | Wrap with two ErrorBoundary instances |

---

## Out of Scope
- Dark mode
- Drag-to-reorder within columns
- Due date notifications
- Test infrastructure
- Advanced filtering (priority, status, date)
