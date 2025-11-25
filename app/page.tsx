'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { ArrowDown, Sparkles, Shield, Network, Server, Camera, Lock, Wrench, CheckCircle, Users, Award, Clock, TrendingUp, Zap, Globe, Database, Code, Phone, Mail, MapPin, Star, ArrowRight, Play, BarChart3, Target, Rocket, HeartHandshake, X, Wifi, Monitor, Cpu, Layers, Settings, FileCheck, Headphones, Building2, GraduationCap, Landmark, HardDrive, Home as HomeIcon, Activity, Eye, Lightbulb, MessageCircle } from 'lucide-react'
import Image from 'next/image'
import TypewriterText from '@/components/TypewriterText'
import { staggerContainer, staggerItem } from '@/lib/animations'

// Counter Animation Hook
function useCounter(end: number, duration: number = 2000, startOnView: boolean = true) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  
  useEffect(() => {
    if (!startOnView || isInView) {
      let startTime: number
      const animate = (currentTime: number) => {
        if (!startTime) startTime = currentTime
        const progress = Math.min((currentTime - startTime) / duration, 1)
        setCount(Math.floor(progress * end))
        if (progress < 1) requestAnimationFrame(animate)
      }
      requestAnimationFrame(animate)
    }
  }, [end, duration, isInView, startOnView])
  
  return { count, ref }
}

const services = [
  {
    icon: Network,
    title: 'Structured Cabling',
    description: 'Design and installation of organized, scalable communication infrastructure',
    color: 'from-cyan-500 to-blue-600',
    delay: 0,
  },
  {
    icon: Server,
    title: 'Network Design',
    description: 'Robust network architectures tailored to your requirements',
    color: 'from-purple-500 to-pink-600',
    delay: 0.1,
  },
  {
    icon: Camera,
    title: 'CCTV Installation',
    description: 'Advanced surveillance systems for enhanced security',
    color: 'from-orange-500 to-red-600',
    delay: 0.2,
  },
  {
    icon: Lock,
    title: 'Cybersecurity',
    description: 'Proactive security measures to safeguard your data',
    color: 'from-green-500 to-emerald-600',
    delay: 0.3,
  },
]

const stats = [
  { value: 500, suffix: '+', label: 'Projects Completed', icon: CheckCircle },
  { value: 98, suffix: '%', label: 'Client Satisfaction', icon: Star },
  { value: 24, suffix: '/7', label: 'Support Available', icon: Clock },
  { value: 15, suffix: '+', label: 'Years Experience', icon: Award },
]

const techStack = [
  { name: 'Cisco', icon: Wifi, color: 'from-blue-500 to-cyan-500' },
  { name: 'Fortinet', icon: Shield, color: 'from-red-500 to-orange-500' },
  { name: 'HP Enterprise', icon: Monitor, color: 'from-purple-500 to-pink-500' },
  { name: 'Dell', icon: Cpu, color: 'from-green-500 to-emerald-500' },
  { name: 'Ubiquiti', icon: Wifi, color: 'from-cyan-500 to-blue-500' },
  { name: 'Hikvision', icon: Camera, color: 'from-orange-500 to-red-500' },
]

const typewriterTexts = [
  'ICT Solutions',
  'Network Infrastructure',
  'Cybersecurity Services',
  'Digital Transformation',
  'IT Support & Maintenance',
]

const heroHighlights = [
  { title: 'Zero-Trust Deployment', subtitle: 'Security-first blueprints', icon: Shield },
  { title: 'AI Automation Pods', subtitle: 'Predictive monitoring', icon: Sparkles },
  { title: 'Cebu-Wide Coverage', subtitle: 'Fast local response', icon: MapPin },
]

const industries = [
  { name: 'Corporate Offices', icon: Building2, color: 'from-blue-500 to-cyan-500' },
  { name: 'Educational', icon: GraduationCap, color: 'from-purple-500 to-pink-500' },
  { name: 'Government', icon: Landmark, color: 'from-green-500 to-emerald-500' },
  { name: 'Data Centers', icon: HardDrive, color: 'from-orange-500 to-red-500' },
  { name: 'Residential', icon: HomeIcon, color: 'from-cyan-500 to-blue-500' },
  { name: 'Healthcare', icon: Activity, color: 'from-pink-500 to-rose-500' },
]

