import { useState } from 'react'

// Storage keys
export const STORAGE_KEYS = {
  TASKS: 'lifekanban_tasks',
  GOALS: 'lifekanban_goals',
  HISTORY: 'lifekanban_history',
  HISTORY_INDEX: 'lifekanban_history_index',
  SETTINGS: 'lifekanban_settings',
} as const

type StorageKey = typeof STORAGE_KEYS[keyof typeof STORAGE_KEYS]

export function useLocalStorage<T>(
  key: StorageKey,
  initialValue: T
): [T, (value: T | ((val: T) => T)) => void] {
  // State to store our value
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error)
      return initialValue
    }
  })

  // Wrap setState to persist to localStorage
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore = value instanceof Function ? value(storedValue) : value
      setStoredValue(valueToStore)
      window.localStorage.setItem(key, JSON.stringify(valueToStore))
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error)
    }
  }

  return [storedValue, setValue]
}

// Utility function to get value from localStorage
export function getFromStorage<T>(key: StorageKey, defaultValue: T): T {
  try {
    const item = window.localStorage.getItem(key)
    return item ? JSON.parse(item) : defaultValue
  } catch (error) {
    console.error(`Error reading localStorage key "${key}":`, error)
    return defaultValue
  }
}

// Utility function to save value to localStorage
export function saveToStorage<T>(key: StorageKey, value: T): void {
  try {
    window.localStorage.setItem(key, JSON.stringify(value))
  } catch (error) {
    console.error(`Error setting localStorage key "${key}":`, error)
  }
}

// Utility function to remove value from localStorage
export function removeFromStorage(key: StorageKey): void {
  try {
    window.localStorage.removeItem(key)
  } catch (error) {
    console.error(`Error removing localStorage key "${key}":`, error)
  }
}

// Utility function to clear all app data from localStorage
export function clearAllStorage(): void {
  try {
    Object.values(STORAGE_KEYS).forEach(key => {
      window.localStorage.removeItem(key)
    })
  } catch (error) {
    console.error('Error clearing localStorage:', error)
  }
}
