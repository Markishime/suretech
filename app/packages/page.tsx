'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { CheckCircle, Sparkles, ArrowRight, DollarSign } from 'lucide-react'
import { fadeInUp, fadeInLeft, fadeInRight, scaleIn, staggerContainer, staggerItem, hoverScale, hoverLift } from '@/lib/animations'

const packages = [
  {
    name: 'Basic Package',
    price: 'Starting at ₱5,000',
    description: 'Perfect for small homes and offices',
    features: [
      'Basic CCTV installation (2-4 cameras)',
      'Basic network setup',
      '1 month support',
      'Basic cabling',
    ],
    popular: false,
    serviceId: 'cctv-installation',
  },
  {
    name: 'Professional Package',
    price: 'Starting at ₱15,000',
    description: 'Ideal for medium-sized businesses',
    features: [
      'Professional CCTV system (4-8 cameras)',
      'Structured cabling',
      'Network design & setup',
      '3 months support',
      'Cybersecurity basics',
    ],
    popular: true,
    serviceId: 'network-setup',
  },
  {
    name: 'Enterprise Package',
    price: 'Custom Quote',
    description: 'Complete solution for large businesses',
    features: [
      'Enterprise CCTV system (8+ cameras)',
      'Full network infrastructure',
      'Server installation',
      'Advanced cybersecurity',
      '6 months support',
      '24/7 monitoring',
      'Custom solutions',
    ],
    popular: false,
    serviceId: 'other',
  },
]

export default function PackagesPage() {
  return (
    <div className="relative min-h-screen pt-20">
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
              Service Packages
            </motion.h1>
            <motion.p 
              className="text-xl text-gray-300 font-tech"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.4, ease: 'easeOut' }}
            >
              Choose the perfect package for your needs
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Packages Grid */}
      <section className="relative py-20 px-4">
        <div className="container mx-auto">
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: '-50px' }}
            className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto"
          >
            {packages.map((pkg, index) => (
              <motion.div
                key={pkg.name}
                variants={staggerItem}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className={`relative glass-effect rounded-2xl p-8 cursor-pointer ${
                  pkg.popular ? 'border-2 border-primary-500' : ''
                }`}
                style={{ willChange: 'transform' }}
              >
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-primary-500 to-primary-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-white mb-2 font-display">{pkg.name}</h3>
                  <div className="flex items-center justify-center space-x-2 text-primary-400 mb-2">
                    <motion.div
                      animate={{ rotate: [0, 8] }}
                      transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
                      style={{ willChange: 'transform' }}
                    >
                      <DollarSign className="w-5 h-5" />
                    </motion.div>
                    <span className="text-3xl font-bold font-display">{pkg.price}</span>
                  </div>
                  <p className="text-gray-400 font-tech">{pkg.description}</p>
                </div>

                <ul className="space-y-4 mb-8">
                  {pkg.features.map((feature) => (
                    <li key={feature} className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-primary-400 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href={`/book?service=${pkg.serviceId}`}
                  className={`block w-full text-center px-6 py-3 rounded-lg font-semibold transition-all ${
                    pkg.popular
                      ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white hover:shadow-lg hover:shadow-primary-500/50'
                      : 'bg-dark-800 border-2 border-primary-500/50 text-primary-400 hover:border-primary-500'
                  }`}
                >
                  Book Now
                </Link>
              </motion.div>
            ))}
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
            Need a <span className="text-gradient">Custom Solution?</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-300 max-w-2xl mx-auto"
          >
            Contact us for a personalized quote tailored to your specific requirements.
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
              className="px-8 py-4 bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg text-white font-semibold hover:shadow-lg hover:shadow-primary-500/50 transition-all inline-flex items-center justify-center space-x-2"
            >
              <span>Get Custom Quote</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/services"
              className="px-8 py-4 bg-transparent border-2 border-primary-500 rounded-lg text-white font-semibold hover:bg-primary-500/10 transition-all"
            >
              View All Services
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

