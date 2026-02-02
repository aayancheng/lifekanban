import { v4 as uuidv4 } from 'uuid'

// Generate unique ID
export function generateId(): string {
  return uuidv4()
}

// Format date to readable string
export function formatDate(date: Date | string | undefined): string {
  if (!date) return ''
  const d = typeof date === 'string' ? new Date(date) : date
  return d.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

// Check if date is overdue
export function isOverdue(date: Date | string | undefined): boolean {
  if (!date) return false
  const d = typeof date === 'string' ? new Date(date) : date
  return d < new Date()
}

// Format time duration from seconds
export function formatDuration(seconds: number): string {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const secs = seconds % 60

  if (hours > 0) {
    return `${hours}h ${minutes}m`
  } else if (minutes > 0) {
    return `${minutes}m ${secs}s`
  } else {
    return `${secs}s`
  }
}

// Calculate time difference in seconds
export function getTimeDifferenceInSeconds(start: Date, end: Date): number {
  return Math.floor((end.getTime() - start.getTime()) / 1000)
}

// Debounce function
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout> | null = null

  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null
      func(...args)
    }

    if (timeout) {
      clearTimeout(timeout)
    }
    timeout = setTimeout(later, wait)
  }
}

// Get domain color
export function getDomainColor(domain: string): string {
  const colors = {
    health: '#10B981',
    family: '#3B82F6',
    learning: '#8B5CF6',
  }
  return colors[domain as keyof typeof colors] || '#6B7280'
}

// Get priority color
export function getPriorityColor(priority: string): string {
  const colors = {
    high: '#EF4444',
    medium: '#F59E0B',
    low: '#6B7280',
  }
  return colors[priority as keyof typeof colors] || '#6B7280'
}
