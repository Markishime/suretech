'use client'

import { motion } from 'framer-motion'
import { Phone, Mail, MessageSquare, ShieldCheck, Clock, Sparkles, Headphones, LifeBuoy } from 'lucide-react'
import { staggerContainer, staggerItem } from '@/lib/animations'
import Link from 'next/link'

const supportChannels = [
  {
    title: 'Priority Hotline',
    description: 'Direct-to-engineer support for urgent outages and onsite dispatch.',
    icon: Phone,
    value: '0970 210 1773',
    href: 'tel:+639702101773',
  },
  {
    title: 'Email Command Center',
    description: 'Structured troubleshooting reports and project escalations.',
    icon: Mail,
    value: 'suretechnetworkanddatasolution@gmail.com',
    href: 'mailto:suretechnetworkanddatasolution@gmail.com',
  },
  {
    title: 'Chat + Booking Assistant',
    description: 'Instant responses plus direct hand-off to engineers via the AI agent.',
    icon: MessageSquare,
    value: 'Website Chatbot',
    href: '/#chatbot',
  },
]

const responseMatrix = [
  { label: 'Critical Network Alerts', sla: 'Under 30 minutes', detail: '24/7 direct line to on-call engineers for production incidents.' },
  { label: 'Scheduled Deployments', sla: 'Within 4 hours', detail: 'Pre-approved windows for firmware updates, migrations, and installs.' },
  { label: 'General Tickets', sla: 'Within 24 hours', detail: 'Tracked in the support portal with transparent progress updates.' },
]

export default function SupportPage() {
  return (
    <div className="relative min-h-screen pt-24 pb-16 px-4">
      <div className="fixed inset-0 ai-grid-bg opacity-15" />

      <div className="container mx-auto max-w-5xl relative space-y-16">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-6"
        >
          <div className="flex items-center justify-center space-x-3 text-primary-300 uppercase tracking-[0.4em] text-xs font-semibold">
            <Sparkles className="w-5 h-5" />
            <span>Support Center</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-display font-bold text-white">
            Direct Access to <span className="text-gradient">Suretech Engineers</span>
          </h1>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto">
            Whether it’s a critical network event or a scheduled optimization, our support pod keeps your infrastructure online, secure, and future-ready.
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: '-50px' }}
          className="grid md:grid-cols-3 gap-6"
        >
          {supportChannels.map((channel) => {
            const Icon = channel.icon
            return (
              <motion.a
                key={channel.title}
                href={channel.href}
                className="glass-effect rounded-2xl p-6 space-y-4 block hover:-translate-y-2 transition-transform"
                variants={staggerItem}
              >
                <div className="bg-primary-500/10 rounded-xl p-4 w-fit">
                  <Icon className="w-6 h-6 text-primary-400" />
                </div>
                <div>
                  <p className="text-sm uppercase tracking-widest text-primary-300">{channel.title}</p>
                  <p className="text-white text-2xl font-semibold mt-1">{channel.value}</p>
                </div>
                <p className="text-gray-400 text-sm">{channel.description}</p>
              </motion.a>
            )
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-effect rounded-3xl p-8 lg:p-12 space-y-8"
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="space-y-3">
              <p className="text-sm uppercase tracking-[0.5em] text-primary-300">Support Coverage</p>
              <h2 className="text-3xl text-white font-bold">Service-Level Response Matrix</h2>
              <p className="text-gray-400 max-w-2xl">
                We log each ticket, tag it with impact level, and route it to the best engineer. Expect proactive comms every step of the way.
              </p>
            </div>
            <div className="flex items-center space-x-3 bg-dark-800/60 rounded-2xl px-6 py-4">
              <Clock className="w-10 h-10 text-primary-400" />
              <div>
                <p className="text-white font-semibold text-lg">24/7</p>
                <p className="text-gray-400 text-sm">Network Operations Coverage</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {responseMatrix.map((row) => (
              <div key={row.label} className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border border-primary-500/10 rounded-2xl p-4">
                <div>
                  <p className="text-white font-semibold">{row.label}</p>
                  <p className="text-gray-400 text-sm">{row.detail}</p>
                </div>
                <div className="text-primary-300 font-semibold text-lg">{row.sla}</div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-6"
        >
          <motion.div className="glass-effect rounded-2xl p-8 space-y-4" whileHover={{ y: -6 }}>
            <div className="flex items-center space-x-3">
              <Headphones className="w-8 h-8 text-primary-400" />
              <h3 className="text-white text-2xl font-semibold">Proactive Monitoring</h3>
            </div>
            <p className="text-gray-400">
              Our NOC uses AI-assisted alerting to anticipate failures, open tickets automatically, and share fixes before your teams feel the impact.
            </p>
          </motion.div>

          <motion.div className="glass-effect rounded-2xl p-8 space-y-4" whileHover={{ y: -6 }}>
            <div className="flex items-center space-x-3">
              <LifeBuoy className="w-8 h-8 text-primary-400" />
              <h3 className="text-white text-2xl font-semibold">Knowledge + Playbooks</h3>
            </div>
            <p className="text-gray-400">
              Every resolution feeds our internal runbooks—so the next incident gets fixed even faster with validated steps and rollback plans.
            </p>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-effect rounded-3xl p-8 text-center space-y-4"
        >
          <ShieldCheck className="w-12 h-12 text-primary-400 mx-auto" />
          <h3 className="text-white text-3xl font-semibold">Need onboarding or escalation access?</h3>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Request a support playbook walkthrough and add your team to our secure escalation list.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl text-white font-semibold hover:shadow-lg hover:shadow-primary-500/40 transition-all"
          >
            <span>Coordinate with Suretech</span>
          </Link>
        </motion.div>
      </div>
    </div>
  )
}


