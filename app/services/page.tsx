'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { 
  Network, 
  Server, 
  Wrench, 
  Camera, 
  Shield, 
  Settings,
  ArrowRight,
  CheckCircle 
} from 'lucide-react'
import { fadeInUp, fadeInLeft, fadeInRight, scaleIn, staggerContainer, staggerItem, hoverScale, hoverLift, rotateIn } from '@/lib/animations'

const services = [
  {
    id: 'structured-cabling',
    icon: Network,
    title: 'Structured Cabling Solutions',
    description: 'Design and installation of structured cabling systems that ensure organized, scalable, and efficient communication infrastructure.',
    features: [
      'Customized cabling design',
      'Professional installation',
      'Scalable infrastructure',
      'Industry-standard compliance',
    ],
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800',
  },
  {
    id: 'network-design',
    icon: Server,
    title: 'Network Design and Implementation',
    description: 'Development of robust network architectures tailored to client requirements, ensuring performance, scalability, and reliability.',
    features: [
      'Custom network architecture',
      'Performance optimization',
      'Scalability planning',
      'Reliability assurance',
    ],
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800',
  },
  {
    id: 'server-installation',
    icon: Server,
    title: 'Server Installation and Configuration',
    description: 'Deployment and management of servers to support business-critical operations and enhance data availability.',
    features: [
      'Server deployment',
      'Configuration management',
      'Performance tuning',
      '24/7 monitoring',
    ],
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800',
  },
  {
    id: 'it-support',
    icon: Wrench,
    title: 'IT Support and Maintenance',
    description: 'Comprehensive technical support services to ensure system uptime, performance optimization, and fast issue resolution.',
    features: [
      '24/7 technical support',
      'Proactive monitoring',
      'Rapid issue resolution',
      'Performance optimization',
    ],
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800',
  },
  {
    id: 'cctv',
    icon: Camera,
    title: 'CCTV Installation and Configuration',
    description: 'Setup of advanced surveillance systems for enhanced security and monitoring.',
    features: [
      'Professional installation',
      'HD camera systems',
      'Remote monitoring',
      'Mobile app access',
    ],
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800',
  },
  {
    id: 'cybersecurity',
    icon: Shield,
    title: 'Cybersecurity Solutions',
    description: 'Implementation of proactive security measures to safeguard data, networks, and systems from cyber threats.',
    features: [
      'Threat assessment',
      'Security implementation',
      'Ongoing monitoring',
      'Incident response',
    ],
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800',
  },
  {
    id: 'other-services',
    icon: Settings,
    title: 'Other IT-Related Services',
    description: 'Customized ICT services based on client needs, including consulting, system integration, and technical project management.',
    features: [
      'IT consulting',
      'System integration',
      'Project management',
      'Custom solutions',
    ],
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800',
  },
]

const servicePillars = [
  { label: 'Design → Deploy → Defend', detail: 'Unified delivery teams' },
  { label: 'Site-ready in 10 days', detail: 'Fast-track implementations' },
  { label: 'AI-powered monitoring', detail: 'Real-time remediation' },
]

export default function ServicesPage() {
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
            <motion.h1 
              className="text-5xl lg:text-6xl font-bold text-gradient ai-glow font-display"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              style={{ willChange: 'transform, opacity' }}
            >
              Our Services
            </motion.h1>
            <motion.p 
              className="text-xl text-gray-300 font-tech"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.4, ease: 'easeOut' }}
            >
              Comprehensive ICT solutions tailored to your business needs
            </motion.p>
          </motion.div>
        </div>

        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="container mx-auto mt-10 grid sm:grid-cols-3 gap-4"
        >
          {servicePillars.map((pillar) => (
            <motion.div
              key={pillar.label}
              variants={staggerItem}
              className="glass-effect rounded-2xl p-4 text-center border border-primary-500/10"
            >
              <p className="text-sm text-primary-300 uppercase tracking-[0.3em]">{pillar.label}</p>
              <p className="text-gray-300 mt-2 text-sm">{pillar.detail}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Services Grid */}
      <section className="relative py-20 px-4">
        <div className="container mx-auto space-y-16">
          {services.map((service, index) => {
            const Icon = service.icon
            const isEven = index % 2 === 0

            return (
              <motion.div
                key={service.id}
                id={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="scroll-mt-20"
              >
                <div className={`grid lg:grid-cols-2 gap-12 items-center ${!isEven ? 'lg:flex-row-reverse' : ''}`}>
                  <motion.div
                    initial={{ opacity: 0, x: isEven ? -30 : 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                    className={`space-y-6 ${!isEven ? 'lg:order-2' : ''}`}
                    style={{ willChange: 'transform, opacity' }}
                  >
                    <div className="flex items-center space-x-4">
                      <motion.div 
                        className="bg-gradient-to-br from-primary-500/20 to-primary-600/20 rounded-lg p-4"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3, ease: 'easeOut' }}
                        style={{ willChange: 'transform' }}
                      >
                        <Icon className="w-10 h-10 text-primary-400" />
                      </motion.div>
                      <h2 className="text-3xl lg:text-4xl font-bold text-white font-display">
                        {service.title}
                      </h2>
                    </div>
                    <p className="text-lg text-gray-300 leading-relaxed">
                      {service.description}
                    </p>
                    <ul className="space-y-3">
                      {service.features.map((feature) => (
                        <li key={feature} className="flex items-start space-x-3">
                          <CheckCircle className="w-6 h-6 text-primary-400 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-300">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Link
                      href="/contact"
                      className="inline-flex items-center space-x-2 text-primary-400 hover:text-primary-300 font-semibold group"
                    >
                      <span>Get a Quote</span>
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: isEven ? 30 : -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                    className={`relative h-[400px] rounded-2xl overflow-hidden glass-effect ${!isEven ? 'lg:order-1' : ''}`}
                    style={{ willChange: 'transform, opacity' }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-primary-900/50 to-dark-900" />
                    <div 
                      className="absolute inset-0 bg-cover bg-center mix-blend-overlay opacity-30"
                      style={{ backgroundImage: `url(${service.image})` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-950/80 to-transparent" />
                  </motion.div>
                </div>
              </motion.div>
            )
          })}
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
            Need a <span className="text-gradient">Custom Solution?</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-300 max-w-2xl mx-auto"
          >
            Contact us today to discuss your specific requirements and get a customized quote.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Link
              href="/contact"
              className="inline-block px-8 py-4 bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg text-white font-semibold hover:shadow-lg hover:shadow-primary-500/50 transition-all"
            >
              Contact Us Now
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

