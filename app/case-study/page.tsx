'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft, Sparkles } from 'lucide-react'

export default function CaseStudyPage() {
  return (
    <div className="relative min-h-screen pt-20">
      <div className="fixed inset-0 ai-grid-bg opacity-20" />
      
      <section className="relative py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="text-center space-y-6 mb-12"
            style={{ willChange: 'transform, opacity' }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1, duration: 0.4, ease: 'easeOut' }}
            >
              <Sparkles className="w-12 h-12 text-primary-400 mx-auto" />
            </motion.div>
            <motion.h1 
              className="text-5xl lg:text-6xl font-bold text-gradient ai-glow font-display"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              style={{ willChange: 'transform, opacity' }}
            >
              Case Studies
            </motion.h1>
            <motion.p 
              className="text-xl text-gray-300 font-tech"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.4, ease: 'easeOut' }}
            >
              Coming soon - Real-world success stories
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.4, ease: 'easeOut' }}
            className="glass-effect rounded-2xl p-12 text-center"
            style={{ willChange: 'transform, opacity' }}
          >
            <p className="text-gray-400 text-lg mb-6">
              We&apos;re currently compiling our case studies showcasing successful projects across various industries.
            </p>
            <Link
              href="/"
              className="inline-flex items-center space-x-2 text-primary-400 hover:text-primary-300 font-semibold"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Home</span>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

