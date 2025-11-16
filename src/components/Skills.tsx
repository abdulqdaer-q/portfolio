import { motion } from 'framer-motion'
import { Code2, Cloud, Lightbulb, Globe } from 'lucide-react'

const skillCategories = [
  {
    title: 'Languages & Frameworks',
    icon: Code2,
    skills: ['TypeScript', 'JavaScript', 'Python', 'Node.js', 'React.js', 'Angular'],
  },
  {
    title: 'Cloud & DevOps',
    icon: Cloud,
    skills: ['Google Cloud Platform', 'Azure', 'Git', 'CI/CD'],
  },
  {
    title: 'Specializations',
    icon: Lightbulb,
    skills: [
      'Problem Solving',
      'Scalable Systems',
      'Performance Optimization',
      'Full-Stack Development',
      'System Architecture',
    ],
  },
  {
    title: 'Languages',
    icon: Globe,
    skills: ['English - Full Professional', 'Arabic - Native'],
  },
]

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
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
}

export function Skills() {
  return (
    <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            Technical{' '}
            <span className="bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent">
              Expertise
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
          {skillCategories.map((category, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              className="bg-dark-800 rounded-xl p-8 border border-dark-700 hover:border-primary-500/50 transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-primary-500/10 rounded-lg">
                  <category.icon className="w-6 h-6 text-primary-400" />
                </div>
                <h3 className="text-xl font-bold text-white">{category.title}</h3>
              </div>

              <div className="flex flex-wrap gap-3">
                {category.skills.map((skill, skillIndex) => (
                  <motion.span
                    key={skillIndex}
                    whileHover={{ scale: 1.05 }}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                      skill === 'Problem Solving'
                        ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/30'
                        : 'bg-dark-700 text-gray-300 hover:bg-primary-500/20 hover:text-primary-300'
                    }`}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
