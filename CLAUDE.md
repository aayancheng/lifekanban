# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

LifeKanban is a personal life event management web application with Kanban boards for three domains: Health, Family, and Learning. The project follows a phased development approach starting with a client-side-only MVP.

---

## Version History

### v1.1.0 - Design System Overhaul (Current)
**Date:** January 28, 2026
**Design Skill Applied:** `frontend-design` plugin

**Aesthetic Direction:** "Calm Productivity" - Japanese minimalism meets modern productivity
- Warm, inviting color palette with soft backgrounds
- Distinctive typography with character
- Smooth micro-animations and staggered reveals
- Atmospheric depth with subtle textures
- Domain colors refined for warmth and accessibility

**Changes from v1.0.0:**
- Enhanced visual design system with distinctive aesthetic
- Custom font pairing (display + body fonts)
- Animated page transitions and micro-interactions
- Refined card designs with depth and hover states
- Gradient accents and textured backgrounds
- Improved visual hierarchy and spacing

**Files Modified:**
- `src/index.css` - Complete design system with CSS variables, animations, component styles
- `tailwind.config.js` - Extended with custom fonts, colors, shadows, animations
- `src/components/Navigation.tsx` - Refined navigation with logo, glass morphism
- `src/components/Layout.tsx` - Updated container and spacing
- `src/features/dashboard/Dashboard.tsx` - Staggered animations, refined cards, time tracking stats
- `src/features/kanban/KanbanBoard.tsx` - Domain tabs, column icons, improved headers
- `src/features/kanban/KanbanColumn.tsx` - Glass morphism columns, empty states
- `src/features/tasks/TaskCard.tsx` - Domain glow effects, refined badges, improved actions

---

### v1.0.0 - Phase 1 MVP Complete
**Date:** January 27, 2026
**Design Approach:** Standard Tailwind UI

