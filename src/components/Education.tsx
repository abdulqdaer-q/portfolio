import { motion } from 'framer-motion'
import { GraduationCap } from 'lucide-react'
import { portfolioData } from '@/data/portfolio'

export function Education() {
  return (
    <section id="education" className="py-20 px-4 sm:px-6 lg:px-8 bg-dark-900">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent">
              Education
            </span>
          </h2>
          <div className="w-20 h-1 bg-primary-500 mx-auto" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          whileHover={{ scale: 1.02 }}
          className="max-w-3xl mx-auto"
        >
          <div className="bg-dark-800 rounded-xl p-8 border border-dark-700 hover:border-primary-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary-500/10">
            <div className="flex flex-col sm:flex-row gap-6 items-start">
              <div className="p-4 bg-primary-500/10 rounded-xl">
                <GraduationCap className="w-12 h-12 text-primary-400" />
              </div>

              <div className="flex-1">
                <h3 className="text-2xl font-bold text-white mb-2">
                  {portfolioData.education.degree} in {portfolioData.education.field}
                </h3>
                <p className="text-xl text-primary-400 mb-2">
                  {portfolioData.education.institution}
                </p>
                <p className="text-gray-400 font-mono">{portfolioData.education.period}</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
