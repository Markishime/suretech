'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { Calendar, Clock, MapPin, Wrench, DollarSign, CheckCircle, Sparkles, ArrowRight, ArrowLeft, Phone, Shield, Zap, Users } from 'lucide-react'
import toast from 'react-hot-toast'
import { generateTimeSlots, validateBookingDateTime, formatBookingDate, type BookingData, isWithinServiceArea, SERVICE_AREA_LABEL } from '@/lib/booking'
import { staggerContainer, staggerItem } from '@/lib/animations'

const services = [
  { id: 'cctv-installation', name: 'CCTV Installation', icon: '📹', color: 'from-red-500 to-orange-500' },
  { id: 'structured-cabling', name: 'Structured Cabling', icon: '🔌', color: 'from-cyan-500 to-blue-500' },
  { id: 'network-setup', name: 'Network Setup', icon: '🌐', color: 'from-purple-500 to-pink-500' },
  { id: 'server-installation', name: 'Server Installation', icon: '🖥️', color: 'from-green-500 to-emerald-500' },
  { id: 'it-support', name: 'IT Support & Maintenance', icon: '🔧', color: 'from-amber-500 to-yellow-500' },
  { id: 'cybersecurity', name: 'Cybersecurity Setup', icon: '🔒', color: 'from-blue-500 to-indigo-500' },
  { id: 'other', name: 'Other IT Services', icon: '⚙️', color: 'from-gray-500 to-slate-500' },
]

