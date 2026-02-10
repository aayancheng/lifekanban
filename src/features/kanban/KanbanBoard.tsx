import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { DndContext, DragEndEvent, DragOverlay, DragStartEvent, PointerSensor, TouchSensor, useSensor, useSensors, rectIntersection } from '@dnd-kit/core'
import { useTasks } from '../../contexts/TasksContext'
import { Domain, TaskStatus, Task } from '../../types'
import { formatDuration } from '../../utils/helpers'
import KanbanColumn from './KanbanColumn'
import TaskCard from '../tasks/TaskCard'
import TaskModal from '../tasks/TaskModal'

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
  const selectedDomain: Domain | 'all' = (['health', 'family', 'learning'].includes(domainParam || '') ? domainParam as Domain : 'all')

  const { tasks, moveTask, addTask } = useTasks()
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
    : tasks.filter(task => task.domain === selectedDomain)

  // Stats calculations
  const todoCount = filteredTasks.filter(t => t.status === 'todo').length
  const inProgressCount = filteredTasks.filter(t => t.status === 'in_progress').length
  const doneCount = filteredTasks.filter(t => t.status === 'done').length
  const totalSeconds = filteredTasks.reduce((sum, t) => sum + (t.timeTracking?.totalSeconds || 0), 0)

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

  const handleQuickAdd = (title: string, status: TaskStatus) => {
    const domain: Domain = selectedDomain !== 'all' ? selectedDomain : 'health'
    addTask({
      title,
      description: '',
      domain,
      priority: 'medium',
      status,
    })
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header with Stats */}
      <div className="flex items-end justify-between">
        <div className="space-y-1">
          <h1 className="font-display text-4xl font-semibold text-ink-900">
            {selectedDomain === 'all' ? 'All Tasks' : `${selectedDomain.charAt(0).toUpperCase() + selectedDomain.slice(1)} Board`}
          </h1>
          {/* Compact Stats Bar */}
          <div className="flex items-center space-x-4 mt-2">
            <span className="flex items-center space-x-1.5 text-sm text-ink-500">
              <span className="w-2 h-2 rounded-full bg-ink-300" />
              <span>{todoCount} to do</span>
            </span>
            <span className="flex items-center space-x-1.5 text-sm text-blue-600">
              <span className="w-2 h-2 rounded-full bg-blue-500" />
              <span>{inProgressCount} in progress</span>
            </span>
            <span className="flex items-center space-x-1.5 text-sm text-emerald-600">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>{doneCount} done</span>
            </span>
            {totalSeconds > 0 && (
              <span className="flex items-center space-x-1.5 text-sm text-accent">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{formatDuration(totalSeconds)}</span>
              </span>
            )}
          </div>
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
                  onQuickAdd={(title) => handleQuickAdd(title, status.value)}
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
        defaultDomain={selectedDomain !== 'all' ? selectedDomain : undefined}
      />
    </div>
  )
}
