'use client'

import { motion } from 'framer-motion'
import { Target, Eye, Users, Shield, Zap, HeartHandshake, Sparkles } from 'lucide-react'
import { fadeInUp, fadeInLeft, fadeInRight, scaleIn, staggerContainer, staggerItem, hoverScale, hoverLift, rotateIn } from '@/lib/animations'

const coreValues = [
  {
    icon: Shield,
    title: 'Integrity',
    description: 'Uphold honesty and transparency in all dealings, ensuring every project is built on trust and accountability.',
  },
  {
    icon: Zap,
    title: 'Excellence',
    description: 'Strive for superior quality and continuous improvement in services, solutions, and relationships.',
  },
  {
    icon: Sparkles,
    title: 'Innovation',
    description: 'Embrace emerging technologies and forward-thinking approaches to deliver cutting-edge network and data solutions.',
  },
  {
    icon: HeartHandshake,
    title: 'Customer Commitment',
    description: 'Clients\' success drives our success. Focus on understanding needs and exceeding expectations.',
  },
  {
    icon: Users,
    title: 'Teamwork',
    description: 'Believe in collaboration and mutual respect, empowering people to achieve shared goals effectively.',
  },
  {
    icon: Shield,
    title: 'Reliability',
    description: 'Stand by commitments, providing consistent and dependable service for operational stability.',
  },
]

const impactMetrics = [
  { label: 'Average Downtime Prevented', value: '42 hrs/mo', detail: 'per enterprise client' },
  { label: 'Remote Fix Rate', value: '88%', detail: 'issues resolved before onsite visit' },
  { label: 'SLA Compliance', value: '99.4%', detail: 'tracked over the last 12 months' },
]

export default function AboutPage() {
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
              transition={{ delay: 0.2, duration: 0.5, ease: 'easeOut' }}
              style={{ willChange: 'transform, opacity' }}
            >
              About Us
            </motion.h1>
            <motion.p 
              className="text-xl text-gray-300 font-tech"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.4, ease: 'easeOut' }}
            >
              Building trust through innovation and excellence
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Business Overview */}
      <section className="relative py-20 px-4">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto space-y-8"
          >
            <motion.h2 
              className="text-4xl font-bold text-white mb-6 font-display"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Business Overview
            </motion.h2>
            <div className="glass-effect rounded-2xl p-8 space-y-6">
              <p className="text-lg text-gray-300 leading-relaxed">
                Suretech Network and Data Solution is a trusted provider of comprehensive ICT solutions, 
                specializing in design, implementation, and maintenance of reliable and secure network infrastructures.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed">
                We deliver high-quality services for seamless connectivity, optimized performance, and digital 
                transformation. Our end-to-end solutions cover everything from network setup to cybersecurity, 
                ensuring your business stays connected, secure, and competitive in today&apos;s digital landscape.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="relative py-20 px-4 bg-dark-900/50">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="flex items-center space-x-4">
                <div className="bg-gradient-to-br from-primary-500/20 to-primary-600/20 rounded-lg p-4">
                  <Eye className="w-10 h-10 text-primary-400" />
                </div>
                <h2 className="text-4xl font-bold text-white">Our Vision</h2>
              </div>
              <div className="glass-effect rounded-xl p-6">
                <p className="text-xl text-gray-200 leading-relaxed">
                  To be a leading and trusted provider of innovative network and data solutions that empower 
                  organizations to achieve seamless connectivity, operational efficiency, and digital transformation.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative h-[400px] rounded-2xl overflow-hidden glass-effect"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary-900/50 to-dark-900" />
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800')] bg-cover bg-center mix-blend-overlay opacity-30" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="relative py-20 px-4">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative h-[400px] rounded-2xl overflow-hidden glass-effect order-2 lg:order-1"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary-900/50 to-dark-900" />
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800')] bg-cover bg-center mix-blend-overlay opacity-30" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6 order-1 lg:order-2"
            >
              <div className="flex items-center space-x-4">
                <div className="bg-gradient-to-br from-primary-500/20 to-primary-600/20 rounded-lg p-4">
                  <Target className="w-10 h-10 text-primary-400" />
                </div>
                <h2 className="text-4xl font-bold text-white">Our Mission</h2>
              </div>
              <div className="glass-effect rounded-xl p-6 space-y-4">
                <p className="text-xl text-gray-200 leading-relaxed">
                  To deliver reliable, secure, and high-performance ICT infrastructure and services tailored 
                  to clients&apos; evolving needs.
                </p>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start space-x-3">
                    <span className="text-primary-400 mt-1">•</span>
                    <span>Providing end-to-end solutions from design to maintenance</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-primary-400 mt-1">•</span>
                    <span>Maintaining high standards of quality and service excellence</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-primary-400 mt-1">•</span>
                    <span>Building long-term partnerships based on trust and mutual success</span>
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="relative py-20 px-4 bg-dark-900/50">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
              Our <span className="text-gradient">Core Values</span>
            </h2>
            <p className="text-gray-400 text-lg">
              The principles that guide everything we do
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: '-50px' }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {coreValues.map((value, index) => {
              const Icon = value.icon
              return (
                <motion.div
                  key={value.title}
                  variants={staggerItem}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className="glass-effect rounded-xl p-6 space-y-4 group cursor-pointer"
                  style={{ willChange: 'transform' }}
                >
                  <div className="relative">
                    <motion.div 
                      className="absolute inset-0 bg-primary-500/20 rounded-lg blur-xl"
                      animate={{ 
                        opacity: [0.3, 0.5]
                      }}
                      transition={{ duration: 3, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
                    />
                    <motion.div 
                      className="relative bg-gradient-to-br from-primary-500/20 to-primary-600/20 rounded-lg p-4 w-fit"
                      whileHover={{ rotate: 360, scale: 1.05 }}
                      transition={{ duration: 0.5, ease: 'easeOut' }}
                      style={{ willChange: 'transform' }}
                    >
                      <Icon className="w-8 h-8 text-primary-400" />
                    </motion.div>
                  </div>
                  <h3 className="text-2xl font-semibold text-white font-display">{value.title}</h3>
                  <p className="text-gray-400 font-tech">{value.description}</p>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* Delivery Impact */}
      <section className="relative py-20 px-4">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-effect rounded-3xl p-8 lg:p-12 space-y-8"
          >
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div>
                <p className="text-sm uppercase tracking-[0.4em] text-primary-300">Impact in Numbers</p>
                <h2 className="text-3xl lg:text-4xl font-bold text-white mt-2">Operational Excellence Dashboard</h2>
                <p className="text-gray-400 max-w-2xl">
                  Each engagement feeds our telemetry—allowing us to benchmark service health, anticipate issues, and prove ROI across industries.
                </p>
              </div>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="bg-primary-500/10 rounded-2xl px-6 py-4 text-center min-w-[180px]"
              >
                <p className="text-sm text-primary-300 uppercase tracking-widest mb-1">Customer NPS</p>
                <p className="text-4xl font-bold text-white">+67</p>
              </motion.div>
            </div>

            <motion.div
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, margin: '-50px' }}
              className="grid md:grid-cols-3 gap-6"
            >
              {impactMetrics.map((metric) => (
                <motion.div
                  key={metric.label}
                  variants={staggerItem}
                  className="rounded-2xl bg-dark-900/60 border border-primary-500/10 p-6 space-y-2"
                >
                  <p className="text-gray-400 text-sm uppercase tracking-widest">{metric.label}</p>
                  <p className="text-white text-3xl font-bold">{metric.value}</p>
                  <p className="text-gray-500 text-sm">{metric.detail}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

