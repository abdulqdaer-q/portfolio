import { useState, useEffect } from 'react'
import type { SectionId } from '@/types'

export function useScrollspy(sectionIds: SectionId[], offset: number = 100) {
  const [activeSection, setActiveSection] = useState<SectionId>('home')

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + offset

      for (const sectionId of sectionIds) {
        const element = document.getElementById(sectionId)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(sectionId)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Call once on mount

    return () => window.removeEventListener('scroll', handleScroll)
  }, [sectionIds, offset])

  return activeSection
}
