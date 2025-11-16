import { useState } from 'react'
import { motion } from 'framer-motion'
import { Trophy, RotateCcw, Brain, Check, X } from 'lucide-react'

interface TriviaQuizGameProps {
  onComplete: (score: number) => void
}

interface Question {
  question: string
  options: string[]
  correctAnswer: number
}

const questions: Question[] = [
  {
    question: 'What is the largest planet in our solar system?',
    options: ['Earth', 'Jupiter', 'Saturn', 'Mars'],
    correctAnswer: 1,
  },
  {
    question: 'What is the capital of France?',
    options: ['London', 'Berlin', 'Paris', 'Madrid'],
    correctAnswer: 2,
  },
  {
    question: 'How many continents are there?',
    options: ['5', '6', '7', '8'],
    correctAnswer: 2,
  },
  {
    question: 'What is the smallest ocean?',
    options: ['Arctic', 'Indian', 'Atlantic', 'Pacific'],
    correctAnswer: 0,
  },
  {
    question: 'How many colors are in a rainbow?',
    options: ['5', '6', '7', '8'],
    correctAnswer: 2,
  },
  {
    question: 'What is the fastest land animal?',
    options: ['Lion', 'Cheetah', 'Leopard', 'Tiger'],
    correctAnswer: 1,
  },
  {
    question: 'How many days are in a leap year?',
    options: ['364', '365', '366', '367'],
    correctAnswer: 2,
  },
  {
    question: 'What is the largest mammal in the world?',
    options: ['Elephant', 'Blue Whale', 'Giraffe', 'Polar Bear'],
    correctAnswer: 1,
  },
]

export function TriviaQuizGame({ onComplete }: TriviaQuizGameProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [isCompleted, setIsCompleted] = useState(false)

  const handleAnswerClick = (answerIndex: number) => {
    if (selectedAnswer !== null) return

    setSelectedAnswer(answerIndex)
    setShowResult(true)

    const isCorrect = answerIndex === questions[currentQuestion].correctAnswer
    if (isCorrect) {
      setScore(score + 1)
    }

    // Move to next question after delay
    setTimeout(() => {
      if (currentQuestion + 1 < questions.length) {
        setCurrentQuestion(currentQuestion + 1)
        setSelectedAnswer(null)
        setShowResult(false)
      } else {
        setIsCompleted(true)
        const finalScore = isCorrect ? score + 1 : score
        if (finalScore >= 6) {
          onComplete(finalScore)
        }
      }
    }, 1500)
  }

  const resetGame = () => {
    setCurrentQuestion(0)
    setScore(0)
    setSelectedAnswer(null)
    setShowResult(false)
    setIsCompleted(false)
  }

  const question = questions[currentQuestion]
  const percentage = Math.round((score / questions.length) * 100)

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-4">
        <Brain className="w-6 h-6 text-primary-400" />
        <h3 className="text-xl font-bold text-white">Trivia Quiz</h3>
      </div>

      {!isCompleted ? (
        <>
          {/* Progress */}
          <div className="bg-dark-800 rounded-lg p-4 border border-dark-700">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-400">
                Question {currentQuestion + 1} of {questions.length}
              </span>
              <span className="text-sm text-gray-400">Score: {score}</span>
            </div>
            <div className="w-full bg-dark-900 rounded-full h-2">
              <div
                className="bg-primary-500 h-2 rounded-full transition-all duration-300"
                style={{
                  width: `${((currentQuestion + 1) / questions.length) * 100}%`,
                }}
              />
            </div>
          </div>

          {/* Question */}
          <div className="bg-dark-800 rounded-xl p-6 border border-dark-700">
            <h4 className="text-xl font-bold text-white mb-6">
              {question.question}
            </h4>

            {/* Options */}
            <div className="space-y-3">
              {question.options.map((option, index) => {
                const isSelected = selectedAnswer === index
                const isCorrect = index === question.correctAnswer
                const showCorrect = showResult && isCorrect
                const showIncorrect = showResult && isSelected && !isCorrect

                return (
                  <motion.button
                    key={index}
                    onClick={() => handleAnswerClick(index)}
                    disabled={selectedAnswer !== null}
                    className={`w-full text-left p-4 rounded-lg font-medium transition-all ${
                      showCorrect
                        ? 'bg-green-500/20 border-2 border-green-500'
                        : showIncorrect
                          ? 'bg-red-500/20 border-2 border-red-500'
                          : 'bg-dark-700 hover:bg-dark-600 border-2 border-transparent'
                    }`}
                    whileHover={selectedAnswer === null ? { scale: 1.02 } : {}}
                    whileTap={selectedAnswer === null ? { scale: 0.98 } : {}}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-white">{option}</span>
                      {showCorrect && (
                        <Check className="w-5 h-5 text-green-400" />
                      )}
                      {showIncorrect && <X className="w-5 h-5 text-red-400" />}
                    </div>
                  </motion.button>
                )
              })}
            </div>
          </div>
        </>
      ) : (
        /* Results */
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-gradient-to-br from-primary-500/20 to-purple-500/20 rounded-xl p-6 border border-primary-500/30"
        >
          <div className="flex items-center gap-3 mb-4">
            <Trophy className="w-6 h-6 text-yellow-400" />
            <h4 className="text-xl font-bold text-white">Quiz Complete!</h4>
          </div>

          {/* Score Display */}
          <div className="text-center mb-6">
            <div className="text-6xl font-bold text-primary-400 mb-2">
              {percentage}%
            </div>
            <p className="text-gray-300">
              You got {score} out of {questions.length} questions correct!
            </p>
          </div>

          {/* Achievement */}
          {score >= 6 && (
            <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 mb-4">
              <p className="text-green-400 text-center font-medium">
                🎉 Excellent! You unlocked the Quiz Master achievement!
              </p>
            </div>
          )}

          {score < 6 && (
            <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4 mb-4">
              <p className="text-yellow-400 text-center font-medium">
                Get 6 or more correct to unlock the achievement!
              </p>
            </div>
          )}

          <button
            onClick={resetGame}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-primary-500 hover:bg-primary-600 text-white font-bold rounded-lg transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            Try Again
          </button>
        </motion.div>
      )}
    </div>
  )
}
