import { createContext, useContext, ReactNode, useCallback, useEffect, useState } from 'react'
import { getTimeDifferenceInSeconds } from '../utils/helpers'

interface TimeTrackingContextType {
  activeTaskId: string | null
  startTracking: (taskId: string) => void
  stopTracking: () => { taskId: string; duration: number } | null
  isTracking: (taskId: string) => boolean
  getElapsedTime: () => number
}

const TimeTrackingContext = createContext<TimeTrackingContextType | undefined>(undefined)

export function TimeTrackingProvider({ children }: { children: ReactNode }) {
  const [activeTaskId, setActiveTaskId] = useState<string | null>(null)
  const [startTime, setStartTime] = useState<Date | null>(null)
  const [elapsedSeconds, setElapsedSeconds] = useState(0)

  // Update elapsed time every second when tracking
  useEffect(() => {
    if (!activeTaskId || !startTime) return

    const interval = setInterval(() => {
      setElapsedSeconds(getTimeDifferenceInSeconds(startTime, new Date()))
    }, 1000)

    return () => clearInterval(interval)
  }, [activeTaskId, startTime])

  const startTracking = useCallback((taskId: string) => {
    // Stop any currently active tracking
    if (activeTaskId) {
      console.warn('Already tracking a task. Stopping previous task.')
      stopTracking()
    }

    setActiveTaskId(taskId)
    setStartTime(new Date())
    setElapsedSeconds(0)
  }, [activeTaskId])

  const stopTracking = useCallback((): { taskId: string; duration: number } | null => {
    if (!activeTaskId || !startTime) return null

    const endTime = new Date()
    const duration = getTimeDifferenceInSeconds(startTime, endTime)

    const result = {
      taskId: activeTaskId,
      duration,
    }

    setActiveTaskId(null)
    setStartTime(null)
    setElapsedSeconds(0)

    return result
  }, [activeTaskId, startTime])

  const isTracking = useCallback((taskId: string) => {
    return activeTaskId === taskId
  }, [activeTaskId])

  const getElapsedTime = useCallback(() => {
    return elapsedSeconds
  }, [elapsedSeconds])

  return (
    <TimeTrackingContext.Provider
      value={{
        activeTaskId,
        startTracking,
        stopTracking,
        isTracking,
        getElapsedTime,
      }}
    >
      {children}
    </TimeTrackingContext.Provider>
  )
}

export function useTimeTracking() {
  const context = useContext(TimeTrackingContext)
  if (context === undefined) {
    throw new Error('useTimeTracking must be used within a TimeTrackingProvider')
  }
  return context
}
