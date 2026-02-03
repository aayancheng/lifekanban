# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

LifeKanban is a personal life event management web application with Kanban boards for three domains: Health, Family, and Learning. The project follows a phased development approach starting with a client-side-only MVP.

---

## Version History

### v1.1.1 - Production Deployment (Current)
**Date:** February 3, 2026
**Milestone:** Successfully deployed to Vercel with CI/CD

**Deployment Achievements:**
- Fixed TypeScript build errors (6 files)
- Configured Vercel deployment with `vercel.json`
- Set up GitHub repository: `aayancheng/lifekanban`
- Established continuous deployment pipeline
- Production URL: Vercel-hosted application
- Automatic deployments on push to `main` branch

**Technical Fixes:**
- Removed unused imports across components
- Fixed Domain type comparisons in KanbanBoard
- Corrected localStorage StorageKey types
- Fixed timeout type from `NodeJS.Timeout` to `ReturnType<typeof setTimeout>`
- Updated `.vercelignore` to exclude only development files

**Infrastructure:**
- GitHub: https://github.com/aayancheng/lifekanban
- Vercel: Auto-deployment on commit
- Client-side routing configured with rewrites
- Asset caching (1-year) and security headers enabled

---

### v1.1.0 - Design System Overhaul
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

---

## Deployment to Vercel

The project is configured and ready for deployment to Vercel. All TypeScript build errors have been resolved and necessary configuration files are in place.

### Prerequisites

**Required Tools:**
```bash
# Vercel CLI (for Option A)
npm install -g vercel

# Git (should already be installed)
git --version

# GitHub CLI (for Option B - optional)
brew install gh
gh auth login
```

### Deployment Configuration Files

The following files are already configured:

- **`vercel.json`** - Vercel deployment configuration
  - Client-side routing rewrites (serves `index.html` for all routes)
  - Asset caching headers (1-year cache for static assets)
  - Security headers (XSS protection, clickjacking prevention)

- **`.vercelignore`** - Optimizes deployment by excluding unnecessary files
  - Excludes `node_modules`, `dist`, `src`, and development files

- **`.gitignore`** - Includes `.vercel` directory to exclude Vercel CLI configs

### Option A: Quick Deploy with Vercel CLI

**Best for:** Fast deployment, testing, or one-time deployments

```bash
# 1. Login to Vercel
vercel login
# Choose authentication method (Email, GitHub, or GitLab)

# 2. Deploy to preview environment
vercel
# Answer prompts:
#   - Set up and deploy? → Y
#   - Which scope? → [Your account]
#   - Link to existing project? → N
#   - Project name? → lifekanban
#   - Code directory? → ./ (press Enter)
#   - Override settings? → N

# 3. Test the preview URL provided
# Visit the URL and test all functionality

# 4. Deploy to production
vercel --prod
```

**Result:** Production URL like `https://lifekanban.vercel.app`

**Useful CLI Commands:**
```bash
vercel ls                    # List all deployments
vercel logs [url]            # View deployment logs
vercel promote [url]         # Promote deployment to production
vercel domains               # Manage custom domains
vercel env                   # Manage environment variables
```

### Option B: GitHub Integration (Recommended)

**Best for:** Continuous deployment, team collaboration, automatic previews

**Step 1: Create GitHub Repository**

Using GitHub CLI:
```bash
# Create and push to GitHub
gh repo create lifekanban --public --source=. --remote=origin
git push -u origin main
```

Or manually:
```bash
# Create repository at https://github.com/new
git remote add origin https://github.com/YOUR_USERNAME/lifekanban.git
git branch -M main
git push -u origin main
```

**Step 2: Connect Vercel to GitHub**

1. Go to https://vercel.com/new
2. Click "Import Git Repository"
3. Select your GitHub account (install Vercel app if first time)
4. Choose the `lifekanban` repository
5. Verify auto-detected settings:
   - Framework Preset: **Vite**
   - Root Directory: `./`
   - Build Command: `npm run build`
   - Output Directory: `dist`
6. Click **Deploy**

**Step 3: Automatic Deployment Workflow**

Once connected, Vercel automatically:
- **Production deployments**: Triggered on push to `main` branch
- **Preview deployments**: Created for every pull request
- **Unique URLs**: Each commit gets its own preview URL

**Future workflow:**
```bash
# Make changes
git add .
git commit -m "Add new feature"
git push origin main

# Vercel automatically builds and deploys
# Deployment notifications sent via email/Slack
```

### Post-Deployment Testing

**Critical Routes to Test:**
```
https://lifekanban.vercel.app/              # Dashboard
https://lifekanban.vercel.app/board         # All domains Kanban
https://lifekanban.vercel.app/board/health  # Health domain
https://lifekanban.vercel.app/board/family  # Family domain
https://lifekanban.vercel.app/board/learning # Learning domain
```

