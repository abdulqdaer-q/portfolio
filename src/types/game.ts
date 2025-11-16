export interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  xp: number
  unlocked: boolean
  unlockedAt?: Date
  secret?: boolean
}

export interface GameStats {
  level: number
  xp: number
  xpToNextLevel: number
  totalXP: number
  achievementsUnlocked: number
  totalAchievements: number
  secretsFound: number
  totalSecrets: number
  challengesCompleted: number
  totalChallenges: number
  visitCount: number
  timeSpent: number // in seconds
}

export interface Challenge {
  id: string
  title: string
  description: string
  difficulty: 'easy' | 'medium' | 'hard'
  xp: number
  completed: boolean
  code?: string
  expectedOutput?: string
  type: 'code' | 'typing' | 'quiz' | 'puzzle'
}

export interface Quest {
  id: string
  title: string
  description: string
  steps: QuestStep[]
  xp: number
  completed: boolean
}

export interface QuestStep {
  id: string
  description: string
  completed: boolean
  section?: string
}

export interface GameState {
  stats: GameStats
  achievements: Achievement[]
  challenges: Challenge[]
  quests: Quest[]
  currentQuest: string | null
  unlockedEasterEggs: string[]
}
