import { useEffect, useCallback } from 'react'

interface UseEasterEggsProps {
  onKonamiCode: () => void
  onNightOwl: () => void
  onEarlyBird: () => void
  onConsoleCommand: () => void
}

const KONAMI_CODE = [
  'ArrowUp',
  'ArrowUp',
  'ArrowDown',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'ArrowLeft',
  'ArrowRight',
  'b',
  'a',
]

export function useEasterEggs({
  onKonamiCode,
  onNightOwl,
  onEarlyBird,
  onConsoleCommand,
}: UseEasterEggsProps) {
  const konamiIndex = useCallback(() => {
    let index = 0

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === KONAMI_CODE[index]) {
        index++
        if (index === KONAMI_CODE.length) {
          onKonamiCode()
          index = 0
        }
      } else {
        index = 0
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onKonamiCode])

  // Check time of day
  const checkTimeOfDay = useCallback(() => {
    const hour = new Date().getHours()

    // Night Owl: midnight to 4 AM
    if (hour >= 0 && hour < 4) {
      onNightOwl()
    }

    // Early Bird: 5 AM to 7 AM
    if (hour >= 5 && hour < 7) {
      onEarlyBird()
    }
  }, [onNightOwl, onEarlyBird])

  // Setup console commands
  const setupConsoleCommands = useCallback(() => {
    // Add custom console commands
    ;(window as any).portfolio = {
      help: () => {
        console.log(`
%c🎮 Portfolio Console Commands 🎮
%c
Commands:
  portfolio.help()       - Show this help message
  portfolio.stats()      - Show game statistics
  portfolio.unlock()     - Unlock console warrior achievement
  portfolio.reset()      - Reset game progress
  portfolio.cheat()      - Konami code hint

Built with ❤️ by AbdulQader Qassab
        `,
          'color: #3b82f6; font-size: 16px; font-weight: bold',
          'color: #a1a1aa'
        )
      },
      unlock: () => {
        onConsoleCommand()
        console.log('%c✅ Console Warrior achievement unlocked!', 'color: #10b981; font-size: 14px')
      },
      stats: () => {
        const saved = localStorage.getItem('portfolio-game-state')
        if (saved) {
          const state = JSON.parse(saved)
          console.table(state.stats)
        }
      },
      cheat: () => {
        console.log(
          '%c↑ ↑ ↓ ↓ ← → ← → B A',
          'color: #f59e0b; font-size: 20px; font-weight: bold'
        )
      },
      reset: () => {
        if (confirm('Are you sure you want to reset all game progress?')) {
          localStorage.removeItem('portfolio-game-state')
          window.location.reload()
        }
      },
    }

    console.log(
      '%c👋 Hey there, developer! Type portfolio.help() to see available commands',
      'color: #3b82f6; font-size: 14px; font-weight: bold'
    )
  }, [onConsoleCommand])

  useEffect(() => {
    const cleanup = konamiIndex()
    checkTimeOfDay()
    setupConsoleCommands()

    return cleanup
  }, [konamiIndex, checkTimeOfDay, setupConsoleCommands])
}
