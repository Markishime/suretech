'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { 
  Award, 
  DollarSign, 
  Clock, 
  Shield, 
  CheckCircle,
  Sparkles,
  ArrowRight 
} from 'lucide-react'
import { fadeInUp, fadeInLeft, fadeInRight, scaleIn, staggerContainer, staggerItem, hoverScale, hoverLift } from '@/lib/animations'

const benefits = [
  {
    icon: Award,
    title: 'Proven Track Record',
    description: 'Years of experience in system installation and network maintenance with a portfolio of successful projects.',
  },
  {
    icon: DollarSign,
    title: 'Customized & Cost-Effective',
    description: 'Tailored solutions that fit your budget without compromising on quality or performance.',
  },
  {
    icon: Clock,
    title: '24/7 Technical Support',
    description: 'Round-the-clock assistance to ensure your systems run smoothly at all times.',
  },
  {
    icon: Shield,
    title: 'Security & Efficiency',
    description: 'Commitment to implementing robust security measures and optimizing operational efficiency.',
  },
]

const additionalBenefits = [
  'Expert team with industry certifications',
  'Cutting-edge technology solutions',
  'Quick response times',
  'Comprehensive project management',
  'Ongoing maintenance and support',
  'Transparent communication',
]

export default function WhyChooseUsPage() {
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
              Why Choose Us?
            </motion.h1>
            <motion.p 
              className="text-xl text-gray-300 font-tech"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.4, ease: 'easeOut' }}
            >
              Excellence in every project, commitment in every partnership
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Main Benefits */}
      <section className="relative py-20 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon
              return (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ delay: index * 0.1, duration: 0.4, ease: 'easeOut' }}
                  whileHover={{ scale: 1.02 }}
                  className="glass-effect rounded-xl p-8 space-y-4 group cursor-pointer"
                  style={{ willChange: 'transform, opacity' }}
                >
                  <div className="relative">
                    <div className="absolute inset-0 bg-primary-500/20 rounded-lg blur-xl group-hover:blur-2xl transition-all" />
                    <div className="relative bg-gradient-to-br from-primary-500/20 to-primary-600/20 rounded-lg p-4 w-fit">
                      <Icon className="w-10 h-10 text-primary-400" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-semibold text-white">{benefit.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{benefit.description}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Additional Benefits */}
      <section className="relative py-20 px-4 bg-dark-900/50">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-8 text-center">
              Additional <span className="text-gradient">Advantages</span>
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {additionalBenefits.map((benefit, index) => (
                <motion.div
                  key={benefit}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-center space-x-3 glass-effect rounded-lg p-4"
                >
                  <CheckCircle className="w-6 h-6 text-primary-400 flex-shrink-0" />
                  <span className="text-gray-300">{benefit}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Core Values Connection */}
      <section className="relative py-20 px-4">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center space-y-6"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-white">
              Built on <span className="text-gradient">Strong Values</span>
            </h2>
            <p className="text-lg text-gray-300 leading-relaxed">
              Our commitment to integrity, excellence, innovation, customer focus, teamwork, and reliability 
              drives everything we do. These core values ensure that every project delivers exceptional results 
              and lasting partnerships.
            </p>
            <Link
              href="/about"
              className="inline-flex items-center space-x-2 text-primary-400 hover:text-primary-300 font-semibold group"
            >
              <span>Learn More About Our Values</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 px-4 bg-gradient-to-br from-primary-900/30 via-dark-900 to-dark-950">
        <div className="container mx-auto text-center space-y-8">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl lg:text-5xl font-bold text-white"
          >
            Experience the <span className="text-gradient">Difference</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-300 max-w-2xl mx-auto"
          >
            Join our satisfied clients and discover why Suretech is the trusted choice for ICT solutions.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              href="/contact"
              className="px-8 py-4 bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg text-white font-semibold hover:shadow-lg hover:shadow-primary-500/50 transition-all"
            >
              Get Started Today
            </Link>
            <Link
              href="/services"
              className="px-8 py-4 bg-transparent border-2 border-primary-500 rounded-lg text-white font-semibold hover:bg-primary-500/10 transition-all"
            >
              View Our Services
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

