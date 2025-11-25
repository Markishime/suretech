'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X, Send, Bot, Sparkles, Calendar } from 'lucide-react'
import Link from 'next/link'
import { chatWithGemini } from '@/lib/gemini'
import { processBookingViaChat } from '@/lib/gemini-booking'
import ChatbotBookingForm from './ChatbotBookingForm'
import toast from 'react-hot-toast'

interface Message {
  id: string
  text: string
  sender: 'user' | 'bot'
  timestamp: Date
}

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! 👋 Welcome to Suretech Network and Data Solution.\n\nI\'m your AI assistant, and I\'m here to help you with:\n\n• 📅 Booking appointments\n• 💼 Service information and details\n• 💰 Pricing and package inquiries\n• 🔧 Technical support questions\n• 📍 Company information\n• ⭐ Why choose us\n\nHow can I assist you today?',
      sender: 'bot',
      timestamp: new Date(),
    },
  ])
  const [conversationHistory, setConversationHistory] = useState<Array<{ role: string; content: string }>>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [showBookingForm, setShowBookingForm] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isOpen && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages, isOpen])

  const handleSend = async () => {
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input.trim(),
      sender: 'user',
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    const currentInput = input.trim()
    setInput('')
    setIsLoading(true)

    try {
      // Check if it's a booking request first
      const lowerInput = currentInput.toLowerCase()
      const isBookingRequest = lowerInput.includes('book') || 
                              lowerInput.includes('appointment') || 
                              lowerInput.includes('schedule') ||
                              lowerInput.includes('install') ||
                              lowerInput.includes('setup')

      if (isBookingRequest) {
        // Use booking processor for booking-related queries
        const bookingResponse = await processBookingViaChat(currentInput, conversationHistory)
        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: bookingResponse.response + '\n\n💡 Quick Tip: For faster booking, click the "Book Appointment" button below!',
          sender: 'bot',
          timestamp: new Date(),
        }
        setMessages((prev) => [...prev, botMessage])
        setConversationHistory((prev) => [...prev, { role: 'user', content: currentInput }, { role: 'assistant', content: bookingResponse.response }])
      } else {
        // Regular chat response with conversation history
        try {
          const response = await chatWithGemini(currentInput, conversationHistory)
          const botMessage: Message = {
            id: (Date.now() + 1).toString(),
            text: response,
            sender: 'bot',
            timestamp: new Date(),
          }
          setMessages((prev) => [...prev, botMessage])
          setConversationHistory((prev) => [...prev, { role: 'user', content: currentInput }, { role: 'assistant', content: response }])
        } catch (chatError: any) {
          console.error('Error in chatWithGemini:', chatError)
          throw chatError // Re-throw to be caught by outer catch
        }
      }
    } catch (error: any) {
      console.error('Chat error:', error)
      console.error('Error details:', {
        message: error?.message,
        stack: error?.stack,
        name: error?.name
      })
      
      // Show helpful error message
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: `I apologize, but I encountered an issue: ${error?.message || 'Unknown error'}\n\nPlease try again, or contact us directly:\n\n📞 Phone: 0970 210 1773 / 0956 703 1254\n📧 Email: suretechnetworkanddatasolution@gmail.com\n\nWe're here to help!`,
        sender: 'bot',
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <>
      {/* Chat Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full shadow-lg shadow-primary-500/50 flex items-center justify-center text-white z-50 hover:shadow-xl hover:shadow-primary-500/70 transition-all"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
            >
              <X className="w-6 h-6" />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
            >
              <MessageCircle className="w-6 h-6" />
            </motion.div>
          )}
        </AnimatePresence>
        <motion.div
          className="absolute inset-0 bg-primary-400 rounded-full"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{ opacity: 0.3 }}
        />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-24 right-6 w-96 h-[600px] glass-effect rounded-2xl shadow-2xl flex flex-col z-50 border border-primary-500/20"
          >
            {/* Header */}
            <div className="p-4 border-b border-primary-500/20 flex items-center justify-between bg-gradient-to-r from-primary-600/20 to-primary-500/20">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <Bot className="w-6 h-6 text-primary-400" />
                  <motion.div
                    className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </div>
                <div>
                  <h3 className="text-white font-semibold">AI Assistant</h3>
                  <p className="text-xs text-gray-400">24/7 Support Available</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {showBookingForm ? (
                <div className="bg-dark-800 rounded-xl p-4 border border-primary-500/20">
                  <ChatbotBookingForm
                    onClose={() => setShowBookingForm(false)}
                    onSuccess={() => {
                      setShowBookingForm(false)
                      const successMessage: Message = {
                        id: Date.now().toString(),
                        text: 'Great! Your booking has been submitted successfully. We will confirm your appointment within 24 hours via email or phone. Is there anything else I can help you with?',
                        sender: 'bot',
                        timestamp: new Date(),
                      }
                      setMessages((prev) => [...prev, successMessage])
                    }}
                  />
                </div>
              ) : (
                <>
                  {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl p-4 ${
                      message.sender === 'user'
                        ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white'
                        : 'bg-dark-800 text-gray-100 border border-primary-500/20'
                    }`}
                  >
                    {message.sender === 'bot' && (
                      <div className="flex items-center space-x-2 mb-2 pb-1">
                        <Sparkles className="w-4 h-4 text-primary-400 flex-shrink-0" />
                        <span className="text-xs text-primary-400 font-semibold font-display">AI Assistant</span>
                      </div>
                    )}
                    <div className="text-sm whitespace-pre-wrap leading-relaxed break-words">
                      {message.text.split('\n').map((line, idx) => (
                        <span key={idx} className="block">
                          {line || '\u00A0'}
                          {idx < message.text.split('\n').length - 1 && <br />}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="bg-dark-800 rounded-2xl p-3 border border-primary-500/20">
                    <div className="flex space-x-2">
                      <motion.div
                        className="w-2 h-2 bg-primary-400 rounded-full"
                        animate={{ y: [0, -8, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                      />
                      <motion.div
                        className="w-2 h-2 bg-primary-400 rounded-full"
                        animate={{ y: [0, -8, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                      />
                      <motion.div
                        className="w-2 h-2 bg-primary-400 rounded-full"
                        animate={{ y: [0, -8, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                      />
                    </div>
                  </div>
                </motion.div>
              )}
                </>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Actions */}
            <div className="px-4 pb-2 border-t border-primary-500/20 pt-2">
              <button
                onClick={() => setShowBookingForm(true)}
                className="flex items-center justify-center space-x-2 w-full px-4 py-2 bg-gradient-to-r from-primary-500/20 to-primary-600/20 hover:from-primary-500/30 hover:to-primary-600/30 rounded-lg text-primary-400 text-sm font-semibold transition-all border border-primary-500/30"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Appointment</span>
              </button>
            </div>

            {/* Input */}
            {!showBookingForm && (
              <div className="p-4 border-t border-primary-500/20">
                <div className="flex items-center space-x-2">
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask me anything or book a service..."
                    className="flex-1 bg-dark-800 border border-primary-500/20 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-primary-500 transition-colors"
                    disabled={isLoading}
                  />
                  <button
                    onClick={handleSend}
                    disabled={isLoading || !input.trim()}
                    className="p-2 bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg text-white hover:shadow-lg hover:shadow-primary-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

