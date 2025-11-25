'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { collection, addDoc, query, orderBy, limit, getDocs } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { Star, Sparkles, Send } from 'lucide-react'
import toast from 'react-hot-toast'

interface Review {
  id: string
  name: string
  rating: number
  comment: string
  service: string
  timestamp: Date
  verified?: boolean
}

interface ReviewFormData {
  name: string
  email: string
  rating: number
  service: string
  comment: string
}

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectedRating, setSelectedRating] = useState(0)
  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm<ReviewFormData>()

  useEffect(() => {
    fetchReviews()
  }, [])

  const fetchReviews = async () => {
    try {
      const q = query(collection(db, 'reviews'), orderBy('timestamp', 'desc'), limit(50))
      const snapshot = await getDocs(q)
      const reviewsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        timestamp: doc.data().timestamp?.toDate() || new Date(),
      })) as Review[]
      setReviews(reviewsData)
    } catch (error) {
      console.error('Error fetching reviews:', error)
    }
  }

  const onSubmit = async (data: ReviewFormData) => {
    if (selectedRating === 0) {
      toast.error('Please select a rating')
      return
    }

    setIsSubmitting(true)
    try {
      await addDoc(collection(db, 'reviews'), {
        ...data,
        rating: selectedRating,
        timestamp: new Date(),
        verified: false,
      })
      
      toast.success('Thank you for your review! It will be published after verification.')
      reset()
      setSelectedRating(0)
      fetchReviews()
    } catch (error) {
      console.error('Error submitting review:', error)
      toast.error('Failed to submit review. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const averageRating = reviews.length > 0
    ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
    : 0

  return (
    <div className="relative min-h-screen pt-20">
      <div className="fixed inset-0 ai-grid-bg opacity-20" />

      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto text-center space-y-6"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-block"
            >
              <Sparkles className="w-12 h-12 text-primary-400 mx-auto mb-4" />
            </motion.div>
            <h1 className="text-5xl lg:text-6xl font-bold text-gradient ai-glow">
              Customer Reviews
            </h1>
            <div className="flex items-center justify-center space-x-4">
              <div className="flex items-center space-x-2">
                <Star className="w-8 h-8 text-yellow-400 fill-yellow-400" />
                <span className="text-3xl font-bold text-white">{averageRating.toFixed(1)}</span>
              </div>
              <span className="text-gray-400">({reviews.length} reviews)</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Reviews Grid */}
      <section className="relative py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {reviews.map((review, index) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="glass-effect rounded-xl p-6 space-y-4"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-white font-semibold">{review.name}</h3>
                    <p className="text-sm text-gray-400">{review.service}</p>
                  </div>
                  {review.verified && (
                    <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded">
                      Verified
                    </span>
                  )}
                </div>
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < review.rating
                          ? 'text-yellow-400 fill-yellow-400'
                          : 'text-gray-600'
                      }`}
                    />
                  ))}
                </div>
                <p className="text-gray-300">{review.comment}</p>
                <p className="text-xs text-gray-500">
                  {review.timestamp.toLocaleDateString()}
                </p>
              </motion.div>
            ))}
          </div>

          {reviews.length === 0 && (
            <div className="text-center py-12 glass-effect rounded-xl">
              <p className="text-gray-400">No reviews yet. Be the first to review!</p>
            </div>
          )}
        </div>
      </section>

      {/* Review Form */}
      <section className="relative py-20 px-4 bg-dark-900/50">
        <div className="container mx-auto max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-effect rounded-2xl p-8"
          >
            <h2 className="text-3xl font-bold text-white mb-6">Write a Review</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Your Name *
                  </label>
                  <input
                    {...register('name', { required: 'Name is required' })}
                    type="text"
                    className="w-full bg-dark-800 border border-primary-500/20 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-primary-500 transition-colors"
                    placeholder="Ethan Cruz"
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-400">{errors.name.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Email *
                  </label>
                  <input
                    {...register('email', {
                      required: 'Email is required',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Invalid email',
                      },
                    })}
                    type="email"
                    className="w-full bg-dark-800 border border-primary-500/20 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-primary-500 transition-colors"
                    placeholder="ethan.cruz@suretechnetwork.com"
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-400">{errors.email.message}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Service *
                </label>
                <select
                  {...register('service', { required: 'Service is required' })}
                  className="w-full bg-dark-800 border border-primary-500/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary-500 transition-colors"
                >
                  <option value="">Select service</option>
                  <option value="CCTV Installation">CCTV Installation</option>
                  <option value="Network Setup">Network Setup</option>
                  <option value="Structured Cabling">Structured Cabling</option>
                  <option value="IT Support">IT Support</option>
                  <option value="Other">Other</option>
                </select>
                {errors.service && (
                  <p className="mt-1 text-sm text-red-400">{errors.service.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Rating *
                </label>
                <div className="flex items-center space-x-2">
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <button
                      key={rating}
                      type="button"
                      onClick={() => {
                        setSelectedRating(rating)
                        setValue('rating', rating)
                      }}
                      className="focus:outline-none"
                    >
                      <Star
                        className={`w-8 h-8 transition-all ${
                          rating <= selectedRating
                            ? 'text-yellow-400 fill-yellow-400'
                            : 'text-gray-600 hover:text-yellow-400'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Your Review *
                </label>
                <textarea
                  {...register('comment', { required: 'Review comment is required' })}
                  rows={4}
                  className="w-full bg-dark-800 border border-primary-500/20 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-primary-500 transition-colors resize-none"
                  placeholder="Share your experience..."
                />
                {errors.comment && (
                  <p className="mt-1 text-sm text-red-400">{errors.comment.message}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center space-x-2 px-8 py-4 bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg text-white font-semibold hover:shadow-lg hover:shadow-primary-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-5 h-5" />
                <span>{isSubmitting ? 'Submitting...' : 'Submit Review'}</span>
              </button>
            </form>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