const whyChooseUs = [
  { icon: Award, title: 'Certified Experts', description: 'Industry-certified professionals with proven expertise' },
  { icon: Clock, title: 'Fast Response', description: 'Less than 2-hour response time in Metro Cebu' },
  { icon: Shield, title: 'Security First', description: 'ISO-aligned security protocols for all projects' },
  { icon: HeartHandshake, title: 'Long-term Support', description: 'Ongoing maintenance and 24/7 technical assistance' },
]

const capabilities = [
  { icon: Layers, title: 'End-to-End Solutions', description: 'From design to deployment and maintenance' },
  { icon: Settings, title: 'Custom Integration', description: 'Tailored solutions for your unique needs' },
  { icon: FileCheck, title: 'Quality Assurance', description: 'Rigorous testing and documentation' },
  { icon: Headphones, title: '24/7 Monitoring', description: 'Real-time system health tracking' },
]

// Stat Card Component
const StatCard = ({ stat, index }: { stat: typeof stats[0], index: number }) => {
  const { count, ref } = useCounter(stat.value)
  const Icon = stat.icon
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="glass-card rounded-2xl p-6 text-center group cursor-pointer"
    >
      <motion.div
        className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-primary-500/20 to-cyan-500/20 mb-4"
        whileHover={{ rotate: 360, scale: 1.1 }}
        transition={{ duration: 0.5 }}
      >
        <Icon className="w-7 h-7 text-primary-400" />
      </motion.div>
      <div className="text-4xl lg:text-5xl font-bold text-gradient mb-2 font-display">
        {count}{stat.suffix}
      </div>
      <div className="text-gray-400 text-sm font-tech">{stat.label}</div>
    </motion.div>
  )
}

