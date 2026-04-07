import { useEffect, useState } from 'react'

// BeforeInstallPromptEvent is not in the standard TS lib
interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>
}

const DISMISSED_KEY = 'lifekanban_install_dismissed'

export default function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null)

  useEffect(() => {
    // Don't show if the user already dismissed
    if (localStorage.getItem(DISMISSED_KEY)) return

    const handler = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e as BeforeInstallPromptEvent)
    }

    window.addEventListener('beforeinstallprompt', handler)
    return () => window.removeEventListener('beforeinstallprompt', handler)
  }, [])

  if (!deferredPrompt) return null

  const handleInstall = async () => {
    await deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice
    if (outcome === 'accepted' || outcome === 'dismissed') {
      setDeferredPrompt(null)
      localStorage.setItem(DISMISSED_KEY, 'true')
    }
  }

  const handleDismiss = () => {
    setDeferredPrompt(null)
    localStorage.setItem(DISMISSED_KEY, 'true')
  }

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 card flex items-center gap-3 px-4 py-3 shadow-soft-lg animate-fade-in whitespace-nowrap">
      <svg className="w-5 h-5 text-accent shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
      <span className="text-sm text-ink-600">Add LifeKanban to your home screen</span>
      <button onClick={handleInstall} className="btn-primary text-xs px-3 py-1.5">
        Install
      </button>
      <button onClick={handleDismiss} className="btn-secondary text-xs px-3 py-1.5">
        Dismiss
      </button>
    </div>
  )
}
