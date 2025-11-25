'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Gift, Users, Sparkles, Copy, CheckCircle } from 'lucide-react'
import toast from 'react-hot-toast'

export default function ReferralPage() {
  const [copied, setCopied] = useState(false)
  const referralCode = 'SURETECH2025'
  const referralLink = typeof window !== 'undefined' 
    ? `${window.location.origin}?ref=${referralCode}`
    : `https://suretechnds.com?ref=${referralCode}`

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink)
    setCopied(true)
    toast.success('Referral link copied!')
    setTimeout(() => setCopied(false), 2000)
  }

  const benefits = [
    {
      icon: '🎁',
      title: 'For You',
      description: 'Get 10% discount on your next service when your referral books an appointment',
    },
    {
      icon: '👥',
      title: 'For Your Friend',
      description: 'Your friend gets 5% discount on their first booking',
    },
    {
      icon: '💰',
      title: 'Win-Win',
      description: 'Both of you save money while getting quality IT services',
    },
  ]

  const steps = [
    {
      step: 1,
      title: 'Share Your Link',
      description: 'Copy and share your unique referral link with friends, family, or colleagues',
    },
    {
      step: 2,
      title: 'They Book',
      description: 'When someone books using your link, they automatically get 5% off',
    },
    {
      step: 3,
      title: 'You Get Rewarded',
      description: 'Once their booking is confirmed, you receive a 10% discount code',
    },
  ]

  return (
    <div className="relative min-h-screen pt-20">
      <div className="fixed inset-0 ai-grid-bg opacity-20" />

      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto text-center space-y-6"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-block"
            >
              <Gift className="w-12 h-12 text-primary-400 mx-auto mb-4" />
            </motion.div>
            <h1 className="text-5xl lg:text-6xl font-bold text-gradient ai-glow">
              Referral Program
            </h1>
            <p className="text-xl text-gray-300">
              Share the love, save together!
            </p>
          </motion.div>
        </div>
      </section>

      {/* Benefits */}
      <section className="relative py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-effect rounded-xl p-6 text-center"
              >
                <div className="text-5xl mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-bold text-white mb-2">{benefit.title}</h3>
                <p className="text-gray-400">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Referral Link */}
      <section className="relative py-20 px-4 bg-dark-900/50">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-effect rounded-2xl p-8 space-y-6"
          >
            <div className="text-center">
              <h2 className="text-3xl font-bold text-white mb-4">Your Referral Link</h2>
              <p className="text-gray-400 mb-6">
                Share this link and both you and your friend will get discounts!
              </p>
            </div>

            <div className="bg-dark-800 rounded-lg p-4 flex items-center space-x-4">
              <div className="flex-1">
                <p className="text-sm text-gray-400 mb-1">Referral Code</p>
                <p className="text-xl font-mono text-primary-400">{referralCode}</p>
              </div>
              <button
                onClick={handleCopy}
                className="px-6 py-3 bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg text-white font-semibold hover:shadow-lg hover:shadow-primary-500/50 transition-all flex items-center space-x-2"
              >
                {copied ? (
                  <>
                    <CheckCircle className="w-5 h-5" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-5 h-5" />
                    <span>Copy Link</span>
                  </>
                )}
              </button>
            </div>

            <div className="bg-dark-800 rounded-lg p-4">
              <p className="text-sm text-gray-400 mb-2">Full Referral Link</p>
              <p className="text-sm text-gray-300 break-all font-mono">{referralLink}</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section className="relative py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-white mb-4">
              How It <span className="text-gradient">Works</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-effect rounded-xl p-6 text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                  {step.step}
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                <p className="text-gray-400">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Terms */}
      <section className="relative py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="glass-effect rounded-xl p-8">
            <h3 className="text-2xl font-bold text-white mb-4">Terms & Conditions</h3>
            <ul className="space-y-2 text-gray-300">
              <li>• Discounts apply to new bookings only</li>
              <li>• Referral discount codes are valid for 30 days</li>
              <li>• Cannot be combined with other promotions</li>
              <li>• Both parties must complete their bookings to receive discounts</li>
              <li>• We reserve the right to modify or cancel the program at any time</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  )
}