// Particle Component
const Particle = ({ index }: { index: number }) => {
  const size = Math.random() * 4 + 2
  const duration = Math.random() * 20 + 10
  const delay = Math.random() * 5
  const x = Math.random() * 100
  const y = Math.random() * 100
  
  return (
    <motion.div
      className="absolute rounded-full bg-primary-400/30"
      style={{
        width: size,
        height: size,
        left: `${x}%`,
        top: `${y}%`,
      }}
      animate={{
        y: [0, -30, 0],
        x: [0, Math.random() * 20 - 10, 0],
        opacity: [0.2, 0.6, 0.2],
        scale: [1, 1.2, 1],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />
  )
}

export default function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [currentTime, setCurrentTime] = useState<string>('')
  const [isMounted, setIsMounted] = useState(false)
  const [isVideoOpen, setIsVideoOpen] = useState(false)
  const [hoveredService, setHoveredService] = useState<number | null>(null)
  
  const { scrollYProgress } = useScroll()
  const heroRef = useRef<HTMLDivElement>(null)
  const heroInView = useInView(heroRef, { once: false })
  
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.3], [1, 0.9])
  const y = useTransform(scrollYProgress, [0, 0.3], [0, 100])

  useEffect(() => {
    setIsMounted(true)
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)

    const updateTime = () => {
      setCurrentTime(new Date().toLocaleTimeString('en-US', { 
        timeZone: 'Asia/Manila',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      }))
    }
    updateTime()
    const timer = setInterval(updateTime, 1000)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      clearInterval(timer)
    }
  }, [])

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 ai-grid-bg opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-b from-dark-950 via-dark-900/50 to-dark-950" />
        
        {/* Floating Particles */}
        {isMounted && [...Array(20)].map((_, i) => (
          <Particle key={i} index={i} />
        ))}
        
        {/* Animated Gradient Orbs */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-500/20 rounded-full blur-3xl"
          animate={{
            x: [0, 50, 0],
            y: [0, -30, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-cyan-500/15 rounded-full blur-3xl"
          animate={{
            x: [0, -40, 0],
            y: [0, 40, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        />
      </div>
      
      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center pt-20 px-4">
        {/* Hero Background Image */}
        <motion.div 
          className="absolute inset-0 z-0"
          style={{ opacity, scale }}
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
          <div className="absolute inset-0 bg-gradient-to-b from-dark-950/95 via-dark-950/85 to-dark-950" />
          
          {/* Interactive Cursor Glow */}
          {isMounted && (
            <div 
              className="absolute pointer-events-none transition-opacity duration-300"
              style={{
                left: mousePosition.x - 200,
                top: mousePosition.y - 200,
                width: 400,
                height: 400,
                background: `radial-gradient(circle, rgba(20, 184, 166, 0.15) 0%, transparent 70%)`,
                opacity: heroInView ? 1 : 0,
              }}
            />
          )}
        </motion.div>

        {/* Hero Content */}
        <motion.div 
          className="container mx-auto max-w-6xl relative z-10"
          style={{ y }}
        >
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-center space-y-8"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center space-x-2 glass-effect rounded-full px-4 py-2"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              >
                <Sparkles className="w-4 h-4 text-primary-400" />
              </motion.div>
              <span className="text-primary-400 font-semibold text-sm tracking-wider">SURETECH NETWORK & DATA SOLUTION</span>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.7 }}
              className="text-4xl sm:text-5xl lg:text-7xl xl:text-8xl font-bold leading-tight font-display"
            >
              <span className="text-white block mb-2">Your Trusted Partner for</span>
              <span className="text-gradient ai-glow inline-block min-h-[1.2em]">
                <TypewriterText 
                  texts={typewriterTexts}
                  speed={80}
                  deleteSpeed={40}
                  delay={2500}
                />
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="text-lg sm:text-xl lg:text-2xl text-gray-300 max-w-4xl mx-auto font-tech leading-relaxed"
            >
              Comprehensive ICT solutions for Cebu-based organizations—from structured cabling to cyber defense. 
              We design, deploy, and maintain networks backed by 24/7 local support.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link href="/book">
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(20, 184, 166, 0.4)' }}
                  whileTap={{ scale: 0.98 }}
                  className="group relative px-8 py-4 bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl text-white font-semibold text-lg overflow-hidden"
                >
                  <span className="relative z-10 flex items-center space-x-2">
                    <span>Book Now</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-primary-400 to-cyan-400"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.button>
              </Link>
              
              <Link href="/services">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  className="group flex items-center space-x-3 px-8 py-4 glass-effect rounded-xl text-white font-semibold"
                >
                  <Eye className="w-5 h-5 text-primary-400" />
                  <span>View Services</span>
                </motion.button>
              </Link>
            </motion.div>

            {/* Service Area Badge */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="flex items-center justify-center space-x-4"
            >
              <motion.div 
                className="flex items-center space-x-3 glass-effect rounded-full px-6 py-3"
                whileHover={{ scale: 1.02 }}
              >
                <MapPin className="w-5 h-5 text-primary-400" />
                <span className="text-white font-semibold">Cebu Province Only</span>
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              </motion.div>
            </motion.div>

            {/* Hero Highlights */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.5 }}
              className="grid sm:grid-cols-3 gap-4 max-w-4xl mx-auto mt-12"
            >
              {heroHighlights.map((highlight, index) => {
                const Icon = highlight.icon
                return (
                  <motion.div
                    key={highlight.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1 + index * 0.1 }}
                    whileHover={{ y: -5, scale: 1.02 }}
                    className="glass-card rounded-2xl p-5 flex items-center space-x-4 cursor-pointer group"
                  >
                    <motion.div 
                      className="bg-gradient-to-br from-primary-500/20 to-cyan-500/20 rounded-xl p-3"
                      whileHover={{ rotate: 10 }}
                    >
                      <Icon className="w-6 h-6 text-primary-400" />
                    </motion.div>
                    <div>
                      <p className="text-white font-semibold text-sm">{highlight.title}</p>
                      <p className="text-gray-400 text-xs">{highlight.subtitle}</p>
                    </div>
                  </motion.div>
                )
              })}
            </motion.div>

            {/* Real-time Stats */}
            {isMounted && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
                className="flex items-center justify-center space-x-6 text-sm text-gray-400 mt-8"
              >
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  <span>System Online</span>
                </div>
                <div className="w-px h-4 bg-gray-700" />
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-primary-400" />
                  <span suppressHydrationWarning>{currentTime} PHT</span>
                </div>
              </motion.div>
            )}
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex flex-col items-center space-y-2 text-gray-400"
          >
            <span className="text-xs uppercase tracking-widest">Scroll to explore</span>
            <ArrowDown className="w-5 h-5" />
          </motion.div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="relative py-24 px-4 z-10">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <StatCard key={stat.label} stat={stat} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="relative py-24 px-4 z-10">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-block px-4 py-2 glass-effect rounded-full text-primary-400 text-sm font-semibold mb-4"
            >
              What We Offer
            </motion.span>
            <h2 className="text-4xl lg:text-6xl font-bold text-white mb-4">
              Our <span className="text-gradient">Core Services</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Comprehensive ICT solutions designed to transform your business infrastructure
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => {
              const Icon = service.icon
              return (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: service.delay }}
                  onHoverStart={() => setHoveredService(index)}
                  onHoverEnd={() => setHoveredService(null)}
                  className="group relative"
                >
                  <motion.div
                    whileHover={{ y: -12, scale: 1.02 }}
                    className="glass-card rounded-2xl p-8 h-full cursor-pointer overflow-hidden"
                  >
                    {/* Background Glow */}
                    <motion.div
                      className={`absolute -inset-1 bg-gradient-to-r ${service.color} rounded-2xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500`}
                    />
                    
                    {/* Icon */}
                    <motion.div
                      className={`relative w-16 h-16 rounded-2xl bg-gradient-to-br ${service.color} p-0.5 mb-6`}
                      whileHover={{ rotate: -10, scale: 1.1 }}
                    >
                      <div className="w-full h-full bg-dark-900 rounded-2xl flex items-center justify-center">
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                    </motion.div>
                    
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-gradient transition-all">
                      {service.title}
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed mb-4">
                      {service.description}
                    </p>
                    
                    <motion.div
                      className="flex items-center text-primary-400 text-sm font-semibold"
                      initial={{ x: 0 }}
                      whileHover={{ x: 5 }}
                    >
                      <span>Learn More</span>
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </motion.div>
                  </motion.div>
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
            <Link href="/services">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-4 bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl text-white font-semibold hover:shadow-lg hover:shadow-primary-500/30 transition-all"
              >
                View All Services
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="relative py-24 px-4 z-10 bg-dark-900/50">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div>
                <motion.span
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  className="inline-block px-4 py-2 glass-effect rounded-full text-primary-400 text-sm font-semibold mb-4"
                >
                  Why Choose Us
                </motion.span>
                <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
                  Your Success is <span className="text-gradient">Our Priority</span>
                </h2>
                <p className="text-gray-400 text-lg">
                  We combine technical expertise with a commitment to excellence, delivering solutions that drive your business forward.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                {whyChooseUs.map((item, index) => {
                  const Icon = item.icon
                  return (
                    <motion.div
                      key={item.title}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ y: -5 }}
                      className="glass-card rounded-xl p-5 group cursor-pointer"
                    >
                      <motion.div
                        className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary-500/20 to-cyan-500/20 flex items-center justify-center mb-4"
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.5 }}
                      >
                        <Icon className="w-6 h-6 text-primary-400" />
                      </motion.div>
                      <h3 className="text-white font-bold mb-2 group-hover:text-gradient transition-colors">{item.title}</h3>
                      <p className="text-gray-400 text-sm">{item.description}</p>
                    </motion.div>
                  )
                })}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative h-[600px] rounded-3xl overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800"
                  alt="Network Infrastructure"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-950/80 via-dark-950/20 to-transparent" />
                
                {/* Floating Stats Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="absolute bottom-8 left-8 right-8 glass-card rounded-2xl p-6"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm">Projects This Year</p>
                      <p className="text-3xl font-bold text-gradient">120+</p>
                    </div>
                    <div className="w-px h-12 bg-gray-700" />
                    <div>
                      <p className="text-gray-400 text-sm">Client Retention</p>
                      <p className="text-3xl font-bold text-gradient">95%</p>
                    </div>
                    <div className="w-px h-12 bg-gray-700" />
                    <div>
                      <p className="text-gray-400 text-sm">Avg Response</p>
                      <p className="text-3xl font-bold text-gradient">&lt;2h</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Industries Section */}
      <section className="relative py-24 px-4 z-10">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-block px-4 py-2 glass-effect rounded-full text-primary-400 text-sm font-semibold mb-4"
            >
              Industries We Serve
            </motion.span>
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
              Solutions for <span className="text-gradient">Every Sector</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              From corporate offices to educational institutions, we deliver tailored ICT solutions
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {industries.map((industry, index) => {
              const Icon = industry.icon
              return (
                <motion.div
                  key={industry.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ y: -10, scale: 1.05 }}
                  className="glass-card rounded-2xl p-6 text-center group cursor-pointer"
                >
                  <motion.div
                    className={`w-14 h-14 mx-auto rounded-xl bg-gradient-to-br ${industry.color} p-0.5 mb-4`}
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="w-full h-full bg-dark-900 rounded-xl flex items-center justify-center">
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                  </motion.div>
                  <h3 className="text-white font-semibold text-sm group-hover:text-gradient transition-colors">{industry.name}</h3>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Technology Partners */}
      <section className="relative py-24 px-4 z-10 bg-dark-900/50">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
              Powered by <span className="text-gradient">Industry Leaders</span>
            </h2>
            <p className="text-gray-400 text-lg">
              We partner with the best to deliver exceptional solutions
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {techStack.map((tech, index) => {
              const Icon = tech.icon
              return (
                <motion.div
                  key={tech.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ y: -8, scale: 1.05 }}
                  className="glass-card rounded-2xl p-6 text-center group cursor-pointer"
                >
                  <motion.div
                    className={`w-14 h-14 mx-auto rounded-xl bg-gradient-to-br ${tech.color} p-0.5 mb-4`}
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="w-full h-full bg-dark-900 rounded-xl flex items-center justify-center">
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                  </motion.div>
                  <h3 className="text-white font-semibold group-hover:text-gradient transition-colors">{tech.name}</h3>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="relative py-24 px-4 z-10">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
              Our <span className="text-gradient">Process</span>
            </h2>
            <p className="text-gray-400 text-lg">
              From consultation to completion, we guide you every step of the way
            </p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              { step: '01', title: 'Consultation', desc: 'Understanding your needs', icon: Phone, color: 'from-blue-500 to-cyan-500' },
              { step: '02', title: 'Planning', desc: 'Designing the solution', icon: Target, color: 'from-purple-500 to-pink-500' },
              { step: '03', title: 'Implementation', desc: 'Professional installation', icon: Rocket, color: 'from-orange-500 to-red-500' },
              { step: '04', title: 'Support', desc: 'Ongoing maintenance', icon: HeartHandshake, color: 'from-green-500 to-emerald-500' },
            ].map((process, index) => {
              const Icon = process.icon
              return (
                <motion.div
                  key={process.step}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="relative"
                >
                  {/* Connector Line */}
                  {index < 3 && (
                    <div className="hidden md:block absolute top-14 left-full w-full h-0.5 bg-gradient-to-r from-primary-500/50 to-transparent z-0" />
                  )}
                  
                  <motion.div
                    whileHover={{ y: -10 }}
                    className="glass-card rounded-2xl p-6 text-center relative z-10"
                  >
                    <div className={`text-6xl font-bold bg-gradient-to-r ${process.color} bg-clip-text text-transparent opacity-20 mb-4`}>
                      {process.step}
                    </div>
                    <motion.div
                      className={`w-14 h-14 mx-auto rounded-xl bg-gradient-to-br ${process.color} p-0.5 mb-4`}
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      <div className="w-full h-full bg-dark-900 rounded-xl flex items-center justify-center">
                        <Icon className="w-7 h-7 text-white" />
                      </div>
                    </motion.div>
                    <h3 className="text-xl font-bold text-white mb-2">{process.title}</h3>
                    <p className="text-gray-400 text-sm">{process.desc}</p>
                  </motion.div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Capabilities Section */}
      <section className="relative py-24 px-4 z-10 bg-dark-900/50">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-block px-4 py-2 glass-effect rounded-full text-primary-400 text-sm font-semibold mb-4"
            >
              Our Capabilities
            </motion.span>
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
              Full-Stack <span className="text-gradient">ICT Excellence</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Comprehensive solutions from infrastructure design to ongoing support
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {capabilities.map((cap, index) => {
              const Icon = cap.icon
              return (
                <motion.div
                  key={cap.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -10, scale: 1.02 }}
                  className="glass-card rounded-2xl p-8 text-center group cursor-pointer"
                >
                  <motion.div
                    className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-primary-500/20 to-cyan-500/20 flex items-center justify-center mb-6"
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Icon className="w-8 h-8 text-primary-400" />
                  </motion.div>
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-gradient transition-colors">{cap.title}</h3>
                  <p className="text-gray-400 text-sm">{cap.description}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Video CTA Section */}
      <section className="relative py-24 px-4 z-10">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative aspect-video rounded-3xl overflow-hidden group cursor-pointer"
              onClick={() => setIsVideoOpen(true)}
            >
              <Image
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800"
                alt="Our Team"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark-950/80 via-dark-950/30 to-transparent" />
              
              {/* Play Button */}
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                whileHover={{ scale: 1.1 }}
              >
                <motion.div
                  className="relative"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <div className="absolute inset-0 bg-primary-500/30 rounded-full blur-xl" />
                  <div className="relative w-20 h-20 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full flex items-center justify-center">
                    <Play className="w-8 h-8 text-white ml-1" />
                  </div>
                </motion.div>
              </motion.div>
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
              <p className="text-lg text-gray-300 leading-relaxed">
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
                    <div className="w-6 h-6 rounded-full bg-primary-500/20 flex items-center justify-center">
                      <CheckCircle className="w-4 h-4 text-primary-400" />
                    </div>
                    <span className="text-gray-300">{point}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="relative py-24 px-4 z-10 bg-dark-900/50">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
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
              { q: 'What are your working hours?', a: 'We operate Monday to Friday, 8:00 AM to 6:00 PM (Philippines Time). Emergency support is available 24/7 for existing clients.' },
              { q: 'How long does installation take?', a: 'Installation time varies by project size. Small projects (1-2 days), medium projects (3-5 days), and large enterprise projects (1-2 weeks).' },
              { q: 'Do you provide 24/7 support?', a: 'Yes! We offer 24/7 technical support for all our clients. Our team is always ready to assist you with any issues.' },
              { q: 'What areas do you serve?', a: 'We serve Cebu Province exclusively for onsite services, ensuring fast response times and quality local support.' },
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.01 }}
                className="glass-card rounded-2xl p-6 cursor-pointer"
              >
                <h3 className="text-white font-bold text-lg mb-2">{faq.q}</h3>
                <p className="text-gray-400">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="relative py-24 px-4 z-10">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: Phone, label: 'Call Us', value: '0970 210 1773', link: 'tel:+639702101773', color: 'from-blue-500 to-cyan-500' },
              { icon: Mail, label: 'Email Us', value: 'suretechnetwork...', link: 'mailto:suretechnetworkanddatasolution@gmail.com', color: 'from-purple-500 to-pink-500' },
              { icon: MapPin, label: 'Visit Us', value: 'Minglanilla, Cebu', link: '/contact', color: 'from-orange-500 to-red-500' },
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
                  whileHover={{ y: -10, scale: 1.02 }}
                  className="glass-card rounded-2xl p-8 text-center group"
                >
                  <motion.div
                    className={`w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br ${contact.color} p-0.5 mb-4`}
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="w-full h-full bg-dark-900 rounded-2xl flex items-center justify-center">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                  </motion.div>
                  <div className="text-gray-400 text-sm mb-1">{contact.label}</div>
                  <div className="text-white font-bold text-lg group-hover:text-gradient transition-colors">{contact.value}</div>
                </motion.a>
              )
            })}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative py-24 px-4 z-10">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative glass-card rounded-3xl p-12 lg:p-16 text-center overflow-hidden"
          >
            {/* Background Glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary-500/10 via-cyan-500/10 to-primary-500/10" />
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative z-10"
            >
              <h2 className="text-4xl lg:text-6xl font-bold text-white mb-6">
                Ready to Transform Your <span className="text-gradient">Infrastructure?</span>
              </h2>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
                Get a free consultation today and discover how our ICT solutions can elevate your business.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/book">
                  <motion.button
                    whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(20, 184, 166, 0.4)' }}
                    whileTap={{ scale: 0.98 }}
                    className="px-10 py-5 bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl text-white font-bold text-lg"
                  >
                    Book Appointment Now
                  </motion.button>
                </Link>
                <Link href="/contact">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-10 py-5 glass-effect rounded-xl text-white font-bold text-lg border-2 border-primary-500/50 hover:border-primary-500"
                  >
                    Get A Free Quote
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Video Modal */}
      <AnimatePresence>
        {isVideoOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-dark-950/95 p-4"
            onClick={() => setIsVideoOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative w-full max-w-4xl aspect-video glass-card rounded-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setIsVideoOpen(false)}
                aria-label="Close video modal"
                className="absolute top-4 right-4 z-10 w-10 h-10 bg-dark-900/80 rounded-full flex items-center justify-center text-white hover:bg-dark-800"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="w-full h-full flex items-center justify-center bg-dark-900">
                <div className="text-center space-y-4">
                  <Play className="w-16 h-16 text-primary-400 mx-auto" />
                  <p className="text-gray-400">Video demo coming soon</p>
                  <p className="text-sm text-gray-500">Contact us for a personalized demo</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
