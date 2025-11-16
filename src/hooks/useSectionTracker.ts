import { useEffect, useState } from 'react'
import type { SectionId } from '@/types'

export function useSectionTracker(sections: SectionId[]) {
  const [visitedSections, setVisitedSections] = useState<Set<SectionId>>(new Set())

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionId = entry.target.id as SectionId
            setVisitedSections((prev) => new Set(prev).add(sectionId))
          }
        })
      },
      { threshold: 0.3 }
    )

    sections.forEach((sectionId) => {
      const element = document.getElementById(sectionId)
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [sections])

  return visitedSections
}
