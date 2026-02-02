import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

interface ShortcutConfig {
  key: string
  ctrl?: boolean
  shift?: boolean
  callback: () => void
  description: string
}

export function useKeyboardShortcuts(
  shortcuts: ShortcutConfig[],
  enabled: boolean = true
) {
  useEffect(() => {
    if (!enabled) return

    const handleKeyDown = (event: KeyboardEvent) => {
      // Don't trigger shortcuts when typing in inputs
      const target = event.target as HTMLElement
      if (
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.isContentEditable
      ) {
        // Allow '/' to focus search even in input fields when not typing
        if (event.key !== '/') {
          return
        }
      }

      shortcuts.forEach(({ key, ctrl, shift, callback }) => {
        const ctrlMatch = ctrl ? (event.ctrlKey || event.metaKey) : !event.ctrlKey && !event.metaKey
        const shiftMatch = shift ? event.shiftKey : !event.shiftKey

        if (
          event.key.toLowerCase() === key.toLowerCase() &&
          ctrlMatch &&
          shiftMatch
        ) {
          event.preventDefault()
          callback()
        }
      })
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [shortcuts, enabled])
}

// Global keyboard shortcuts hook
export function useGlobalShortcuts(
  onNewTask: () => void,
  onSearchFocus: () => void,
  onShowHelp: () => void
) {
  const navigate = useNavigate()

  const shortcuts: ShortcutConfig[] = [
    {
      key: 'n',
      description: 'Create new task',
      callback: onNewTask,
    },
    {
      key: 'c',
      description: 'Create new task',
      callback: onNewTask,
    },
    {
      key: '/',
      description: 'Focus search',
      callback: onSearchFocus,
    },
    {
      key: '?',
      shift: true,
      description: 'Show keyboard shortcuts',
      callback: onShowHelp,
    },
    {
      key: 'd',
      description: 'Go to Dashboard',
      callback: () => navigate('/'),
    },
    {
      key: 'k',
      description: 'Go to Kanban board',
      callback: () => navigate('/board'),
    },
    {
      key: 'h',
      description: 'Switch to Health board',
      callback: () => navigate('/board/health'),
    },
    {
      key: 'f',
      description: 'Switch to Family board',
      callback: () => navigate('/board/family'),
    },
    {
      key: 'l',
      description: 'Switch to Learning board',
      callback: () => navigate('/board/learning'),
    },
  ]

  useKeyboardShortcuts(shortcuts)

  return shortcuts
}
