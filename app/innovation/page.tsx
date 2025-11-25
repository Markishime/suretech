'use client'

import { motion } from 'framer-motion'
import { Sparkles, Cpu, Shield, Network, Lightbulb, ArrowRight } from 'lucide-react'
import Link from 'next/link'

const innovationTracks = [
  {
    title: 'AI Infrastructure Lab',
    description: 'Designing resilient, low-latency networks that power modern AI workloads and real-time analytics.',
    highlights: ['GPU-ready network fabrics', 'Edge-to-cloud orchestration', 'Automated observability'],
    icon: Cpu,
  },
  {
    title: 'Secure Automation Studio',
    description: 'Building autonomous monitoring, remediation, and cybersecurity playbooks for 24/7 protection.',
    highlights: ['Predictive alerts', 'Zero-trust blueprints', 'Compliance automation'],
    icon: Shield,
  },
  {
    title: 'Immersive Experience Lab',
    description: 'Prototyping intelligent control rooms, smart campuses, and interactive client demos.',
    highlights: ['Spatial dashboards', 'AR-assisted maintenance', 'Command center design'],
    icon: Network,
  },
]

const pilotPrograms = [
  {
    name: 'AI-Assisted Field Deployment',
    status: 'Enrolling Partners',
    summary: 'Guided installation playbooks that blend AR overlays with smart quality checks.',
  },
  {
    name: 'Autonomous NOC',
    status: 'Private Preview',
    summary: 'Closed-loop monitoring that predicts failures and dispatches secure fixes automatically.',
  },
  {
    name: 'Quantum-Safe Network Readiness',
    status: 'In Research',
    summary: 'Roadmaps for future-proof encryption and hybrid key exchange strategies.',
  },
]

export default function InnovationPage() {
  return (
    <div className="relative min-h-screen pt-24 pb-16 px-4">
      <div className="fixed inset-0 ai-grid-bg opacity-10" />

      <div className="container mx-auto max-w-5xl relative">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-6 mb-16"
        >
          <div className="flex items-center justify-center space-x-3 text-primary-400 uppercase tracking-[0.3em] text-xs font-semibold">
            <Sparkles className="w-5 h-5" />
            <span>Innovation Hub</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-white">
            Researching the Future of <span className="text-gradient">Connected Intelligence</span>
          </h1>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto">
            Our labs explore how AI, automation, and secure infrastructure converge to deliver adaptive,
            self-healing ICT ecosystems for Philippine enterprises.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="glass-effect rounded-2xl p-8 mb-16"
        >
          <div className="flex flex-col md:flex-row gap-6 items-center">
            <div className="flex-1 space-y-4">
              <h2 className="text-3xl font-bold text-white">Innovation Mission</h2>
              <p className="text-gray-300 leading-relaxed">
                We pair field experience with rapid experimentation. Every prototype is co-created with clients,
                stress-tested in live environments, and benchmarked against global best practices.
              </p>
              <ul className="space-y-2 text-gray-300">
                {['AI-first design sprints', 'Digital twin modelling', 'Partner-ready playbooks'].map((item) => (
                  <li key={item} className="flex items-center space-x-2">
                    <Lightbulb className="w-5 h-5 text-primary-400" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <motion.div
              className="flex-1 bg-gradient-to-br from-primary-500/20 to-primary-600/20 rounded-2xl p-6"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              <p className="text-sm uppercase tracking-widest text-primary-300 mb-3">Lab Snapshot</p>
              <div className="grid grid-cols-2 gap-4 text-white">
                <div>
                  <p className="text-3xl font-bold">12+</p>
                  <p className="text-gray-400 text-sm">active prototypes</p>
                </div>
                <div>
                  <p className="text-3xl font-bold">6</p>
                  <p className="text-gray-400 text-sm">industry pilots</p>
                </div>
                <div>
                  <p className="text-3xl font-bold">4</p>
                  <p className="text-gray-400 text-sm">research tracks</p>
                </div>
                <div>
                  <p className="text-3xl font-bold">24/7</p>
                  <p className="text-gray-400 text-sm">sandbox uptime</p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        <section className="mb-16">
          <motion.h2
            className="text-3xl font-bold text-white mb-8 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Active Research Tracks
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-6">
            {innovationTracks.map((track, index) => {
              const Icon = track.icon
              return (
                <motion.div
                  key={track.title}
                  className="glass-effect rounded-2xl p-6 space-y-4"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -8 }}
                >
                  <div className="flex items-center space-x-3">
                    <div className="bg-primary-500/10 rounded-xl p-3">
                      <Icon className="w-6 h-6 text-primary-400" />
                    </div>
                    <h3 className="text-white font-semibold text-lg">{track.title}</h3>
                  </div>
                  <p className="text-gray-300 text-sm leading-relaxed">{track.description}</p>
                  <ul className="space-y-2 text-gray-300 text-sm">
                    {track.highlights.map((highlight) => (
                      <li key={highlight} className="flex items-center space-x-2">
                        <span className="w-1 h-1 rounded-full bg-primary-400" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )
            })}
          </div>
        </section>

        <section>
          <motion.h2
            className="text-3xl font-bold text-white mb-8 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Pilot Programs
          </motion.h2>
          <div className="space-y-4">
            {pilotPrograms.map((program, index) => (
              <motion.div
                key={program.name}
                className="glass-effect rounded-2xl p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div>
                  <p className="text-sm text-primary-300 uppercase tracking-widest">{program.status}</p>
                  <h3 className="text-white text-2xl font-semibold mt-1">{program.name}</h3>
                  <p className="text-gray-400 mt-2">{program.summary}</p>
                </div>
                <Link
                  href="/contact"
                  className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl text-white font-semibold hover:shadow-lg hover:shadow-primary-500/40 transition-all"
                >
                  <span>Become a Pilot Partner</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}


