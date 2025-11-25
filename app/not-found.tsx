'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Home, Sparkles } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="relative min-h-screen flex items-center justify-center px-4">
      <div className="fixed inset-0 ai-grid-bg opacity-20" />
      
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="text-center space-y-8 max-w-2xl"
        style={{ willChange: 'transform, opacity' }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1, duration: 0.4, ease: 'easeOut' }}
        >
          <Sparkles className="w-20 h-20 text-primary-400 mx-auto mb-4" />
        </motion.div>
        
        <motion.h1 
          className="text-8xl font-bold text-gradient ai-glow font-display"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5, ease: 'easeOut' }}
          style={{ willChange: 'transform, opacity' }}
        >
          404
        </motion.h1>
        <motion.h2 
          className="text-3xl font-bold text-white font-display"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.4, ease: 'easeOut' }}
        >
          Page Not Found
        </motion.h2>
        <motion.p 
          className="text-xl text-gray-400 font-tech"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.4, ease: 'easeOut' }}
        >
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </motion.p>
        
        <Link
          href="/"
          className="inline-flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg text-white font-semibold hover:shadow-lg hover:shadow-primary-500/50 transition-all"
        >
          <Home className="w-5 h-5" />
          <span>Back to Home</span>
        </Link>
      </motion.div>
    </div>
  )
}

