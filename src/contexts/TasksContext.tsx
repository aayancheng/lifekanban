import { createContext, useContext, ReactNode, useCallback } from 'react'
import { Task, TaskStatus, Domain } from '../types'
import { useLocalStorage, STORAGE_KEYS } from '../hooks/useLocalStorage'
import { generateId } from '../utils/helpers'
import { useHistory } from './HistoryContext'

interface TasksContextType {
  tasks: Task[]
  addTask: (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt' | 'timeTracking'>) => void
  updateTask: (id: string, updates: Partial<Task>) => void
  deleteTask: (id: string) => void
  moveTask: (id: string, newStatus: TaskStatus) => void
  getTasksByDomain: (domain: Domain) => Task[]
  getTasksByStatus: (status: TaskStatus) => Task[]
}

const TasksContext = createContext<TasksContextType | undefined>(undefined)

export function TasksProvider({ children }: { children: ReactNode }) {
  const [tasks, setTasks] = useLocalStorage<Task[]>(STORAGE_KEYS.TASKS, [])
  const { addAction } = useHistory()

  const addTask = useCallback((taskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt' | 'timeTracking'>) => {
    const newTask: Task = {
      ...taskData,
      id: generateId(),
      timeTracking: {
        totalSeconds: 0,
        sessions: [],
        isTracking: false,
      },
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    setTasks(prev => [...prev, newTask])
    addAction({
      type: 'create',
      entityType: 'task',
      entityId: newTask.id,
      newState: newTask,
    })
  }, [setTasks, addAction])

  const updateTask = useCallback((id: string, updates: Partial<Task>) => {
    setTasks(prev => {
      const taskIndex = prev.findIndex(t => t.id === id)
      if (taskIndex === -1) return prev

      const previousTask = prev[taskIndex]
      const updatedTask = {
        ...previousTask,
        ...updates,
        updatedAt: new Date(),
        completedAt: updates.status === 'done' ? new Date() : previousTask.completedAt,
      }

      const newTasks = [...prev]
      newTasks[taskIndex] = updatedTask

      addAction({
        type: 'update',
        entityType: 'task',
        entityId: id,
        previousState: previousTask,
        newState: updatedTask,
      })

      return newTasks
    })
  }, [setTasks, addAction])

  const deleteTask = useCallback((id: string) => {
    setTasks(prev => {
      const task = prev.find(t => t.id === id)
      if (!task) return prev

      addAction({
        type: 'delete',
        entityType: 'task',
        entityId: id,
        previousState: task,
      })

      return prev.filter(t => t.id !== id)
    })
  }, [setTasks, addAction])

  const moveTask = useCallback((id: string, newStatus: TaskStatus) => {
    updateTask(id, { status: newStatus })
  }, [updateTask])

  const getTasksByDomain = useCallback((domain: Domain) => {
    return tasks.filter(task => task.domain === domain)
  }, [tasks])

  const getTasksByStatus = useCallback((status: TaskStatus) => {
    return tasks.filter(task => task.status === status)
  }, [tasks])

  return (
    <TasksContext.Provider
      value={{
        tasks,
        addTask,
        updateTask,
        deleteTask,
        moveTask,
        getTasksByDomain,
        getTasksByStatus,
      }}
    >
      {children}
    </TasksContext.Provider>
  )
}

export function useTasks() {
  const context = useContext(TasksContext)
  if (context === undefined) {
    throw new Error('useTasks must be used within a TasksProvider')
  }
  return context
}
