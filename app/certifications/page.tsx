'use client'

import { motion } from 'framer-motion'
import { FileText, Download, CheckCircle, Sparkles } from 'lucide-react'
import { fadeInUp, fadeInLeft, fadeInRight, scaleIn, staggerContainer, staggerItem, hoverScale, hoverLift } from '@/lib/animations'

const certifications = [
  {
    type: 'BIR Form 2303',
    title: 'Certificate of Registration',
    details: [
      { label: 'TIN', value: '676-806-814-00000' },
      { label: 'Name', value: 'Cuizon, April Love Marie Tubod (Proprietor)' },
      { label: 'Taxpayer Type', value: 'Mixed Income Earner - Compensation Income Earner and Single Proprietor' },
      { label: 'Registered Address', value: 'Tulay 6046 Minglanilla Cebu Philippines' },
      { label: 'Registration Date', value: 'June 5, 2025' },
      { label: 'Trade Name', value: 'SURETECH NETWORK AND DATA SOLUTION' },
      { label: 'Lines of Business', value: 'Technology and Computer Service Activities; Computer Configuration Services; Installation of Security Cameras' },
    ],
    page: 6,
  },
  {
    type: 'BIR Certificate',
    title: 'Certificate of Registration (Additional)',
    details: [
      { label: 'TIN', value: '676-806-814-00000' },
      { label: 'Name', value: 'Cuizon, April Love Marie Tubod' },
      { label: 'Trade Name', value: 'SURETECH NETWORK AND DATA SOLUTION' },
      { label: 'Status', value: 'Certified and Verified' },
    ],
    page: 7,
  },
  {
    type: 'DTI Certificate',
    title: 'Business Name Registration',
    details: [
      { label: 'Business Name', value: 'SURETECH NETWORK AND DATA SOLUTION' },
      { label: 'Registered Location', value: 'Minglanilla, Cebu' },
      { label: 'Issued To', value: 'April Love Marie Tubod Cuizon' },
      { label: 'Issue Date', value: 'October 13, 2025' },
      { label: 'Business Name No.', value: '7517058' },
    ],
    page: 8,
  },
]

export default function CertificationsPage() {
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
              Certifications
            </motion.h1>
            <motion.p 
              className="text-xl text-gray-300 font-tech"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.4, ease: 'easeOut' }}
            >
              Legal credentials and registrations that build trust
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Certifications Grid */}
      <section className="relative py-20 px-4">
        <div className="container mx-auto space-y-12">
          {certifications.map((cert, index) => (
            <motion.div
              key={cert.type}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: index * 0.1, duration: 0.4, ease: 'easeOut' }}
              className="glass-effect rounded-2xl p-8 lg:p-10 space-y-6"
              style={{ willChange: 'transform, opacity' }}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-4">
                  <div className="bg-gradient-to-br from-primary-500/20 to-primary-600/20 rounded-lg p-4">
                    <FileText className="w-10 h-10 text-primary-400" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-white">{cert.title}</h2>
                    <p className="text-primary-400 font-semibold">{cert.type}</p>
                  </div>
                </div>
                <button className="flex items-center space-x-2 px-4 py-2 bg-primary-500/20 hover:bg-primary-500/30 rounded-lg text-primary-400 transition-colors">
                  <Download className="w-5 h-5" />
                  <span className="hidden sm:inline">Download</span>
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-4 pt-6 border-t border-primary-500/20">
                {cert.details.map((detail) => (
                  <div key={detail.label} className="space-y-1">
                    <p className="text-sm text-gray-400 font-semibold">{detail.label}</p>
                    <p className="text-gray-200">{detail.value}</p>
                  </div>
                ))}
              </div>

              <div className="flex items-center space-x-2 pt-4 border-t border-primary-500/20">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span className="text-sm text-gray-400">Verified and Authentic</span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Trust Section */}
      <section className="relative py-20 px-4 bg-dark-900/50">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center space-y-6"
          >
            <h2 className="text-4xl font-bold text-white">
              Trusted & <span className="text-gradient">Certified</span>
            </h2>
            <p className="text-lg text-gray-300 leading-relaxed">
              Our certifications demonstrate our commitment to operating as a legitimate, registered business 
              entity. We are fully compliant with Philippine tax regulations and business registration requirements, 
              ensuring transparency and trust in all our dealings.
            </p>
            <div className="flex flex-wrap justify-center gap-4 pt-8">
              {certifications.map((cert) => (
                <div
                  key={cert.type}
                  className="px-6 py-3 bg-dark-800 rounded-lg border border-primary-500/20"
                >
                  <p className="text-primary-400 font-semibold">{cert.type}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

