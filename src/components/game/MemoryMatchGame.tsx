import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Trophy, RotateCcw, Brain } from 'lucide-react'

interface MemoryMatchGameProps {
  onComplete: () => void
}

const emojis = ['🎮', '🎨', '🎭', '🎪', '🎯', '🎲', '🎸', '🎺']

interface Card {
  id: number
  emoji: string
  isFlipped: boolean
  isMatched: boolean
}

export function MemoryMatchGame({ onComplete }: MemoryMatchGameProps) {
  const [cards, setCards] = useState<Card[]>([])
  const [flippedCards, setFlippedCards] = useState<number[]>([])
  const [moves, setMoves] = useState(0)
  const [matches, setMatches] = useState(0)
  const [isCompleted, setIsCompleted] = useState(false)
  const [startTime, setStartTime] = useState<number | null>(null)
  const [endTime, setEndTime] = useState<number | null>(null)

  // Initialize game
  useEffect(() => {
    initializeGame()
  }, [])

  const initializeGame = () => {
    const gameCards: Card[] = []
    emojis.forEach((emoji, index) => {
      gameCards.push(
        { id: index * 2, emoji, isFlipped: false, isMatched: false },
        { id: index * 2 + 1, emoji, isFlipped: false, isMatched: false }
      )
    })
    // Shuffle cards
    const shuffled = gameCards.sort(() => Math.random() - 0.5)
    setCards(shuffled)
    setFlippedCards([])
    setMoves(0)
    setMatches(0)
    setIsCompleted(false)
    setStartTime(null)
    setEndTime(null)
  }

  const handleCardClick = (cardId: number) => {
    if (!startTime) {
      setStartTime(Date.now())
    }

    const card = cards.find((c) => c.id === cardId)
    if (!card || card.isFlipped || card.isMatched || flippedCards.length === 2) {
      return
    }

    const newFlippedCards = [...flippedCards, cardId]
    setFlippedCards(newFlippedCards)

    // Update card to be flipped
    setCards(
      cards.map((c) => (c.id === cardId ? { ...c, isFlipped: true } : c))
    )

    // Check for match when two cards are flipped
    if (newFlippedCards.length === 2) {
      setMoves(moves + 1)
      const [firstId, secondId] = newFlippedCards
      const firstCard = cards.find((c) => c.id === firstId)
      const secondCard = cards.find((c) => c.id === secondId)

      if (firstCard && secondCard && firstCard.emoji === secondCard.emoji) {
        // Match found!
        setTimeout(() => {
          setCards(
            cards.map((c) =>
              c.id === firstId || c.id === secondId
                ? { ...c, isMatched: true }
                : c
            )
          )
          setMatches(matches + 1)
          setFlippedCards([])

          // Check if game is complete
          if (matches + 1 === emojis.length) {
            setIsCompleted(true)
            setEndTime(Date.now())
            onComplete()
          }
        }, 600)
      } else {
        // No match - flip back after delay
        setTimeout(() => {
          setCards(
            cards.map((c) =>
              c.id === firstId || c.id === secondId
                ? { ...c, isFlipped: false }
                : c
            )
          )
          setFlippedCards([])
        }, 1000)
      }
    }
  }

  const getTimeElapsed = () => {
    if (!startTime) return 0
    const end = endTime || Date.now()
    return Math.floor((end - startTime) / 1000)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-4">
        <Brain className="w-6 h-6 text-primary-400" />
        <h3 className="text-xl font-bold text-white">Memory Match</h3>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-dark-800 rounded-lg p-4 border border-dark-700">
          <div className="text-sm text-gray-400 mb-1">Moves</div>
          <div className="text-2xl font-bold text-primary-400">{moves}</div>
        </div>
        <div className="bg-dark-800 rounded-lg p-4 border border-dark-700">
          <div className="text-sm text-gray-400 mb-1">Matches</div>
          <div className="text-2xl font-bold text-green-400">
            {matches}/{emojis.length}
          </div>
        </div>
        <div className="bg-dark-800 rounded-lg p-4 border border-dark-700">
          <div className="text-sm text-gray-400 mb-1">Time</div>
          <div className="text-2xl font-bold text-yellow-400">
            {getTimeElapsed()}s
          </div>
        </div>
      </div>

      {/* Game Board */}
      <div className="grid grid-cols-4 gap-3">
        {cards.map((card) => (
          <motion.button
            key={card.id}
            onClick={() => handleCardClick(card.id)}
            disabled={card.isMatched || isCompleted}
            className={`aspect-square rounded-xl text-4xl font-bold transition-all ${
              card.isFlipped || card.isMatched
                ? 'bg-gradient-to-br from-primary-500 to-purple-500'
                : 'bg-dark-800 hover:bg-dark-700'
            } ${card.isMatched ? 'opacity-50' : ''}`}
            whileHover={{ scale: card.isMatched ? 1 : 1.05 }}
            whileTap={{ scale: card.isMatched ? 1 : 0.95 }}
          >
            {card.isFlipped || card.isMatched ? card.emoji : '?'}
          </motion.button>
        ))}
      </div>

      {/* Results */}
      {isCompleted && (
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-gradient-to-br from-primary-500/20 to-purple-500/20 rounded-xl p-6 border border-primary-500/30"
        >
          <div className="flex items-center gap-3 mb-4">
            <Trophy className="w-6 h-6 text-yellow-400" />
            <h4 className="text-xl font-bold text-white">Congratulations!</h4>
          </div>
          <p className="text-gray-300 mb-4">
            🎉 You completed the memory match game in {moves} moves and{' '}
            {getTimeElapsed()} seconds!
          </p>
          <button
            onClick={initializeGame}
            className="flex items-center gap-2 px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white font-bold rounded-lg transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            Play Again
          </button>
        </motion.div>
      )}
    </div>
  )
}
