import { useState, useEffect, useCallback } from 'react'
import type { GameState, Achievement } from '@/types/game'
import { achievements as initialAchievements } from '@/data/achievements'
import { challenges as initialChallenges } from '@/data/challenges'

const STORAGE_KEY = 'portfolio-game-state'
const XP_PER_LEVEL = 500

const calculateLevel = (totalXP: number): number => {
  return Math.floor(totalXP / XP_PER_LEVEL) + 1
}

const getInitialState = (): GameState => {
  const saved = localStorage.getItem(STORAGE_KEY)
  if (saved) {
    try {
      return JSON.parse(saved)
    } catch {
      // If parsing fails, return default state
    }
  }

  return {
    stats: {
      level: 1,
      xp: 0,
      xpToNextLevel: XP_PER_LEVEL,
      totalXP: 0,
      achievementsUnlocked: 0,
      totalAchievements: initialAchievements.length,
      secretsFound: 0,
      totalSecrets: initialAchievements.filter((a) => a.secret).length,
      challengesCompleted: 0,
      totalChallenges: initialChallenges.length,
      visitCount: 0,
      timeSpent: 0,
    },
    achievements: initialAchievements,
    challenges: initialChallenges,
    quests: [],
    currentQuest: null,
    unlockedEasterEggs: [],
  }
}

export function useGameState() {
  const [gameState, setGameState] = useState<GameState>(getInitialState)
  const [recentAchievement, setRecentAchievement] = useState<Achievement | null>(null)

  // Save to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(gameState))
  }, [gameState])

  // Track time spent
  useEffect(() => {
    const interval = setInterval(() => {
      setGameState((prev) => ({
        ...prev,
        stats: {
          ...prev.stats,
          timeSpent: prev.stats.timeSpent + 1,
        },
      }))
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  // Increment visit count on mount
  useEffect(() => {
    setGameState((prev) => ({
      ...prev,
      stats: {
        ...prev.stats,
        visitCount: prev.stats.visitCount + 1,
      },
    }))
  }, [])

  const addXP = useCallback((amount: number) => {
    setGameState((prev) => {
      const newTotalXP = prev.stats.totalXP + amount
      const newLevel = calculateLevel(newTotalXP)
      const currentLevelXP = newTotalXP % XP_PER_LEVEL
      const xpToNextLevel = XP_PER_LEVEL - currentLevelXP

      return {
        ...prev,
        stats: {
          ...prev.stats,
          xp: currentLevelXP,
          totalXP: newTotalXP,
          level: newLevel,
          xpToNextLevel,
        },
      }
    })
  }, [])

  const unlockAchievement = useCallback(
    (achievementId: string) => {
      setGameState((prev) => {
        const achievement = prev.achievements.find((a) => a.id === achievementId)
        if (!achievement || achievement.unlocked) return prev

        const updatedAchievements = prev.achievements.map((a) =>
          a.id === achievementId ? { ...a, unlocked: true, unlockedAt: new Date() } : a
        )

        const achievementsUnlocked = updatedAchievements.filter((a) => a.unlocked).length
        const secretsFound = updatedAchievements.filter((a) => a.unlocked && a.secret).length

        // Show notification
        setRecentAchievement(achievement)
        setTimeout(() => setRecentAchievement(null), 5000)

        // Add XP
        addXP(achievement.xp)

        return {
          ...prev,
          achievements: updatedAchievements,
          stats: {
            ...prev.stats,
            achievementsUnlocked,
            secretsFound,
          },
        }
      })
    },
    [addXP]
  )

  const completeChallenge = useCallback(
    (challengeId: string) => {
      setGameState((prev) => {
        const challenge = prev.challenges.find((c) => c.id === challengeId)
        if (!challenge || challenge.completed) return prev

        const updatedChallenges = prev.challenges.map((c) =>
          c.id === challengeId ? { ...c, completed: true } : c
        )

        const challengesCompleted = updatedChallenges.filter((c) => c.completed).length

        // Add XP
        addXP(challenge.xp)

        return {
          ...prev,
          challenges: updatedChallenges,
          stats: {
            ...prev.stats,
            challengesCompleted,
          },
        }
      })
    },
    [addXP]
  )

  const unlockEasterEgg = useCallback((eggId: string) => {
    setGameState((prev) => {
      if (prev.unlockedEasterEggs.includes(eggId)) return prev

      return {
        ...prev,
        unlockedEasterEggs: [...prev.unlockedEasterEggs, eggId],
      }
    })
  }, [])

  const resetProgress = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY)
    setGameState(getInitialState())
  }, [])

  return {
    gameState,
    recentAchievement,
    addXP,
    unlockAchievement,
    completeChallenge,
    unlockEasterEgg,
    resetProgress,
  }
}
