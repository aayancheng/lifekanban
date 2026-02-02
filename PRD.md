# Product Requirements Document (PRD)
# LifeKanban - Personal Life Event Management App

**Version:** 1.0
**Date:** January 27, 2026
**Author:** Product Team

---

## 1. Executive Summary

LifeKanban is a personal life event management web application designed to help individuals organize and track important aspects of their lives across three key domains: **Health**, **Family**, and **Learning**. Using a Kanban-style visual board system with calendar integration and goal tracking, users can effectively manage tasks, set priorities, and monitor progress toward their personal goals.

---

## 2. Problem Statement

Modern life involves juggling multiple responsibilities across different life areas. People struggle to:
- Keep track of health appointments, fitness goals, and wellness habits
- Manage family events, responsibilities, and quality time activities
- Pursue continuous learning and personal development goals

Without a unified system, important tasks slip through the cracks, goals remain unmet, and life balance becomes difficult to maintain.

---

## 3. Product Vision

**Vision Statement:** Empower individuals to take control of their personal life management through an intuitive, visual, and goal-oriented task management system.

**Target User:** Individuals seeking a personal tool to organize and track life events across health, family, and learning domains.

---

## 4. Goals & Success Metrics

### 4.1 Product Goals
- Provide a simple, intuitive interface for managing life tasks
- Enable visual tracking of tasks across multiple life domains
- Support goal setting and progress monitoring
- Integrate calendar functionality for time-based planning

### 4.2 Success Metrics (Personal Use)
- Daily active usage
- Task completion rate
- Goal achievement rate
- User satisfaction with organization

---

## 5. User Personas

### Primary Persona: Self-Organizer
- **Demographics:** Adult individual managing personal responsibilities
- **Goals:** Stay organized, achieve personal goals, maintain life balance
- **Pain Points:** Scattered task lists, forgotten appointments, lack of progress visibility
- **Needs:** Single place to manage all life areas, visual progress tracking, reminders

---

## 6. Scope & Features

### 6.1 Life Domains (Categories)

| Domain | Description | Example Tasks |
|--------|-------------|---------------|
| **Health** | Physical and mental wellness | Doctor appointments, workout routines, medication tracking, mental health activities |
| **Family** | Family relationships and responsibilities | Family events, quality time activities, household tasks, important dates |
| **Learning** | Personal growth and education | Online courses, books to read, skills to develop, certifications |

### 6.2 Core Features (MVP - Version 1.0)

#### 6.2.1 Kanban Boards
- **Description:** Visual board with draggable task cards organized in columns
- **Columns:**
  - To Do
  - In Progress
  - Done
- **Functionality:**
  - Separate board for each life domain (Health, Family, Learning)
  - Drag-and-drop task movement between columns
  - Visual task cards with key information
  - Quick add task functionality

#### 6.2.2 Task Management
- **Task Properties:**
  - Title (required)
  - Description (optional)
  - Category/Domain (Health, Family, Learning)
  - Priority Level (High, Medium, Low)
  - Due Date (optional)
  - Status (To Do, In Progress, Done)
  - Created Date
  - Completed Date
- **Priority Indicators:**
  - High: Red indicator
  - Medium: Yellow/Orange indicator
  - Low: Green indicator

#### 6.2.3 Calendar Integration
- **Description:** Calendar view showing tasks with due dates
- **Views:**
  - Monthly calendar view
  - Weekly calendar view
- **Functionality:**
  - Display tasks on their due dates
  - Color-coded by domain
  - Click to view/edit task details
  - Quick navigation between dates

#### 6.2.4 Goal Tracking & Progress
- **Description:** Set goals for each life domain and track progress
- **Goal Properties:**
  - Goal title
  - Description
  - Target date
  - Associated domain
  - Progress percentage
  - Linked tasks
- **Functionality:**
  - Create goals per domain
  - Link tasks to goals
  - Visual progress bar
  - Goal completion tracking

### 6.3 Additional Features (Version 1.0)

