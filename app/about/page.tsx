'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import Image from 'next/image'
import { Target, Eye, Users, Shield, Zap, HeartHandshake, Sparkles, Award, CheckCircle, ArrowRight, Play, TrendingUp, Clock, Star } from 'lucide-react'
import { staggerContainer, staggerItem } from '@/lib/animations'

// Counter Animation Hook
function useCounter(end: number, duration: number = 2000) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  
  useEffect(() => {
    if (isInView) {
      let startTime: number
      const animate = (currentTime: number) => {
        if (!startTime) startTime = currentTime
        const progress = Math.min((currentTime - startTime) / duration, 1)
        setCount(Math.floor(progress * end))
        if (progress < 1) requestAnimationFrame(animate)
      }
      requestAnimationFrame(animate)
    }
  }, [end, duration, isInView])
  
  return { count, ref }
}

// Stat Card Component for hero stats
const HeroStatCard = ({ stat, index }: { stat: { value: number; suffix: string; label: string }; index: number }) => {
  const { count, ref } = useCounter(stat.value)
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="glass-card rounded-2xl p-6 text-center"
    >
      <div className="text-4xl lg:text-5xl font-bold text-gradient mb-2">{count}{stat.suffix}</div>
      <div className="text-gray-400 text-sm">{stat.label}</div>
    </motion.div>
  )
}

// Impact Metric Card Component
const ImpactMetricCard = ({ metric, index }: { metric: { value: string; suffix: string; label: string; detail: string }; index: number }) => {
  const numericValue = parseFloat(metric.value)
  const { count, ref } = useCounter(isNaN(numericValue) ? 0 : numericValue)
  const displayValue = metric.value.includes('.') ? metric.value : count
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ scale: 1.02 }}
      className="bg-dark-800/50 rounded-2xl p-6"
    >
      <p className="text-gray-400 text-sm uppercase tracking-widest mb-2">{metric.label}</p>
      <p className="text-4xl font-bold text-white">
        {displayValue}{metric.suffix}
      </p>
      <p className="text-gray-500 text-sm mt-1">{metric.detail}</p>
    </motion.div>
  )
}

const coreValues = [
  {
    icon: Shield,
    title: 'Integrity',
    description: 'Uphold honesty and transparency in all dealings, ensuring every project is built on trust.',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Zap,
    title: 'Excellence',
    description: 'Strive for superior quality and continuous improvement in services and solutions.',
    color: 'from-purple-500 to-pink-500',
  },
  {
    icon: Sparkles,
    title: 'Innovation',
    description: 'Embrace emerging technologies and forward-thinking approaches for cutting-edge solutions.',
    color: 'from-orange-500 to-red-500',
  },
  {
    icon: HeartHandshake,
    title: 'Customer First',
    description: 'Clients\' success drives our success. We focus on exceeding expectations.',
    color: 'from-green-500 to-emerald-500',
  },
  {
    icon: Users,
    title: 'Teamwork',
    description: 'Believe in collaboration and mutual respect to achieve shared goals effectively.',
    color: 'from-cyan-500 to-blue-500',
  },
  {
    icon: Award,
    title: 'Reliability',
    description: 'Stand by commitments, providing consistent and dependable service always.',
    color: 'from-pink-500 to-purple-500',
  },
]

const impactMetrics = [
  { label: 'Downtime Prevented', value: '42', suffix: 'hrs/mo', detail: 'per enterprise client' },
  { label: 'Remote Fix Rate', value: '88', suffix: '%', detail: 'issues resolved remotely' },
  { label: 'SLA Compliance', value: '99.4', suffix: '%', detail: 'over the last 12 months' },
]

const teamMembers = [
  { 
    name: 'Tech Team Lead',
    role: 'Network Architecture',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop'
  },
  { 
    name: 'Security Specialist',
    role: 'Cybersecurity',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=300&fit=crop'
  },
  { 
    name: 'Project Manager',
    role: 'Implementation',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop'
  },
  { 
    name: 'Support Lead',
    role: 'Client Success',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop'
  },
]

const timeline = [
  { year: '2010', title: 'Founded', description: 'Started with a vision to transform ICT in Cebu' },
  { year: '2015', title: 'Expansion', description: 'Extended services to enterprise clients' },
  { year: '2020', title: 'Innovation', description: 'Launched AI-powered monitoring solutions' },
  { year: '2024', title: 'Today', description: '500+ projects completed across Cebu' },
]

