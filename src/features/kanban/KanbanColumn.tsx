import { useDroppable } from '@dnd-kit/core'
import { Task } from '../../types'
import TaskCard from '../tasks/TaskCard'

interface KanbanColumnProps {
  id: string
  title: string
  icon?: JSX.Element
  tasks: Task[]
  count: number
}

export default function KanbanColumn({ id, title, icon, tasks, count }: KanbanColumnProps) {
  const { setNodeRef, isOver } = useDroppable({ id })

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
        <span className="bg-ink-100 text-ink-600 text-xs font-semibold px-2.5 py-1 rounded-lg">
          {count}
        </span>
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
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}

        {tasks.length === 0 && !isOver && (
          <div className="flex flex-col items-center justify-center h-40 text-center">
            <div className="w-12 h-12 rounded-2xl bg-ink-100 flex items-center justify-center mb-3">
              <svg className="w-6 h-6 text-ink-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <p className="text-sm font-medium text-ink-400">No tasks yet</p>
            <p className="text-xs text-ink-300 mt-1">Drag tasks here or create new ones</p>
          </div>
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
