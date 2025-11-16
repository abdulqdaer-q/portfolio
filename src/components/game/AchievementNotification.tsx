import { motion, AnimatePresence } from 'framer-motion'
import { Trophy, X } from 'lucide-react'
import type { Achievement } from '@/types/game'

interface AchievementNotificationProps {
  achievement: Achievement | null
  onClose: () => void
}

export function AchievementNotification({ achievement, onClose }: AchievementNotificationProps) {
  if (!achievement) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ x: 400, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: 400, opacity: 0 }}
        className="fixed top-24 right-4 z-50 max-w-sm"
      >
        <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 backdrop-blur-md border-2 border-yellow-500 rounded-lg p-4 shadow-2xl">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center text-2xl animate-bounce">
                {achievement.icon}
              </div>
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <Trophy className="w-4 h-4 text-yellow-400" />
                <h3 className="text-sm font-bold text-yellow-400 uppercase tracking-wide">
                  Achievement Unlocked!
                </h3>
              </div>
              <p className="text-white font-bold mb-1">{achievement.title}</p>
              <p className="text-gray-300 text-sm mb-2">{achievement.description}</p>
              <div className="flex items-center gap-2">
                <div className="px-2 py-1 bg-yellow-500/20 rounded text-xs font-bold text-yellow-400">
                  +{achievement.xp} XP
                </div>
                {achievement.secret && (
                  <div className="px-2 py-1 bg-purple-500/20 rounded text-xs font-bold text-purple-400">
                    Secret!
                  </div>
                )}
              </div>
            </div>

            <button
              onClick={onClose}
              className="flex-shrink-0 text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
