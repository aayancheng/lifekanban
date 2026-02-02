import { useDraggable } from '@dnd-kit/core'
import { Task } from '../../types'
import { formatDate, formatDuration } from '../../utils/helpers'
import { useTasks } from '../../contexts/TasksContext'
import { useTimeTracking } from '../../contexts/TimeTrackingContext'
import { useState } from 'react'
import TaskModal from './TaskModal'

interface TaskCardProps {
  task: Task
  isDragOverlay?: boolean
}

const DOMAIN_STYLES = {
  health: {
    bg: 'bg-health-light',
    text: 'text-health',
    glow: 'hover:shadow-glow-health',
    border: 'border-health/20',
  },
  family: {
    bg: 'bg-family-light',
    text: 'text-family',
    glow: 'hover:shadow-glow-family',
    border: 'border-family/20',
  },
  learning: {
    bg: 'bg-learning-light',
    text: 'text-learning',
    glow: 'hover:shadow-glow-learning',
    border: 'border-learning/20',
  },
}

const PRIORITY_STYLES = {
  high: { bg: 'bg-priority-high', ring: 'ring-priority-high/20' },
  medium: { bg: 'bg-priority-medium', ring: 'ring-priority-medium/20' },
  low: { bg: 'bg-ink-300', ring: 'ring-ink-300/20' },
}

export default function TaskCard({ task, isDragOverlay = false }: TaskCardProps) {
  const { deleteTask } = useTasks()
  const { startTracking, stopTracking, isTracking, getElapsedTime } = useTimeTracking()
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)

  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: task.id,
    disabled: isDragOverlay,
  })

  const style: React.CSSProperties = isDragOverlay
    ? {}
    : {
        transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
        touchAction: 'none', // Required for dnd-kit on touch devices
      }

  const domainStyle = DOMAIN_STYLES[task.domain]
  const priorityStyle = PRIORITY_STYLES[task.priority]
  const isCurrentlyTracking = isTracking(task.id)
  const totalTime = task.timeTracking.totalSeconds + (isCurrentlyTracking ? getElapsedTime() : 0)

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (window.confirm('Are you sure you want to delete this task?')) {
      deleteTask(task.id)
    }
  }

  const handleToggleTimer = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (isCurrentlyTracking) {
      stopTracking()
    } else {
      startTracking(task.id)
    }
  }

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsEditModalOpen(true)
  }

  return (
    <>
      <div
        ref={isDragOverlay ? undefined : setNodeRef}
        style={style}
        {...(isDragOverlay ? {} : attributes)}
        {...(isDragOverlay ? {} : listeners)}
        className={`task-card p-4 ${domainStyle.glow} ${
          isDragging && !isDragOverlay ? 'opacity-60 scale-105 rotate-2' : ''
        } ${isCurrentlyTracking ? 'ring-2 ring-accent/30' : ''}`}
      >
        {/* Priority & Title Row */}
        <div className="flex items-start space-x-3 mb-3">
          <div
            className={`w-2.5 h-2.5 rounded-full mt-1.5 flex-shrink-0 ring-4 ${priorityStyle.bg} ${priorityStyle.ring}`}
            title={`${task.priority} priority`}
          />
          <h4 className="font-display text-sm font-semibold text-ink-900 flex-1 line-clamp-2 leading-snug">
            {task.title}
          </h4>
        </div>

        {/* Description */}
        {task.description && (
          <p className="text-sm text-ink-500 mb-3 line-clamp-2 pl-5">
            {task.description}
          </p>
        )}

        {/* Meta Row */}
        <div className="flex items-center flex-wrap gap-2 mb-3 pl-5">
          {/* Domain Badge */}
          <span className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium ${domainStyle.bg} ${domainStyle.text}`}>
            {task.domain.charAt(0).toUpperCase() + task.domain.slice(1)}
          </span>

          {/* Due Date */}
          {task.dueDate && (
            <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium bg-ink-100 text-ink-600">
              <svg className="w-3.5 h-3.5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {formatDate(task.dueDate)}
            </span>
          )}

          {/* Time Tracked */}
          {totalTime > 0 && (
            <span className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium ${
              isCurrentlyTracking ? 'bg-accent-light text-accent animate-pulse-soft' : 'bg-ink-100 text-ink-600'
            }`}>
              <svg className="w-3.5 h-3.5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {formatDuration(totalTime)}
            </span>
          )}

          {/* Template Badge */}
          {task.templateType && (
            <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium bg-cream-200 text-ink-500">
              <svg className="w-3.5 h-3.5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6z" />
              </svg>
              {task.templateType}
            </span>
          )}
        </div>

        {/* Actions Row */}
        <div className="flex items-center gap-2 pt-3 border-t border-ink-900/5">
          {/* Timer Button */}
          <button
            onClick={handleToggleTimer}
            className={`flex-1 flex items-center justify-center px-3 py-2 text-xs font-medium rounded-lg transition-all duration-200 ${
              isCurrentlyTracking
                ? 'bg-accent text-white shadow-sm hover:bg-accent-dark'
                : 'bg-ink-100 text-ink-600 hover:bg-ink-200'
            }`}
          >
            {isCurrentlyTracking ? (
              <>
                <svg className="w-4 h-4 mr-1.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                </svg>
                Stop
              </>
            ) : (
              <>
                <svg className="w-4 h-4 mr-1.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
                Start
              </>
            )}
          </button>

          {/* Edit Button */}
          <button
            onClick={handleEdit}
            className="p-2 text-ink-400 hover:text-ink-600 hover:bg-ink-100 rounded-lg transition-colors"
            title="Edit task"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>

          {/* Delete Button */}
          <button
            onClick={handleDelete}
            className="p-2 text-ink-400 hover:text-priority-high hover:bg-red-50 rounded-lg transition-colors"
            title="Delete task"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Edit Modal */}
      <TaskModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        taskToEdit={task}
      />
    </>
  )
}
