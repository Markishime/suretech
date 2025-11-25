import type { Metadata } from 'next'
import { Inter, Orbitron, Rajdhani } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ChatbotWidget from '@/components/ChatbotWidget'
import { Toaster } from 'react-hot-toast'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const orbitron = Orbitron({ 
  subsets: ['latin'], 
  variable: '--font-orbitron',
  weight: ['400', '500', '600', '700', '800', '900'],
})
const rajdhani = Rajdhani({ 
  subsets: ['latin'], 
  variable: '--font-rajdhani',
  weight: ['300', '400', '500', '600', '700'],
})

export const metadata: Metadata = {
  title: 'SURETECH NETWORK AND DATA SOLUTION | ICT Solutions Cebu',
  description: 'Trusted provider of comprehensive ICT solutions, specializing in design, implementation, and maintenance of reliable and secure network infrastructures in Cebu, Philippines.',
  keywords: 'ICT solutions Cebu, network installation Philippines, cybersecurity services Minglanilla, structured cabling, CCTV installation',
  openGraph: {
    title: 'SURETECH NETWORK AND DATA SOLUTION',
    description: 'Comprehensive ICT solutions for seamless connectivity and digital transformation',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${orbitron.variable} ${rajdhani.variable}`}>
      <body className="font-sans">
        <Header />
        <main className="min-h-screen relative z-0">
          {children}
        </main>
        <Footer />
        <ChatbotWidget />
        <Toaster 
          position="bottom-right"
          toastOptions={{
            style: {
              background: '#0f172a',
              color: '#f1f5f9',
              border: '1px solid rgba(20, 184, 166, 0.3)',
            },
          }}
        />
      </body>
    </html>
  )
}

