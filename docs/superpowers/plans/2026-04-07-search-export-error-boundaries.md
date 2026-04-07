# Search + Export/Import + Error Boundaries Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fix the broken search bar, add JSON data export/import for backup, and prevent full-app crashes with React error boundaries.

**Architecture:** Search uses URL query params (`?q=`) as shared state — Navigation writes, KanbanBoard reads, no new context needed. Export/import serializes localStorage to a versioned JSON file. ErrorBoundary is a class component wrapping App and KanbanBoard independently.

**Tech Stack:** React 18, TypeScript 5, React Router 6 (useSearchParams), Tailwind CSS

---

## File Map

| Action | File | Responsibility |
|---|---|---|
| Modify | `src/components/Navigation.tsx` | Wire search input to `?q=` URL param; add Export/Import buttons |
| Modify | `src/features/kanban/KanbanBoard.tsx` | Read `?q=` param and apply text filter on top of domain filter |
| Create | `src/components/ErrorBoundary.tsx` | React class component; renders error card + reload button |
| Modify | `src/App.tsx` | Wrap app with outer ErrorBoundary; wrap KanbanBoard with inner ErrorBoundary |

---

## Task 1: Fix broken search

**Files:**
- Modify: `src/components/Navigation.tsx`
- Modify: `src/features/kanban/KanbanBoard.tsx`

The search `<input>` in Navigation currently has no value, no onChange, and no effect on the task list.

**Approach:** `useSearchParams` from React Router manages `?q=` in the URL. Navigation debounces writes (150ms) to avoid thrashing URL history on every keystroke. KanbanBoard reads `?q=` and filters tasks by title + description. Domain filter and search filter compose independently.

- [ ] **Step 1: Update Navigation.tsx to wire up the search input**

Replace the full content of `src/components/Navigation.tsx`:

