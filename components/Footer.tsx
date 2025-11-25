'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Facebook, Instagram, Mail, Phone, MapPin, Network } from 'lucide-react'

const footerLinks = {
  company: [
    { name: 'About Us', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Why Choose Us', href: '/why-choose-us' },
    { name: 'Certifications', href: '/certifications' },
  ],
  services: [
    { name: 'Structured Cabling', href: '/services#structured-cabling' },
    { name: 'Network Design', href: '/services#network-design' },
    { name: 'CCTV Installation', href: '/services#cctv' },
    { name: 'Cybersecurity', href: '/services#cybersecurity' },
  ],
  resources: [
    { name: 'Book Appointment', href: '/book' },
    { name: 'Service Packages', href: '/packages' },
    { name: 'Reviews', href: '/reviews' },
    { name: 'Referral Program', href: '/referral' },
    { name: 'Support Center', href: '/support' },
    { name: 'Innovation Hub', href: '/innovation' },
    { name: 'Tech Insights', href: '/insights' },
    { name: 'Contact', href: '/contact' },
  ],
}

export default function Footer() {
  return (
    <footer className="relative bg-dark-900 border-t border-primary-500/20 z-10">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <div className="flex items-center space-x-2">
              <Network className="w-6 h-6 text-primary-400" />
              <div className="flex flex-col">
                <span className="text-lg font-bold text-gradient leading-tight font-display">SURETECH</span>
                <span className="text-xs text-gray-400 leading-tight font-tech">NETWORK & DATA SOLUTION</span>
              </div>
            </div>
            <p className="text-gray-400 text-sm">
              Suretech Network and Data Solution - Trusted provider of comprehensive ICT solutions 
              for seamless connectivity and digital transformation.
            </p>
            <div className="flex space-x-4">
              <motion.a
                href="https://www.facebook.com/SuretechNetworkAndDataSolution"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 bg-dark-800 rounded-lg hover:bg-primary-500/20 hover:text-primary-400 transition-colors cursor-pointer"
              >
                <Facebook className="w-5 h-5" />
              </motion.a>
              <motion.a
                href="https://www.instagram.com/suretechnetworkanddatasolution"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 bg-dark-800 rounded-lg hover:bg-primary-500/20 hover:text-primary-400 transition-colors cursor-pointer"
              >
                <Instagram className="w-5 h-5" />
              </motion.a>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h3 className="text-white font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-primary-400 transition-colors text-sm cursor-pointer hover:underline block w-full"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="text-white font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-primary-400 transition-colors text-sm cursor-pointer hover:underline block w-full"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="space-y-4"
          >
            <h3 className="text-white font-semibold mb-4">Contact</h3>
            <div className="space-y-3">
              <a 
                href="https://maps.google.com/?q=Tulay+Minglanilla+Cebu+Philippines"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start space-x-3 hover:text-primary-400 transition-colors cursor-pointer group w-full"
              >
                <MapPin className="w-5 h-5 text-primary-400 mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform" />
                <span className="text-gray-400 text-sm group-hover:text-primary-400 transition-colors block">
                  Tulay Minglanilla, Cebu, Philippines
                </span>
              </a>
              <a
                href="tel:+639702101773"
                className="flex items-center space-x-3 hover:text-primary-400 transition-colors cursor-pointer group w-full"
              >
                <Phone className="w-5 h-5 text-primary-400 flex-shrink-0 group-hover:scale-110 transition-transform" />
                <span className="text-gray-400 text-sm group-hover:text-primary-400 transition-colors block">
                  0970 210 1773
                </span>
              </a>
              <a
                href="tel:+639567031254"
                className="flex items-center space-x-3 hover:text-primary-400 transition-colors cursor-pointer group w-full"
              >
                <Phone className="w-5 h-5 text-primary-400 flex-shrink-0 group-hover:scale-110 transition-transform" />
                <span className="text-gray-400 text-sm group-hover:text-primary-400 transition-colors block">
                  0956 703 1254
                </span>
              </a>
              <a
                href="mailto:suretechnetworkanddatasolution@gmail.com"
                className="flex items-center space-x-3 hover:text-primary-400 transition-colors cursor-pointer group w-full"
              >
                <Mail className="w-5 h-5 text-primary-400 flex-shrink-0 group-hover:scale-110 transition-transform" />
                <span className="text-gray-400 text-sm break-all group-hover:text-primary-400 transition-colors block">
                  suretechnetworkanddatasolution@gmail.com
                </span>
              </a>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-8 pt-8 border-t border-primary-500/20 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0"
        >
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Suretech Network and Data Solution. All rights reserved.
          </p>
          <div className="flex space-x-6 text-sm">
            <Link 
              href="/privacy" 
              className="text-gray-400 hover:text-primary-400 transition-colors cursor-pointer hover:underline block"
            >
              Privacy Policy
            </Link>
            <Link 
              href="/terms" 
              className="text-gray-400 hover:text-primary-400 transition-colors cursor-pointer hover:underline block"
            >
              Terms of Service
            </Link>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}

