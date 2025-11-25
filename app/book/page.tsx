'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { Calendar, Clock, MapPin, Wrench, DollarSign, CheckCircle, Sparkles } from 'lucide-react'
import toast from 'react-hot-toast'
import { generateTimeSlots, validateBookingDateTime, formatBookingDate, type BookingData } from '@/lib/booking'
import { fadeInUp, fadeInLeft, fadeInRight, scaleIn, staggerContainer, staggerItem, hoverScale, hoverLift } from '@/lib/animations'

const services = [
  { id: 'cctv-installation', name: 'CCTV Installation', icon: '📹' },
  { id: 'structured-cabling', name: 'Structured Cabling', icon: '🔌' },
  { id: 'network-setup', name: 'Network Setup', icon: '🌐' },
  { id: 'server-installation', name: 'Server Installation', icon: '🖥️' },
  { id: 'it-support', name: 'IT Support & Maintenance', icon: '🔧' },
  { id: 'cybersecurity', name: 'Cybersecurity Setup', icon: '🔒' },
  { id: 'other', name: 'Other IT Services', icon: '⚙️' },
]

interface BookingFormData {
  name: string
  email: string
  phone: string
  service: string
  date: string
  time: string
  location: string
  address: string
  message: string
  tip: number
}

export default function BookPage() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [availableSlots, setAvailableSlots] = useState<{ time: string; available: boolean }[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [bookedSlots, setBookedSlots] = useState<string[]>([])
  
  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<BookingFormData>({
    defaultValues: {
      tip: 0,
      service: 'cctv-installation',
    },
  })

  const selectedService = watch('service')
  const selectedTime = watch('time')
  const selectedDateValue = watch('date')

  // Fetch booked slots for selected date
  useEffect(() => {
    const fetchBookedSlots = async () => {
      if (!selectedDateValue) return
      
      try {
        const q = query(
          collection(db, 'bookings'),
          where('date', '==', selectedDateValue),
          where('status', 'in', ['pending', 'confirmed'])
        )
        const snapshot = await getDocs(q)
        const booked = snapshot.docs.map(doc => doc.data().time)
        setBookedSlots(booked)
      } catch (error) {
        console.error('Error fetching booked slots:', error)
      }
    }

    fetchBookedSlots()
  }, [selectedDateValue])

  // Generate time slots when date changes
  useEffect(() => {
    if (selectedDate) {
      const slots = generateTimeSlots(selectedDate, bookedSlots)
      setAvailableSlots(slots)
    }
  }, [selectedDate, bookedSlots])

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const date = new Date(e.target.value)
    setSelectedDate(date)
    setValue('date', e.target.value)
  }

  const onSubmit = async (data: BookingFormData) => {
    setIsSubmitting(true)
    
    try {
      const bookingDate = new Date(data.date)
      const validation = validateBookingDateTime(bookingDate, data.time)
      
      if (!validation.valid) {
        toast.error(validation.error || 'Invalid booking time')
        return
      }

      const bookingData: BookingData = {
        ...data,
        status: 'pending',
        timestamp: new Date(),
      }

      await addDoc(collection(db, 'bookings'), bookingData)
      
      toast.success('Booking request submitted successfully! We will confirm your appointment soon.')
      
      // Reset form
      setSelectedDate(new Date())
      setValue('date', '')
      setValue('time', '')
      setValue('name', '')
      setValue('email', '')
      setValue('phone', '')
      setValue('address', '')
      setValue('message', '')
      setValue('tip', 0)
    } catch (error) {
      console.error('Error submitting booking:', error)
      toast.error('Failed to submit booking. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const minDate = new Date().toISOString().split('T')[0]
  const maxDate = new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] // 90 days ahead

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
              Book a Service
            </h1>
            <p className="text-xl text-gray-300">
              Schedule your appointment online - Available Monday to Friday, 8 AM to 6 PM
            </p>
          </motion.div>
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="mt-10 grid sm:grid-cols-3 gap-4"
          >
            {[
              { label: 'Service Window', value: '8 AM – 6 PM', detail: 'Philippines Time' },
              { label: 'Confirmation', value: '< 24 hrs', detail: 'Email & phone updates' },
              { label: 'Emergency Line', value: '0970 210 1773', detail: 'Immediate support' },
            ].map((item) => (
              <motion.div
                key={item.label}
                variants={staggerItem}
                className="glass-effect rounded-2xl p-4 text-center border border-primary-500/10"
              >
                <p className="text-xs text-primary-300 uppercase tracking-[0.4em]">{item.label}</p>
                <p className="text-white text-2xl font-semibold mt-2">{item.value}</p>
                <p className="text-gray-400 text-sm">{item.detail}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Booking Form */}
      <section className="relative py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="glass-effect rounded-2xl p-8 lg:p-10"
            style={{ willChange: 'transform, opacity' }}
          >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              {/* Service Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-4">
                  <Wrench className="w-5 h-5 inline mr-2 text-primary-400" />
                  Select Service *
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {services.map((service) => (
                    <label
                      key={service.id}
                      className={`relative cursor-pointer rounded-lg p-4 border-2 transition-all ${
                        selectedService === service.id
                          ? 'border-primary-500 bg-primary-500/20'
                          : 'border-primary-500/20 bg-dark-800 hover:border-primary-500/50'
                      }`}
                    >
                      <input
                        {...register('service', { required: 'Please select a service' })}
                        type="radio"
                        value={service.id}
                        className="sr-only"
                      />
                      <div className="text-center">
                        <div className="text-3xl mb-2">{service.icon}</div>
                        <div className="text-sm font-medium text-white">{service.name}</div>
                      </div>
                    </label>
                  ))}
                </div>
                {errors.service && (
                  <p className="mt-2 text-sm text-red-400">{errors.service.message}</p>
                )}
              </div>

              {/* Personal Information */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                    Full Name *
                  </label>
                  <input
                    {...register('name', { required: 'Name is required' })}
                    type="text"
                    id="name"
                    className="w-full bg-dark-800 border border-primary-500/20 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-primary-500 transition-colors"
                    placeholder="Ethan Cruz"
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-400">{errors.name.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                    Email *
                  </label>
                  <input
                    {...register('email', {
                      required: 'Email is required',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Invalid email address',
                      },
                    })}
                    type="email"
                    id="email"
                    className="w-full bg-dark-800 border border-primary-500/20 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-primary-500 transition-colors"
                    placeholder="ethan.cruz@suretechnetwork.com"
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-400">{errors.email.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">
                    Phone Number *
                  </label>
                  <input
                    {...register('phone', { required: 'Phone number is required' })}
                    type="tel"
                    id="phone"
                    className="w-full bg-dark-800 border border-primary-500/20 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-primary-500 transition-colors"
                    placeholder="0970 210 1773"
                  />
                  {errors.phone && (
                    <p className="mt-1 text-sm text-red-400">{errors.phone.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="location" className="block text-sm font-medium text-gray-300 mb-2">
                    <MapPin className="w-4 h-4 inline mr-1 text-primary-400" />
                    Location Type *
                  </label>
                  <select
                    {...register('location', { required: 'Please select location type' })}
                    id="location"
                    className="w-full bg-dark-800 border border-primary-500/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary-500 transition-colors"
                  >
                    <option value="">Select location type</option>
                    <option value="home">Home/Residential</option>
                    <option value="office">Office/Business</option>
                    <option value="building">Building/Commercial</option>
                    <option value="other">Other</option>
                  </select>
                  {errors.location && (
                    <p className="mt-1 text-sm text-red-400">{errors.location.message}</p>
                  )}
                </div>
              </div>

              {/* Address */}
              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-300 mb-2">
                  Full Address *
                </label>
                <textarea
                  {...register('address', { required: 'Address is required' })}
                  id="address"
                  rows={3}
                  className="w-full bg-dark-800 border border-primary-500/20 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-primary-500 transition-colors resize-none"
                  placeholder="Street address, City, Province"
                />
                {errors.address && (
                  <p className="mt-1 text-sm text-red-400">{errors.address.message}</p>
                )}
              </div>

              {/* Date and Time */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="date" className="block text-sm font-medium text-gray-300 mb-2">
                    <Calendar className="w-4 h-4 inline mr-1 text-primary-400" />
                    Preferred Date *
                  </label>
                  <input
                    {...register('date', { required: 'Date is required' })}
                    type="date"
                    id="date"
                    min={minDate}
                    max={maxDate}
                    onChange={handleDateChange}
                    className="w-full bg-dark-800 border border-primary-500/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary-500 transition-colors"
                  />
                  {errors.date && (
                    <p className="mt-1 text-sm text-red-400">{errors.date.message}</p>
                  )}
                  {selectedDate && (
                    <p className="mt-2 text-sm text-gray-400">
                      {formatBookingDate(selectedDate)}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="time" className="block text-sm font-medium text-gray-300 mb-2">
                    <Clock className="w-4 h-4 inline mr-1 text-primary-400" />
                    Preferred Time *
                  </label>
                  <select
                    {...register('time', { required: 'Time is required' })}
                    id="time"
                    className="w-full bg-dark-800 border border-primary-500/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary-500 transition-colors"
                  >
                    <option value="">Select time</option>
                    {availableSlots.map((slot) => (
                      <option
                        key={slot.time}
                        value={slot.time}
                        disabled={!slot.available}
                      >
                        {slot.time} {!slot.available && '(Booked)'}
                      </option>
                    ))}
                  </select>
                  {errors.time && (
                    <p className="mt-1 text-sm text-red-400">{errors.time.message}</p>
                  )}
                  {availableSlots.length === 0 && selectedDateValue && (
                    <p className="mt-2 text-sm text-yellow-400">
                      No available slots for this date. Please select another date.
                    </p>
                  )}
                </div>
              </div>

              {/* Additional Message */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                  Additional Details (Optional)
                </label>
                <textarea
                  {...register('message')}
                  id="message"
                  rows={4}
                  className="w-full bg-dark-800 border border-primary-500/20 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-primary-500 transition-colors resize-none"
                  placeholder="Any specific requirements or details about your service..."
                />
              </div>

              {/* Tip/Compensation */}
              <div>
                <label htmlFor="tip" className="block text-sm font-medium text-gray-300 mb-2">
                  <DollarSign className="w-4 h-4 inline mr-1 text-primary-400" />
                  Tip/Compensation (Optional)
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">₱</span>
                  <input
                    {...register('tip', {
                      min: { value: 0, message: 'Tip cannot be negative' },
                      valueAsNumber: true,
                    })}
                    type="number"
                    id="tip"
                    min="0"
                    step="100"
                    className="w-full bg-dark-800 border border-primary-500/20 rounded-lg pl-8 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-primary-500 transition-colors"
                    placeholder="0"
                  />
                </div>
                <p className="mt-2 text-sm text-gray-400">
                  Optional: Show appreciation for our service with a tip
                </p>
                {errors.tip && (
                  <p className="mt-1 text-sm text-red-400">{errors.tip.message}</p>
                )}
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center space-x-2 px-8 py-4 bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg text-white font-semibold hover:shadow-lg hover:shadow-primary-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <CheckCircle className="w-5 h-5" />
                  <span>{isSubmitting ? 'Submitting...' : 'Book Appointment'}</span>
                </button>
              </div>

              {/* Info Box */}
              <div className="bg-primary-500/10 border border-primary-500/20 rounded-lg p-4">
                <p className="text-sm text-gray-300">
                  <strong className="text-primary-400">Note:</strong> Bookings are only available during working hours 
                  (Monday-Friday, 8 AM - 6 PM). We will confirm your appointment within 24 hours via email or phone.
                </p>
              </div>
            </form>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

