'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { 
  Network, 
  Server, 
  Wrench, 
  Camera, 
  Shield, 
  Settings,
  ArrowRight,
  CheckCircle,
  Sparkles,
  Zap,
  Clock,
  Users,
  Award,
  Phone,
  MapPin
} from 'lucide-react'
import { staggerContainer, staggerItem } from '@/lib/animations'

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
    color: 'from-cyan-500 to-blue-600',
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
    color: 'from-purple-500 to-pink-600',
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
    color: 'from-orange-500 to-red-600',
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
    color: 'from-green-500 to-emerald-600',
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
    color: 'from-pink-500 to-purple-600',
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
    color: 'from-blue-500 to-cyan-600',
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
    color: 'from-amber-500 to-orange-600',
  },
]

const benefits = [
  { icon: Zap, title: 'Fast Deployment', description: 'Quick turnaround on all projects' },
  { icon: Clock, title: '24/7 Support', description: 'Round-the-clock assistance' },
  { icon: Shield, title: 'Secure Solutions', description: 'Enterprise-grade security' },
  { icon: Award, title: 'Certified Team', description: 'Industry-certified experts' },
]

export default function ServicesPage() {
  const [activeService, setActiveService] = useState<string | null>(null)

  return (
    <div className="relative min-h-screen pt-20 overflow-x-hidden">
      {/* Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 ai-grid-bg opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-b from-dark-950 via-dark-900/50 to-dark-950" />
        <motion.div
          className="absolute top-1/3 left-1/4 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1], x: [0, 50, 0] }}
          transition={{ duration: 15, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl"
          animate={{ scale: [1, 1.3, 1], y: [0, -30, 0] }}
          transition={{ duration: 20, repeat: Infinity, delay: 2 }}
        />
      </div>

      {/* Hero Section */}
      <section className="relative py-24 px-4 z-10">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center space-y-6"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center space-x-2 glass-effect rounded-full px-4 py-2"
            >
              <Sparkles className="w-4 h-4 text-primary-400" />
              <span className="text-primary-400 font-semibold text-sm">WHAT WE OFFER</span>
            </motion.div>
            
            <motion.h1 
              className="text-5xl lg:text-7xl font-bold font-display"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              Our <span className="text-gradient ai-glow">Services</span>
            </motion.h1>
            
            <motion.p 
              className="text-xl text-gray-300 max-w-2xl mx-auto font-tech"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Comprehensive ICT solutions tailored to Cebu-based businesses
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex items-center justify-center space-x-2 text-sm"
            >
              <MapPin className="w-4 h-4 text-primary-400" />
              <span className="text-primary-300 uppercase tracking-wider">Onsite deployments within Cebu Province, Philippines</span>
            </motion.div>
          </motion.div>
        </div>

        {/* Service Pillars */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="container mx-auto mt-16"
        >
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { label: 'Design → Deploy → Defend', detail: 'Unified delivery teams' },
              { label: 'Site-ready in 10 days', detail: 'Fast-track implementations' },
              { label: 'AI-powered monitoring', detail: 'Real-time remediation' },
            ].map((pillar, index) => (
              <motion.div
                key={pillar.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + index * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="glass-card rounded-2xl p-6 text-center"
              >
                <p className="text-sm text-primary-400 uppercase tracking-[0.2em] font-semibold">{pillar.label}</p>
                <p className="text-gray-400 mt-2 text-sm">{pillar.detail}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Benefits Bar */}
      <section className="relative py-16 px-4 z-10 bg-dark-900/50">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon
              return (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="text-center"
                >
                  <motion.div
                    className="w-14 h-14 mx-auto rounded-xl bg-gradient-to-br from-primary-500/20 to-cyan-500/20 flex items-center justify-center mb-4"
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Icon className="w-7 h-7 text-primary-400" />
                  </motion.div>
                  <h3 className="text-white font-bold mb-1">{benefit.title}</h3>
                  <p className="text-gray-400 text-sm">{benefit.description}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="relative py-24 px-4 z-10">
        <div className="container mx-auto space-y-20">
          {services.map((service, index) => {
            const Icon = service.icon
            const isEven = index % 2 === 0

            return (
              <motion.div
                key={service.id}
                id={service.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.6 }}
                className="scroll-mt-24"
              >
                <div className={`grid lg:grid-cols-2 gap-12 items-center ${!isEven ? 'lg:flex-row-reverse' : ''}`}>
                  {/* Content */}
                  <motion.div
                    initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className={`space-y-6 ${!isEven ? 'lg:order-2' : ''}`}
                  >
                    {/* Service Number */}
                    <motion.div 
                      className={`text-8xl font-bold bg-gradient-to-r ${service.color} bg-clip-text text-transparent opacity-20`}
                    >
                      0{index + 1}
                    </motion.div>

                    <div className="flex items-center space-x-4">
                      <motion.div 
                        className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.color} p-0.5`}
                        whileHover={{ rotate: -10, scale: 1.1 }}
                      >
                        <div className="w-full h-full bg-dark-900 rounded-2xl flex items-center justify-center">
                          <Icon className="w-8 h-8 text-white" />
                        </div>
                      </motion.div>
                      <h2 className="text-3xl lg:text-4xl font-bold text-white font-display">
                        {service.title}
                      </h2>
                    </div>
                    
                    <p className="text-lg text-gray-300 leading-relaxed">
                      {service.description}
                    </p>
                    
                    <ul className="grid sm:grid-cols-2 gap-3">
                      {service.features.map((feature) => (
                        <motion.li 
                          key={feature} 
                          className="flex items-center space-x-3"
                          whileHover={{ x: 5 }}
                        >
                          <div className={`w-6 h-6 rounded-full bg-gradient-to-r ${service.color} flex items-center justify-center flex-shrink-0`}>
                            <CheckCircle className="w-4 h-4 text-white" />
                          </div>
                          <span className="text-gray-300">{feature}</span>
                        </motion.li>
                      ))}
                    </ul>
                    
                    <Link href="/contact">
                      <motion.button
                        whileHover={{ scale: 1.05, x: 5 }}
                        whileTap={{ scale: 0.98 }}
                        className="group inline-flex items-center space-x-2 text-primary-400 font-semibold text-lg"
                      >
                        <span>Get a Quote</span>
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                      </motion.button>
                    </Link>
                  </motion.div>

                  {/* Image */}
                  <motion.div
                    initial={{ opacity: 0, x: isEven ? 50 : -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className={`relative ${!isEven ? 'lg:order-1' : ''}`}
                  >
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className="relative h-[400px] lg:h-[500px] rounded-3xl overflow-hidden group"
                    >
                      <Image
                        src={service.image}
                        alt={service.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-dark-950/80 via-dark-950/20 to-transparent" />
                      <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-10 group-hover:opacity-20 transition-opacity`} />
                      
                      {/* Floating Badge */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="absolute bottom-6 left-6 right-6"
                      >
                        <div className="glass-effect rounded-xl p-4 flex items-center space-x-3">
                          <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${service.color} flex items-center justify-center flex-shrink-0`}>
                            <Icon className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <p className="text-white font-semibold text-sm">{service.title}</p>
                            <p className="text-gray-400 text-xs">Professional Solutions</p>
                          </div>
                        </div>
                      </motion.div>
                    </motion.div>
                  </motion.div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </section>

      {/* Quick Links */}
      <section className="relative py-16 px-4 z-10 bg-dark-900/50">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              Quick <span className="text-gradient">Navigation</span>
            </h2>
            <p className="text-gray-400">Jump to the service you need</p>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-4">
            {services.map((service, index) => {
              const Icon = service.icon
              return (
                <motion.a
                  key={service.id}
                  href={`#${service.id}`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ y: -5, scale: 1.05 }}
                  className="glass-card rounded-xl px-6 py-4 flex items-center space-x-3 group"
                >
                  <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${service.color} p-0.5`}>
                    <div className="w-full h-full bg-dark-900 rounded-lg flex items-center justify-center">
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                  </div>
                  <span className="text-white font-semibold group-hover:text-gradient transition-colors">
                    {service.title.split(' ')[0]}
                  </span>
                </motion.a>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 px-4 z-10">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative glass-card rounded-3xl p-12 lg:p-16 text-center overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary-500/10 via-cyan-500/10 to-primary-500/10" />
            
            <div className="relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-flex items-center space-x-2 glass-effect rounded-full px-4 py-2 mb-6"
              >
                <Phone className="w-4 h-4 text-primary-400" />
                <span className="text-primary-400 font-semibold text-sm">24/7 SUPPORT AVAILABLE</span>
              </motion.div>
              
              <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
                Need a <span className="text-gradient">Custom Solution?</span>
              </h2>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
                Contact us today to discuss your specific requirements and get a customized quote.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact">
                  <motion.button
                    whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(20, 184, 166, 0.4)' }}
                    whileTap={{ scale: 0.98 }}
                    className="px-10 py-5 bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl text-white font-bold text-lg"
                  >
                    Contact Us Now
                  </motion.button>
                </Link>
                <Link href="/book">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-10 py-5 glass-effect rounded-xl text-white font-bold text-lg border-2 border-primary-500/50 hover:border-primary-500"
                  >
                    Book Appointment
                  </motion.button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
