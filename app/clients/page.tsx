'use client'

import { motion } from 'framer-motion'
import { Building2, GraduationCap, Shield, Database, Home, Sparkles } from 'lucide-react'

const industries = [
  {
    icon: Building2,
    title: 'Corporate Offices',
    description: 'Empowering businesses with reliable network infrastructure and IT solutions for seamless operations.',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800',
  },
  {
    icon: GraduationCap,
    title: 'Educational Institutions',
    description: 'Supporting learning environments with robust ICT infrastructure for modern education.',
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800',
  },
  {
    icon: Shield,
    title: 'Government Agencies',
    description: 'Delivering secure and compliant solutions for public sector digital transformation.',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800',
  },
  {
    icon: Database,
    title: 'Data Centers',
    description: 'Providing mission-critical infrastructure for high-availability data operations.',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800',
  },
  {
    icon: Home,
    title: 'Residential and Private Properties',
    description: 'Bringing enterprise-grade solutions to homes and private facilities.',
    image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800',
  },
]

export default function ClientsPage() {
  return (
    <div className="relative min-h-screen pt-20">
      {/* AI Grid Background */}
      <div className="fixed inset-0 ai-grid-bg opacity-20" />

      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="max-w-4xl mx-auto text-center space-y-6"
            style={{ willChange: 'transform, opacity' }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1, duration: 0.4, ease: 'easeOut' }}
              className="inline-block"
            >
              <Sparkles className="w-12 h-12 text-primary-400 mx-auto mb-4" />
            </motion.div>
            <motion.h1 
              className="text-5xl lg:text-6xl font-bold text-gradient ai-glow font-display"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              style={{ willChange: 'transform, opacity' }}
            >
              Industries We Serve
            </motion.h1>
            <motion.p 
              className="text-xl text-gray-300 font-tech"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.4, ease: 'easeOut' }}
            >
              Technology-driven solutions across multiple sectors
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Summary Section */}
      <section className="relative py-12 px-4">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <div className="glass-effect rounded-xl p-8">
              <p className="text-lg text-gray-300 leading-relaxed">
                Suretech caters to clients across multiple industries, providing technology-driven solutions 
                that strengthen operational efficiency and data security. Our expertise spans various sectors, 
                each with unique requirements and challenges.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Industries Grid */}
      <section className="relative py-20 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {industries.map((industry, index) => {
              const Icon = industry.icon
              return (
                <motion.div
                  key={industry.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ delay: index * 0.1, duration: 0.4, ease: 'easeOut' }}
                  whileHover={{ scale: 1.02 }}
                  className="glass-effect rounded-xl overflow-hidden group cursor-pointer"
                  style={{ willChange: 'transform, opacity' }}
                >
                  <div className="relative h-48 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary-900/50 to-dark-900" />
                    <div 
                      className="absolute inset-0 bg-cover bg-center mix-blend-overlay opacity-30 group-hover:opacity-50 transition-opacity"
                      style={{ backgroundImage: `url(${industry.image})` }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-gradient-to-br from-primary-500/20 to-primary-600/20 rounded-lg p-4 backdrop-blur-sm">
                        <Icon className="w-12 h-12 text-primary-400" />
                      </div>
                    </div>
                  </div>
                  <div className="p-6 space-y-4">
                    <h3 className="text-2xl font-semibold text-white">{industry.title}</h3>
                    <p className="text-gray-400">{industry.description}</p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 px-4">
        <div className="container mx-auto text-center space-y-8">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl lg:text-5xl font-bold text-white"
          >
            Ready to Partner with <span className="text-gradient">Us?</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-300 max-w-2xl mx-auto"
          >
              Let&apos;s discuss how our solutions can benefit your industry.
          </motion.p>
        </div>
      </section>
    </div>
  )
}

