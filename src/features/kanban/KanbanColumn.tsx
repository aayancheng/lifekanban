import { useState, useRef, useEffect } from 'react'
import { useDroppable } from '@dnd-kit/core'
import { Task } from '../../types'
import TaskCard from '../tasks/TaskCard'

interface KanbanColumnProps {
  id: string
  title: string
  icon?: JSX.Element
  tasks: Task[]
  count: number
  onQuickAdd: (title: string) => void
}

export default function KanbanColumn({ id, title, icon, tasks, count, onQuickAdd }: KanbanColumnProps) {
  const { setNodeRef, isOver } = useDroppable({ id })
  const [isQuickAddOpen, setIsQuickAddOpen] = useState(false)
  const [quickAddTitle, setQuickAddTitle] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isQuickAddOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isQuickAddOpen])

  const handleQuickAddSubmit = () => {
    const trimmed = quickAddTitle.trim()
    if (trimmed) {
      onQuickAdd(trimmed)
      setQuickAddTitle('')
      // Keep the input open for rapid entry
    }
  }

  const handleQuickAddKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleQuickAddSubmit()
    } else if (e.key === 'Escape') {
      setIsQuickAddOpen(false)
      setQuickAddTitle('')
    }
  }

  const handleQuickAddBlur = () => {
    const trimmed = quickAddTitle.trim()
    if (trimmed) {
      onQuickAdd(trimmed)
    }
    setQuickAddTitle('')
    setIsQuickAddOpen(false)
  }

  return (
    <div className="flex flex-col h-full">
      {/* Column Header */}
      <div className="flex items-center justify-between mb-4 px-1">
        <div className="flex items-center space-x-2">
          {icon && (
            <span className="text-ink-400">{icon}</span>
          )}
          <h3 className="font-display text-sm font-semibold text-ink-700">
            {title}
          </h3>
        </div>
        <div className="flex items-center space-x-2">
          <span className="bg-ink-100 text-ink-600 text-xs font-semibold px-2.5 py-1 rounded-lg">
            {count}
          </span>
          <button
            onClick={() => setIsQuickAddOpen(!isQuickAddOpen)}
            className="w-7 h-7 flex items-center justify-center rounded-lg text-ink-400 hover:text-ink-700 hover:bg-ink-100/50 transition-all duration-200"
            title="Quick add task"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </button>
        </div>
      </div>

      {/* Drop Zone */}
      <div
        ref={setNodeRef}
        className={`kanban-column flex-1 space-y-3 min-h-[500px] transition-all duration-300 ${
          isOver
            ? 'ring-2 ring-accent/30 bg-accent-light/30'
            : ''
        }`}
      >
        {/* Quick Add Input */}
        {isQuickAddOpen && (
          <div className="animate-slide-down">
            <input
              ref={inputRef}
              type="text"
              value={quickAddTitle}
              onChange={(e) => setQuickAddTitle(e.target.value)}
              onKeyDown={handleQuickAddKeyDown}
              onBlur={handleQuickAddBlur}
              placeholder="Task title, then Enter..."
              className="w-full px-3 py-2.5 text-sm rounded-xl border border-ink-900/10 bg-white/90 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-ink-900/20 focus:border-transparent placeholder:text-ink-300 transition-all duration-200"
            />
          </div>
        )}

        {tasks.map((task, index) => (
          <div key={task.id} className={`animate-fade-in stagger-${Math.min(index + 1, 6)}`}>
            <TaskCard task={task} />
          </div>
        ))}

        {tasks.length === 0 && !isOver && !isQuickAddOpen && (
          <button
            onClick={() => setIsQuickAddOpen(true)}
            className="flex flex-col items-center justify-center h-40 text-center w-full group cursor-pointer"
          >
            <div className="w-12 h-12 rounded-2xl bg-ink-100 flex items-center justify-center mb-3 group-hover:bg-ink-200/60 transition-colors">
              <svg className="w-6 h-6 text-ink-300 group-hover:text-ink-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
              </svg>
            </div>
            <p className="text-sm font-medium text-ink-400 group-hover:text-ink-500 transition-colors">Add a task</p>
            <p className="text-xs text-ink-300 mt-1">Click to get started</p>
          </button>
        )}

        {isOver && tasks.length === 0 && (
          <div className="flex items-center justify-center h-40 border-2 border-dashed border-accent/40 rounded-xl bg-accent-light/20">
            <p className="text-sm font-medium text-accent">Drop task here</p>
          </div>
        )}
      </div>
    </div>
  )
}
