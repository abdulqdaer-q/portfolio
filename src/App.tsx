import { useScrollspy } from '@/hooks/useScrollspy'
import { Navbar } from '@/components/Navbar'
import { Hero } from '@/components/Hero'
import { Experience } from '@/components/Experience'
import { Skills } from '@/components/Skills'
import { Education } from '@/components/Education'
import { Achievements } from '@/components/Achievements'
import { Contact } from '@/components/Contact'
import { Footer } from '@/components/Footer'
import { ScrollProgress } from '@/components/ScrollProgress'

function App() {
  const activeSection = useScrollspy(['home', 'about', 'experience', 'skills', 'education', 'achievements', 'contact'], 150)

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
    </div>
  )
}

export default App