**Testing Checklist:**
- [ ] All routes load without 404 errors (client-side routing works)
- [ ] Create new task (modal opens, form validates, saves)
- [ ] Edit existing task
- [ ] Delete task with confirmation
- [ ] Drag and drop tasks between columns
- [ ] Start/stop time tracker
- [ ] localStorage persists after page refresh
- [ ] Keyboard shortcuts work (n, d, k, ?, Esc, Ctrl/Cmd+Z)
- [ ] Custom fonts load (Fraunces for headings, DM Sans for body)
- [ ] Domain colors display correctly
- [ ] Responsive layout on mobile devices
- [ ] No console errors in browser DevTools

**Performance Validation:**
1. Run Lighthouse audit in Chrome DevTools
2. Target scores: Performance >90, Accessibility >90, Best Practices >90
3. Check Network tab for proper asset caching

### Troubleshooting

**Issue: 404 on Direct Route Access**
- **Symptom:** Visiting `/board/health` directly returns 404
- **Solution:** Verify `vercel.json` has `rewrites` configuration, redeploy

**Issue: Fonts Not Loading**
- **Symptom:** System fonts appear instead of Fraunces/DM Sans
- **Solution:** Check Network tab - Google Fonts should load from CDN (configured in `src/index.css`)

**Issue: localStorage Not Working**
- **Symptom:** Tasks disappear after refresh
- **Cause:** Browser localStorage disabled (user browser setting)
- **Note:** Not a deployment issue - this is browser-specific

**Issue: Build Fails on Vercel**
- **Symptom:** Deployment fails with TypeScript errors
- **Solution:** Run `npm run build` locally first to catch errors before deploying

### Rollback Strategy

**Quick Rollback via Vercel Dashboard:**
1. Go to Vercel Dashboard → Deployments
2. Find previous working deployment
3. Click "..." → "Promote to Production"

**Via CLI:**
```bash
vercel ls                    # List deployments
vercel promote [old-url]     # Promote specific deployment
```

**Via Git:**
```bash
git revert HEAD
git push origin main
# Vercel auto-deploys reverted version
```

### Custom Domain Setup (Optional)

**Add Custom Domain:**
1. Go to Vercel Dashboard → Project Settings → Domains
2. Click "Add Domain"
3. Enter your domain (e.g., `lifekanban.com`)
4. Configure DNS records:
   ```
   A     @    76.76.21.21
   CNAME www  cname.vercel-dns.com
   ```
