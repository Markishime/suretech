'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { FileText, ArrowLeft, Scale, AlertCircle, CheckCircle } from 'lucide-react'
import { fadeInUp, staggerContainer, staggerItem } from '@/lib/animations'

export default function TermsOfServicePage() {
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
              <Scale className="w-12 h-12 text-primary-400 mx-auto" />
            </motion.div>
            <h1 className="text-5xl lg:text-6xl font-bold text-gradient ai-glow font-display mb-4">
              Terms of Service
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
                <FileText className="w-6 h-6 text-primary-400 mr-2" />
                1. Agreement to Terms
              </h2>
              <p className="text-gray-300 leading-relaxed font-tech">
                By accessing or using the services of Suretech Network and Data Solution (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;), 
                you agree to be bound by these Terms of Service. If you disagree with any part of these terms, 
                you may not access our services.
              </p>
            </motion.section>

            <motion.section variants={staggerItem}>
              <h2 className="text-2xl font-bold text-white mb-4 font-display flex items-center">
                <CheckCircle className="w-6 h-6 text-primary-400 mr-2" />
                2. Services
              </h2>
              <p className="text-gray-300 leading-relaxed font-tech mb-4">
                Suretech Network and Data Solution provides comprehensive ICT solutions including:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-300 ml-4 font-tech">
                <li>CCTV Installation and Configuration</li>
                <li>Structured Cabling Solutions</li>
                <li>Network Design and Implementation</li>
                <li>Server Installation and Configuration</li>
                <li>IT Support and Maintenance</li>
                <li>Cybersecurity Solutions</li>
                <li>Other IT-Related Services</li>
              </ul>
            </motion.section>

            <motion.section variants={staggerItem}>
              <h2 className="text-2xl font-bold text-white mb-4 font-display">3. Booking and Appointments</h2>
              <div className="space-y-4 text-gray-300 font-tech">
                <p className="leading-relaxed">
                  When booking our services, you agree to:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Provide accurate and complete information</li>
                  <li>Book appointments during our working hours (Monday-Friday, 8:00 AM - 6:00 PM)</li>
                  <li>Provide at least 24 hours notice for cancellations</li>
                  <li>Be present or have an authorized representative present during service delivery</li>
                </ul>
              </div>
            </motion.section>

            <motion.section variants={staggerItem}>
              <h2 className="text-2xl font-bold text-white mb-4 font-display">4. Payment Terms</h2>
              <div className="space-y-4 text-gray-300 font-tech">
                <p className="leading-relaxed">
                  Payment terms are as follows:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Payment is due as specified in your service agreement</li>
                  <li>We accept cash, bank transfers, and other agreed-upon payment methods</li>
                  <li>Optional tips or compensation are appreciated but not required</li>
                  <li>Late payments may incur additional fees</li>
                </ul>
              </div>
            </motion.section>

            <motion.section variants={staggerItem}>
              <h2 className="text-2xl font-bold text-white mb-4 font-display flex items-center">
                <AlertCircle className="w-6 h-6 text-primary-400 mr-2" />
                5. Limitation of Liability
              </h2>
              <p className="text-gray-300 leading-relaxed font-tech">
                To the maximum extent permitted by law, Suretech Network and Data Solution shall not be liable for any indirect, 
                incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred 
                directly or indirectly, or any loss of data, use, goodwill, or other intangible losses.
              </p>
            </motion.section>

            <motion.section variants={staggerItem}>
              <h2 className="text-2xl font-bold text-white mb-4 font-display">6. Warranty</h2>
              <p className="text-gray-300 leading-relaxed font-tech">
                We provide warranties on our services as specified in individual service agreements. All warranties are subject 
                to proper use and maintenance of installed systems. Warranty periods vary by service type and are detailed in 
                your service contract.
              </p>
            </motion.section>

            <motion.section variants={staggerItem}>
              <h2 className="text-2xl font-bold text-white mb-4 font-display">7. Intellectual Property</h2>
              <p className="text-gray-300 leading-relaxed font-tech">
                All content on this website, including text, graphics, logos, and software, is the property of Suretech Network 
                and Data Solution and is protected by copyright and other intellectual property laws.
              </p>
            </motion.section>

            <motion.section variants={staggerItem}>
              <h2 className="text-2xl font-bold text-white mb-4 font-display">8. Prohibited Uses</h2>
              <p className="text-gray-300 leading-relaxed font-tech mb-4">
                You may not use our services:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-300 ml-4 font-tech">
                <li>For any unlawful purpose</li>
                <li>To violate any local, state, national, or international law</li>
                <li>To transmit any malicious code or viruses</li>
                <li>To interfere with or disrupt our services</li>
                <li>To impersonate any person or entity</li>
              </ul>
            </motion.section>

            <motion.section variants={staggerItem}>
              <h2 className="text-2xl font-bold text-white mb-4 font-display">9. Cancellation and Refunds</h2>
              <div className="space-y-4 text-gray-300 font-tech">
                <p className="leading-relaxed">
                  Cancellation and refund policies:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Cancellations must be made at least 24 hours before scheduled service</li>
                  <li>Refunds are processed according to the terms of your service agreement</li>
                  <li>No refunds for completed services unless otherwise specified</li>
                  <li>Refund processing may take 5-10 business days</li>
                </ul>
              </div>
            </motion.section>

            <motion.section variants={staggerItem}>
              <h2 className="text-2xl font-bold text-white mb-4 font-display">10. Governing Law</h2>
              <p className="text-gray-300 leading-relaxed font-tech">
                These Terms of Service shall be governed by and construed in accordance with the laws of the Philippines, 
                without regard to its conflict of law provisions.
              </p>
            </motion.section>

            <motion.section variants={staggerItem}>
              <h2 className="text-2xl font-bold text-white mb-4 font-display">11. Changes to Terms</h2>
              <p className="text-gray-300 leading-relaxed font-tech">
                We reserve the right to modify these terms at any time. We will notify users of any material changes by 
                posting the new Terms of Service on this page and updating the &quot;Last updated&quot; date.
              </p>
            </motion.section>

            <motion.section variants={staggerItem}>
              <h2 className="text-2xl font-bold text-white mb-4 font-display">12. Contact Information</h2>
              <p className="text-gray-300 leading-relaxed font-tech mb-4">
                If you have any questions about these Terms of Service, please contact us:
              </p>
              <div className="space-y-2 text-gray-300 font-tech">
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

