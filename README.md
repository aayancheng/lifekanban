# LifeKanban

> A beautiful personal life management app with Kanban boards for Health, Family, and Learning

[![React](https://img.shields.io/badge/React-18+-61DAFB?style=flat&logo=react&logoColor=white)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-3178C6?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.0+-646CFF?style=flat&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.0+-06B6D4?style=flat&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)

<!-- Add your screenshot here -->
<!-- ![LifeKanban Dashboard](./docs/screenshot-dashboard.png) -->

## ✨ Features

### 🎯 Three Life Domains
- **Health** - Track workouts, appointments, medications
- **Family** - Manage events, quality time, household tasks
- **Learning** - Organize courses, reading, skill practice

### 📊 Kanban Boards
- Drag-and-drop task management
- Three columns: To Do, In Progress, Done
- Domain-specific views with color coding
- Visual task counts per column

### ⏱️ Time Tracking
- Start/stop timer on any task
- Track time sessions with precision
- View total time spent per task
- Single active timer constraint

### 🎨 Beautiful Design System
- **Calm Productivity** aesthetic - Japanese minimalism meets modern productivity
- Custom typography (Fraunces + DM Sans)
- Warm color palette with domain-specific accents
- Smooth animations and micro-interactions
- Glass morphism cards with depth

### ⚡ Keyboard Shortcuts
| Shortcut | Action |
|----------|--------|
| `n` or `c` | Create new task |
| `/` | Focus search |
| `d` | Go to Dashboard |
| `k` | Go to Kanban board |
| `h` / `f` / `l` | Health / Family / Learning board |
| `?` | Show shortcuts help |
| `Ctrl/Cmd+Z` | Undo |
| `Ctrl/Cmd+Shift+Z` | Redo |
| `Esc` | Close modals |

### 📝 Task Templates
Pre-defined templates for quick task creation:
- **Health**: Doctor Appointment, Workout, Medication
- **Family**: Family Event, Quality Time, Household Task
- **Learning**: Online Course, Book Reading, Skill Practice

### 💾 Data Persistence
- Client-side localStorage for instant access
- Automatic save on every change
- Undo/redo history (last 20 actions)
- No backend required - fully private

## 🚀 Live Demo

<!-- Add your Vercel URL here -->
**[View Live App →](https://your-app.vercel.app)**

## 🛠️ Tech Stack

- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS with custom design system
- **Drag & Drop**: dnd-kit
- **Routing**: React Router v6
- **State Management**: React Context API
- **Data Storage**: localStorage (client-side)
- **Deployment**: Vercel

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/aayancheng/lifekanban.git
cd lifekanban

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at [http://localhost:3000](http://localhost:3000)

## 🧑‍💻 Development Commands

```bash
npm run dev      # Start development server with hot reload
npm run build    # Build for production (outputs to /dist)
npm run preview  # Preview production build locally
npm run lint     # Run ESLint for code quality
```

## 📁 Project Structure

```
lifekanban/
├── src/
│   ├── features/          # Feature-based modules
│   │   ├── dashboard/     # Dashboard overview
│   │   ├── kanban/        # Kanban board views
│   │   ├── tasks/         # Task management
│   │   └── templates/     # Task templates
│   ├── contexts/          # React Context providers
│   │   ├── TasksContext   # Task CRUD operations
│   │   ├── HistoryContext # Undo/redo functionality
│   │   └── TimeTrackingContext # Timer management
│   ├── hooks/             # Custom React hooks
│   │   ├── useLocalStorage
│   │   ├── useKeyboardShortcuts
│   │   └── useUndoRedo
│   ├── components/        # Shared UI components
│   ├── types/             # TypeScript type definitions
│   └── utils/             # Utility functions
├── public/                # Static assets
└── docs/                  # Documentation and screenshots
```

## 🎨 Design System

### Color Palette

**Domain Colors:**
- Health: Emerald Green (`#059669`)
- Family: Blue (`#2563EB`)
- Learning: Violet (`#7C3AED`)

**Priority Colors:**
- High: Red (`#DC2626`)
- Medium: Amber (`#D97706`)
- Low: Gray (`#6B7280`)

**Neutrals:**
- Background: Cream (`#FAF8F5`)
- Text: Ink (`#1A1814`)
- Accent: Amber (`#B45309`)

### Typography
- **Display Font**: Fraunces (serif) - Headings and emphasis
- **Body Font**: DM Sans (sans-serif) - Body text and UI

## 🗺️ Roadmap

### Phase 2 (Planned)
- [ ] Calendar integration with month/week views
- [ ] Goals system with progress tracking
- [ ] Advanced filtering and sorting
- [ ] Enhanced time tracking analytics
- [ ] Custom task templates
- [ ] Data export/import

### Phase 3 (Future)
- [ ] Backend integration (Node.js + PostgreSQL)
- [ ] Multi-device sync
- [ ] Collaboration features
- [ ] Mobile apps (React Native)

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Design inspiration from Japanese minimalism and modern productivity tools
- Built with ❤️ using React and TypeScript
- Deployed on Vercel

---

**Made by [Aayan Cheng](https://github.com/aayancheng)** | [Report Bug](https://github.com/aayancheng/lifekanban/issues) | [Request Feature](https://github.com/aayancheng/lifekanban/issues)
