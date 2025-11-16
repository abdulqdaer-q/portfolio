import { motion } from 'framer-motion'
import { Linkedin, Mail, Trophy } from 'lucide-react'
import { portfolioData } from '@/data/portfolio'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
}

export function Hero() {
  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
  }

  const scrollToExperience = () => {
    document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center pt-20 pb-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
    >
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-96 h-96 bg-primary-500/10 rounded-full blur-3xl -top-48 -left-48 animate-float" />
        <div className="absolute w-96 h-96 bg-primary-600/10 rounded-full blur-3xl -bottom-48 -right-48 animate-float animation-delay-2000" />
      </div>

      <div className="container mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-6"
          >
            <motion.p variants={itemVariants} className="text-primary-400 font-medium text-lg">
              Hello, I'm
            </motion.p>

            <motion.h1
              variants={itemVariants}
              className="text-5xl sm:text-6xl lg:text-7xl font-bold"
            >
              <span className="bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
                {portfolioData.name}
              </span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-2xl sm:text-3xl text-gray-300 font-semibold"
            >
              Software Development Engineer @ <span className="text-primary-400">noon</span>
            </motion.p>

            <motion.p variants={itemVariants} className="text-xl text-primary-400">
              Problem Solver & Technology Enthusiast
            </motion.p>

            <motion.p
              variants={itemVariants}
              className="text-lg text-gray-400 leading-relaxed max-w-2xl"
            >
              {portfolioData.summary}
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-wrap gap-4 pt-4">
              <button
                onClick={scrollToContact}
                className="px-8 py-3 bg-primary-500 hover:bg-primary-600 text-white font-semibold rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary-500/50"
              >
                Get In Touch
              </button>
              <button
                onClick={scrollToExperience}
                className="px-8 py-3 border-2 border-primary-500 text-primary-400 hover:bg-primary-500/10 font-semibold rounded-lg transition-all duration-300 hover:scale-105"
              >
                View Work
              </button>
            </motion.div>

            <motion.div variants={itemVariants} className="flex gap-4 pt-4">
              <a
                href={`https://${portfolioData.contact.linkedin}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-dark-800 hover:bg-primary-500 rounded-lg transition-all duration-300 hover:scale-110 group"
              >
                <Linkedin className="w-6 h-6 text-gray-400 group-hover:text-white" />
              </a>
              <a
                href={`mailto:${portfolioData.contact.email}`}
                className="p-3 bg-dark-800 hover:bg-primary-500 rounded-lg transition-all duration-300 hover:scale-110 group"
              >
                <Mail className="w-6 h-6 text-gray-400 group-hover:text-white" />
              </a>
              <a
                href={`https://${portfolioData.contact.icpc_profile}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-dark-800 hover:bg-primary-500 rounded-lg transition-all duration-300 hover:scale-110 group"
              >
                <Trophy className="w-6 h-6 text-gray-400 group-hover:text-white" />
              </a>
            </motion.div>
          </motion.div>

          {/* Right Content - Code Window */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            <div className="bg-dark-900 rounded-xl overflow-hidden border border-dark-700 shadow-2xl">
              {/* Window Header */}
              <div className="flex items-center gap-2 px-4 py-3 bg-dark-800 border-b border-dark-700">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                <span className="text-sm text-gray-400 font-mono ml-2">engineer.ts</span>
              </div>

              {/* Code Content */}
              <div className="p-6 font-mono text-sm overflow-x-auto">
                <pre className="text-gray-300">
                  <code>
                    <span className="text-purple-400">const</span>{' '}
                    <span className="text-red-400">engineer</span>
                    <span className="text-yellow-400">:</span>{' '}
                    <span className="text-green-400">Engineer</span>{' '}
                    <span className="text-yellow-400">=</span> {'{'}
                    {'\n  '}
                    <span className="text-blue-400">name</span>
                    <span className="text-yellow-400">:</span>{' '}
                    <span className="text-green-300">"{portfolioData.name}"</span>,{'\n  '}
                    <span className="text-blue-400">role</span>
                    <span className="text-yellow-400">:</span>{' '}
                    <span className="text-green-300">"Software Development Engineer"</span>,{'\n  '}
                    <span className="text-blue-400">company</span>
                    <span className="text-yellow-400">:</span>{' '}
                    <span className="text-green-300">"noon"</span>,{'\n  '}
                    <span className="text-blue-400">location</span>
                    <span className="text-yellow-400">:</span>{' '}
                    <span className="text-green-300">"Dubai, UAE"</span>,{'\n  '}
                    <span className="text-blue-400">experience</span>
                    <span className="text-yellow-400">:</span>{' '}
                    <span className="text-orange-400">4</span>,{'\n  '}
                    <span className="text-blue-400">specialties</span>
                    <span className="text-yellow-400">:</span> {'['}
                    {'\n    '}
                    <span className="text-green-300">"TypeScript"</span>,{'\n    '}
                    <span className="text-green-300">"Node.js"</span>,{'\n    '}
                    <span className="text-green-300">"React.js"</span>,{'\n    '}
                    <span className="text-green-300">"Python"</span>,{'\n    '}
                    <span className="text-green-300">"GCP"</span>,{'\n    '}
                    <span className="text-green-300">"Azure"</span>
                    {'\n  '}
                    {']'},{'\n  '}
                    <span className="text-blue-400">passion</span>
                    <span className="text-yellow-400">:</span>{' '}
                    <span className="text-green-300">"Problem Solving"</span>
                    {'\n'}
                    {'};'}
                  </code>
                </pre>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