#### 6.3.1 Dashboard
- Overview of all domains
- Summary statistics (tasks completed, in progress, overdue)
- Upcoming tasks/deadlines
- Goal progress overview

#### 6.3.2 Filtering & Sorting
- Filter tasks by domain
- Filter by priority
- Filter by status
- Sort by due date, priority, or creation date

#### 6.3.3 Search
- Search tasks by title or description
- Quick find functionality
- Keyboard shortcut: '/' to focus search

#### 6.3.4 Keyboard Shortcuts
- **'n' or 'c'**: Create new task
- **'/'**: Focus search bar
- **'?'**: Show keyboard shortcuts help
- **'Escape'**: Close modals/dialogs
- **Arrow keys**: Navigate between tasks
- **'h/f/l'**: Switch between Health/Family/Learning boards
- **'d'**: Open dashboard
- **'g'**: Open goals page
- **'k'**: Open calendar (Kanban pun!)

#### 6.3.5 Undo/Redo Functionality
- **Description:** Allow users to revert accidental changes
- **Functionality:**
  - Undo last action (Ctrl/Cmd + Z)
  - Redo undone action (Ctrl/Cmd + Shift + Z)
  - Track history of actions: task creation, deletion, status changes, edits
  - Visual feedback when undo/redo is performed
  - Limited to last 20 actions per session

#### 6.3.6 Task Templates
- **Description:** Pre-defined task templates for common activities
- **Default Templates by Domain:**
  - **Health:**
    - Doctor Appointment (includes time, location fields)
    - Workout Session (includes duration, type)
    - Medication Refill (includes pharmacy info)
  - **Family:**
    - Family Event (includes attendees, location)
    - Quality Time Activity (includes participants)
    - Household Task (includes estimated time)
  - **Learning:**
    - Online Course (includes platform, duration)
    - Book Reading (includes pages, chapters)
    - Skill Practice (includes resources)
- **Functionality:**
  - Select template when creating task
  - Pre-filled fields based on template
  - Customizable templates (Post-MVP)

#### 6.3.7 Time Tracking
- **Description:** Track time spent on tasks, especially for learning activities
- **Functionality:**
  - Start/stop timer on any task
  - Manual time entry option
  - Display total time spent per task
  - Time statistics in dashboard
  - Time summaries by domain and week/month
  - Integration with task cards (show time icon if tracked)

---

## 7. Technical Requirements

### 7.1 Technology Stack

| Layer | Technology | Rationale |
|-------|------------|-----------|
| **Frontend** | React.js | Component-based, large ecosystem, strong community support |
| **State Management** | React Context API | Manage application state efficiently, sufficient for MVP |
| **Styling** | Tailwind CSS | Utility-first CSS, rapid UI development, consistent design system |
| **Drag & Drop** | dnd-kit | Modern, accessible, performant drag-and-drop with excellent TypeScript support |
| **Calendar** | react-big-calendar | Lightweight, customizable calendar with month/week views |
| **Backend** | Node.js + Express.js | JavaScript consistency, fast development (Phase 3) |
| **Database** | PostgreSQL | Relational database with strong data integrity, ACID compliance (Phase 3) |
| **Authentication** | JWT (for future multi-device sync) | Secure, stateless authentication (Post-MVP) |
| **Local Storage** | localStorage API + JSON | Client-side data persistence for Phase 1 MVP |

### 7.2 Architecture Overview

```
┌─────────────────────────────────────────────────────────┐
│                    Frontend (React)                      │
│  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐    │
│  │Dashboard│  │ Kanban  │  │Calendar │  │  Goals  │    │
│  │  View   │  │ Boards  │  │  View   │  │ Tracker │    │
│  └─────────┘  └─────────┘  └─────────┘  └─────────┘    │
└─────────────────────────────────────────────────────────┘
                            │
                      REST API / GraphQL
                            │
┌─────────────────────────────────────────────────────────┐
│                  Backend (Node.js/Express)               │
│  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐    │
│  │  Tasks  │  │  Goals  │  │Categories│  │  User   │    │
│  │ Service │  │ Service │  │ Service  │  │ Service │    │
│  └─────────┘  └─────────┘  └─────────┘  └─────────┘    │
└─────────────────────────────────────────────────────────┘
                            │
                        Database
                     (MongoDB/PostgreSQL)
```

