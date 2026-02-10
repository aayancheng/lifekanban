import { Link, useLocation } from 'react-router-dom'
import { RefObject } from 'react'

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

  const isActive = (path: string) => {
    return location.pathname === path
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
                {/* Subtle glow on hover */}
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

          {/* Search */}
          <div className="flex items-center">
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
                className="input pl-11 pr-12 py-2.5 w-72 text-sm"
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <kbd className="hidden sm:inline-flex items-center px-2 py-0.5 text-xs font-medium text-ink-400 bg-ink-100 rounded">
                  /
                </kbd>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
