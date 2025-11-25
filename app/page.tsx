'use client'

import { useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Link from 'next/link'
import { ArrowDown, Sparkles, Shield, Network, Server, Camera, Lock, Wrench, CheckCircle, Users, Award, Clock, TrendingUp, Zap, Globe, Database, Code, Phone, Mail, MapPin, Star, ArrowRight, Play, BarChart3, Target, Rocket, HeartHandshake } from 'lucide-react'
import Image from 'next/image'
import TypewriterText from '@/components/TypewriterText'
import { fadeInUp, fadeInLeft, fadeInRight, scaleIn, staggerContainer, staggerItem, hoverScale, hoverLift, infiniteFloat, pulseGlow } from '@/lib/animations'

const services = [
  {
    icon: Network,
    title: 'Structured Cabling',
    description: 'Design and installation of organized, scalable communication infrastructure',
  },
  {
    icon: Server,
    title: 'Network Design',
    description: 'Robust network architectures tailored to your requirements',
  },
  {
    icon: Camera,
    title: 'CCTV Installation',
    description: 'Advanced surveillance systems for enhanced security',
  },
  {
    icon: Lock,
    title: 'Cybersecurity',
    description: 'Proactive security measures to safeguard your data',
  },
]

const whyChooseUs = [
  'Proven track record in system installation and network maintenance',
  'Customized and cost-effective solutions',
  '24/7 technical support',
  'Commitment to security, efficiency, and customer satisfaction',
]

const typewriterTexts = [
  'ICT Solutions',
  'Network Infrastructure',
  'Cybersecurity Services',
  'Digital Transformation',
  'IT Support & Maintenance',
]

const heroStats = [
  { label: 'Projects Delivered', value: '500+' },
  { label: 'Critical Networks Managed', value: '120+' },
  { label: 'Avg. Response Time', value: '<15m' },
]

const heroHighlights = [
  { title: 'Zero-Trust Deployment', subtitle: 'Security-first blueprints', icon: Shield },
  { title: 'AI Automation Pods', subtitle: 'Predictive monitoring', icon: Sparkles },
  { title: 'Nationwide Rollouts', subtitle: 'Multi-site installs', icon: Globe },
]

export default function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [currentTime, setCurrentTime] = useState<string>('')
  const [isMounted, setIsMounted] = useState(false)
  const { scrollYProgress } = useScroll()
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95])

  useEffect(() => {
    setIsMounted(true)
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)

    const updateTime = () => {
      setCurrentTime(new Date().toLocaleTimeString())
    }
    updateTime() // Set initial time
    const timer = setInterval(updateTime, 1000)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      clearInterval(timer)
    }
  }, [])

  return (
    <div className="relative min-h-screen">
      {/* AI Grid Background - Optimized */}
      <div className="fixed inset-0 ai-grid-bg opacity-20" style={{ willChange: 'transform', transform: 'translateZ(0)' }} />
      
      {/* Hero Section - Fullscreen Background */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 px-4 overflow-hidden">
        {/* Fullscreen Background Image - Optimized */}
        <div className="fixed inset-0 z-0" style={{ willChange: 'transform', transform: 'translateZ(0)' }}>
          <motion.div
            className="absolute inset-0"
            style={{ willChange: 'transform' }}
            animate={{
              scale: [1, 1.02],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              repeatType: 'reverse',
              ease: 'linear',
            }}
          >
            <Image
              src="https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1920&q=80"
              alt="AI Technology Background"
              fill
              className="object-cover"
              priority
              quality={85}
              sizes="100vw"
            />
          </motion.div>
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-dark-950/95 via-dark-950/90 to-dark-950/95 z-10" />
          {/* Optimized Circuit Pattern Overlay - Throttled with debounce */}
          <div 
            className="absolute inset-0 opacity-10 z-10"
            style={{
              backgroundImage: `radial-gradient(circle at ${Math.floor(mousePosition.x / 50) * 50}px ${Math.floor(mousePosition.y / 50) * 50}px, rgba(20, 184, 166, 0.15) 0%, transparent 50%)`,
            }}
          />
        </div>

        {/* Optimized Floating Elements - Further reduced */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-primary-400 rounded-full z-10"
            style={{
              left: `${15 + (i % 3) * 30}%`,
              top: `${15 + Math.floor(i / 3) * 30}%`,
              willChange: 'transform',
              transform: 'translateZ(0)',
            }}
            animate={{
              y: [0, -15],
              opacity: [0.2, 0.6],
            }}
            transition={{
              duration: 5 + i * 0.5,
              repeat: Infinity,
              repeatType: 'reverse',
              delay: i * 0.3,
              ease: 'easeInOut',
            }}
          />
        ))}

        {/* Hero Glow Orbits */}
        <motion.div
          className="absolute inset-0 z-10 pointer-events-none"
          animate={{ opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        >
          <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[480px] h-[480px] bg-primary-500/20 blur-3xl rounded-full" />
          <div className="absolute bottom-0 right-10 w-72 h-72 bg-cyan-400/10 blur-3xl rounded-full" />
        </motion.div>

        {/* Centered Content */}
        <div className="container mx-auto max-w-5xl relative z-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="text-center space-y-8"
            style={{ willChange: 'transform, opacity' }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5, ease: 'easeOut' }}
              className="flex items-center justify-center space-x-2"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
                style={{ willChange: 'transform' }}
              >
                <Network className="w-6 h-6 text-primary-400" />
              </motion.div>
              <span className="text-primary-400 font-semibold tracking-wider text-sm lg:text-base font-display">SURETECH NETWORK & DATA SOLUTION</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                delay: 0.3,
                duration: 0.6,
                ease: 'easeOut'
              }}
              className="text-4xl sm:text-5xl lg:text-7xl xl:text-8xl font-bold leading-tight font-display"
              style={{ willChange: 'transform, opacity' }}
            >
              <motion.span 
                className="text-white block mb-2"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                Your Trusted Partner for
              </motion.span>
              <motion.span 
                className="text-gradient ai-glow block"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                <TypewriterText 
                  texts={typewriterTexts}
                  speed={100}
                  deleteSpeed={50}
                  delay={2000}
                />
              </motion.span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5, ease: 'easeOut' }}
              className="text-lg sm:text-xl lg:text-2xl text-gray-200 leading-relaxed max-w-4xl mx-auto font-tech"
            >
              Comprehensive ICT solutions specializing in design, implementation, and maintenance of reliable 
              and secure network infrastructures. Empowering businesses with seamless connectivity and digital transformation.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5, ease: 'easeOut' }}
              className="flex flex-col sm:flex-row items-center justify-center gap-6"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                style={{ willChange: 'transform' }}
              >
                <Link
                  href="/book"
                  className="group relative px-8 py-4 bg-transparent border-2 border-primary-500 rounded-full text-white font-semibold overflow-hidden text-lg font-display"
                >
                  <span className="relative z-10 flex items-center space-x-2">
                    <span>Get Quote</span>
                    <motion.div
                      animate={{ y: [0, 5] }}
                      transition={{ duration: 0.75, repeat: Infinity, repeatType: 'reverse' }}
                    >
                      <ArrowDown className="w-5 h-5" />
                    </motion.div>
                  </span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-primary-500 to-primary-600"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.4, ease: 'easeOut' }}
                  />
                </Link>
              </motion.div>

              <motion.div 
                className="flex items-center space-x-4 glass-effect rounded-full px-6 py-3"
                whileHover={{ scale: 1.03 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                style={{ willChange: 'transform' }}
              >
                <motion.div 
                  className="text-3xl lg:text-4xl font-bold text-gradient font-display"
                  animate={{ scale: [1, 1.05] }}
                  transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
                  style={{ willChange: 'transform' }}
                >
                  100%
                </motion.div>
                <motion.div 
                  className="h-12 w-px bg-primary-500"
                  animate={{ opacity: [0.6, 1] }}
                  transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
                />
                <div>
                  <div className="text-white font-semibold font-tech">Customer</div>
                  <div className="text-gray-400 text-sm font-tech">Satisfaction</div>
                </div>
              </motion.div>

            {/* Hero Highlights */}
            <motion.div
              variants={staggerContainer}
              initial="initial"
              animate="animate"
              className="grid sm:grid-cols-3 gap-4"
            >
              {heroHighlights.map((highlight) => {
                const Icon = highlight.icon
                return (
                  <motion.div
                    key={highlight.title}
                    variants={staggerItem}
                    whileHover={{ y: -8 }}
                    className="glass-effect rounded-2xl p-4 text-left flex items-center space-x-3"
                  >
                    <div className="bg-primary-500/10 rounded-xl p-3">
                      <Icon className="w-5 h-5 text-primary-400" />
                    </div>
                    <div>
                      <p className="text-white font-semibold text-sm">{highlight.title}</p>
                      <p className="text-gray-400 text-xs">{highlight.subtitle}</p>
                    </div>
                  </motion.div>
                )
              })}
            </motion.div>
            </motion.div>

            {/* Real-time Clock */}
            {isMounted && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="flex items-center justify-center space-x-4 text-sm text-gray-400"
              >
                <Clock className="w-4 h-4 text-primary-400" />
                <span suppressHydrationWarning>Current Time: {currentTime}</span>
              </motion.div>
            )}

            {/* Stats Row */}
            <motion.div
              variants={staggerContainer}
              initial="initial"
              animate="animate"
              className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto mt-8 mb-20"
            >
              {heroStats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  variants={staggerItem}
                  whileHover={{ scale: 1.05 }}
                  className="glass-effect rounded-2xl p-5 text-center cursor-pointer border border-primary-500/10"
                  style={{ willChange: 'transform' }}
                >
                  <motion.div 
                    className="text-2xl lg:text-3xl font-bold text-gradient mb-1 font-display"
                    animate={{ scale: [1, 1.04] }}
                    transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse', delay: index * 0.2, ease: 'easeInOut' }}
                    style={{ willChange: 'transform' }}
                  >
                    {stat.value}
                  </motion.div>
                  <div className="text-gray-400 text-xs font-tech tracking-wide uppercase">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>

      </section>

      {/* Stats Section - Optimized */}
      <section className="relative py-20 px-4 bg-dark-900/30">
        <div className="container mx-auto">
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: '-100px' }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {[
              { icon: Users, value: '500+', label: 'Happy Clients' },
              { icon: Award, value: '1000+', label: 'Projects Done' },
              { icon: Clock, value: '24/7', label: 'Support Available' },
              { icon: TrendingUp, value: '100%', label: 'Satisfaction Rate' },
            ].map((stat, index) => {
              const Icon = stat.icon
              return (
                <motion.div
                  key={stat.label}
                  variants={staggerItem}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  className="glass-effect rounded-xl p-6 text-center cursor-pointer group"
                  style={{ willChange: 'transform' }}
                >
                  <div className="flex justify-center mb-4">
                    <motion.div
                      className="bg-gradient-to-br from-primary-500/20 to-primary-600/20 rounded-lg p-3"
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.5, ease: 'easeOut' }}
                      style={{ willChange: 'transform' }}
                    >
                      <Icon className="w-6 h-6 text-primary-400" />
                    </motion.div>
                  </div>
                  <motion.div
                    className="text-3xl font-bold text-gradient mb-2 font-display"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.4, ease: 'easeOut' }}
                    style={{ willChange: 'transform, opacity' }}
                  >
                    {stat.value}
                  </motion.div>
                  <div className="text-gray-400 text-sm font-tech">{stat.label}</div>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* Overview Section */}
      <section className="relative py-20 px-4">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center space-y-6"
          >
            <motion.h2 
              className="text-4xl lg:text-5xl font-bold text-gradient font-display"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.6, -0.05, 0.01, 0.99] }}
            >
              SURETECH NETWORK AND DATA SOLUTION
            </motion.h2>
            <p className="text-xl text-gray-300 leading-relaxed">
              Trusted provider of comprehensive ICT solutions, specializing in design, implementation, 
              and maintenance of reliable and secure network infrastructures.
            </p>
            <p className="text-lg text-gray-400">
              Delivering high-quality services for seamless connectivity, optimized performance, and 
              digital transformation. End-to-end solutions from network setup to cybersecurity.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured Services */}
      <section className="relative py-20 px-4 bg-dark-900/50">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
              Our <span className="text-gradient">Core Services</span>
            </h2>
            <p className="text-gray-400 text-lg">
              Comprehensive ICT solutions tailored to your needs
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => {
              const Icon = service.icon
              return (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -10, scale: 1.02 }}
                  className="glass-effect rounded-xl p-6 space-y-4 group cursor-pointer"
                >
                  <div className="relative">
                    <div className="absolute inset-0 bg-primary-500/20 rounded-lg blur-xl group-hover:blur-2xl transition-all" />
                    <motion.div
                      className="relative bg-gradient-to-br from-primary-500/20 to-primary-600/20 rounded-lg p-4 w-fit"
                      whileHover={{ rotate: -10 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Icon className="w-8 h-8 text-primary-400" />
                    </motion.div>
                  </div>
                  <h3 className="text-xl font-semibold text-white">{service.title}</h3>
                  <p className="text-gray-400 text-sm">{service.description}</p>
                </motion.div>
              )
            })}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link
              href="/services"
              className="inline-block px-8 py-3 bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg text-white font-semibold hover:shadow-lg hover:shadow-primary-500/50 transition-all"
            >
              View All Services
            </Link>
          </motion.div>
        </div>
      </section>

      {/* NEW SECTION 1: Technology Stack */}
      <section className="relative py-20 px-4">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
              Our <span className="text-gradient">Technology Stack</span>
            </h2>
            <p className="text-gray-400 text-lg">
              Cutting-edge technologies powering your digital infrastructure
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-6">
            {[
              { name: 'Cisco', icon: '🔷' },
              { name: 'Fortinet', icon: '🛡️' },
              { name: 'HP', icon: '💻' },
              { name: 'Dell', icon: '🖥️' },
              { name: 'Ubiquiti', icon: '📡' },
              { name: 'Hikvision', icon: '📹' },
            ].map((tech, index) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10, scale: 1.1 }}
                className="glass-effect rounded-xl p-6 text-center group cursor-pointer"
              >
                <div className="text-4xl mb-3">{tech.icon}</div>
                <h3 className="text-white font-semibold">{tech.name}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* NEW SECTION 2: Process Flow */}
      <section className="relative py-20 px-4 bg-dark-900/50">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
              Our <span className="text-gradient">Process</span>
            </h2>
            <p className="text-gray-400 text-lg">
              From consultation to completion, we guide you every step of the way
            </p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: '01', title: 'Consultation', desc: 'Understanding your needs', icon: Phone },
              { step: '02', title: 'Planning', desc: 'Designing the perfect solution', icon: Target },
              { step: '03', title: 'Implementation', desc: 'Professional installation', icon: Rocket },
              { step: '04', title: 'Support', desc: 'Ongoing maintenance & support', icon: HeartHandshake },
            ].map((process, index) => {
              const Icon = process.icon
              return (
                <motion.div
                  key={process.step}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="relative"
                >
                  {index < 3 && (
                    <div className="hidden md:block absolute top-12 left-full w-full h-0.5 bg-gradient-to-r from-primary-500 to-transparent z-0" />
                  )}
                  <div className="relative glass-effect rounded-xl p-6 text-center">
                    <div className="text-6xl font-bold text-primary-400/20 mb-4">{process.step}</div>
                    <div className="bg-gradient-to-br from-primary-500/20 to-primary-600/20 rounded-lg p-4 w-fit mx-auto mb-4">
                      <Icon className="w-8 h-8 text-primary-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">{process.title}</h3>
                    <p className="text-gray-400 text-sm">{process.desc}</p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Us Preview */}
      <section className="relative py-20 px-4">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h2 className="text-4xl lg:text-5xl font-bold text-white">
                Why Choose <span className="text-gradient">Us?</span>
              </h2>
              <ul className="space-y-4">
                {whyChooseUs.map((item, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start space-x-3"
                  >
                    <CheckCircle className="w-6 h-6 text-primary-400 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-300 text-lg">{item}</span>
                  </motion.li>
                ))}
              </ul>
              <Link
                href="/why-choose-us"
                className="inline-block mt-6 text-primary-400 hover:text-primary-300 font-semibold"
              >
                Learn more →
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative h-[500px] rounded-2xl overflow-hidden glass-effect"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary-900/50 to-dark-900" />
              <Image
                src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800"
                alt="Network Infrastructure"
                fill
                className="object-cover opacity-20 mix-blend-overlay"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* NEW SECTION 3: Testimonials Preview */}
      <section className="relative py-20 px-4 bg-dark-900/50">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
              What Our <span className="text-gradient">Clients Say</span>
            </h2>
            <p className="text-gray-400 text-lg">
              Trusted by businesses across Cebu and beyond
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: 'Ethan Cruz', company: 'ABC Corporation', rating: 5, text: 'Outstanding service! Our network has never been more reliable.' },
              { name: 'Maria Santos', company: 'XYZ University', rating: 5, text: 'Professional team, excellent installation, and great support.' },
              { name: 'Robert Tan', company: 'Tech Solutions Inc', rating: 5, text: 'Best ICT partner we&apos;ve worked with. Highly recommended!' },
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="glass-effect rounded-xl p-6"
              >
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-300 mb-4">&quot;{testimonial.text}&quot;</p>
                <div>
                  <div className="text-white font-semibold">{testimonial.name}</div>
                  <div className="text-gray-400 text-sm">{testimonial.company}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries Section */}
      <section className="relative py-20 px-4">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
              Industries We <span className="text-gradient">Serve</span>
            </h2>
            <p className="text-gray-400 text-lg">
              Providing technology-driven solutions across multiple sectors
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
            {[
              { name: 'Corporate Offices', icon: '🏢' },
              { name: 'Educational Institutions', icon: '🎓' },
              { name: 'Government Agencies', icon: '🏛️' },
              { name: 'Data Centers', icon: '💾' },
              { name: 'Residential Properties', icon: '🏠' },
            ].map((industry, index) => (
              <motion.div
                key={industry.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5, scale: 1.05 }}
                className="glass-effect rounded-xl p-6 text-center group cursor-pointer"
              >
                <div className="text-4xl mb-3">{industry.icon}</div>
                <h3 className="text-white font-semibold text-sm">{industry.name}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* NEW SECTION 4: AI-Powered Solutions */}
      <section className="relative py-20 px-4 bg-dark-900/50">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
              AI-Powered <span className="text-gradient">Solutions</span>
            </h2>
            <p className="text-gray-400 text-lg">
              Leveraging cutting-edge artificial intelligence for smarter, more efficient technology solutions
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                icon: Sparkles,
                title: 'Intelligent Automation',
                description: 'AI-driven processes that optimize performance and reduce manual intervention',
                features: ['Predictive Analytics', 'Automated Monitoring', 'Smart Scheduling']
              },
              {
                icon: TrendingUp,
                title: 'Data-Driven Insights',
                description: 'Extract valuable insights from your data with advanced AI algorithms',
                features: ['Real-time Analytics', 'Pattern Recognition', 'Performance Optimization'],
                popular: true
              },
              {
                icon: Shield,
                title: 'AI Security Enhancement',
                description: 'Advanced threat detection and prevention using machine learning',
                features: ['Intrusion Detection', 'Anomaly Analysis', 'Automated Response']
              },
            ].map((solution, index) => (
              <motion.div
                key={solution.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className={`glass-effect rounded-xl p-6 ${solution.popular ? 'border-2 border-primary-500 scale-105' : ''}`}
              >
                {solution.popular && (
                  <div className="text-center mb-4">
                    <span className="bg-gradient-to-r from-primary-500 to-primary-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                      Most Advanced
                    </span>
                  </div>
                )}
                <div className="text-center mb-4">
                  <solution.icon className="w-12 h-12 text-primary-400 mx-auto" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2 text-center">{solution.title}</h3>
                <p className="text-gray-300 mb-4 text-center">{solution.description}</p>
                <ul className="space-y-2 mb-6">
                  {solution.features.map((feature, i) => (
                    <li key={i} className="flex items-center space-x-2 text-gray-300">
                      <CheckCircle className="w-4 h-4 text-primary-400" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/services"
                  className="block w-full text-center px-6 py-3 bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg text-white font-semibold hover:shadow-lg hover:shadow-primary-500/50 transition-all"
                >
                  Learn More
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* NEW SECTION 5: Certifications Badge */}
      <section className="relative py-20 px-4">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
              Certified & <span className="text-gradient">Registered</span>
            </h2>
            <p className="text-gray-400 text-lg">
              Fully licensed and compliant with Philippine regulations
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              { name: 'BIR Registered', icon: Award, color: 'from-blue-500 to-blue-600' },
              { name: 'DTI Certified', icon: Shield, color: 'from-green-500 to-green-600' },
              { name: 'Industry Certified', icon: CheckCircle, color: 'from-primary-500 to-primary-600' },
            ].map((cert, index) => {
              const Icon = cert.icon
              return (
                <motion.div
                  key={cert.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="glass-effect rounded-xl p-8 text-center"
                >
                  <div className={`bg-gradient-to-br ${cert.color} rounded-full p-6 w-24 h-24 mx-auto mb-4 flex items-center justify-center`}>
                    <Icon className="w-12 h-12 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-white">{cert.name}</h3>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* NEW SECTION 6: Quick Contact */}
      <section className="relative py-20 px-4 bg-dark-900/50">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: Phone, label: 'Call Us', value: '0970 210 1773', link: 'tel:+639702101773' },
              { icon: Mail, label: 'Email Us', value: 'suretechnetwork...', link: 'mailto:suretechnetworkanddatasolution@gmail.com' },
              { icon: MapPin, label: 'Visit Us', value: 'Minglanilla, Cebu', link: '/contact' },
            ].map((contact, index) => {
              const Icon = contact.icon
              return (
                <motion.a
                  key={contact.label}
                  href={contact.link}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -10, scale: 1.05 }}
                  className="glass-effect rounded-xl p-6 text-center group cursor-pointer"
                >
                  <div className="bg-gradient-to-br from-primary-500/20 to-primary-600/20 rounded-lg p-4 w-fit mx-auto mb-4">
                    <Icon className="w-6 h-6 text-primary-400" />
                  </div>
                  <div className="text-gray-400 text-sm mb-1">{contact.label}</div>
                  <div className="text-white font-semibold">{contact.value}</div>
                </motion.a>
              )
            })}
          </div>
        </div>
      </section>

      {/* NEW SECTION 7: Latest Projects/Portfolio */}
      <section className="relative py-20 px-4">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
              Recent <span className="text-gradient">Projects</span>
            </h2>
            <p className="text-gray-400 text-lg">
              Showcasing our expertise in action
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: 'Corporate Network Setup', category: 'Network Design', image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400' },
              { title: 'CCTV Security System', category: 'CCTV Installation', image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400' },
              { title: 'Data Center Infrastructure', category: 'Server Setup', image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400' },
            ].map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="glass-effect rounded-xl overflow-hidden group cursor-pointer"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-950/90 to-transparent" />
                </div>
                <div className="p-6">
                  <div className="text-primary-400 text-sm mb-2">{project.category}</div>
                  <h3 className="text-white font-semibold text-lg mb-2">{project.title}</h3>
                  <Link
                    href="/innovation"
                    className="text-primary-400 hover:text-primary-300 text-sm font-semibold flex items-center space-x-1"
                  >
                    <span>Explore Innovation</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* NEW SECTION 8: FAQ Section */}
      <section className="relative py-20 px-4 bg-dark-900/50">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
              Frequently Asked <span className="text-gradient">Questions</span>
            </h2>
            <p className="text-gray-400 text-lg">
              Everything you need to know about our services
            </p>
          </motion.div>

          <div className="space-y-4">
            {[
              { q: 'What services do you offer?', a: 'We offer comprehensive ICT solutions including CCTV installation, structured cabling, network design, server installation, IT support, cybersecurity, and more.' },
              { q: 'What are your working hours?', a: 'We operate Monday to Friday, 8:00 AM to 6:00 PM (Philippines Time). Bookings are only accepted during these hours.' },
              { q: 'How long does installation take?', a: 'Installation time varies by project size. Small projects (1-2 days), medium projects (3-5 days), and large enterprise projects (1-2 weeks).' },
              { q: 'Do you provide 24/7 support?', a: 'Yes! We offer 24/7 technical support for all our clients. Our team is always ready to assist you.' },
              { q: 'What areas do you serve?', a: 'We primarily serve Cebu and surrounding areas, but we also accommodate projects throughout the Philippines.' },
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-effect rounded-xl p-6"
              >
                <h3 className="text-white font-semibold mb-2">{faq.q}</h3>
                <p className="text-gray-400">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* NEW SECTION 9: Expertise & Skills */}
      <section className="relative py-20 px-4">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
              Our <span className="text-gradient">Expertise</span>
            </h2>
            <p className="text-gray-400 text-lg">
              Specialized skills and certifications
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { skill: 'Network Architecture', level: 95, icon: Network },
              { skill: 'Cybersecurity', level: 90, icon: Shield },
              { skill: 'CCTV Systems', level: 98, icon: Camera },
              { skill: 'Server Management', level: 92, icon: Server },
            ].map((item, index) => {
              const Icon = item.icon
              return (
                <motion.div
                  key={item.skill}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="glass-effect rounded-xl p-6"
                >
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="bg-gradient-to-br from-primary-500/20 to-primary-600/20 rounded-lg p-3">
                      <Icon className="w-6 h-6 text-primary-400" />
                    </div>
                    <h3 className="text-white font-semibold">{item.skill}</h3>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Proficiency</span>
                      <span className="text-primary-400 font-semibold">{item.level}%</span>
                    </div>
                    <div className="h-2 bg-dark-800 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-primary-500 to-primary-600 rounded-full"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${item.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: index * 0.1 }}
                      />
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* NEW SECTION 10: Partnership Benefits */}
      <section className="relative py-20 px-4 bg-dark-900/50">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
              Why Partner with <span className="text-gradient">Us?</span>
            </h2>
            <p className="text-gray-400 text-lg">
              Benefits of choosing Suretech as your ICT partner
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Zap, title: 'Fast Response', desc: 'Quick turnaround times for all projects' },
              { icon: Shield, title: 'Secure Solutions', desc: 'Enterprise-grade security measures' },
              { icon: TrendingUp, title: 'Scalable Growth', desc: 'Solutions that grow with your business' },
              { icon: Award, title: 'Certified Team', desc: 'Industry-certified professionals' },
              { icon: Clock, title: 'On-Time Delivery', desc: 'We meet deadlines, every time' },
              { icon: HeartHandshake, title: 'Long-Term Support', desc: 'Ongoing partnership and maintenance' },
            ].map((benefit, index) => {
              const Icon = benefit.icon
              return (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -10, scale: 1.02 }}
                  className="glass-effect rounded-xl p-6 group cursor-pointer"
                >
                  <div className="bg-gradient-to-br from-primary-500/20 to-primary-600/20 rounded-lg p-4 w-fit mb-4 group-hover:scale-110 transition-transform">
                    <Icon className="w-8 h-8 text-primary-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">{benefit.title}</h3>
                  <p className="text-gray-400">{benefit.desc}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* NEW SECTION 11: Tech Insights Preview */}
      <section className="relative py-20 px-4">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
              Latest <span className="text-gradient">Insights</span>
            </h2>
            <p className="text-gray-400 text-lg">
              Stay updated with ICT trends and best practices
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: '5 Benefits of Structured Cabling', category: 'Networking', date: 'Nov 24, 2024', image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400' },
              { title: 'Cybersecurity Best Practices 2024', category: 'Security', date: 'Nov 20, 2024', image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=400' },
              { title: 'Choosing the Right CCTV System', category: 'CCTV', date: 'Nov 18, 2024', image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400' },
            ].map((post, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="glass-effect rounded-xl overflow-hidden group cursor-pointer"
              >
                <div className="relative h-40 overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-950/90 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span className="bg-primary-500/80 text-white px-3 py-1 rounded-full text-xs font-semibold">
                      {post.category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="text-gray-400 text-xs mb-2">{post.date}</div>
                  <h3 className="text-white font-semibold text-lg mb-3">{post.title}</h3>
                  <Link
                    href="/insights"
                    className="text-primary-400 hover:text-primary-300 text-sm font-semibold flex items-center space-x-1"
                  >
                    <span>Read More</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* NEW SECTION 12: Video/Testimonial Section */}
      <section className="relative py-20 px-4 bg-dark-900/50">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative h-[400px] rounded-2xl overflow-hidden glass-effect group cursor-pointer"
            >
              <Image
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800"
                alt="Our Team"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark-950/80 to-transparent flex items-center justify-center">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="bg-primary-500/80 rounded-full p-6 cursor-pointer"
                >
                  <Play className="w-12 h-12 text-white" />
                </motion.div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h2 className="text-4xl lg:text-5xl font-bold text-white">
                See Us in <span className="text-gradient">Action</span>
              </h2>
              <p className="text-lg text-gray-300">
                Watch how we transform businesses with our ICT solutions. From initial consultation 
                to final implementation, see our team&apos;s expertise in action.
              </p>
              <div className="space-y-4">
                {[
                  'Professional installation process',
                  'Quality assurance at every step',
                  'Client satisfaction guaranteed',
                  'Ongoing support and maintenance',
                ].map((point, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center space-x-3"
                  >
                    <CheckCircle className="w-5 h-5 text-primary-400 flex-shrink-0" />
                    <span className="text-gray-300">{point}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* NEW SECTION 13: Newsletter Signup */}
      <section className="relative py-20 px-4">
        <div className="container mx-auto max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-effect rounded-2xl p-8 lg:p-12 text-center space-y-6"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-white">
              Stay <span className="text-gradient">Connected</span>
            </h2>
            <p className="text-gray-300">
              Subscribe to our newsletter for ICT tips, industry updates, and exclusive offers
            </p>
            <form className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 bg-dark-800 border border-primary-500/20 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-primary-500 transition-colors"
              />
              <button
                type="submit"
                className="px-8 py-3 bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg text-white font-semibold hover:shadow-lg hover:shadow-primary-500/50 transition-all"
              >
                Subscribe
              </button>
            </form>
            <p className="text-xs text-gray-400">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </motion.div>
        </div>
      </section>

      {/* NEW SECTION 14: Map/Location Section */}
      <section className="relative py-20 px-4 bg-dark-900/50">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
              Visit Our <span className="text-gradient">Location</span>
            </h2>
            <p className="text-gray-400 text-lg">
              We&apos;re here to serve you in Cebu, Philippines
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="glass-effect rounded-xl p-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-gradient-to-br from-primary-500/20 to-primary-600/20 rounded-lg p-3">
                    <MapPin className="w-6 h-6 text-primary-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-2">Office Address</h3>
                    <p className="text-gray-300">Tulay Minglanilla, Cebu, Philippines</p>
                  </div>
                </div>
              </div>

              <div className="glass-effect rounded-xl p-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-gradient-to-br from-primary-500/20 to-primary-600/20 rounded-lg p-3">
                    <Phone className="w-6 h-6 text-primary-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-2">Contact Numbers</h3>
                    <a href="tel:+639702101773" className="text-gray-300 hover:text-primary-400 block">0970 210 1773</a>
                    <a href="tel:+639567031254" className="text-gray-300 hover:text-primary-400 block">0956 703 1254</a>
                  </div>
                </div>
              </div>

              <div className="glass-effect rounded-xl p-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-gradient-to-br from-primary-500/20 to-primary-600/20 rounded-lg p-3">
                    <Mail className="w-6 h-6 text-primary-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-2">Email</h3>
                    <a href="mailto:suretechnetworkanddatasolution@gmail.com" className="text-gray-300 hover:text-primary-400 break-all">
                      suretechnetworkanddatasolution@gmail.com
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative h-[400px] rounded-2xl overflow-hidden glass-effect"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary-900/50 to-dark-900 flex items-center justify-center">
                <div className="text-center space-y-4">
                  <MapPin className="w-16 h-16 text-primary-400 mx-auto" />
                  <p className="text-gray-300">Map integration coming soon</p>
                  <p className="text-sm text-gray-400">Tulay Minglanilla, Cebu, Philippines</p>
                </div>
              </div>
            </motion.div>
          </div>
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
            Ready to Transform Your <span className="text-gradient">Network Infrastructure?</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-300 max-w-2xl mx-auto"
          >
            Get a free quote today and discover how our comprehensive ICT solutions can elevate your business.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              href="/book"
              className="px-8 py-4 bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg text-white font-semibold hover:shadow-lg hover:shadow-primary-500/50 transition-all"
            >
              Book Appointment Now
            </Link>
            <Link
              href="/contact"
              className="px-8 py-4 bg-transparent border-2 border-primary-500 rounded-lg text-white font-semibold hover:bg-primary-500/10 transition-all"
            >
              Get A Free Quote
            </Link>
            <Link
              href="/services"
              className="px-8 py-4 bg-transparent border-2 border-primary-500 rounded-lg text-white font-semibold hover:bg-primary-500/10 transition-all"
            >
              Explore Services
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
