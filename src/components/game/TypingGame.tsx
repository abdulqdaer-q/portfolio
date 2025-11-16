import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Keyboard, Trophy, RotateCcw } from 'lucide-react'

interface TypingGameProps {
  onComplete: (wpm: number) => void
}

const sampleTexts = [
  'The quick brown fox jumps over the lazy dog',
  'Practice makes perfect when learning new skills',
  'Adventure awaits those who dare to explore',
  'Success comes to those who never give up',
  'Every journey begins with a single step',
]

export function TypingGame({ onComplete }: TypingGameProps) {
  const [text] = useState(sampleTexts[Math.floor(Math.random() * sampleTexts.length)])
  const [input, setInput] = useState('')
  const [startTime, setStartTime] = useState<number | null>(null)
  const [endTime, setEndTime] = useState<number | null>(null)
  const [wpm, setWpm] = useState(0)
  const [accuracy, setAccuracy] = useState(100)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (input.length === 1 && !startTime) {
      setStartTime(Date.now())
    }

    if (input === text && !endTime) {
      const end = Date.now()
      setEndTime(end)
      if (startTime) {
        const timeInMinutes = (end - startTime) / 60000
        const words = text.split(' ').length
        const calculatedWpm = Math.round(words / timeInMinutes)
        setWpm(calculatedWpm)

        // Calculate accuracy
        let correct = 0
        for (let i = 0; i < input.length; i++) {
          if (input[i] === text[i]) correct++
        }
        const acc = Math.round((correct / text.length) * 100)
        setAccuracy(acc)

        if (calculatedWpm >= 60) {
          onComplete(calculatedWpm)
        }
      }
    }
  }, [input, text, startTime, endTime, onComplete])

  const reset = () => {
    setInput('')
    setStartTime(null)
    setEndTime(null)
    setWpm(0)
    setAccuracy(100)
    inputRef.current?.focus()
  }

  const getCharClass = (index: number) => {
    if (index >= input.length) return 'text-gray-600'
    if (input[index] === text[index]) return 'text-green-400'
    return 'text-red-400'
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-4">
        <Keyboard className="w-6 h-6 text-primary-400" />
        <h3 className="text-xl font-bold text-white">Typing Speed Test</h3>
      </div>

      {/* Text Display */}
      <div className="bg-dark-800 rounded-xl p-6 border border-dark-700">
        <p className="text-2xl font-mono leading-relaxed">
          {text.split('').map((char, index) => (
            <span key={index} className={getCharClass(index)}>
              {char}
            </span>
          ))}
        </p>
      </div>

      {/* Input */}
      <input
        ref={inputRef}
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        disabled={!!endTime}
        placeholder="Start typing..."
        className="w-full bg-dark-800 text-white font-mono text-lg p-4 rounded-lg border border-dark-700 focus:border-primary-500 outline-none disabled:opacity-50"
        autoFocus
      />

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-dark-800 rounded-lg p-4 border border-dark-700">
          <div className="text-sm text-gray-400 mb-1">WPM</div>
          <div className="text-2xl font-bold text-primary-400">{wpm}</div>
        </div>
        <div className="bg-dark-800 rounded-lg p-4 border border-dark-700">
          <div className="text-sm text-gray-400 mb-1">Accuracy</div>
          <div className="text-2xl font-bold text-green-400">{accuracy}%</div>
        </div>
        <div className="bg-dark-800 rounded-lg p-4 border border-dark-700">
          <div className="text-sm text-gray-400 mb-1">Progress</div>
          <div className="text-2xl font-bold text-yellow-400">
            {Math.round((input.length / text.length) * 100)}%
          </div>
        </div>
      </div>

      {/* Results */}
      {endTime && (
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-gradient-to-br from-primary-500/20 to-purple-500/20 rounded-xl p-6 border border-primary-500/30"
        >
          <div className="flex items-center gap-3 mb-4">
            <Trophy className="w-6 h-6 text-yellow-400" />
            <h4 className="text-xl font-bold text-white">Results</h4>
          </div>
          <p className="text-gray-300 mb-4">
            {wpm >= 60
              ? '🎉 Excellent! You unlocked the Typing Wizard achievement!'
              : `Keep practicing! Type at 60+ WPM to unlock the achievement. (Current: ${wpm} WPM)`}
          </p>
          <button
            onClick={reset}
            className="flex items-center gap-2 px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white font-bold rounded-lg transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            Try Again
          </button>
        </motion.div>
      )}
    </div>
  )
}