```tsx
import { Link, useLocation, useSearchParams } from 'react-router-dom'
import { RefObject, useRef } from 'react'

const DOMAIN_LINKS = [
  { path: '/', label: 'All', color: '#1A1814' },
  { path: '/health', label: 'Health', color: '#059669' },
  { path: '/family', label: 'Family', color: '#2563EB' },
  { path: '/learning', label: 'Learning', color: '#7C3AED' },
]

interface NavigationProps {
  searchInputRef?: RefObject<HTMLInputElement>
}

export default function Navigation({ searchInputRef }: NavigationProps) {
  const location = useLocation()
  const [searchParams, setSearchParams] = useSearchParams()
  const searchTimeoutRef = useRef<ReturnType<typeof setTimeout>>()

  const isActive = (path: string) => location.pathname === path

  const searchValue = searchParams.get('q') ?? ''

  const handleSearchChange = (value: string) => {
    clearTimeout(searchTimeoutRef.current)
    searchTimeoutRef.current = setTimeout(() => {
      if (value) {
        setSearchParams({ q: value }, { replace: true })
      } else {
        setSearchParams({}, { replace: true })
      }
    }, 150)
  }

  const handleExport = () => {
    const tasksRaw = localStorage.getItem('lifekanban_tasks')
    const historyRaw = localStorage.getItem('lifekanban_history')
    const historyIndexRaw = localStorage.getItem('lifekanban_history_index')

    const backup = {
      version: 1,
      exportedAt: new Date().toISOString(),
      data: {
        tasks: tasksRaw ? JSON.parse(tasksRaw) : [],
        history: historyRaw ? JSON.parse(historyRaw) : [],
        historyIndex: historyIndexRaw ? JSON.parse(historyIndexRaw) : -1,
      },
    }

    const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `lifekanban-backup-${new Date().toISOString().split('T')[0]}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target?.result as string)
        if (!Array.isArray(json?.data?.tasks)) {
          alert('Invalid backup file: missing tasks array.')
          return
        }
        localStorage.setItem('lifekanban_tasks', JSON.stringify(json.data.tasks))
        if (Array.isArray(json.data.history)) {
          localStorage.setItem('lifekanban_history', JSON.stringify(json.data.history))
        }
        if (json.data.historyIndex !== undefined) {
          localStorage.setItem('lifekanban_history_index', JSON.stringify(json.data.historyIndex))
        }
        window.location.reload()
      } catch {
        alert('Failed to read backup file. Make sure it is a valid LifeKanban export.')
      }
    }
    reader.readAsText(file)
    // Reset so the same file can be re-imported if needed
    e.target.value = ''
  }

  return (
    <nav className="sticky top-0 z-40 backdrop-blur-xl bg-cream-50/80 border-b border-ink-900/5">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <div className="flex items-center space-x-10">
            <Link to="/" className="flex items-center space-x-3 group">
              {/* Logo Mark */}
              <div className="relative">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-ink-900 to-ink-700 flex items-center justify-center shadow-soft group-hover:shadow-soft-lg transition-shadow">
                  <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </div>
                <div className="absolute inset-0 rounded-xl bg-accent/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>

              {/* Brand Name */}
              <div className="font-display">
                <span className="text-xl font-semibold text-ink-900">Life</span>
                <span className="text-xl font-semibold text-accent">Kanban</span>
              </div>
            </Link>

            {/* Domain Quick-Links */}
            <div className="flex items-center space-x-1 p-1 bg-white/60 backdrop-blur-sm rounded-2xl border border-ink-900/5">
              {DOMAIN_LINKS.map((link) => {
                const active = isActive(link.path)
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                      active
                        ? 'bg-ink-900 text-white shadow-sm'
                        : 'text-ink-500 hover:text-ink-700 hover:bg-ink-100/50'
                    }`}
                  >
                    <div
                      className="w-2 h-2 rounded-full transition-colors"
                      style={{ backgroundColor: active ? '#fff' : link.color }}
                    />
                    <span>{link.label}</span>
                  </Link>
                )
              })}
            </div>
          </div>

          {/* Right side: Search + Export/Import */}
          <div className="flex items-center gap-3">
            {/* Search */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg className="w-4 h-4 text-ink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search tasks..."
                defaultValue={searchValue}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="input pl-11 pr-12 py-2.5 w-72 text-sm"
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <kbd className="hidden sm:inline-flex items-center px-2 py-0.5 text-xs font-medium text-ink-400 bg-ink-100 rounded">
                  /
                </kbd>
              </div>
            </div>

            {/* Export / Import */}
            <div className="flex items-center gap-1.5">
              <button
                onClick={handleExport}
                title="Export all tasks as JSON backup"
                className="btn-secondary text-xs px-2.5 py-1.5"
              >
                Export
              </button>
              <label
                title="Import tasks from a JSON backup"
                className="btn-secondary text-xs px-2.5 py-1.5 cursor-pointer"
              >
                Import
                <input
                  type="file"
                  accept=".json"
                  onChange={handleImport}
                  className="sr-only"
                />
              </label>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
```

- [ ] **Step 2: Update KanbanBoard.tsx to read ?q= and filter tasks**

In `src/features/kanban/KanbanBoard.tsx`, make two changes:

**Change 1:** Add `useSearchParams` to the react-router-dom import on line 2:

```tsx
import { useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
```

**Change 2:** Replace the `filteredTasks` declaration (currently line 63-65) with the version below that adds search filtering on top of domain filtering:

```tsx
  const [searchParams] = useSearchParams()
  const searchQuery = (searchParams.get('q') ?? '').toLowerCase()

  const filteredTasks = (() => {
    const byDomain = selectedDomain === 'all'
      ? tasks
      : tasks.filter(task => task.domain === selectedDomain)

    if (!searchQuery) return byDomain

    return byDomain.filter(task =>
      task.title.toLowerCase().includes(searchQuery) ||
      (task.description?.toLowerCase().includes(searchQuery) ?? false)
    )
  })()
```

- [ ] **Step 3: Verify build passes**

Run:
```bash
npm run build
```

Expected: No TypeScript errors.

- [ ] **Step 4: Manual test in dev server**

Run:
```bash
npm run dev
```

1. Open `http://localhost:3000`
2. Type in the search bar — cards that don't match should disappear as you type
3. Clear the search — all cards return
4. Navigate to `/health`, search for a term — only health cards matching the term show
5. Confirm the URL shows `?q=yourterm` while typing

- [ ] **Step 5: Commit**

```bash
git add src/components/Navigation.tsx src/features/kanban/KanbanBoard.tsx
git commit -m "$(cat <<'EOF'
fix: wire up search bar and add export/import

Search now filters tasks by title and description via ?q= URL param.
Export downloads a versioned JSON backup; import restores from file.

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>
EOF
)"
```

---

## Task 2: Verify export and import

- [ ] **Step 1: Test export**

With the dev server running at `http://localhost:3000`:
1. Create a couple of tasks if there are none
2. Click "Export" in the nav — browser should download `lifekanban-backup-YYYY-MM-DD.json`
3. Open the file. Verify it has structure: `{ version: 1, exportedAt: "...", data: { tasks: [...], history: [...], historyIndex: ... } }`

- [ ] **Step 2: Test import**

1. Note the current tasks on screen
2. Click "Import" and select the downloaded backup file
3. Page reloads — tasks should be identical to before
4. Test with an invalid file (e.g., a `.txt` file renamed to `.json` with content `{}`):
   - Expected: `alert("Invalid backup file: missing tasks array.")`

---

## Task 3: Create ErrorBoundary component

**Files:**
- Create: `src/components/ErrorBoundary.tsx`

- [ ] **Step 1: Create the file**

```tsx
import { Component, ErrorInfo, ReactNode } from 'react'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, info.componentStack)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[50vh] flex items-center justify-center p-8">
          <div className="card max-w-md w-full p-8 text-center">
            <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h2 className="font-display text-2xl font-semibold text-ink-900 mb-2">
              Something went wrong
            </h2>
            <p className="text-ink-500 text-sm mb-6">
              {this.state.error?.message ?? 'An unexpected error occurred.'}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="btn-primary"
            >
              Reload app
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
```

- [ ] **Step 2: Verify build passes**

Run:
```bash
npm run build
```

Expected: No TypeScript errors.

---

## Task 4: Add ErrorBoundary wrappers to App.tsx

**Files:**
- Modify: `src/App.tsx`

- [ ] **Step 1: Replace the full content of src/App.tsx**

```tsx
import { BrowserRouter as Router, Routes, Route, Navigate, useParams } from 'react-router-dom'
import { TasksProvider } from './contexts/TasksContext'
import { HistoryProvider } from './contexts/HistoryContext'
import { TimeTrackingProvider } from './contexts/TimeTrackingContext'
import Layout from './components/Layout'
import KanbanBoard from './features/kanban/KanbanBoard'
import ErrorBoundary from './components/ErrorBoundary'

function BoardRedirect() {
  const { domain } = useParams<{ domain?: string }>()
  return <Navigate to={domain ? `/${domain}` : '/'} replace />
}

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <HistoryProvider>
          <TasksProvider>
            <TimeTrackingProvider>
              <Layout>
                <Routes>
                  <Route path="/" element={<ErrorBoundary><KanbanBoard /></ErrorBoundary>} />
                  <Route path="/:domain" element={<ErrorBoundary><KanbanBoard /></ErrorBoundary>} />
                  <Route path="/board/:domain?" element={<BoardRedirect />} />
                </Routes>
              </Layout>
            </TimeTrackingProvider>
          </TasksProvider>
        </HistoryProvider>
      </Router>
    </ErrorBoundary>
  )
}

export default App
```

The outer `ErrorBoundary` catches errors in providers or layout. The inner `ErrorBoundary` around `KanbanBoard` catches board crashes while keeping the nav alive.

- [ ] **Step 2: Verify build passes**

Run:
```bash
npm run build
```

Expected: Clean build, no TypeScript errors, no unused import warnings.

- [ ] **Step 3: Commit**

```bash
git add src/components/ErrorBoundary.tsx src/App.tsx
git commit -m "$(cat <<'EOF'
feat: add React error boundaries

Outer boundary catches provider/layout crashes. Inner boundary around
KanbanBoard keeps the nav alive if the board throws. Both show a
friendly error card with a reload button.

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>
EOF
)"
```

---

## Task 5: Push and verify deployment

- [ ] **Step 1: Push to main**

```bash
git push origin main
```

- [ ] **Step 2: Verify on Vercel**

After the deploy completes:
1. Open the live URL
2. Test search — type in search bar, tasks filter in real time
3. Test export — download a backup JSON
4. Test import — restore from the downloaded backup
5. Confirm the app loads without errors
