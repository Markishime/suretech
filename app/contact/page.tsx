'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { collection, addDoc } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { Mail, Phone, MapPin, Send, Sparkles, MessageSquare } from 'lucide-react'
import toast from 'react-hot-toast'
import { fadeInUp, fadeInLeft, fadeInRight, scaleIn, staggerContainer, staggerItem, hoverScale, hoverLift } from '@/lib/animations'

interface FormData {
  name: string
  email: string
  phone: string
  subject: string
  message: string
}

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>()

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true)
    try {
      // Save to Firestore
      await addDoc(collection(db, 'inquiries'), {
        ...data,
        timestamp: new Date(),
        status: 'new',
      })
      
      toast.success('Thank you! Your message has been sent successfully.')
      reset()
    } catch (error) {
      console.error('Error submitting form:', error)
      toast.error('Failed to send message. Please try again or contact us directly.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const contactInfo = [
    {
      icon: MapPin,
      label: 'Address',
      value: 'Tulay Minglanilla, Cebu, Philippines',
      link: null,
    },
    {
      icon: Phone,
      label: 'Phone',
      value: '0970 210 1773',
      link: 'tel:+639702101773',
    },
    {
      icon: Phone,
      label: 'Phone',
      value: '0956 703 1254',
      link: 'tel:+639567031254',
    },
    {
      icon: Mail,
      label: 'Email',
      value: 'suretechnetworkanddatasolution@gmail.com',
      link: 'mailto:suretechnetworkanddatasolution@gmail.com',
    },
  ]

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
              transition={{ duration: 0.5, ease: 'easeOut' }}
              style={{ willChange: 'transform, opacity' }}
            >
              Get In Touch
            </motion.h1>
            <motion.p 
              className="text-xl text-gray-300 font-tech"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.4, ease: 'easeOut' }}
            >
              Have questions? We&apos;re here to help. Contact us today!
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="relative py-20 px-4">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="glass-effect rounded-2xl p-8 lg:p-10"
              style={{ willChange: 'transform, opacity' }}
            >
              <div className="flex items-center space-x-3 mb-6">
                <MessageSquare className="w-6 h-6 text-primary-400" />
                <h2 className="text-3xl font-bold text-white">Send Us a Message</h2>
              </div>
              
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                    Name *
                  </label>
                  <input
                    {...register('name', { required: 'Name is required' })}
                    type="text"
                    id="name"
                    className="w-full bg-dark-800 border border-primary-500/20 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-primary-500 transition-colors"
                    placeholder="Your name"
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-400">{errors.name.message}</p>
                  )}
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                      Email *
                    </label>
                    <input
                      {...register('email', { 
                        required: 'Email is required',
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: 'Invalid email address'
                        }
                      })}
                      type="email"
                      id="email"
                      className="w-full bg-dark-800 border border-primary-500/20 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-primary-500 transition-colors"
                      placeholder="your.email@example.com"
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-400">{errors.email.message}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">
                      Phone
                    </label>
                    <input
                      {...register('phone')}
                      type="tel"
                      id="phone"
                      className="w-full bg-dark-800 border border-primary-500/20 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-primary-500 transition-colors"
                      placeholder="+63 XXX XXX XXXX"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
                    Subject *
                  </label>
                  <input
                    {...register('subject', { required: 'Subject is required' })}
                    type="text"
                    id="subject"
                    className="w-full bg-dark-800 border border-primary-500/20 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-primary-500 transition-colors"
                    placeholder="What is this regarding?"
                  />
                  {errors.subject && (
                    <p className="mt-1 text-sm text-red-400">{errors.subject.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                    Message *
                  </label>
                  <textarea
                    {...register('message', { required: 'Message is required' })}
                    id="message"
                    rows={6}
                    className="w-full bg-dark-800 border border-primary-500/20 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-primary-500 transition-colors resize-none"
                    placeholder="Tell us more about your needs..."
                  />
                  {errors.message && (
                    <p className="mt-1 text-sm text-red-400">{errors.message.message}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center space-x-2 px-8 py-4 bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg text-white font-semibold hover:shadow-lg hover:shadow-primary-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-5 h-5" />
                  <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
                </button>
              </form>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="space-y-6"
              style={{ willChange: 'transform, opacity' }}
            >
              <div className="glass-effect rounded-2xl p-8">
                <h2 className="text-3xl font-bold text-white mb-6">Contact Information</h2>
                <div className="space-y-6">
                  {contactInfo.map((info, index) => {
                    const Icon = info.icon
                    const content = (
                      <div className="flex items-start space-x-4">
                        <div className="bg-gradient-to-br from-primary-500/20 to-primary-600/20 rounded-lg p-3">
                          <Icon className="w-6 h-6 text-primary-400" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-400 font-semibold">{info.label}</p>
                          <p className="text-gray-200 mt-1">{info.value}</p>
                        </div>
                      </div>
                    )
                    
                    return info.link ? (
                      <a
                        key={index}
                        href={info.link}
                        className="block hover:opacity-80 transition-opacity"
                      >
                        {content}
                      </a>
                    ) : (
                      <div key={index}>{content}</div>
                    )
                  })}
                </div>
              </div>

              {/* AI Chat CTA */}
              <div className="glass-effect rounded-2xl p-8 bg-gradient-to-br from-primary-900/30 to-dark-900">
                <div className="flex items-center space-x-3 mb-4">
                  <Sparkles className="w-6 h-6 text-primary-400" />
                  <h3 className="text-2xl font-bold text-white">24/7 AI Support</h3>
                </div>
                <p className="text-gray-300 mb-4">
                  Need instant answers? Our AI assistant is available 24/7 to help with your questions 
                  about services, pricing, or technical support.
                </p>
                <p className="text-sm text-gray-400">
                  Click the chat button in the bottom right corner to get started!
                </p>
              </div>

              {/* Map Placeholder */}
              <div className="glass-effect rounded-2xl p-8 h-64 flex items-center justify-center">
                <div className="text-center space-y-2">
                  <MapPin className="w-12 h-12 text-primary-400 mx-auto" />
                  <p className="text-gray-400">Map integration coming soon</p>
                  <p className="text-sm text-gray-500">Tulay Minglanilla, Cebu, Philippines</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}

