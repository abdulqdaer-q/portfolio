import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useScrollspy } from '@/hooks/useScrollspy'
import { useGameState } from '@/hooks/useGameState'
import { useSectionTracker } from '@/hooks/useSectionTracker'
import { useEasterEggs } from '@/hooks/useEasterEggs'
import { use3DMode } from '@/hooks/use3DMode'

import { Navbar } from '@/components/Navbar'
import { Hero } from '@/components/Hero'
import { Experience } from '@/components/Experience'
import { Skills } from '@/components/Skills'
import { Education } from '@/components/Education'
import { Achievements } from '@/components/Achievements'
import { Contact } from '@/components/Contact'
import { Footer } from '@/components/Footer'
import { ScrollProgress } from '@/components/ScrollProgress'

import { GameHUD } from '@/components/game/GameHUD'
import { AchievementNotification } from '@/components/game/AchievementNotification'
import { ChallengesPanel } from '@/components/game/ChallengesPanel'
import { ParticleEffect } from '@/components/game/ParticleEffect'

import { World } from '@/components/3d/World'
import { ModeToggle } from '@/components/3d/ModeToggle'
import { Minimap } from '@/components/3d/Minimap'
import { Instructions } from '@/components/3d/Instructions'

import type { SectionId } from '@/types'

const sections: SectionId[] = ['home', 'experience', 'skills', 'education', 'achievements', 'contact']

function App() {
  const { is3DMode } = use3DMode()
  const activeSection = useScrollspy(sections, 150)
  const visitedSections = useSectionTracker(sections)
  const {
    gameState,
    recentAchievement,
    unlockAchievement,
    completeChallenge,
    addXP,
  } = useGameState()

  const [showParticles, setShowParticles] = useState(false)
  const [particleEmoji, setParticleEmoji] = useState('✨')
  const [socialLinksClicked, setSocialLinksClicked] = useState(new Set<string>())
  const [playerPosition, setPlayerPosition] = useState({ x: 0, z: 8 })
  const [collectibles, setCollectibles] = useState([
    { id: 'xp-1', position: [-10, 1, -5], collected: false },
    { id: 'xp-2', position: [10, 1, -5], collected: false },
    { id: 'xp-3', position: [-10, 1, 5], collected: false },
    { id: 'xp-4', position: [10, 1, 5], collected: false },
    { id: 'secret-1', position: [-20, 1, -15], collected: false },
    { id: 'secret-2', position: [20, 1, -15], collected: false },
    { id: 'secret-3', position: [-20, 1, 15], collected: false },
    { id: 'secret-4', position: [20, 1, 15], collected: false },
  ] as Array<{ id: string; position: [number, number, number]; collected: boolean }>)

  // First visit achievement
  useEffect(() => {
    setTimeout(() => {
      unlockAchievement('first-visit')
    }, 1000)
  }, [unlockAchievement])

  // Section explorer achievement
  useEffect(() => {
    if (visitedSections.size === sections.length) {
      unlockAchievement('section-explorer')
    }
  }, [visitedSections, unlockAchievement])

  // Time-based achievements
  useEffect(() => {
    const speedReaderTimer = setTimeout(() => {
      if (gameState.stats.timeSpent < 120) {
        unlockAchievement('speed-reader')
      }
    }, 120000)

    const dedicatedVisitorTimer = setTimeout(() => {
      unlockAchievement('dedicated-visitor')
    }, 600000)

    return () => {
      clearTimeout(speedReaderTimer)
      clearTimeout(dedicatedVisitorTimer)
    }
  }, [unlockAchievement, gameState.stats.timeSpent])

  // Level achievements
  useEffect(() => {
    if (gameState.stats.level >= 10) {
      unlockAchievement('level-10')
    }
  }, [gameState.stats.level, unlockAchievement])

  // Return visitor achievement
  useEffect(() => {
    if (gameState.stats.visitCount >= 5) {
      unlockAchievement('return-visitor')
    }
  }, [gameState.stats.visitCount, unlockAchievement])

  // Code master achievement
  useEffect(() => {
    const codeChallenge = gameState.challenges.filter(
      (c) => c.type === 'code' && c.completed
    ).length
    const totalCodeChallenges = gameState.challenges.filter((c) => c.type === 'code').length

    if (codeChallenge === totalCodeChallenges && totalCodeChallenges > 0) {
      unlockAchievement('code-master')
    }
  }, [gameState.challenges, unlockAchievement])

  // Easter eggs
  useEasterEggs({
    onKonamiCode: () => {
      unlockAchievement('konami-code')
      setParticleEmoji('🎮')
      setShowParticles(true)
      setTimeout(() => setShowParticles(false), 100)
      addXP(100)
    },
    onNightOwl: () => {
      unlockAchievement('night-owl')
    },
    onEarlyBird: () => {
      unlockAchievement('early-bird')
    },
    onConsoleCommand: () => {
      unlockAchievement('console-warrior')
    },
  })

  // Track social link clicks
  useEffect(() => {
    const handleSocialClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const link = target.closest('a')
      if (link && (link.href.includes('linkedin') || link.href.includes('mailto') || link.href.includes('icpc'))) {
        const href = link.href
        setSocialLinksClicked((prev) => new Set(prev).add(href))
      }
    }

    document.addEventListener('click', handleSocialClick)
    return () => document.removeEventListener('click', handleSocialClick)
  }, [])

  // Social connector achievement
  useEffect(() => {
    if (socialLinksClicked.size >= 3) {
      unlockAchievement('social-connector')
    }
  }, [socialLinksClicked, unlockAchievement])

  // Particle effect on achievement unlock
  useEffect(() => {
    if (recentAchievement) {
      setParticleEmoji(recentAchievement.icon)
      setShowParticles(true)
      setTimeout(() => setShowParticles(false), 100)
    }
  }, [recentAchievement])

  // 3D World handlers
  const handleCollectItem = (itemId: string) => {
    setCollectibles((prev) =>
      prev.map((item) => (item.id === itemId ? { ...item, collected: true } : item))
    )

    if (itemId.startsWith('xp-')) {
      addXP(50)
    } else if (itemId.startsWith('secret-')) {
      addXP(100)
      unlockAchievement('secret-hunter')
    }

    setParticleEmoji('✨')
    setShowParticles(true)
    setTimeout(() => setShowParticles(false), 100)
  }

  const handleEnterPortal = (sectionId: string) => {
    // Scroll to section in 2D mode
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    addXP(25)
  }

  return (
    <div className="min-h-screen bg-dark-950 text-white">
      {/* 3D World */}
      <AnimatePresence mode="wait">
        {is3DMode && (
          <motion.div
            key="3d-world"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <World onCollectItem={handleCollectItem} onEnterPortal={handleEnterPortal} />
            <Instructions />
            <Minimap playerPosition={playerPosition} collectibles={collectibles} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2D Portfolio */}
      <AnimatePresence mode="wait">
        {!is3DMode && (
          <motion.div
            key="2d-portfolio"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <ScrollProgress />
            <Navbar activeSection={activeSection} />

            <main>
              <Hero />
              <Experience />
              <Skills />
              <Education />
              <Achievements />
              <Contact />
            </main>

            <Footer />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Game Elements (Always visible) */}
      <ModeToggle />
      <GameHUD stats={gameState.stats} />
      <AchievementNotification
        achievement={recentAchievement}
        onClose={() => {}}
      />
      <ChallengesPanel
        challenges={gameState.challenges}
        onComplete={completeChallenge}
      />
      <ParticleEffect trigger={showParticles} emoji={particleEmoji} />
    </div>
  )
}

export default App
