import { motion } from 'framer-motion'
import { Trophy, Award } from 'lucide-react'
import { portfolioData } from '@/data/portfolio'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
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

export function Achievements() {
  return (
    <section id="achievements" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            Achievements &{' '}
            <span className="bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent">
              Recognition
            </span>
          </h2>
          <div className="w-20 h-1 bg-primary-500 mx-auto" />
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-8"
        >
          {/* Competitive Programming Awards */}
          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            className="bg-dark-800 rounded-xl p-8 border border-dark-700 hover:border-primary-500/50 transition-all duration-300"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-yellow-500/10 rounded-lg">
                <Trophy className="w-6 h-6 text-yellow-400" />
              </div>
              <h3 className="text-xl font-bold text-white">Competitive Programming</h3>
            </div>

            <ul className="space-y-3">
              {portfolioData.awards.map((award, index) => (
                <li key={index} className="flex items-start gap-3 text-gray-300">
                  <span className="text-yellow-400 mt-1">✓</span>
                  <span>{award}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Certifications */}
          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            className="bg-dark-800 rounded-xl p-8 border border-dark-700 hover:border-primary-500/50 transition-all duration-300"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-primary-500/10 rounded-lg">
                <Award className="w-6 h-6 text-primary-400" />
              </div>
              <h3 className="text-xl font-bold text-white">Certifications</h3>
            </div>

            <ul className="space-y-3">
              {portfolioData.certifications.map((cert, index) => (
                <li key={index} className="flex items-start gap-3 text-gray-300">
                  <span className="text-primary-400 mt-1">✓</span>
                  <span>{cert}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
