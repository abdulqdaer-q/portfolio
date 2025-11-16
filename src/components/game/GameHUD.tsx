import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Trophy, Target, Star, TrendingUp, X, Code, Gamepad2 } from 'lucide-react'
import type { GameStats } from '@/types/game'

interface GameHUDProps {
  stats: GameStats
}

export function GameHUD({ stats }: GameHUDProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const xpPercentage = (stats.xp / (stats.xp + stats.xpToNextLevel)) * 100

  return (
    <>
      {/* Compact HUD */}
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="fixed top-24 left-4 z-40"
      >
        <button
          onClick={() => setIsExpanded(true)}
          className="bg-dark-800/90 backdrop-blur-md border border-primary-500/30 rounded-lg p-3 shadow-lg hover:border-primary-500 transition-all group"
        >
          <div className="flex items-center gap-3">
            <div className="relative">
              <Gamepad2 className="w-6 h-6 text-primary-400 group-hover:scale-110 transition-transform" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse" />
            </div>

            <div className="text-left">
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-yellow-400" />
                <span className="text-white font-bold">Level {stats.level}</span>
              </div>
              <div className="w-32 h-1.5 bg-dark-700 rounded-full overflow-hidden mt-1">
                <motion.div
                  className="h-full bg-gradient-to-r from-primary-500 to-primary-400"
                  initial={{ width: 0 }}
                  animate={{ width: `${xpPercentage}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
              <div className="text-xs text-gray-400 mt-0.5">
                {stats.xp} / {stats.xp + stats.xpToNextLevel} XP
              </div>
            </div>
          </div>
        </button>
      </motion.div>

      {/* Expanded Stats Panel */}
      <AnimatePresence>
        {isExpanded && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsExpanded(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            />

            {/* Stats Panel */}
            <motion.div
              initial={{ x: -400, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -400, opacity: 0 }}
              className="fixed top-0 left-0 h-full w-full max-w-md bg-dark-900 border-r border-primary-500/30 z-50 overflow-y-auto"
            >
              <div className="p-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <Gamepad2 className="w-8 h-8 text-primary-400" />
                    <h2 className="text-2xl font-bold text-white">Game Stats</h2>
                  </div>
                  <button
                    onClick={() => setIsExpanded(false)}
                    className="p-2 hover:bg-dark-800 rounded-lg transition-colors"
                  >
                    <X className="w-6 h-6 text-gray-400" />
                  </button>
                </div>

                {/* Level & XP */}
                <div className="bg-gradient-to-br from-primary-500/20 to-purple-500/20 rounded-xl p-6 mb-6 border border-primary-500/30">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <Star className="w-6 h-6 text-yellow-400" />
                      <span className="text-3xl font-bold text-white">Level {stats.level}</span>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-400">Total XP</div>
                      <div className="text-xl font-bold text-primary-400">{stats.totalXP}</div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Progress to Level {stats.level + 1}</span>
                      <span className="text-white font-bold">{xpPercentage.toFixed(0)}%</span>
                    </div>
                    <div className="w-full h-3 bg-dark-700 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-primary-500 via-purple-500 to-pink-500"
                        initial={{ width: 0 }}
                        animate={{ width: `${xpPercentage}%` }}
                        transition={{ duration: 0.5 }}
                      />
                    </div>
                    <div className="text-xs text-gray-400 text-center">
                      {stats.xpToNextLevel} XP to next level
                    </div>
                  </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <StatCard
                    icon={<Trophy className="w-5 h-5" />}
                    label="Achievements"
                    value={`${stats.achievementsUnlocked}/${stats.totalAchievements}`}
                    color="yellow"
                  />
                  <StatCard
                    icon={<Code className="w-5 h-5" />}
                    label="Challenges"
                    value={`${stats.challengesCompleted}/${stats.totalChallenges}`}
                    color="blue"
                  />
                  <StatCard
                    icon={<Target className="w-5 h-5" />}
                    label="Secrets Found"
                    value={`${stats.secretsFound}/${stats.totalSecrets}`}
                    color="purple"
                  />
                  <StatCard
                    icon={<TrendingUp className="w-5 h-5" />}
                    label="Visit Count"
                    value={stats.visitCount}
                    color="green"
                  />
                </div>

                {/* Time Spent */}
                <div className="bg-dark-800 rounded-xl p-4 border border-dark-700">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Time Spent</span>
                    <span className="text-white font-bold">
                      {Math.floor(stats.timeSpent / 60)}m {stats.timeSpent % 60}s
                    </span>
                  </div>
                </div>

                {/* Completion Stats */}
                <div className="mt-6">
                  <h3 className="text-lg font-bold text-white mb-4">Completion</h3>
                  <div className="space-y-3">
                    <ProgressBar
                      label="Achievements"
                      current={stats.achievementsUnlocked}
                      total={stats.totalAchievements}
                      color="yellow"
                    />
                    <ProgressBar
                      label="Challenges"
                      current={stats.challengesCompleted}
                      total={stats.totalChallenges}
                      color="blue"
                    />
                    <ProgressBar
                      label="Secrets"
                      current={stats.secretsFound}
                      total={stats.totalSecrets}
                      color="purple"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

interface StatCardProps {
  icon: React.ReactNode
  label: string
  value: string | number
  color: 'yellow' | 'blue' | 'purple' | 'green'
}

function StatCard({ icon, label, value, color }: StatCardProps) {
  const colors = {
    yellow: 'from-yellow-500/20 to-orange-500/20 border-yellow-500/30 text-yellow-400',
    blue: 'from-blue-500/20 to-cyan-500/20 border-blue-500/30 text-blue-400',
    purple: 'from-purple-500/20 to-pink-500/20 border-purple-500/30 text-purple-400',
    green: 'from-green-500/20 to-emerald-500/20 border-green-500/30 text-green-400',
  }

  return (
    <div className={`bg-gradient-to-br ${colors[color]} rounded-lg p-4 border`}>
      <div className="flex items-center gap-2 mb-2">{icon}</div>
      <div className="text-xs text-gray-400 mb-1">{label}</div>
      <div className="text-xl font-bold text-white">{value}</div>
    </div>
  )
}

interface ProgressBarProps {
  label: string
  current: number
  total: number
  color: 'yellow' | 'blue' | 'purple'
}

function ProgressBar({ label, current, total, color }: ProgressBarProps) {
  const percentage = (current / total) * 100

  const colors = {
    yellow: 'from-yellow-500 to-orange-500',
    blue: 'from-blue-500 to-cyan-500',
    purple: 'from-purple-500 to-pink-500',
  }

  return (
    <div>
      <div className="flex justify-between text-sm mb-1">
        <span className="text-gray-400">{label}</span>
        <span className="text-white font-bold">
          {current}/{total}
        </span>
      </div>
      <div className="w-full h-2 bg-dark-700 rounded-full overflow-hidden">
        <motion.div
          className={`h-full bg-gradient-to-r ${colors[color]}`}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>
    </div>
  )
}
