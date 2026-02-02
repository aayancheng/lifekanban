// Enums and constants
export type Domain = 'health' | 'family' | 'learning'
export type Priority = 'high' | 'medium' | 'low'
export type TaskStatus = 'todo' | 'in_progress' | 'done'
export type GoalStatus = 'active' | 'completed' | 'archived'

// Time Tracking
export interface TimeSession {
  startTime: Date
  endTime: Date
  duration: number // in seconds
}

export interface TimeTracking {
  totalSeconds: number
  sessions: TimeSession[]
  isTracking: boolean
  currentSessionStart?: Date
}

// Task Model
export interface Task {
  id: string
  title: string
  description: string
  domain: Domain
  priority: Priority
  status: TaskStatus
  dueDate?: Date
  goalId?: string
  templateType?: string
  timeTracking: TimeTracking
  createdAt: Date
  updatedAt: Date
  completedAt?: Date
}

// Goal Model
export interface Goal {
  id: string
  title: string
  description: string
  domain: Domain
  targetDate: Date
  progress: number // 0-100
  status: GoalStatus
  createdAt: Date
  updatedAt: Date
}

// History Action Types
export type ActionType = 'create' | 'update' | 'delete' | 'move'

export interface HistoryAction {
  id: string
  type: ActionType
  entityType: 'task' | 'goal'
  entityId: string
  previousState?: any
  newState?: any
  timestamp: Date
}

// Task Template
export interface TaskTemplate {
  id: string
  name: string
  domain: Domain
  defaultPriority: Priority
  defaultTitle: string
  defaultDescription: string
  customFields?: Record<string, any>
}

// Dashboard Statistics
export interface DashboardStats {
  totalTasks: number
  tasksByStatus: Record<TaskStatus, number>
  tasksByDomain: Record<Domain, number>
  tasksByPriority: Record<Priority, number>
  upcomingTasks: Task[]
  overdueTasks: Task[]
  totalTimeTracked: number
}
