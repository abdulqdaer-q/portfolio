import { motion } from 'framer-motion'
import { Mail, Phone, Linkedin, Trophy } from 'lucide-react'
import { portfolioData } from '@/data/portfolio'

const contactMethods = [
  {
    icon: Mail,
    title: 'Email',
    value: portfolioData.contact.email,
    href: `mailto:${portfolioData.contact.email}`,
  },
  {
    icon: Phone,
    title: 'Phone',
    value: portfolioData.contact.phone,
    href: `tel:${portfolioData.contact.phone}`,
  },
  {
    icon: Linkedin,
    title: 'LinkedIn',
    value: 'Connect with me',
    href: `https://${portfolioData.contact.linkedin}`,
  },
  {
    icon: Trophy,
    title: 'ICPC Profile',
    value: 'View competitive record',
    href: `https://${portfolioData.contact.icpc_profile}`,
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
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5 },
  },
}

export function Contact() {
  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-dark-900">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            Get In{' '}
            <span className="bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent">
              Touch
            </span>
          </h2>
          <div className="w-20 h-1 bg-primary-500 mx-auto mb-6" />
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            I'm always open to discussing new opportunities, innovative projects, or potential
            collaborations.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto"
        >
          {contactMethods.map((method, index) => (
            <motion.a
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -8 }}
              href={method.href}
              target={method.href.startsWith('http') ? '_blank' : undefined}
              rel={method.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="bg-dark-800 rounded-xl p-6 border border-dark-700 hover:border-primary-500 transition-all duration-300 text-center group hover:shadow-lg hover:shadow-primary-500/20"
            >
              <div className="inline-flex p-4 bg-primary-500/10 rounded-xl mb-4 group-hover:bg-primary-500 transition-all duration-300">
                <method.icon className="w-7 h-7 text-primary-400 group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{method.title}</h3>
              <p className="text-sm text-gray-400 break-words">{method.value}</p>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