### 7.3 Data Models

#### Task Model
```javascript
{
  id: String (UUID),
  title: String,
  description: String,
  domain: Enum ['health', 'family', 'learning'],
  priority: Enum ['high', 'medium', 'low'],
  status: Enum ['todo', 'in_progress', 'done'],
  dueDate: Date,
  goalId: String (optional, reference to Goal),
  templateType: String (optional, e.g., 'doctor_appointment', 'workout'),
  timeTracking: {
    totalSeconds: Number (default: 0),
    sessions: Array [{
      startTime: Date,
      endTime: Date,
      duration: Number (seconds)
    }],
    isTracking: Boolean (default: false),
    currentSessionStart: Date (optional)
  },
  createdAt: Date,
  updatedAt: Date,
  completedAt: Date
}
```

#### Goal Model
```javascript
{
  id: String (UUID),
  title: String,
  description: String,
  domain: Enum ['health', 'family', 'learning'],
  targetDate: Date,
  progress: Number (0-100),
  status: Enum ['active', 'completed', 'archived'],
  createdAt: Date,
  updatedAt: Date
}
```

### 7.4 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/tasks | Get all tasks |
| GET | /api/tasks/:id | Get task by ID |
| POST | /api/tasks | Create new task |
| PUT | /api/tasks/:id | Update task |
| DELETE | /api/tasks/:id | Delete task |
| PATCH | /api/tasks/:id/status | Update task status |
| GET | /api/goals | Get all goals |
| GET | /api/goals/:id | Get goal by ID |
| POST | /api/goals | Create new goal |
| PUT | /api/goals/:id | Update goal |
| DELETE | /api/goals/:id | Delete goal |
| GET | /api/dashboard/stats | Get dashboard statistics |
| GET | /api/tasks/:id/time | Get time tracking data for task |
| POST | /api/tasks/:id/time/start | Start time tracking session |
| POST | /api/tasks/:id/time/stop | Stop time tracking session |
| GET | /api/templates | Get all task templates |
| POST | /api/templates | Create custom template |
| GET | /api/history | Get action history (for undo/redo) |

---

## 8. User Interface Requirements

### 8.1 Page Structure

1. **Navigation Bar**
   - App logo/name
   - Navigation links (Dashboard, Boards, Calendar, Goals)
   - Search bar

2. **Dashboard Page**
   - Welcome message
   - Quick stats cards (tasks by status, upcoming deadlines)
   - Domain-wise progress overview
   - Quick add task button

3. **Kanban Board Page**
   - Domain tabs/selector (Health, Family, Learning, All)
   - Three columns: To Do, In Progress, Done
   - Draggable task cards
   - Add task button per column

4. **Calendar Page**
   - Month/Week view toggle
   - Calendar grid with task indicators
   - Task details on click
   - Navigation controls

5. **Goals Page**
   - Goal cards organized by domain
   - Progress bars
   - Add goal functionality
   - Goal detail view

### 8.2 Task Card Design

```
┌────────────────────────────────┐
│ [Priority Dot] Task Title      │
│ ─────────────────────────────  │
│ 📅 Due: Jan 30, 2026           │
│ 🏷️ Health    ⏱️ 2h 30m        │
│ [Template Badge if applicable] │
│ ─────────────────────────────  │
│ [▶️ Timer] [Edit] [Delete]     │
└────────────────────────────────┘
```

**Card Elements:**
- Priority indicator (colored dot: red/orange/gray)
- Task title (truncated if long)
- Due date badge
- Domain label with color coding
- Time tracking badge (if time logged)
- Template indicator (if created from template)
- Action buttons: Start/Stop timer, Edit, Delete

### 8.3 Design Principles
- Clean, minimal interface
- Consistent color coding for domains and priorities
- Responsive design (desktop and mobile friendly)
- Intuitive drag-and-drop interactions
- Clear visual hierarchy

