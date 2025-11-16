import { useEffect, useState } from 'react'
import { useScrollspy } from '@/hooks/useScrollspy'
import { useGameState } from '@/hooks/useGameState'
import { useSectionTracker } from '@/hooks/useSectionTracker'
import { useEasterEggs } from '@/hooks/useEasterEggs'

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

import type { SectionId } from '@/types'

const sections: SectionId[] = ['home', 'experience', 'skills', 'education', 'achievements', 'contact']

function App() {
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
    // Speed reader (less than 2 minutes)
    const speedReaderTimer = setTimeout(() => {
      if (gameState.stats.timeSpent < 120) {
        unlockAchievement('speed-reader')
      }
    }, 120000)

    // Dedicated visitor (more than 10 minutes)
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

  return (
    <div className="min-h-screen bg-dark-950 text-white">
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

      {/* Game Elements */}
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
