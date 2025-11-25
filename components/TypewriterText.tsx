'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface TypewriterTextProps {
  texts: string[]
  speed?: number
  deleteSpeed?: number
  delay?: number
  className?: string
}

export default function TypewriterText({ 
  texts, 
  speed = 100, 
  deleteSpeed = 50,
  delay = 2000,
  className = '' 
}: TypewriterTextProps) {
  const [currentTextIndex, setCurrentTextIndex] = useState(0)
  const [currentText, setCurrentText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    let timeout: NodeJS.Timeout
    const current = texts[currentTextIndex]

    if (isPaused) {
      timeout = setTimeout(() => setIsPaused(false), delay)
      return () => clearTimeout(timeout)
    }

    if (!isDeleting && currentText === current) {
      // Finished typing, pause then start deleting
      timeout = setTimeout(() => {
        setIsDeleting(true)
      }, delay)
    } else if (isDeleting && currentText === '') {
      // Finished deleting, move to next text
      setIsDeleting(false)
      setCurrentTextIndex((prev) => (prev + 1) % texts.length)
    } else {
      // Typing or deleting
      const currentSpeed = isDeleting ? deleteSpeed : speed
      timeout = setTimeout(() => {
        setCurrentText(
          isDeleting
            ? current.substring(0, currentText.length - 1)
            : current.substring(0, currentText.length + 1)
        )
      }, currentSpeed)
    }

    return () => clearTimeout(timeout)
  }, [currentText, currentTextIndex, isDeleting, isPaused, texts, speed, deleteSpeed, delay])

  return (
    <span className={className}>
      {currentText}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 1, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
        className="inline-block w-0.5 h-6 bg-primary-400 ml-1"
        style={{ willChange: 'opacity' }}
      />
    </span>
  )
}

