import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Gamepad2, X, Trophy, Zap } from 'lucide-react'
import type { Challenge } from '@/types/game'
import { TypingGame } from './TypingGame'
import { MemoryMatchGame } from './MemoryMatchGame'
import { ColorPatternGame } from './ColorPatternGame'
import { SlidingPuzzleGame } from './SlidingPuzzleGame'
import { TriviaQuizGame } from './TriviaQuizGame'

interface ChallengesPanelProps {
  challenges: Challenge[]
  onComplete: (challengeId: string) => void
}

export function ChallengesPanel({ challenges, onComplete }: ChallengesPanelProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedChallenge, setSelectedChallenge] = useState<Challenge | null>(null)

  const completedCount = challenges.filter((c) => c.completed).length

  const difficultyColors = {
    easy: 'text-green-400 bg-green-500/20 border-green-500/30',
    medium: 'text-yellow-400 bg-yellow-500/20 border-yellow-500/30',
    hard: 'text-red-400 bg-red-500/20 border-red-500/30',
  }

  return (
    <>
      {/* Floating Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 w-16 h-16 bg-gradient-to-br from-primary-500 to-purple-600 rounded-full shadow-2xl flex items-center justify-center group hover:shadow-primary-500/50"
      >
        <Gamepad2 className="w-8 h-8 text-white group-hover:rotate-12 transition-transform" />
        {completedCount < challenges.length && (
          <div className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-xs font-bold text-white animate-pulse">
            {challenges.length - completedCount}
          </div>
        )}
      </motion.button>

      {/* Challenges Panel */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            />

            <motion.div
              initial={{ x: 400, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 400, opacity: 0 }}
              className="fixed top-0 right-0 h-full w-full max-w-2xl bg-dark-900 border-l border-primary-500/30 z-50 overflow-y-auto"
            >
              <div className="p-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary-500/20 rounded-lg">
                      <Gamepad2 className="w-6 h-6 text-primary-400" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-white">Mini Games</h2>
                      <p className="text-sm text-gray-400">
                        {completedCount}/{challenges.length} completed
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 hover:bg-dark-800 rounded-lg transition-colors"
                  >
                    <X className="w-6 h-6 text-gray-400" />
                  </button>
                </div>

                {/* Progress */}
                <div className="mb-6">
                  <div className="w-full h-2 bg-dark-700 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-primary-500 to-purple-500"
                      initial={{ width: 0 }}
                      animate={{ width: `${(completedCount / challenges.length) * 100}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                </div>

                {/* Challenges List */}
                <div className="space-y-4">
                  {challenges.map((challenge) => (
                    <motion.div
                      key={challenge.id}
                      whileHover={{ scale: 1.02 }}
                      className={`bg-dark-800 rounded-xl p-5 border cursor-pointer ${
                        challenge.completed
                          ? 'border-green-500/30 opacity-75'
                          : 'border-dark-700 hover:border-primary-500/50'
                      }`}
                      onClick={() => !challenge.completed && setSelectedChallenge(challenge)}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="text-lg font-bold text-white">{challenge.title}</h3>
                            {challenge.completed && <Trophy className="w-5 h-5 text-green-400" />}
                          </div>
                          <p className="text-gray-400 text-sm mb-3">{challenge.description}</p>
                          <div className="flex items-center gap-3">
                            <span
                              className={`px-3 py-1 rounded-lg text-xs font-bold border ${difficultyColors[challenge.difficulty]}`}
                            >
                              {challenge.difficulty.toUpperCase()}
                            </span>
                            <span className="flex items-center gap-1 text-yellow-400 text-sm font-bold">
                              <Zap className="w-4 h-4" />
                              {challenge.xp} XP
                            </span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Challenge Modal */}
            {selectedChallenge && (
              <ChallengeModal
                challenge={selectedChallenge}
                onClose={() => setSelectedChallenge(null)}
                onComplete={() => {
                  onComplete(selectedChallenge.id)
                  setSelectedChallenge(null)
                }}
              />
            )}
          </>
        )}
      </AnimatePresence>
    </>
  )
}

interface ChallengeModalProps {
  challenge: Challenge
  onClose: () => void
  onComplete: () => void
}

function ChallengeModal({ challenge, onClose, onComplete }: ChallengeModalProps) {
  const renderGame = () => {
    switch (challenge.id) {
      case 'memory-match':
        return <MemoryMatchGame onComplete={onComplete} />
      case 'color-pattern':
        return <ColorPatternGame onComplete={onComplete} />
      case 'treasure-hunt':
        return (
          <div className="text-center space-y-4">
            <div className="text-6xl mb-4">🗺️</div>
            <h3 className="text-2xl font-bold text-white">Treasure Hunt</h3>
            <p className="text-gray-300">
              Explore the 3D world and collect all the hidden treasures!
            </p>
            <div className="bg-primary-500/10 border border-primary-500/30 rounded-lg p-4">
              <p className="text-primary-300">
                Switch to 3D mode and find all the collectibles marked with emojis like 🎮 🏆 💎 🔮
              </p>
            </div>
            <button
              onClick={onComplete}
              className="px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white font-bold rounded-lg transition-colors"
            >
              Got it! Let's hunt!
            </button>
          </div>
        )
      case 'sliding-puzzle':
        return <SlidingPuzzleGame onComplete={onComplete} />
      case 'typing-test':
        return <TypingGame onComplete={() => onComplete()} />
      case 'trivia-quiz':
        return <TriviaQuizGame onComplete={() => onComplete()} />
      default:
        return <MemoryMatchGame onComplete={onComplete} />
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[60] flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-dark-900 rounded-xl border border-primary-500/30 max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col"
      >
        {/* Header */}
        <div className="p-6 border-b border-dark-700">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-white mb-1">{challenge.title}</h2>
              <p className="text-gray-400">{challenge.description}</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-dark-800 rounded-lg transition-colors"
            >
              <X className="w-6 h-6 text-gray-400" />
            </button>
          </div>
        </div>

        {/* Game Content */}
        <div className="flex-1 overflow-y-auto p-6">{renderGame()}</div>
      </motion.div>
    </motion.div>
  )
}