const steps = [
  { id: 1, name: 'Service', icon: Wrench },
  { id: 2, name: 'Details', icon: Users },
  { id: 3, name: 'Schedule', icon: Calendar },
  { id: 4, name: 'Confirm', icon: CheckCircle },
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
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [availableSlots, setAvailableSlots] = useState<{ time: string; available: boolean }[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [bookedSlots, setBookedSlots] = useState<string[]>([])
  const [isSuccess, setIsSuccess] = useState(false)
  
  const { register, handleSubmit, watch, setValue, formState: { errors }, trigger } = useForm<BookingFormData>({
    defaultValues: {
      tip: 0,
      service: '',
    },
  })

  const selectedService = watch('service')
  const selectedTime = watch('time')
  const selectedDateValue = watch('date')
  const formData = watch()

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

  const nextStep = async () => {
    let fieldsToValidate: (keyof BookingFormData)[] = []
    
    if (currentStep === 1) fieldsToValidate = ['service']
    if (currentStep === 2) fieldsToValidate = ['name', 'email', 'phone', 'location', 'address']
    if (currentStep === 3) fieldsToValidate = ['date', 'time']
    
    const isValid = await trigger(fieldsToValidate)
    if (isValid) {
      if (currentStep === 2 && !isWithinServiceArea(formData.address)) {
        toast.error(`We currently serve ${SERVICE_AREA_LABEL} only.`)
        return
      }
      setCurrentStep(prev => Math.min(prev + 1, 4))
    }
  }

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1))
  }

  const onSubmit = async (data: BookingFormData) => {
    setIsSubmitting(true)
    
    try {
      if (!isWithinServiceArea(data.address)) {
        toast.error(`We currently serve ${SERVICE_AREA_LABEL} only.`)
        return
      }

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
      
      setIsSuccess(true)
      toast.success('Booking submitted successfully!')
    } catch (error) {
      console.error('Error submitting booking:', error)
      toast.error('Failed to submit booking. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const minDate = new Date().toISOString().split('T')[0]
  const maxDate = new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]

  const getServiceName = (id: string) => services.find(s => s.id === id)?.name || id
  const getServiceIcon = (id: string) => services.find(s => s.id === id)?.icon || '🔧'

  if (isSuccess) {
    return (
      <div className="relative min-h-screen pt-20">
        <div className="fixed inset-0 ai-grid-bg opacity-20" />
        <div className="fixed inset-0 bg-gradient-to-b from-dark-950 via-dark-900/50 to-dark-950" />
        
        <section className="relative py-24 px-4 z-10">
          <div className="container mx-auto max-w-2xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass-card rounded-3xl p-12 text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring' }}
                className="w-24 h-24 mx-auto rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center mb-6"
              >
                <CheckCircle className="w-12 h-12 text-white" />
              </motion.div>
              
              <h2 className="text-3xl font-bold text-white mb-4">Booking Confirmed!</h2>
              <p className="text-gray-300 mb-8">
                Your booking request has been submitted successfully. We will confirm your appointment within 24 hours.
              </p>
              
              <div className="glass-effect rounded-2xl p-6 mb-8 text-left">
                <h3 className="text-white font-semibold mb-4">Booking Details</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Service</span>
                    <span className="text-white">{getServiceName(formData.service)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Date</span>
                    <span className="text-white">{formData.date}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Time</span>
                    <span className="text-white">{formData.time}</span>
                  </div>
                </div>
              </div>
              
              <motion.a
                href="/"
                whileHover={{ scale: 1.05 }}
                className="inline-block px-8 py-4 bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl text-white font-semibold"
              >
                Return Home
              </motion.a>
            </motion.div>
          </div>
        </section>
      </div>
    )
  }

  return (
    <div className="relative min-h-screen pt-20 overflow-x-hidden">
      {/* Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 ai-grid-bg opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-b from-dark-950 via-dark-900/50 to-dark-950" />
        <motion.div
          className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 10, repeat: Infinity }}
        />
      </div>

      {/* Hero Section */}
      <section className="relative py-16 px-4 z-10">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto text-center space-y-6"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center space-x-2 glass-effect rounded-full px-4 py-2"
            >
              <Sparkles className="w-4 h-4 text-primary-400" />
              <span className="text-primary-400 font-semibold text-sm">BOOK AN APPOINTMENT</span>
            </motion.div>
            
            <h1 className="text-4xl lg:text-6xl font-bold text-gradient ai-glow">
              Schedule Your Service
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Book your appointment online - Available Monday to Friday, 8 AM to 6 PM
            </p>
            <p className="text-sm text-primary-300 uppercase tracking-[0.3em]">
              {SERVICE_AREA_LABEL} Only
            </p>
          </motion.div>

          {/* Quick Info Cards */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="grid sm:grid-cols-3 gap-4 max-w-3xl mx-auto mt-12"
          >
            {[
              { icon: Clock, label: 'Service Window', value: '8 AM – 6 PM' },
              { icon: Zap, label: 'Confirmation', value: '< 24 hours' },
              { icon: Phone, label: 'Emergency', value: '0970 210 1773' },
            ].map((item, index) => {
              const Icon = item.icon
              return (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="glass-card rounded-2xl p-5 text-center"
                >
                  <Icon className="w-6 h-6 text-primary-400 mx-auto mb-2" />
                  <p className="text-xs text-gray-400 uppercase tracking-wider">{item.label}</p>
                  <p className="text-white font-bold mt-1">{item.value}</p>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* Progress Steps */}
      <section className="relative py-8 px-4 z-10">
        <div className="container mx-auto max-w-4xl">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => {
              const Icon = step.icon
              const isActive = currentStep === step.id
              const isCompleted = currentStep > step.id
              
              return (
                <div key={step.id} className="flex items-center">
                  <motion.div
                    className={`flex flex-col items-center ${isActive || isCompleted ? 'opacity-100' : 'opacity-40'}`}
                    animate={{ scale: isActive ? 1.1 : 1 }}
                  >
                    <motion.div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center mb-2 ${
                        isCompleted 
                          ? 'bg-gradient-to-r from-green-500 to-emerald-500' 
                          : isActive 
                            ? 'bg-gradient-to-r from-primary-500 to-cyan-500' 
                            : 'bg-dark-800'
                      }`}
                      whileHover={{ scale: 1.1 }}
                    >
                      {isCompleted ? (
                        <CheckCircle className="w-6 h-6 text-white" />
                      ) : (
                        <Icon className="w-6 h-6 text-white" />
                      )}
                    </motion.div>
                    <span className="text-sm text-white font-medium hidden sm:block">{step.name}</span>
                  </motion.div>
                  
                  {index < steps.length - 1 && (
                    <div className={`w-12 sm:w-24 h-1 mx-2 rounded ${
                      currentStep > step.id ? 'bg-primary-500' : 'bg-dark-800'
                    }`} />
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="relative py-12 px-4 z-10">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card rounded-3xl p-8 lg:p-12"
          >
            <form onSubmit={handleSubmit(onSubmit)}>
              <AnimatePresence mode="wait">
                {/* Step 1: Service Selection */}
                {currentStep === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    className="space-y-6"
                  >
                    <div className="text-center mb-8">
                      <h2 className="text-2xl font-bold text-white mb-2">Choose Your Service</h2>
                      <p className="text-gray-400">Select the service you need</p>
                    </div>
                    
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                      {services.map((service) => (
                        <motion.label
                          key={service.id}
                          whileHover={{ y: -5, scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className={`relative cursor-pointer rounded-2xl p-6 border-2 transition-all ${
                            selectedService === service.id
                              ? 'border-primary-500 bg-primary-500/10'
                              : 'border-white/10 bg-dark-800/50 hover:border-white/20'
                          }`}
                        >
                          <input
                            {...register('service', { required: 'Please select a service' })}
                            type="radio"
                            value={service.id}
                            className="sr-only"
                          />
                          <div className="text-center">
                            <div className="text-4xl mb-3">{service.icon}</div>
                            <div className="text-sm font-semibold text-white">{service.name}</div>
                          </div>
                          {selectedService === service.id && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="absolute top-2 right-2 w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center"
                            >
                              <CheckCircle className="w-4 h-4 text-white" />
                            </motion.div>
                          )}
                        </motion.label>
                      ))}
                    </div>
                    {errors.service && (
                      <p className="text-center text-sm text-red-400">{errors.service.message}</p>
                    )}
                  </motion.div>
                )}

                {/* Step 2: Personal Details */}
                {currentStep === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    className="space-y-6"
                  >
                    <div className="text-center mb-8">
                      <h2 className="text-2xl font-bold text-white mb-2">Your Details</h2>
                      <p className="text-gray-400">Tell us about yourself and your location</p>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Full Name *</label>
                        <input
                          {...register('name', { required: 'Name is required' })}
                          type="text"
                          className="w-full bg-dark-800 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-primary-500 transition-colors"
                          placeholder="Ethan Cruz"
                        />
                        {errors.name && <p className="mt-1 text-sm text-red-400">{errors.name.message}</p>}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Email *</label>
                        <input
                          {...register('email', {
                            required: 'Email is required',
                            pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: 'Invalid email' },
                          })}
                          type="email"
                          className="w-full bg-dark-800 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-primary-500 transition-colors"
                          placeholder="ethan@example.com"
                        />
                        {errors.email && <p className="mt-1 text-sm text-red-400">{errors.email.message}</p>}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Phone *</label>
                        <input
                          {...register('phone', { required: 'Phone is required' })}
                          type="tel"
                          className="w-full bg-dark-800 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-primary-500 transition-colors"
                          placeholder="0970 210 1773"
                        />
                        {errors.phone && <p className="mt-1 text-sm text-red-400">{errors.phone.message}</p>}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Location Type *</label>
                        <select
                          {...register('location', { required: 'Please select location type' })}
                          className="w-full bg-dark-800 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary-500 transition-colors"
                        >
                          <option value="">Select type</option>
                          <option value="home">Home/Residential</option>
                          <option value="office">Office/Business</option>
                          <option value="building">Building/Commercial</option>
                          <option value="other">Other</option>
                        </select>
                        {errors.location && <p className="mt-1 text-sm text-red-400">{errors.location.message}</p>}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        <MapPin className="w-4 h-4 inline mr-1 text-primary-400" />
                        Full Address *
                      </label>
                      <textarea
                        {...register('address', { required: 'Address is required' })}
                        rows={3}
                        className="w-full bg-dark-800 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-primary-500 transition-colors resize-none"
                        placeholder="Street address, City, Province (Cebu addresses only)"
                      />
                      {errors.address && <p className="mt-1 text-sm text-red-400">{errors.address.message}</p>}
                      <p className="mt-1 text-xs text-primary-300 uppercase tracking-wider">{SERVICE_AREA_LABEL} only</p>
                    </div>
                  </motion.div>
                )}

                {/* Step 3: Schedule */}
                {currentStep === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    className="space-y-6"
                  >
                    <div className="text-center mb-8">
                      <h2 className="text-2xl font-bold text-white mb-2">Pick a Time</h2>
                      <p className="text-gray-400">Choose your preferred date and time</p>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          <Calendar className="w-4 h-4 inline mr-1 text-primary-400" />
                          Preferred Date *
                        </label>
                        <input
                          {...register('date', { required: 'Date is required' })}
                          type="date"
                          min={minDate}
                          max={maxDate}
                          onChange={handleDateChange}
                          className="w-full bg-dark-800 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary-500 transition-colors"
                        />
                        {errors.date && <p className="mt-1 text-sm text-red-400">{errors.date.message}</p>}
                        {selectedDate && (
                          <p className="mt-2 text-sm text-gray-400">{formatBookingDate(selectedDate)}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          <Clock className="w-4 h-4 inline mr-1 text-primary-400" />
                          Preferred Time *
                        </label>
                        <select
                          {...register('time', { required: 'Time is required' })}
                          className="w-full bg-dark-800 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary-500 transition-colors"
                        >
                          <option value="">Select time</option>
                          {availableSlots.map((slot) => (
                            <option key={slot.time} value={slot.time} disabled={!slot.available}>
                              {slot.time} {!slot.available && '(Booked)'}
                            </option>
                          ))}
                        </select>
                        {errors.time && <p className="mt-1 text-sm text-red-400">{errors.time.message}</p>}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Additional Details (Optional)</label>
                      <textarea
                        {...register('message')}
                        rows={4}
                        className="w-full bg-dark-800 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-primary-500 transition-colors resize-none"
                        placeholder="Any specific requirements or details..."
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        <DollarSign className="w-4 h-4 inline mr-1 text-primary-400" />
                        Tip/Compensation (Optional)
                      </label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">₱</span>
                        <input
                          {...register('tip', { min: 0, valueAsNumber: true })}
                          type="number"
                          min="0"
                          step="100"
                          className="w-full bg-dark-800 border border-white/10 rounded-xl pl-8 pr-4 py-3 text-white focus:outline-none focus:border-primary-500 transition-colors"
                          placeholder="0"
                        />
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Step 4: Confirmation */}
                {currentStep === 4 && (
                  <motion.div
                    key="step4"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    className="space-y-6"
                  >
                    <div className="text-center mb-8">
                      <h2 className="text-2xl font-bold text-white mb-2">Review Your Booking</h2>
                      <p className="text-gray-400">Please confirm your details before submitting</p>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="glass-effect rounded-2xl p-6 space-y-4">
                        <h3 className="text-white font-semibold flex items-center">
                          <Wrench className="w-5 h-5 text-primary-400 mr-2" />
                          Service Details
                        </h3>
                        <div className="space-y-3 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-400">Service</span>
                            <span className="text-white flex items-center">
                              <span className="mr-2">{getServiceIcon(formData.service)}</span>
                              {getServiceName(formData.service)}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Date</span>
                            <span className="text-white">{formData.date}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Time</span>
                            <span className="text-white">{formData.time}</span>
                          </div>
                          {formData.tip > 0 && (
                            <div className="flex justify-between">
                              <span className="text-gray-400">Tip</span>
                              <span className="text-primary-400">₱{formData.tip}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="glass-effect rounded-2xl p-6 space-y-4">
                        <h3 className="text-white font-semibold flex items-center">
                          <Users className="w-5 h-5 text-primary-400 mr-2" />
                          Contact Details
                        </h3>
                        <div className="space-y-3 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-400">Name</span>
                            <span className="text-white">{formData.name}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Email</span>
                            <span className="text-white text-right break-all">{formData.email}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Phone</span>
                            <span className="text-white">{formData.phone}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Location</span>
                            <span className="text-white capitalize">{formData.location}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="glass-effect rounded-2xl p-6">
                      <h3 className="text-white font-semibold flex items-center mb-3">
                        <MapPin className="w-5 h-5 text-primary-400 mr-2" />
                        Address
                      </h3>
                      <p className="text-gray-300">{formData.address}</p>
                    </div>

                    {formData.message && (
                      <div className="glass-effect rounded-2xl p-6">
                        <h3 className="text-white font-semibold mb-3">Additional Notes</h3>
                        <p className="text-gray-300">{formData.message}</p>
                      </div>
                    )}

                    <div className="bg-primary-500/10 border border-primary-500/20 rounded-xl p-4">
                      <p className="text-sm text-gray-300">
                        <Shield className="w-4 h-4 inline mr-2 text-primary-400" />
                        By submitting, you agree to our booking terms. We will confirm your appointment within 24 hours.
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-10 pt-6 border-t border-white/10">
                <motion.button
                  type="button"
                  onClick={prevStep}
                  disabled={currentStep === 1}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-semibold transition-all ${
                    currentStep === 1
                      ? 'opacity-40 cursor-not-allowed text-gray-500'
                      : 'text-white hover:bg-white/5'
                  }`}
                >
                  <ArrowLeft className="w-5 h-5" />
                  <span>Back</span>
                </motion.button>

                {currentStep < 4 ? (
                  <motion.button
                    type="button"
                    onClick={nextStep}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center space-x-2 px-8 py-3 bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl text-white font-semibold"
                  >
                    <span>Continue</span>
                    <ArrowRight className="w-5 h-5" />
                  </motion.button>
                ) : (
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center space-x-2 px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl text-white font-semibold disabled:opacity-50"
                  >
                    <CheckCircle className="w-5 h-5" />
                    <span>{isSubmitting ? 'Submitting...' : 'Confirm Booking'}</span>
                  </motion.button>
                )}
              </div>
            </form>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