5. Wait for DNS propagation (up to 48 hours, usually <1 hour)
6. SSL certificate auto-provisioned by Vercel (Let's Encrypt)

### Build Information

**Current Build Output:**
- **CSS Bundle:** 31.62 KB (6.21 KB gzipped)
- **JS Bundle:** 246.15 KB (77.31 KB gzipped)
- **Build Time:** ~500ms
- **Total Files:** 3 (index.html + CSS + JS)

**Optimization Notes:**
- Asset caching configured for 1 year (`max-age=31536000`)
- Security headers enabled (XSS, clickjacking protection)
- Vite automatically code-splits and tree-shakes
- Google Fonts loaded from CDN with `display=swap`

---

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

---

## Enhancement Todos (Post-Deployment)

### Immediate Quick Wins
- [ ] **Add Favicon**: Replace default Vite icon with custom LifeKanban logo
- [ ] **Add README.md**: Project overview, features, tech stack, and demo link
- [ ] **Add LICENSE**: Choose appropriate license (MIT recommended)
- [ ] **Add Screenshot**: Capture app screenshot for GitHub repository
- [ ] **Update Page Title**: Add dynamic titles per route (Dashboard, Health Board, etc.)
- [ ] **Add Loading State**: Show skeleton while app initializes
- [ ] **Add Error Boundary**: Catch and display React errors gracefully
- [ ] **Add Toast Notifications**: Success/error feedback for actions (task created, deleted, etc.)

### Performance Optimizations
- [ ] **Lazy Load Routes**: Code-split Dashboard and KanbanBoard with React.lazy()
- [ ] **Optimize Bundle Size**: Analyze with `npm run build -- --mode analyze`
- [ ] **Add Service Worker**: Enable offline functionality with Vite PWA plugin
- [ ] **Optimize Fonts**: Self-host Fraunces and DM Sans instead of Google CDN
- [ ] **Add Image Optimization**: If adding images, use WebP format
- [ ] **Implement Virtual Scrolling**: For large task lists (react-window)

### User Experience Enhancements
- [ ] **Add Dark Mode**: Implement theme toggle with localStorage persistence
- [ ] **Add Keyboard Navigation**: Arrow keys to navigate tasks, Enter to edit
- [ ] **Add Bulk Actions**: Select multiple tasks for batch delete/move
- [ ] **Add Task Filtering**: Quick filters for "Due Today", "Overdue", "High Priority"
- [ ] **Add Task Sorting**: Sort by due date, priority, or creation date
- [ ] **Add Completed Tasks Archive**: Separate view for completed tasks
- [ ] **Add Task Notes**: Rich text notes field for detailed task information
- [ ] **Add Task Tags**: Custom tags/labels for better organization
- [ ] **Add Color Themes per Domain**: Customizable color schemes
- [ ] **Add Confetti Animation**: Celebrate task completion

### Data Management
- [ ] **Add Data Export**: Download tasks as JSON or CSV
- [ ] **Add Data Import**: Upload tasks from JSON file
- [ ] **Add Data Backup Reminder**: Prompt user to backup weekly
- [ ] **Add Storage Usage Indicator**: Show localStorage capacity used
- [ ] **Add Data Clear with Confirmation**: Clear all data with double confirmation
- [ ] **Add Sample Data Generator**: Load demo tasks for new users

### Analytics & Insights
- [ ] **Add Time Tracking Dashboard**: Visualize time spent per domain
- [ ] **Add Productivity Trends**: Charts showing task completion over time
- [ ] **Add Weekly Summary**: Email-like summary of week's accomplishments
- [ ] **Add Streak Counter**: Track consecutive days of task completion
- [ ] **Add Domain Balance**: Visual indicator of time distribution across domains
- [ ] **Add Goal Progress**: Show percentage toward weekly/monthly goals

### Mobile & Accessibility
- [ ] **Add Touch Gestures**: Swipe to complete/delete on mobile
- [ ] **Add Mobile-Optimized Layout**: Simplified UI for small screens
- [ ] **Add ARIA Labels**: Screen reader support for all interactive elements
- [ ] **Add Focus Indicators**: Clear visual focus for keyboard navigation
- [ ] **Add Color Contrast Check**: Ensure WCAG AA compliance
- [ ] **Add Reduced Motion Option**: Respect prefers-reduced-motion

### Developer Experience
- [ ] **Add Pre-commit Hooks**: Run ESLint and type-check before commit (husky)
- [ ] **Add Unit Tests**: Jest/Vitest for utility functions
- [ ] **Add Component Tests**: React Testing Library for components
- [ ] **Add E2E Tests**: Playwright for critical user flows
- [ ] **Add CI/CD Pipeline**: GitHub Actions for automated testing
- [ ] **Add Code Coverage**: Track test coverage with codecov
- [ ] **Add Changelog**: Automated changelog from commit messages
- [ ] **Add Contribution Guide**: CONTRIBUTING.md for open source contributors

### SEO & Marketing
- [ ] **Add Meta Tags**: Open Graph and Twitter Card for social sharing
- [ ] **Add Sitemap**: Generate sitemap.xml for search engines
- [ ] **Add Robots.txt**: Configure search engine crawling
- [ ] **Add Google Analytics**: Track user behavior (with consent)
- [ ] **Add Landing Page**: Marketing page explaining features
- [ ] **Add Demo Video**: Screen recording showing app features
- [ ] **Add Blog Post**: Write about building the app

### Integration Ideas
- [ ] **Add Calendar Sync**: Export tasks to Google Calendar/iCal
- [ ] **Add Notion Integration**: Sync tasks with Notion database
- [ ] **Add Slack Notifications**: Daily task reminders via Slack
- [ ] **Add Email Reminders**: Send due date reminders via email
- [ ] **Add GitHub Integration**: Create tasks from GitHub issues
- [ ] **Add API**: RESTful API for programmatic access

### Advanced Features (Phase 2+)
- [ ] **Add Recurring Tasks**: Schedule tasks to repeat (daily, weekly, etc.)
- [ ] **Add Sub-tasks**: Break down tasks into smaller steps with checkboxes
- [ ] **Add Task Dependencies**: Block tasks until prerequisites complete
- [ ] **Add Time Estimates**: Estimate task duration and compare to actual
- [ ] **Add Pomodoro Timer**: Built-in Pomodoro technique timer
- [ ] **Add Focus Mode**: Distraction-free single-task view
- [ ] **Add Collaboration**: Share boards with family/team members
- [ ] **Add Real-time Sync**: Multi-device synchronization with backend

### Documentation Improvements
- [ ] **Add API Documentation**: Document component props and hooks
- [ ] **Add Architecture Diagram**: Visual representation of app structure
- [ ] **Add Tutorial**: Interactive first-time user guide
- [ ] **Add FAQ**: Common questions and troubleshooting
- [ ] **Add Video Walkthrough**: Screen recording with narration
- [ ] **Add Deployment Guide**: Step-by-step deployment to other platforms
