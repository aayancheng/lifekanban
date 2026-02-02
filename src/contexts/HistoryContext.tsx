import { createContext, useContext, ReactNode, useCallback, useEffect } from 'react'
import { HistoryAction } from '../types'
import { useLocalStorage, STORAGE_KEYS } from '../hooks/useLocalStorage'
import { generateId } from '../utils/helpers'

const MAX_HISTORY_SIZE = 20

interface HistoryContextType {
  history: HistoryAction[]
  addAction: (action: Omit<HistoryAction, 'id' | 'timestamp'>) => void
  undo: () => HistoryAction | null
  redo: () => HistoryAction | null
  canUndo: boolean
  canRedo: boolean
  clearHistory: () => void
}

const HistoryContext = createContext<HistoryContextType | undefined>(undefined)

export function HistoryProvider({ children }: { children: ReactNode }) {
  const [history, setHistory] = useLocalStorage<HistoryAction[]>(STORAGE_KEYS.HISTORY, [])
  const [currentIndex, setCurrentIndex] = useLocalStorage<number>(STORAGE_KEYS.HISTORY_INDEX, -1)

  const addAction = useCallback((actionData: Omit<HistoryAction, 'id' | 'timestamp'>) => {
    const newAction: HistoryAction = {
      ...actionData,
      id: generateId(),
      timestamp: new Date(),
    }

    setHistory(prev => {
      // Remove any actions after current index (for redo invalidation)
      const newHistory = prev.slice(0, currentIndex + 1)
      // Add new action
      newHistory.push(newAction)
      // Keep only last MAX_HISTORY_SIZE actions
      if (newHistory.length > MAX_HISTORY_SIZE) {
        return newHistory.slice(-MAX_HISTORY_SIZE)
      }
      return newHistory
    })

    setCurrentIndex(prev => {
      const newIndex = Math.min(prev + 1, MAX_HISTORY_SIZE - 1)
      return newIndex
    })
  }, [setHistory, currentIndex, setCurrentIndex])

  const undo = useCallback((): HistoryAction | null => {
    if (currentIndex < 0) return null

    const action = history[currentIndex]
    setCurrentIndex(prev => prev - 1)
    return action
  }, [history, currentIndex, setCurrentIndex])

  const redo = useCallback((): HistoryAction | null => {
    if (currentIndex >= history.length - 1) return null

    const nextIndex = currentIndex + 1
    const action = history[nextIndex]
    setCurrentIndex(nextIndex)
    return action
  }, [history, currentIndex, setCurrentIndex])

  const canUndo = currentIndex >= 0
  const canRedo = currentIndex < history.length - 1

  const clearHistory = useCallback(() => {
    setHistory([])
    setCurrentIndex(-1)
  }, [setHistory, setCurrentIndex])

  // Listen for keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl/Cmd + Z for undo
      if ((e.ctrlKey || e.metaKey) && e.key === 'z' && !e.shiftKey) {
        e.preventDefault()
        if (canUndo) {
          undo()
        }
      }
      // Ctrl/Cmd + Shift + Z for redo
      if ((e.ctrlKey || e.metaKey) && e.key === 'z' && e.shiftKey) {
        e.preventDefault()
        if (canRedo) {
          redo()
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [undo, redo, canUndo, canRedo])

  return (
    <HistoryContext.Provider
      value={{
        history,
        addAction,
        undo,
        redo,
        canUndo,
        canRedo,
        clearHistory,
      }}
    >
      {children}
    </HistoryContext.Provider>
  )
}

export function useHistory() {
  const context = useContext(HistoryContext)
  if (context === undefined) {
    throw new Error('useHistory must be used within a HistoryProvider')
  }
  return context
}
