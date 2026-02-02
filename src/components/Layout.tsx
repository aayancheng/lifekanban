import { ReactNode, useState, useRef } from 'react'
import Navigation from './Navigation'
import KeyboardShortcutsHelp from './KeyboardShortcutsHelp'
import TaskModal from '../features/tasks/TaskModal'
import { useGlobalShortcuts } from '../hooks/useKeyboardShortcuts'

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false)
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false)
  const searchInputRef = useRef<HTMLInputElement>(null)

  const handleSearchFocus = () => {
    searchInputRef.current?.focus()
  }

  const handleNewTask = () => {
    setIsTaskModalOpen(true)
  }

  const handleShowHelp = () => {
    setIsHelpModalOpen(true)
  }

  // Setup global keyboard shortcuts
  useGlobalShortcuts(handleNewTask, handleSearchFocus, handleShowHelp)

  return (
    <div className="min-h-screen">
      <Navigation searchInputRef={searchInputRef} />
      <main className="container mx-auto px-6 py-8">
        {children}
      </main>

      {/* Global Modals */}
      <TaskModal isOpen={isTaskModalOpen} onClose={() => setIsTaskModalOpen(false)} />
      <KeyboardShortcutsHelp isOpen={isHelpModalOpen} onClose={() => setIsHelpModalOpen(false)} />
    </div>
  )
}
