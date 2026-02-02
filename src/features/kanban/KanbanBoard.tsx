import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { DndContext, DragEndEvent, DragOverlay, DragStartEvent, PointerSensor, TouchSensor, useSensor, useSensors, rectIntersection } from '@dnd-kit/core'
import { useTasks } from '../../contexts/TasksContext'
import { Domain, TaskStatus, Task } from '../../types'
import KanbanColumn from './KanbanColumn'
import TaskCard from '../tasks/TaskCard'
import TaskModal from '../tasks/TaskModal'

const DOMAINS: { value: Domain | 'all'; label: string; color: string }[] = [
  { value: 'all', label: 'All Domains', color: '#1A1814' },
  { value: 'health', label: 'Health', color: '#059669' },
  { value: 'family', label: 'Family', color: '#2563EB' },
  { value: 'learning', label: 'Learning', color: '#7C3AED' },
]

const STATUSES: { value: TaskStatus; label: string; icon: JSX.Element }[] = [
  {
    value: 'todo',
    label: 'To Do',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
      </svg>
    ),
  },
  {
    value: 'in_progress',
    label: 'In Progress',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    value: 'done',
    label: 'Done',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
]

export default function KanbanBoard() {
  const { domain: domainParam } = useParams<{ domain?: string }>()
  const selectedDomain: Domain | 'all' = (domainParam as Domain | 'all') || 'all'

  const { tasks, moveTask } = useTasks()
  const [activeTask, setActiveTask] = useState<Task | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 100,
        tolerance: 5,
      },
    })
  )

  const filteredTasks = selectedDomain === 'all'
    ? tasks
    : tasks.filter(task => task.domain === (selectedDomain as Domain))

  const handleDragStart = (event: DragStartEvent) => {
    const task = tasks.find(t => t.id === event.active.id)
    if (task) {
      setActiveTask(task)
    }
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (!over) {
      setActiveTask(null)
      return
    }

    const taskId = active.id as string
    const newStatus = over.id as TaskStatus

    if (STATUSES.some(s => s.value === newStatus)) {
      moveTask(taskId, newStatus)
    }

    setActiveTask(null)
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-end justify-between">
        <div className="space-y-1">
          <p className="text-sm font-medium text-ink-400 uppercase tracking-wider">
            Kanban
          </p>
          <h1 className="font-display text-4xl font-semibold text-ink-900">
            {selectedDomain === 'all' ? 'All Tasks' : `${(selectedDomain as string).charAt(0).toUpperCase() + (selectedDomain as string).slice(1)} Board`}
          </h1>
          <p className="text-ink-500 mt-2">
            Drag tasks between columns to update their status
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="btn-primary flex items-center space-x-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          <span>New Task</span>
        </button>
      </div>

      {/* Domain Tabs */}
      <div className="flex items-center space-x-1 p-1 bg-white/60 backdrop-blur-sm rounded-2xl border border-ink-900/5 w-fit">
        {DOMAINS.map((domain) => {
          const isActive = selectedDomain === domain.value
          return (
            <a
              key={domain.value}
              href={domain.value === 'all' ? '/board' : `/board/${domain.value}`}
              className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                isActive
                  ? 'bg-ink-900 text-white shadow-sm'
                  : 'text-ink-500 hover:text-ink-700 hover:bg-ink-100/50'
              }`}
            >
              <div
                className={`w-2 h-2 rounded-full transition-colors ${isActive ? 'bg-white' : ''}`}
                style={{ backgroundColor: isActive ? undefined : domain.color }}
              />
              <span>{domain.label}</span>
            </a>
          )
        })}
      </div>

      {/* Kanban Columns */}
      <DndContext
        sensors={sensors}
        collisionDetection={rectIntersection}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {STATUSES.map((status, index) => {
            const columnTasks = filteredTasks.filter(task => task.status === status.value)
            return (
              <div key={status.value} className={`animate-fade-in stagger-${index + 1}`}>
                <KanbanColumn
                  id={status.value}
                  title={status.label}
                  icon={status.icon}
                  tasks={columnTasks}
                  count={columnTasks.length}
                />
              </div>
            )
          })}
        </div>

        <DragOverlay>
          {activeTask ? (
            <div className="rotate-3 opacity-90 scale-105">
              <TaskCard task={activeTask} isDragOverlay />
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>

      {/* Task Modal */}
      <TaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        defaultDomain={selectedDomain !== 'all' ? (selectedDomain as Domain) : undefined}
      />
    </div>
  )
}
