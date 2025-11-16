import { motion } from 'framer-motion'
import { MapPin } from 'lucide-react'
import { portfolioData } from '@/data/portfolio'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5 },
  },
}

export function Experience() {
  return (
    <section id="experience" className="py-20 px-4 sm:px-6 lg:px-8 bg-dark-900">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            Professional{' '}
            <span className="bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent">
              Experience
            </span>
          </h2>
          <div className="w-20 h-1 bg-primary-500 mx-auto" />
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="relative"
        >
          {/* Timeline Line */}
          <div className="absolute left-0 sm:left-8 top-0 bottom-0 w-0.5 bg-dark-700" />

          <div className="space-y-12">
            {portfolioData.experience.map((exp, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="relative pl-8 sm:pl-20"
              >
                {/* Timeline Dot */}
                <div className="absolute left-0 sm:left-6 top-2 w-4 h-4 rounded-full bg-primary-500 border-4 border-dark-900 shadow-lg shadow-primary-500/50" />

                <div className="bg-dark-800 rounded-xl p-6 border border-dark-700 hover:border-primary-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary-500/10">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-2">{exp.company}</h3>
                      <div className="flex items-center gap-2 text-gray-400">
                        <MapPin className="w-4 h-4" />
                        <span>{exp.location}</span>
                      </div>
                    </div>
                  </div>

                  {/* Roles */}
                  {exp.roles ? (
                    <div className="space-y-6">
                      {exp.roles.map((role, roleIndex) => (
                        <div key={roleIndex} className="border-l-2 border-primary-500/30 pl-4">
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
                            <h4 className="text-lg font-semibold text-primary-400">
                              {role.title}
                            </h4>
                            <span className="text-sm text-gray-400 font-mono">{role.period}</span>
                          </div>
                          {role.achievements.length > 0 && (
                            <ul className="space-y-2">
                              {role.achievements.map((achievement, achIndex) => (
                                <li key={achIndex} className="flex gap-3 text-gray-300">
                                  <span className="text-primary-400 mt-1">▹</span>
                                  <span>{achievement}</span>
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <>
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
                        <h4 className="text-lg font-semibold text-primary-400">{exp.title}</h4>
                        <span className="text-sm text-gray-400 font-mono">{exp.period}</span>
                      </div>
                      {exp.achievements && exp.achievements.length > 0 && (
                        <ul className="space-y-2">
                          {exp.achievements.map((achievement, achIndex) => (
                            <li key={achIndex} className="flex gap-3 text-gray-300">
                              <span className="text-primary-400 mt-1">▹</span>
                              <span>{achievement}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
