'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { CalendarDays, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

const articles = [
  {
    title: 'Designing AI-Ready Networks for Hybrid Workloads',
    summary: 'Key architecture decisions for organizations that are modernizing data centers and edge locations for AI adoption.',
    category: 'Infrastructure',
    date: 'January 2025',
    cover: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1200',
  },
  {
    title: 'How Zero-Trust Becomes Practical for SMEs',
    summary: 'A simplified roadmap that helps Philippine SMEs roll out zero-trust principles without the enterprise price tag.',
    category: 'Security',
    date: 'December 2024',
    cover: 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=1200',
  },
  {
    title: 'Smart Campuses: Lessons Learned from Multi-Site CCTV Projects',
    summary: 'A field guide to scaling surveillance, storage, and monitoring across multiple facilities.',
    category: 'CCTV & IoT',
    date: 'November 2024',
    cover: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200',
  },
]

export default function InsightsPage() {
  return (
    <div className="relative min-h-screen pt-24 pb-16 px-4">
      <div className="fixed inset-0 ai-grid-bg opacity-15" />

      <div className="container mx-auto max-w-5xl relative space-y-12">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-4"
        >
          <p className="text-primary-300 uppercase tracking-[0.5em] text-xs">Tech Insights</p>
          <h1 className="text-4xl sm:text-5xl font-display font-bold text-white">
            Ideas Shaping <span className="text-gradient">Next-Gen ICT</span>
          </h1>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto">
            Field-tested perspectives from Suretech architects, security analysts, and project managers.
          </p>
        </motion.div>

        <div className="grid gap-8">
          {articles.map((article, index) => (
            <motion.article
              key={article.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="glass-effect rounded-3xl overflow-hidden"
            >
              <div className="relative h-64 sm:h-80">
                <Image
                  src={article.cover}
                  alt={article.title}
                  fill
                  className="object-cover"
                  sizes="100vw"
                  priority={index === 0}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-950/80 via-transparent to-transparent" />
                <div className="absolute top-4 left-4">
                  <span className="bg-primary-500/90 text-white px-4 py-1 rounded-full text-xs font-semibold uppercase tracking-widest">
                    {article.category}
                  </span>
                </div>
              </div>
              <div className="p-6 sm:p-10 space-y-4">
                <div className="flex items-center text-gray-400 text-sm space-x-2">
                  <CalendarDays className="w-4 h-4 text-primary-400" />
                  <span>{article.date}</span>
                </div>
                <h2 className="text-white text-2xl sm:text-3xl font-semibold">{article.title}</h2>
                <p className="text-gray-300">{article.summary}</p>
                <div className="flex items-center justify-between">
                  <Link
                    href="/contact"
                    className="inline-flex items-center space-x-2 text-primary-400 font-semibold hover:text-primary-300"
                  >
                    <span>Discuss this topic</span>
                    <ArrowLeft className="w-4 h-4 rotate-180" />
                  </Link>
                  <p className="text-gray-500 text-sm">Full articles coming soon</p>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </div>
  )
}