---

## 9. Non-Functional Requirements

### 9.1 Performance
- Page load time: < 2 seconds
- Smooth drag-and-drop (60fps)
- Responsive UI interactions

### 9.2 Usability
- Intuitive navigation
- Minimal clicks to complete common actions
- Clear feedback for user actions

### 9.3 Accessibility
- Keyboard navigation support
- Screen reader compatibility
- Sufficient color contrast

### 9.4 Browser Support
- Chrome (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Edge (latest 2 versions)

### 9.5 Data Persistence
- Local storage for offline capability (Phase 1)
- Database storage for data persistence (Phase 2)

---

## 10. Development Phases

### Phase 1: Foundation (MVP - Client-Side Only)
- Project setup (React + Vite + Tailwind CSS + TypeScript)
- Basic UI components and styling system
- Kanban board with drag-and-drop (dnd-kit)
- Task CRUD operations with local state
- **Local storage for data persistence** (no backend)
- Task templates system
- Keyboard shortcuts implementation
- Undo/redo functionality with action history
- Basic time tracking (start/stop timer)

### Phase 2: Enhanced Features (Still Client-Side)
- Calendar integration (react-big-calendar)
- Goal tracking system
- Dashboard with statistics and time tracking summaries
- Advanced filtering and sorting
- Enhanced time tracking analytics
- Task templates customization

### Phase 3: Backend Integration
- Node.js/Express backend setup
- **PostgreSQL database integration**
- API development (RESTful endpoints)
- Data migration from local storage to PostgreSQL
- Data sync between client and server
- Enhanced data persistence and backup

### Phase 4: Polish & Optimization
- Performance optimization
- UI/UX refinements
- Testing and bug fixes
- Documentation

---

## 11. Future Considerations (Post-MVP)

- User authentication for multi-device sync
- Recurring tasks
- Reminders and notifications
- Data export/import
- Dark mode theme
- Mobile app version
- Sharing and collaboration features
- Analytics and insights
- Integration with external calendars (Google, Apple)

---

## 12. Risks & Mitigations

| Risk | Impact | Mitigation |
|------|--------|------------|
| Scope creep | Delayed delivery | Strict MVP feature set, phased approach |
| Technical complexity | Development delays | Use proven libraries, start simple |
| Data loss | User frustration | Implement robust data persistence early |

---

## 13. Appendix

### A. Color Scheme Suggestion

| Element | Color | Hex |
|---------|-------|-----|
| Health Domain | Green | #10B981 |
| Family Domain | Blue | #3B82F6 |
| Learning Domain | Purple | #8B5CF6 |
| High Priority | Red | #EF4444 |
| Medium Priority | Orange | #F59E0B |
| Low Priority | Gray | #6B7280 |

### B. Wireframe References

*To be added during design phase*

---

---

## 14. Summary of Enhanced Features (Post-Discussion)

Based on product discussions, the following enhancements have been integrated into the MVP:

### Technical Stack (Confirmed)
- **Client-side first approach** with local storage for Phase 1
- **Tailwind CSS** for styling
- **dnd-kit** for drag-and-drop functionality
- **react-big-calendar** for calendar views
- **PostgreSQL** for future backend (Phase 3)
- **TypeScript** recommended for type safety

### New UX Features
1. **Keyboard Shortcuts**: Power user features for quick navigation and task management
2. **Undo/Redo**: Action history with Ctrl/Cmd+Z support (last 20 actions)
3. **Task Templates**: Pre-defined templates for common activities in each domain
4. **Time Tracking**: Built-in timer and manual time entry with analytics

### Implementation Priority
- Phase 1 focuses on core Kanban + keyboard shortcuts + undo/redo + task templates + basic time tracking
- Phase 2 adds calendar, goals, and advanced time tracking analytics
- Phase 3 introduces backend with PostgreSQL and data sync

---

**Document Status:** Enhanced & Ready for Development
**Date Updated:** January 27, 2026
**Next Steps:** Begin Phase 1 implementation
**Approved By:** Product Team
