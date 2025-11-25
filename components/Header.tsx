'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Search, ChevronDown, Sparkles, Network } from 'lucide-react'
import SearchModal from './SearchModal'

const navItems = [
  { name: 'Home', href: '/' },
  { 
    name: 'Pages', 
    href: '#',
    submenu: [
      { name: 'About Us', href: '/about' },
      { name: 'Why Choose Us', href: '/why-choose-us' },
      { name: 'Clients', href: '/clients' },
      { name: 'Certifications', href: '/certifications' },
    ]
  },
  { name: 'Services', href: '/services' },
  { name: 'Support', href: '/support' },
  { name: 'Innovation Hub', href: '/innovation' },
  { name: 'Tech Insights', href: '/insights' },
]

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'glass-effect shadow-lg' : 'bg-transparent'
      }`}
    >
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <Network className="w-8 h-8 text-primary-400" />
              <motion.div
                className="absolute inset-0 bg-primary-400/20 rounded-full blur-xl"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.div>
            <div className="flex flex-col">
              <span className="text-lg font-bold text-gradient ai-glow leading-tight font-display">
                SURETECH
              </span>
              <span className="text-xs text-gray-400 leading-tight font-tech">
                NETWORK & DATA SOLUTION
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6">
            {navItems.map((item) => (
              <div key={item.name} className="relative group">
                <Link
                  href={item.href}
                  className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-colors ${
                    pathname === item.href
                      ? 'text-primary-400'
                      : 'text-gray-300 hover:text-primary-400'
                  }`}
                  onMouseEnter={() => item.submenu && setActiveSubmenu(item.name)}
                  onMouseLeave={() => setActiveSubmenu(null)}
                >
                  <span>{item.name}</span>
                  {item.submenu && <ChevronDown className="w-4 h-4" />}
                </Link>

                {/* Submenu */}
                <AnimatePresence>
                  {item.submenu && activeSubmenu === item.name && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute top-full left-0 mt-2 w-48 glass-effect rounded-lg p-2 shadow-xl"
                      onMouseEnter={() => setActiveSubmenu(item.name)}
                      onMouseLeave={() => setActiveSubmenu(null)}
                    >
                      {item.submenu.map((subItem) => (
                        <Link
                          key={subItem.name}
                          href={subItem.href}
                          className="block px-4 py-2 rounded-md text-gray-300 hover:text-primary-400 hover:bg-primary-500/10 transition-colors"
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* Right Icons */}
          <div className="hidden lg:flex items-center space-x-4">
            <button 
              className="p-2 text-gray-300 hover:text-primary-400 transition-colors rounded-lg hover:bg-primary-500/10"
              aria-label="Search"
              onClick={() => setIsSearchOpen(true)}
            >
              <Search className="w-5 h-5" />
            </button>
            <Link
              href="/book"
              className="px-4 py-2 text-gray-300 hover:text-primary-400 transition-colors rounded-lg hover:bg-primary-500/10 font-medium"
            >
              Book Now
            </Link>
            <Link
              href="/contact"
              className="px-6 py-2 bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg text-white font-semibold hover:shadow-lg hover:shadow-primary-500/50 transition-all flex items-center space-x-2"
            >
              <span>Contact Us</span>
              <ChevronDown className="w-4 h-4 rotate-[-90deg]" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-gray-300 hover:text-primary-400 transition-colors"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden mt-4 glass-effect rounded-lg p-4 space-y-2"
            >
              {navItems.map((item) => (
                <div key={item.name}>
                  <Link
                    href={item.href}
                    className={`block px-4 py-2 rounded-lg ${
                      pathname === item.href
                        ? 'text-primary-400 bg-primary-500/10'
                        : 'text-gray-300 hover:text-primary-400 hover:bg-primary-500/10'
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                  {item.submenu && (
                    <div className="ml-4 mt-2 space-y-1">
                      {item.submenu.map((subItem) => (
                        <Link
                          key={subItem.name}
                          href={subItem.href}
                          className="block px-4 py-2 rounded-lg text-gray-400 hover:text-primary-400"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
      <SearchModal open={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </motion.header>
  )
}

