'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { collection, addDoc } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { Mail, Phone, MapPin, Send, Sparkles, MessageSquare, Clock, Users, ArrowRight, CheckCircle } from 'lucide-react'
import toast from 'react-hot-toast'
import Link from 'next/link'

interface FormData {
  name: string
  email: string
  phone: string
  subject: string
  message: string
}

const contactInfo = [
  {
    icon: MapPin,
    label: 'Office Address',
    value: 'Tulay Minglanilla, Cebu, Philippines',
    link: null,
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Phone,
    label: 'Phone Numbers',
    value: '0970 210 1773',
    secondValue: '0956 703 1254',
    link: 'tel:+639702101773',
    color: 'from-green-500 to-emerald-500',
  },
  {
    icon: Mail,
    label: 'Email Address',
    value: 'suretechnetworkanddatasolution@gmail.com',
    link: 'mailto:suretechnetworkanddatasolution@gmail.com',
    color: 'from-purple-500 to-pink-500',
  },
  {
    icon: Clock,
    label: 'Working Hours',
    value: 'Mon - Fri: 8 AM - 6 PM',
    secondValue: '24/7 Emergency Support',
    link: null,
    color: 'from-orange-500 to-red-500',
  },
]

const quickActions = [
  { icon: Users, title: 'Book Appointment', description: 'Schedule a service visit', href: '/book' },
  { icon: MessageSquare, title: 'AI Chat Support', description: 'Get instant answers 24/7', action: 'chat' },
]

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
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

      // Send confirmation email to user
      const userEmailHtml = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #14b8a6; text-align: center;">Thank You for Contacting Suretech Network</h1>
          <p>Dear ${data.name},</p>
          <p>Thank you for reaching out to Suretech Network and Data Solution. We have received your message regarding "${data.subject}" and appreciate your interest in our services.</p>

          <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3>Your Message Details:</h3>
            <p><strong>Name:</strong> ${data.name}</p>
            <p><strong>Email:</strong> ${data.email}</p>
            ${data.phone ? `<p><strong>Phone:</strong> ${data.phone}</p>` : ''}
            <p><strong>Subject:</strong> ${data.subject}</p>
            <p><strong>Message:</strong></p>
            <div style="background: white; padding: 15px; border-radius: 4px; border-left: 4px solid #14b8a6;">
              ${data.message.replace(/\n/g, '<br>')}
            </div>
          </div>

          <p>Our team will review your inquiry and get back to you within 24 hours. If you have any additional information or urgent questions, please feel free to contact us directly:</p>

          <div style="background: #ecfdf5; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #10b981;">
            <p><strong>📞 Phone:</strong> 0970 210 1773 / 0956 703 1254</p>
            <p><strong>📧 Email:</strong> suretechnetworkanddatasolution@gmail.com</p>
            <p><strong>📍 Location:</strong> Tulay Minglanilla, Cebu, Philippines</p>
          </div>

          <p>Thank you for choosing Suretech Network. We look forward to assisting you!</p>
          <p>Best regards,<br>The Suretech Network Team</p>
        </div>
      `

      // Send notification email to company
      const companyEmailHtml = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #14b8a6;">New Contact Form Submission</h1>
          <p>You have received a new inquiry through your website contact form.</p>

          <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3>Contact Details:</h3>
            <p><strong>Name:</strong> ${data.name}</p>
            <p><strong>Email:</strong> ${data.email}</p>
            ${data.phone ? `<p><strong>Phone:</strong> ${data.phone}</p>` : ''}
            <p><strong>Subject:</strong> ${data.subject}</p>
            <p><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
            <p><strong>Message:</strong></p>
            <div style="background: white; padding: 15px; border-radius: 4px; border-left: 4px solid #14b8a6;">
              ${data.message.replace(/\n/g, '<br>')}
            </div>
          </div>

          <div style="background: #fef3c7; padding: 15px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #f59e0b;">
            <p><strong>⚡ Action Required:</strong> Please respond to this inquiry within 24 hours.</p>
          </div>

          <p>Reply directly to: <a href="mailto:${data.email}">${data.email}</a></p>
        </div>
      `

      // Send emails
      const [userEmailResponse, companyEmailResponse] = await Promise.all([
        fetch('/api/send-email', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            to: data.email,
            subject: 'Thank You for Contacting Suretech Network',
            html: userEmailHtml,
          }),
        }),
        fetch('/api/send-email', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            to: 'suretechnetworkanddatasolution@gmail.com',
            subject: `New Contact Form: ${data.subject}`,
            html: companyEmailHtml,
          }),
        })
      ])

      if (!userEmailResponse.ok || !companyEmailResponse.ok) {
        console.warn('Email sending failed, but form was saved to database')
      }

      toast.success('Message sent successfully! Check your email for confirmation.')
      setIsSuccess(true)
      reset()

      setTimeout(() => setIsSuccess(false), 5000)
    } catch (error) {
      console.error('Error submitting form:', error)
      toast.error('Failed to send message. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="relative min-h-screen pt-20 overflow-x-hidden">
      {/* Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 ai-grid-bg opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-b from-dark-950 via-dark-900/50 to-dark-950" />
        <motion.div
          className="absolute top-1/3 right-1/4 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1], x: [0, 30, 0] }}
          transition={{ duration: 15, repeat: Infinity }}
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
              <span className="text-primary-400 font-semibold text-sm">GET IN TOUCH</span>
            </motion.div>
            
            <motion.h1 
              className="text-5xl lg:text-7xl font-bold font-display"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              Let&apos;s <span className="text-gradient ai-glow">Connect</span>
            </motion.h1>
            
            <motion.p 
              className="text-xl text-gray-300 max-w-2xl mx-auto font-tech"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Have questions? We&apos;re here to help. Contact us today and let&apos;s discuss how we can transform your business.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="relative py-12 px-4 z-10">
        <div className="container mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((info, index) => {
              const Icon = info.icon
              return (
                <motion.div
                  key={info.label}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -10, scale: 1.02 }}
                  className="glass-card rounded-2xl p-6 text-center group"
                >
                  <motion.div
                    className={`w-14 h-14 mx-auto rounded-xl bg-gradient-to-br ${info.color} p-0.5 mb-4`}
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="w-full h-full bg-dark-900 rounded-xl flex items-center justify-center">
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                  </motion.div>
                  
                  <h3 className="text-white font-bold mb-2">{info.label}</h3>
                  
                  {info.link ? (
                    <a href={info.link} className="text-gray-300 hover:text-primary-400 transition-colors text-sm break-all">
                      {info.value}
                    </a>
                  ) : (
                    <p className="text-gray-300 text-sm">{info.value}</p>
                  )}
                  
                  {info.secondValue && (
                    <p className="text-primary-400 text-sm mt-1">{info.secondValue}</p>
                  )}
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="relative py-24 px-4 z-10">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass-card rounded-3xl p-8 lg:p-10"
            >
              <div className="flex items-center space-x-3 mb-8">
                <motion.div
                  className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500 to-cyan-500 p-0.5"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="w-full h-full bg-dark-900 rounded-xl flex items-center justify-center">
                    <MessageSquare className="w-6 h-6 text-primary-400" />
                  </div>
                </motion.div>
                <div>
                  <h2 className="text-2xl font-bold text-white">Send Us a Message</h2>
                  <p className="text-gray-400 text-sm">We&apos;ll respond within 24 hours</p>
                </div>
              </div>
              
              {isSuccess ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <motion.div
                    className="w-20 h-20 mx-auto rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center mb-6"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 0.5 }}
                  >
                    <CheckCircle className="w-10 h-10 text-white" />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-white mb-2">Message Sent!</h3>
                  <p className="text-gray-400">We&apos;ll get back to you soon.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                        Name *
                      </label>
                      <input
                        {...register('name', { required: 'Name is required' })}
                        type="text"
                        id="name"
                        className="w-full bg-dark-800 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-primary-500 transition-colors"
                        placeholder="Your name"
                      />
                      {errors.name && (
                        <p className="mt-1 text-sm text-red-400">{errors.name.message}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                        Email *
                      </label>
                      <input
                        {...register('email', { 
                          required: 'Email is required',
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: 'Invalid email'
                          }
                        })}
                        type="email"
                        id="email"
                        className="w-full bg-dark-800 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-primary-500 transition-colors"
                        placeholder="your@email.com"
                      />
                      {errors.email && (
                        <p className="mt-1 text-sm text-red-400">{errors.email.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">
                        Phone
                      </label>
                      <input
                        {...register('phone')}
                        type="tel"
                        id="phone"
                        className="w-full bg-dark-800 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-primary-500 transition-colors"
                        placeholder="+63 XXX XXX XXXX"
                      />
                    </div>

                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
                        Subject *
                      </label>
                      <input
                        {...register('subject', { required: 'Subject is required' })}
                        type="text"
                        id="subject"
                        className="w-full bg-dark-800 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-primary-500 transition-colors"
                        placeholder="What is this about?"
                      />
                      {errors.subject && (
                        <p className="mt-1 text-sm text-red-400">{errors.subject.message}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                      Message *
                    </label>
                    <textarea
                      {...register('message', { required: 'Message is required' })}
                      id="message"
                      rows={6}
                      className="w-full bg-dark-800 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-primary-500 transition-colors resize-none"
                      placeholder="Tell us more about your needs..."
                    />
                    {errors.message && (
                      <p className="mt-1 text-sm text-red-400">{errors.message.message}</p>
                    )}
                  </div>

                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full flex items-center justify-center space-x-2 px-8 py-4 bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl text-white font-semibold disabled:opacity-50"
                  >
                    <Send className="w-5 h-5" />
                    <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
                  </motion.button>
                </form>
              )}
            </motion.div>

            {/* Right Side */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              {/* Quick Actions */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-white mb-4">Quick Actions</h3>
                {quickActions.map((action, index) => {
                  const Icon = action.icon
                  return (
                    <motion.div
                      key={action.title}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                    >
                      {action.href ? (
                        <Link href={action.href}>
                          <motion.div
                            whileHover={{ x: 10, scale: 1.02 }}
                            className="glass-card rounded-2xl p-6 flex items-center space-x-4 cursor-pointer group"
                          >
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500/20 to-cyan-500/20 flex items-center justify-center">
                              <Icon className="w-6 h-6 text-primary-400" />
                            </div>
                            <div className="flex-1">
                              <h4 className="text-white font-semibold group-hover:text-gradient transition-colors">{action.title}</h4>
                              <p className="text-gray-400 text-sm">{action.description}</p>
                            </div>
                            <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-primary-400 group-hover:translate-x-1 transition-all" />
                          </motion.div>
                        </Link>
                      ) : (
                        <motion.div
                          whileHover={{ x: 10, scale: 1.02 }}
                          className="glass-card rounded-2xl p-6 flex items-center space-x-4 cursor-pointer group"
                          onClick={() => {
                            // Trigger chatbot if available
                            const chatButton = document.querySelector('[data-chat-trigger]') as HTMLButtonElement
                            if (chatButton) chatButton.click()
                          }}
                        >
                          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500/20 to-cyan-500/20 flex items-center justify-center">
                            <Icon className="w-6 h-6 text-primary-400" />
                          </div>
                          <div className="flex-1">
                            <h4 className="text-white font-semibold group-hover:text-gradient transition-colors">{action.title}</h4>
                            <p className="text-gray-400 text-sm">{action.description}</p>
                          </div>
                          <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-primary-400 group-hover:translate-x-1 transition-all" />
                        </motion.div>
                      )}
                    </motion.div>
                  )
                })}
              </div>

              {/* AI Support Card */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="glass-card rounded-3xl p-8 relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 via-cyan-500/10 to-primary-500/10" />
                
                <div className="relative z-10">
                  <div className="flex items-center space-x-3 mb-4">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                    >
                      <Sparkles className="w-8 h-8 text-primary-400" />
                    </motion.div>
                    <h3 className="text-2xl font-bold text-white">24/7 AI Support</h3>
                  </div>
                  <p className="text-gray-300 mb-6">
                    Need instant answers? Our AI assistant is available around the clock to help with your questions 
                    about services, pricing, or technical support.
                  </p>
                  <div className="flex items-center space-x-2 text-sm text-primary-400">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                    <span>AI Assistant Online</span>
                  </div>
                  <p className="mt-4 text-sm text-gray-400">
                    Click the chat button in the bottom right corner to get started!
                  </p>
                </div>
              </motion.div>

              {/* Map Placeholder */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="glass-card rounded-3xl overflow-hidden h-80"
              >
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-dark-800/50 to-dark-900/50">
                  <div className="text-center space-y-4">
                    <motion.div
                      className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-primary-500/20 to-cyan-500/20 flex items-center justify-center"
                      animate={{ y: [0, -10, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <MapPin className="w-8 h-8 text-primary-400" />
                    </motion.div>
                    <div>
                      <p className="text-white font-semibold">Tulay Minglanilla</p>
                      <p className="text-gray-400 text-sm">Cebu, Philippines</p>
                    </div>
                    <a 
                      href="https://maps.google.com/?q=Minglanilla,Cebu,Philippines" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-2 text-primary-400 hover:text-primary-300 text-sm font-semibold"
                    >
                      <span>Open in Google Maps</span>
                      <ArrowRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </motion.div>
            </motion.div>
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
            className="glass-card rounded-3xl p-12 lg:p-16 text-center relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary-500/10 via-cyan-500/10 to-primary-500/10" />
            
            <div className="relative z-10">
              <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
                Ready to Get <span className="text-gradient">Started?</span>
              </h2>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
                Book your consultation today and let&apos;s transform your business together.
              </p>
              <Link href="/book">
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(20, 184, 166, 0.4)' }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center space-x-2 px-10 py-5 bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl text-white font-bold text-lg"
                >
                  <span>Book Appointment</span>
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
