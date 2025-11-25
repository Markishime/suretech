'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Shield, ArrowLeft, Lock, Eye, FileText } from 'lucide-react'
import { fadeInUp, staggerContainer, staggerItem } from '@/lib/animations'

export default function PrivacyPolicyPage() {
  return (
    <div className="relative min-h-screen pt-20">
      <div className="fixed inset-0 ai-grid-bg opacity-20" />

      <section className="relative py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-block mb-4"
            >
              <Shield className="w-12 h-12 text-primary-400 mx-auto" />
            </motion.div>
            <h1 className="text-5xl lg:text-6xl font-bold text-gradient ai-glow font-display mb-4">
              Privacy Policy
            </h1>
            <p className="text-gray-400 text-lg font-tech">
              Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="glass-effect rounded-2xl p-8 lg:p-12 space-y-8"
          >
            <motion.section variants={staggerItem}>
              <h2 className="text-2xl font-bold text-white mb-4 font-display flex items-center">
                <Lock className="w-6 h-6 text-primary-400 mr-2" />
                1. Introduction
              </h2>
              <p className="text-gray-300 leading-relaxed font-tech">
                Suretech Network and Data Solution (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is committed to protecting your privacy. 
                This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website 
                and use our services.
              </p>
            </motion.section>

            <motion.section variants={staggerItem}>
              <h2 className="text-2xl font-bold text-white mb-4 font-display flex items-center">
                <Eye className="w-6 h-6 text-primary-400 mr-2" />
                2. Information We Collect
              </h2>
              <div className="space-y-4 text-gray-300 font-tech">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Personal Information</h3>
                  <p className="leading-relaxed">
                    We may collect personal information that you provide directly to us, including:
                  </p>
                  <ul className="list-disc list-inside mt-2 space-y-1 ml-4">
                    <li>Name and contact information (email, phone number, address)</li>
                    <li>Service preferences and booking information</li>
                    <li>Payment information (processed securely through third-party providers)</li>
                    <li>Communication preferences</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Automatically Collected Information</h3>
                  <p className="leading-relaxed">
                    When you visit our website, we may automatically collect certain information about your device, 
                    including information about your web browser, IP address, time zone, and some of the cookies 
                    that are installed on your device.
                  </p>
                </div>
              </div>
            </motion.section>

            <motion.section variants={staggerItem}>
              <h2 className="text-2xl font-bold text-white mb-4 font-display flex items-center">
                <FileText className="w-6 h-6 text-primary-400 mr-2" />
                3. How We Use Your Information
              </h2>
              <p className="text-gray-300 leading-relaxed font-tech mb-4">
                We use the information we collect to:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-300 ml-4 font-tech">
                <li>Provide, maintain, and improve our services</li>
                <li>Process and manage your bookings and appointments</li>
                <li>Send you service-related communications</li>
                <li>Respond to your inquiries and provide customer support</li>
                <li>Send you marketing communications (with your consent)</li>
                <li>Detect and prevent fraud or abuse</li>
                <li>Comply with legal obligations</li>
              </ul>
            </motion.section>

            <motion.section variants={staggerItem}>
              <h2 className="text-2xl font-bold text-white mb-4 font-display">4. Information Sharing</h2>
              <p className="text-gray-300 leading-relaxed font-tech">
                We do not sell, trade, or rent your personal information to third parties. We may share your information 
                only in the following circumstances:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-300 mt-4 ml-4 font-tech">
                <li>With service providers who assist us in operating our website and conducting our business</li>
                <li>When required by law or to protect our rights</li>
                <li>With your explicit consent</li>
              </ul>
            </motion.section>

            <motion.section variants={staggerItem}>
              <h2 className="text-2xl font-bold text-white mb-4 font-display">5. Data Security</h2>
              <p className="text-gray-300 leading-relaxed font-tech">
                We implement appropriate technical and organizational security measures to protect your personal information. 
                However, no method of transmission over the Internet is 100% secure, and we cannot guarantee absolute security.
              </p>
            </motion.section>

            <motion.section variants={staggerItem}>
              <h2 className="text-2xl font-bold text-white mb-4 font-display">6. Your Rights</h2>
              <p className="text-gray-300 leading-relaxed font-tech mb-4">
                You have the right to:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-300 ml-4 font-tech">
                <li>Access and receive a copy of your personal information</li>
                <li>Request correction of inaccurate information</li>
                <li>Request deletion of your personal information</li>
                <li>Object to processing of your personal information</li>
                <li>Withdraw consent at any time</li>
              </ul>
            </motion.section>

            <motion.section variants={staggerItem}>
              <h2 className="text-2xl font-bold text-white mb-4 font-display">7. Cookies</h2>
              <p className="text-gray-300 leading-relaxed font-tech">
                We use cookies and similar tracking technologies to track activity on our website and store certain information. 
                You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
              </p>
            </motion.section>

            <motion.section variants={staggerItem}>
              <h2 className="text-2xl font-bold text-white mb-4 font-display">8. Changes to This Policy</h2>
              <p className="text-gray-300 leading-relaxed font-tech">
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new 
                Privacy Policy on this page and updating the &quot;Last updated&quot; date.
              </p>
            </motion.section>

            <motion.section variants={staggerItem}>
              <h2 className="text-2xl font-bold text-white mb-4 font-display">9. Contact Us</h2>
              <p className="text-gray-300 leading-relaxed font-tech">
                If you have any questions about this Privacy Policy, please contact us:
              </p>
              <div className="mt-4 space-y-2 text-gray-300 font-tech">
                <p>Email: suretechnetworkanddatasolution@gmail.com</p>
                <p>Phone: 0970 210 1773 / 0956 703 1254</p>
                <p>Address: Tulay Minglanilla, Cebu, Philippines</p>
              </div>
            </motion.section>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-8 text-center"
          >
            <Link
              href="/"
              className="inline-flex items-center space-x-2 text-primary-400 hover:text-primary-300 transition-colors font-semibold"
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

