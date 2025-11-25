'use client'

import { useEffect, useState, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Loader2, Search, X } from 'lucide-react'
import Link from 'next/link'

type SearchResult = {
  title: string
  href: string
  description: string
  tags: string[]
}

type Props = {
  open: boolean
  onClose: () => void
}

export default function SearchModal({ open, onClose }: Props) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement | null>(null)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const abortRef = useRef<AbortController | null>(null)

  useEffect(() => {
    if (!open) {
      setQuery('')
      setResults([])
      setError(null)
      abortRef.current?.abort()
      return
    }

    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    window.addEventListener('keydown', handleKey)
    inputRef.current?.focus()

    fetchResults('')

    return () => {
      window.removeEventListener('keydown', handleKey)
    }
  }, [open, onClose])

  useEffect(() => {
    if (!open) return

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    timeoutRef.current = setTimeout(() => {
      fetchResults(query)
    }, 200)

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [query, open])

  const fetchResults = async (value: string) => {
    abortRef.current?.abort()
    const controller = new AbortController()
    abortRef.current = controller

    setLoading(true)
    setError(null)

    try {
      const params = new URLSearchParams()
      if (value.trim()) {
        params.set('q', value)
      }

      const response = await fetch(`/api/search?${params.toString()}`, {
        signal: controller.signal,
      })

      if (!response.ok) {
        throw new Error('Failed to fetch results')
      }

      const data = await response.json()
      setResults(data.results || [])
    } catch (err: any) {
      if (err.name === 'AbortError') return
      setError(err.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[999] bg-dark-950/80 backdrop-blur-md flex items-start justify-center px-4 pt-28"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.2 }}
            className="w-full max-w-3xl glass-effect rounded-3xl overflow-hidden border border-primary-500/20 shadow-2xl"
          >
            <div className="flex items-center px-6 py-4 border-b border-primary-500/10 bg-dark-900/80">
              <Search className="w-5 h-5 text-primary-400 mr-3" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search services, pages, or resources..."
                className="flex-1 bg-transparent text-white placeholder-gray-500 focus:outline-none"
              />
              <button
                onClick={onClose}
                className="p-2 rounded-full text-gray-400 hover:text-primary-400 transition-colors"
                aria-label="Close search"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="max-h-[60vh] overflow-y-auto divide-y divide-primary-500/10">
              {loading && (
                <div className="flex items-center space-x-3 px-6 py-6 text-gray-400">
                  <Loader2 className="w-4 h-4 animate-spin text-primary-400" />
                  <span>Searching...</span>
                </div>
              )}

              {!loading && error && (
                <div className="px-6 py-6 text-red-400 text-sm">
                  {error}
                </div>
              )}

              {!loading && !error && results.length === 0 && (
                <div className="px-6 py-6 text-gray-400 text-sm">
                  No results found. Try another keyword.
                </div>
              )}

              {!loading &&
                !error &&
                results.map((result) => (
                  <Link
                    key={result.href}
                    href={result.href}
                    onClick={onClose}
                    className="flex flex-col px-6 py-4 hover:bg-primary-500/5 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <p className="text-white font-semibold">{result.title}</p>
                      <span className="text-xs text-primary-300">View</span>
                    </div>
                    <p className="text-gray-400 text-sm mt-1">
                      {result.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mt-3">
                      {result.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs text-gray-400 bg-dark-800 rounded-full px-2 py-0.5 border border-primary-500/10"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </Link>
                ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}