export default function AboutPage() {
  return (
    <div className="relative min-h-screen pt-20 overflow-x-hidden">
      {/* Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 ai-grid-bg opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-b from-dark-950 via-dark-900/50 to-dark-950" />
        <motion.div
          className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 10, repeat: Infinity }}
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
              <span className="text-primary-400 font-semibold text-sm">OUR STORY</span>
            </motion.div>
            
            <motion.h1 
              className="text-5xl lg:text-7xl font-bold font-display"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              Building <span className="text-gradient ai-glow">Trust</span> Through
              <br />Innovation
            </motion.h1>
            
            <motion.p 
              className="text-xl text-gray-300 max-w-2xl mx-auto font-tech"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Transforming businesses across Cebu with comprehensive ICT solutions since 2010
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Video/Image Feature */}
      <section className="relative py-12 px-4 z-10">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative aspect-video max-w-5xl mx-auto rounded-3xl overflow-hidden group cursor-pointer"
          >
            <Image
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200"
              alt="Our Team at Work"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-dark-950/30 to-transparent" />
            
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              whileHover={{ scale: 1.1 }}
            >
              <motion.div
                className="w-24 h-24 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full flex items-center justify-center"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Play className="w-10 h-10 text-white ml-1" />
              </motion.div>
            </motion.div>
            
            <div className="absolute bottom-8 left-8 right-8">
              <h3 className="text-2xl font-bold text-white mb-2">Meet Our Team</h3>
              <p className="text-gray-300">Dedicated professionals committed to your success</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="relative py-16 px-4 z-10">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: 500, suffix: '+', label: 'Projects' },
              { value: 15, suffix: '+', label: 'Years' },
              { value: 98, suffix: '%', label: 'Satisfaction' },
              { value: 24, suffix: '/7', label: 'Support' },
            ].map((stat, index) => (
              <HeroStatCard key={stat.label} stat={stat} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Business Overview */}
      <section className="relative py-24 px-4 z-10">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <span className="text-primary-400 font-semibold text-sm uppercase tracking-wider">Who We Are</span>
              <h2 className="text-4xl lg:text-5xl font-bold text-white">
                Your Trusted <span className="text-gradient">ICT Partner</span>
              </h2>
              <div className="space-y-4 text-gray-300 text-lg leading-relaxed">
                <p>
                  Suretech Network and Data Solution is a trusted provider of comprehensive ICT solutions, 
                  specializing in design, implementation, and maintenance of reliable and secure network infrastructures.
                </p>
                <p>
                  We deliver high-quality services for seamless connectivity, optimized performance, and digital 
                  transformation. Our end-to-end solutions cover everything from network setup to cybersecurity.
                </p>
              </div>
              
              <div className="flex flex-wrap gap-3">
                {['Network Design', 'CCTV', 'Cybersecurity', 'IT Support'].map((tag) => (
                  <motion.span
                    key={tag}
                    whileHover={{ scale: 1.05 }}
                    className="px-4 py-2 glass-effect rounded-full text-primary-400 text-sm font-semibold"
                  >
                    {tag}
                  </motion.span>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative h-[500px] rounded-3xl overflow-hidden"
            >
              <Image
                src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800"
                alt="Network Infrastructure"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark-950/80 via-dark-950/20 to-transparent" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="relative py-24 px-4 z-10 bg-dark-900/50">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Vision */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="glass-card rounded-3xl p-8 lg:p-10"
            >
              <div className="flex items-center space-x-4 mb-6">
                <motion.div 
                  className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 p-0.5"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="w-full h-full bg-dark-900 rounded-2xl flex items-center justify-center">
                    <Eye className="w-8 h-8 text-cyan-400" />
                  </div>
                </motion.div>
                <h2 className="text-3xl font-bold text-white">Our Vision</h2>
              </div>
              <p className="text-xl text-gray-300 leading-relaxed">
                To be a leading and trusted provider of innovative network and data solutions that empower 
                organizations to achieve seamless connectivity, operational efficiency, and digital transformation.
              </p>
            </motion.div>

            {/* Mission */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              whileHover={{ y: -10 }}
              className="glass-card rounded-3xl p-8 lg:p-10"
            >
              <div className="flex items-center space-x-4 mb-6">
                <motion.div 
                  className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-600 p-0.5"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="w-full h-full bg-dark-900 rounded-2xl flex items-center justify-center">
                    <Target className="w-8 h-8 text-purple-400" />
                  </div>
                </motion.div>
                <h2 className="text-3xl font-bold text-white">Our Mission</h2>
              </div>
              <p className="text-xl text-gray-300 leading-relaxed mb-4">
                To deliver reliable, secure, and high-performance ICT infrastructure and services tailored 
                to clients&apos; evolving needs.
              </p>
              <ul className="space-y-3">
                {[
                  'End-to-end solutions from design to maintenance',
                  'High standards of quality and excellence',
                  'Long-term partnerships based on trust',
                ].map((item, i) => (
                  <li key={i} className="flex items-center space-x-3 text-gray-300">
                    <CheckCircle className="w-5 h-5 text-primary-400 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="relative py-24 px-4 z-10">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-primary-400 font-semibold text-sm uppercase tracking-wider">What Drives Us</span>
            <h2 className="text-4xl lg:text-5xl font-bold text-white mt-2 mb-4">
              Our <span className="text-gradient">Core Values</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {coreValues.map((value, index) => {
              const Icon = value.icon
              return (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -10, scale: 1.02 }}
                  className="glass-card rounded-2xl p-8 group cursor-pointer"
                >
                  <motion.div
                    className={`w-14 h-14 rounded-xl bg-gradient-to-br ${value.color} p-0.5 mb-6`}
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="w-full h-full bg-dark-900 rounded-xl flex items-center justify-center">
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                  </motion.div>
                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-gradient transition-all">
                    {value.title}
                  </h3>
                  <p className="text-gray-400">{value.description}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="relative py-24 px-4 z-10 bg-dark-900/50">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
              Our <span className="text-gradient">Journey</span>
            </h2>
          </motion.div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-500 via-cyan-500 to-primary-500 hidden md:block" />

            {timeline.map((item, index) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className={`flex items-center gap-8 mb-12 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
              >
                <div className={`flex-1 ${index % 2 === 0 ? 'text-right' : 'text-left'}`}>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="glass-card rounded-2xl p-6 inline-block"
                  >
                    <div className="text-primary-400 font-bold text-2xl mb-2">{item.year}</div>
                    <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                    <p className="text-gray-400">{item.description}</p>
                  </motion.div>
                </div>
                
                {/* Center Dot */}
                <motion.div
                  className="hidden md:flex w-4 h-4 bg-primary-500 rounded-full relative z-10"
                  whileHover={{ scale: 1.5 }}
                />
                
                <div className="flex-1 hidden md:block" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Metrics */}
      <section className="relative py-24 px-4 z-10">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card rounded-3xl p-8 lg:p-12"
          >
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 mb-12">
              <div>
                <span className="text-primary-400 font-semibold text-sm uppercase tracking-wider">Impact in Numbers</span>
                <h2 className="text-3xl lg:text-4xl font-bold text-white mt-2">Operational Excellence</h2>
                <p className="text-gray-400 max-w-xl mt-2">
                  Each engagement feeds our telemetry—allowing us to benchmark service health and prove ROI.
                </p>
              </div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-gradient-to-br from-primary-500/20 to-cyan-500/20 rounded-2xl px-8 py-6 text-center"
              >
                <p className="text-sm text-primary-300 uppercase tracking-widest mb-1">Customer NPS</p>
                <p className="text-5xl font-bold text-white">+67</p>
              </motion.div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {impactMetrics.map((metric, index) => (
                <ImpactMetricCard key={metric.label} metric={metric} index={index} />
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Team Section */}
      <section className="relative py-24 px-4 z-10 bg-dark-900/50">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
              Meet Our <span className="text-gradient">Team</span>
            </h2>
            <p className="text-gray-400 text-lg">
              Dedicated professionals committed to your success
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="glass-card rounded-2xl overflow-hidden group cursor-pointer"
              >
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-dark-950/30 to-transparent" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white group-hover:text-gradient transition-colors">{member.name}</h3>
                  <p className="text-primary-400 text-sm">{member.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-24 px-4 z-10">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="glass-card rounded-3xl p-12 lg:p-16 text-center relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary-500/10 via-cyan-500/10 to-primary-500/10" />
            
            <div className="relative z-10">
              <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
                Ready to <span className="text-gradient">Partner</span> with Us?
              </h2>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
                Let&apos;s discuss how we can transform your business with our ICT solutions.
              </p>
              <motion.a
                href="/contact"
                whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(20, 184, 166, 0.4)' }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl text-white font-bold text-lg"
              >
                <span>Get in Touch</span>
                <ArrowRight className="w-5 h-5" />
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