**Original Design Characteristics:**
- System fonts (default Tailwind stack)
- Gray (#F9FAFB) background
- Basic shadows and borders
- Minimal animations
- Standard card components
- Functional but generic aesthetic

---

## Design System (v1.1.0)

### Typography
- **Display Font**: Fraunces (serif) - Used for headings, stats, emphasis
- **Body Font**: DM Sans (sans-serif) - Used for body text, labels, UI elements

### Color Palette

**Warm Neutrals:**
- Background Primary: `#FAF8F5` (cream-50)
- Background Secondary: `#F5F2ED` (cream-100)
- Text Primary: `#1A1814` (ink-900)
- Text Secondary: `#4A4640` (ink-600)
- Text Muted: `#7A756D` (ink-400)

**Domain Colors:**
- Health: `#059669` (emerald) - Light: `#D1FAE5`
- Family: `#2563EB` (blue) - Light: `#DBEAFE`
- Learning: `#7C3AED` (violet) - Light: `#EDE9FE`

**Priority Colors:**
- High: `#DC2626` (red)
- Medium: `#D97706` (amber)
- Low: `#6B7280` (gray)

**Accent:**
- Accent: `#B45309` (amber-700) - Light: `#FEF3C7`

### CSS Classes (Custom Components)
- `.card` - Glass morphism cards with layered shadows
- `.task-card` - Draggable task cards with hover glow
- `.kanban-column` - Frosted glass columns
- `.btn-primary` - Gradient primary buttons with hover lift
- `.btn-secondary` - Subtle secondary buttons
- `.input` - Refined inputs with focus states
- `.nav-link` - Navigation links with active state
- `.stat-card` - Statistics cards with decorative background
- `.domain-health`, `.domain-family`, `.domain-learning` - Domain badges

### Animations
- `.animate-fade-in` - Fade in with upward motion
- `.animate-slide-in` - Slide in from left
- `.animate-scale-in` - Scale in effect
- `.animate-pulse-soft` - Gentle pulse for indicators
- `.stagger-1` through `.stagger-6` - Staggered animation delays

### Shadows
- `shadow-soft` - Multi-layered soft shadow
- `shadow-soft-lg` - Elevated soft shadow
- `shadow-glow-health`, `shadow-glow-family`, `shadow-glow-learning` - Domain-specific glow effects

---

## Development Commands

```bash
npm install          # Install dependencies
npm run dev          # Start development server (http://localhost:3000)
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

## Development Phases

**Phase 1 (MVP - ✅ COMPLETED)**: Client-side React app with local storage persistence
**Phase 2 (Next)**: Enhanced features (calendar, goals, advanced analytics)
**Phase 3 (Future)**: Backend integration with Node.js/Express + PostgreSQL

Currently completed Phase 1 - all data persistence uses browser localStorage, no backend exists yet.

## Phase 1 Progress (COMPLETED)

### ✅ Completed Features

**Core Infrastructure**
- [x] Vite + React + TypeScript project setup
- [x] Tailwind CSS with custom color scheme
- [x] React Router for navigation (Dashboard, Boards)
- [x] Complete TypeScript type definitions (Task, Goal, Domain, Priority, etc.)

**State Management & Storage**
- [x] TasksContext with full CRUD operations
- [x] HistoryContext for undo/redo (last 20 actions)
- [x] TimeTrackingContext for timer management
- [x] localStorage hooks with automatic persistence
- [x] Utility functions (formatDate, formatDuration, getDomainColor, etc.)

**Kanban Board**
- [x] Three-column layout (To Do, In Progress, Done)
- [x] Drag-and-drop functionality with dnd-kit
- [x] Domain filtering tabs (All, Health, Family, Learning)
- [x] Visual feedback during drag operations
- [x] Task count badges per column

**Task Management**
- [x] Create task modal with form validation
- [x] Edit task functionality
- [x] Delete task with confirmation
- [x] Task cards with priority indicators
- [x] Domain color coding
- [x] Due date display

**Task Templates**
- [x] 9 pre-defined templates (3 per domain)
- [x] Template selector in create task form
- [x] Auto-fill fields based on template selection
- [x] Template types: Doctor Appointment, Workout, Medication, Family Event, Quality Time, Household Task, Online Course, Book Reading, Skill Practice

**Time Tracking**
- [x] Start/stop timer on task cards
- [x] Single active timer constraint
- [x] Time session storage
- [x] Total time display on task cards
- [x] Timer UI with play/stop buttons

**Keyboard Shortcuts**
- [x] Global shortcuts system (useKeyboardShortcuts hook)
- [x] 'n' or 'c' - Create new task
- [x] '/' - Focus search
- [x] 'd' - Dashboard navigation
- [x] 'k' - Kanban board navigation
- [x] 'h/f/l' - Domain board shortcuts
- [x] '?' - Show shortcuts help modal
- [x] Ctrl/Cmd+Z - Undo
- [x] Ctrl/Cmd+Shift+Z - Redo
- [x] Esc - Close modals

**UI Components**
- [x] Navigation bar with search
- [x] Layout wrapper
- [x] Modal component with Escape key support
- [x] Button component (primary, secondary, danger, ghost variants)
- [x] Card component
- [x] Keyboard shortcuts help dialog

**Dashboard**
- [x] Task statistics (To Do, In Progress, Done)
- [x] Domain overview (Health, Family, Learning counts)
- [x] Quick task creation button

**Undo/Redo System**
- [x] Action history tracking
- [x] Undo/redo functionality integrated with keyboard shortcuts
- [x] History stored in localStorage
- [x] Max 20 actions in history

## Phase 2 To-Do List

### Calendar Integration
- [ ] Install and configure react-big-calendar
- [ ] Create Calendar page/route
- [ ] Calendar component with month view
- [ ] Calendar component with week view
- [ ] Display tasks on their due dates
- [ ] Color-code calendar events by domain
- [ ] Click task to view/edit details
- [ ] Navigate between dates
- [ ] Add task directly from calendar (click date)
- [ ] Drag-to-reschedule tasks on calendar
- [ ] Filter calendar by domain
- [ ] Show overdue tasks indicator

### Goals System
- [ ] Create GoalsContext for state management
- [ ] Goal data model implementation
- [ ] Goals page/route
- [ ] Create goal modal/form
- [ ] Goal cards with progress bars
- [ ] Link tasks to goals
- [ ] Auto-calculate goal progress based on linked tasks
- [ ] Edit/delete goals
- [ ] Goal completion celebration/animation
- [ ] Goals overview in dashboard
- [ ] Filter tasks by associated goal

### Advanced Dashboard Features
- [ ] Time tracking summary (total time by domain)
- [ ] Weekly/monthly time tracking charts
- [ ] Upcoming deadlines section (next 7 days)
- [ ] Overdue tasks section with warnings
- [ ] Completion rate statistics
- [ ] Task completion trends (chart/graph)
- [ ] Quick stats: tasks completed this week
- [ ] Recent activity feed

### Filtering & Sorting
- [ ] Task list view (alternative to Kanban)
- [ ] Filter tasks by multiple criteria:
  - [ ] By domain (multi-select)
  - [ ] By priority (multi-select)
  - [ ] By status (multi-select)
  - [ ] By date range
  - [ ] By goal association
  - [ ] By template type
- [ ] Sort tasks by:
  - [ ] Due date (ascending/descending)
  - [ ] Priority (high to low)
  - [ ] Created date
  - [ ] Time tracked
  - [ ] Alphabetical
- [ ] Save filter/sort preferences

### Search Functionality
- [ ] Implement search in navigation bar
- [ ] Search by task title
- [ ] Search by task description
- [ ] Search results page/modal
- [ ] Highlight search terms in results
- [ ] Recent searches
- [ ] Search filters (domain, priority, status)

### Enhanced Time Tracking
- [ ] Time tracking analytics page
- [ ] Time breakdown by domain (pie chart)
- [ ] Time breakdown by task
- [ ] Daily/weekly/monthly time summaries
- [ ] Time tracking history view
- [ ] Export time tracking data
- [ ] Manual time entry improvements
- [ ] Timer notifications (optional)

### Custom Task Templates
- [ ] Create custom template functionality
- [ ] Edit existing templates
- [ ] Delete custom templates
- [ ] Template management page
- [ ] Share templates (export/import as JSON)
- [ ] Template categories/tags

### UI/UX Improvements
- [ ] Loading states and skeletons
- [ ] Empty states with helpful messages
- [ ] Task animations (on create, complete, delete)
- [ ] Smooth transitions between pages
- [ ] Toast notifications for actions
- [ ] Confirmation dialogs for destructive actions
- [ ] Accessibility improvements (ARIA labels, keyboard navigation)
- [ ] Responsive mobile layout
- [ ] Touch gestures for mobile

### Data Management
- [ ] Export all data (JSON/CSV)
- [ ] Import data from JSON
- [ ] Clear all data functionality
- [ ] Data backup reminder
- [ ] Storage usage indicator

### Settings & Preferences
- [ ] Settings page
- [ ] Theme preferences (light mode - dark mode in future)
- [ ] Default task duration
- [ ] Default domain for new tasks
- [ ] Date format preferences
- [ ] First day of week (for calendar)
- [ ] Notification preferences

### Testing & Quality
- [ ] Add unit tests for utilities
- [ ] Add tests for context providers
- [ ] Add integration tests for key workflows
- [ ] Add E2E tests for critical paths
- [ ] Fix any accessibility issues
- [ ] Performance optimization (large task lists)
- [ ] Browser compatibility testing

## Technology Stack

- **Frontend**: React 18+ with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Drag & Drop**: dnd-kit
- **Calendar**: react-big-calendar
- **State Management**: React Context API (no Redux needed for MVP)
- **Data Persistence**: localStorage (Phase 1)

## Architecture

### Core Data Models

**Task Model** (stored in localStorage):
- Domains: 'health' | 'family' | 'learning'
- Statuses: 'todo' | 'in_progress' | 'done'
- Priorities: 'high' | 'medium' | 'low'
- Optional time tracking with sessions array
- Optional template type and goal association

**Goal Model**:
- Associated with a single domain
- Progress tracking (0-100%)
- Links to related tasks

### State Management Pattern

Use React Context for global state:
- `TasksContext`: All task CRUD operations
- `GoalsContext`: Goal management
- `HistoryContext`: Undo/redo action history (last 20 actions)
- `TimeTrackingContext`: Active timers and time tracking state

### Local Storage Strategy

All data is stored in localStorage with keys:
- `lifekanban_tasks`: Array of all tasks
- `lifekanban_goals`: Array of all goals
- `lifekanban_history`: Action history for undo/redo
- `lifekanban_settings`: User preferences

Implement automatic save on every state change. Consider debouncing for performance.

## Key Features Implementation Notes

### Keyboard Shortcuts
All shortcuts are defined in the PRD (section 6.3.4). Implement a global keyboard event listener with a shortcuts registry. Use `useEffect` cleanup to avoid memory leaks.

### Undo/Redo System
Maintain a history stack of max 20 actions. Track:
- Action type (create, delete, update, move)
- Previous state
- New state
- Timestamp

Only track user-initiated actions, not programmatic state changes.

### Task Templates
Pre-defined templates per domain (Health, Family, Learning) are specified in PRD section 6.3.6. Templates should pre-fill fields but remain editable. Store custom templates in localStorage for Phase 2.

### Time Tracking
Each task can have an active timer. Only one timer can run at a time across all tasks. Store time sessions as array of {startTime, endTime, duration} objects.

## Color Coding

Strictly follow the color scheme in PRD Appendix A:
- Health: #10B981 (Green)
- Family: #3B82F6 (Blue)
- Learning: #8B5CF6 (Purple)
- High Priority: #EF4444 (Red)
- Medium Priority: #F59E0B (Orange)
- Low Priority: #6B7280 (Gray)

## Component Structure

Organize by feature, not by type:
```
src/
  features/
    kanban/         # Kanban board, columns, drag-drop logic
    tasks/          # Task card, task form, task details
    calendar/       # Calendar views and integration
    goals/          # Goal tracking and progress
    dashboard/      # Overview and statistics
    templates/      # Task templates
  contexts/         # React contexts for state
  hooks/            # Custom hooks (useLocalStorage, useUndoRedo, useKeyboardShortcuts)
  utils/            # Utility functions
  types/            # TypeScript type definitions
```

## Migration Planning (Phase 3)

When adding backend, implement a migration utility to:
1. Read all localStorage data
2. POST to backend API with batch import endpoint
3. Clear localStorage after successful migration
4. Add sync mechanism for subsequent changes

Keep localStorage logic isolated in custom hooks to make backend integration easier.
