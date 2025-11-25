'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { Calendar, Clock, MapPin, Wrench, DollarSign, X, CheckCircle, Send } from 'lucide-react'
import { generateTimeSlots, validateBookingDateTime, formatBookingDate, type BookingData, isWithinServiceArea, SERVICE_AREA_LABEL } from '@/lib/booking'
import toast from 'react-hot-toast'

const services = [
  { id: 'cctv-installation', name: 'CCTV Installation' },
  { id: 'structured-cabling', name: 'Structured Cabling' },
  { id: 'network-setup', name: 'Network Setup' },
  { id: 'server-installation', name: 'Server Installation' },
  { id: 'it-support', name: 'IT Support & Maintenance' },
  { id: 'cybersecurity', name: 'Cybersecurity Setup' },
  { id: 'other', name: 'Other IT Services' },
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

interface ChatbotBookingFormProps {
  onClose: () => void
  onSuccess: () => void
}

export default function ChatbotBookingForm({ onClose, onSuccess }: ChatbotBookingFormProps) {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [availableSlots, setAvailableSlots] = useState<{ time: string; available: boolean }[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [bookedSlots, setBookedSlots] = useState<string[]>([])
  const [currentStep, setCurrentStep] = useState(1)
  
  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<BookingFormData>({
    defaultValues: {
      tip: 0,
      service: 'cctv-installation',
    },
  })

  const selectedService = watch('service')
  const selectedTime = watch('time')
  const selectedDateValue = watch('date')

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
      if (!isWithinServiceArea(data.address)) {
        toast.error(`Bookings are limited to ${SERVICE_AREA_LABEL}. Please provide a Cebu-based address.`)
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

      // Save to Firestore
      await addDoc(collection(db, 'bookings'), bookingData)

      // Send confirmation email to user
      const userEmailHtml = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #14b8a6; text-align: center;">Booking Confirmation - Suretech Network</h1>
          <p>Dear ${data.name},</p>
          <p>Thank you for booking with Suretech Network and Data Solution! We have received your appointment request and are processing it.</p>

          <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3>📅 Booking Details:</h3>
            <p><strong>Name:</strong> ${data.name}</p>
            <p><strong>Email:</strong> ${data.email}</p>
            <p><strong>Phone:</strong> ${data.phone}</p>
            <p><strong>Service:</strong> ${services.find(s => s.id === data.service)?.name || data.service}</p>
            <p><strong>Location:</strong> ${data.location}</p>
            <p><strong>Address:</strong> ${data.address}</p>
            <p><strong>Date:</strong> ${new Date(data.date).toLocaleDateString()}</p>
            <p><strong>Time:</strong> ${data.time}</p>
            ${data.message ? `<p><strong>Notes:</strong> ${data.message}</p>` : ''}
            ${data.tip > 0 ? `<p><strong>Tip:</strong> ₱${data.tip}</p>` : ''}
          </div>

          <div style="background: #ecfdf5; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #10b981;">
            <h3>⏰ Next Steps:</h3>
            <p>• Our team will review your booking request within 24 hours</p>
            <p>• You will receive a confirmation email with final details</p>
            <p>• A representative may call you to confirm details</p>
            <p>• For urgent matters, contact us directly</p>
          </div>

          <div style="background: #fef3c7; padding: 15px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #f59e0b;">
            <p><strong>📞 Contact Information:</strong></p>
            <p>Phone: 0970 210 1773 / 0956 703 1254</p>
            <p>Email: suretechnetworkanddatasolution@gmail.com</p>
          </div>

          <p>If you need to make changes to your booking or have any questions, please don't hesitate to contact us.</p>
          <p>Thank you for choosing Suretech Network!</p>
          <p>Best regards,<br>The Suretech Network Team</p>
        </div>
      `

      // Send notification email to company
      const companyEmailHtml = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #14b8a6;">New Booking Request</h1>
          <p>A new appointment has been booked through the chatbot.</p>

          <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3>Booking Details:</h3>
            <p><strong>Name:</strong> ${data.name}</p>
            <p><strong>Email:</strong> ${data.email}</p>
            <p><strong>Phone:</strong> ${data.phone}</p>
            <p><strong>Service:</strong> ${services.find(s => s.id === data.service)?.name || data.service}</p>
            <p><strong>Location Type:</strong> ${data.location}</p>
            <p><strong>Address:</strong> ${data.address}</p>
            <p><strong>Date:</strong> ${new Date(data.date).toLocaleDateString()}</p>
            <p><strong>Time:</strong> ${data.time}</p>
            <p><strong>Message:</strong> ${data.message || 'No additional notes'}</p>
            <p><strong>Tip:</strong> ₱${data.tip || 0}</p>
            <p><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
          </div>

          <div style="background: #ecfdf5; padding: 15px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #10b981;">
            <p><strong>⚡ Action Required:</strong> Confirm this booking within 24 hours and send confirmation email to customer.</p>
          </div>

          <p>Customer contact: <a href="mailto:${data.email}">${data.email}</a> | <a href="tel:${data.phone}">${data.phone}</a></p>
        </div>
      `

      // Send emails
      const [userEmailResponse, companyEmailResponse] = await Promise.all([
        fetch('/api/send-email', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            to: data.email,
            subject: 'Booking Confirmation - Suretech Network',
            html: userEmailHtml,
          }),
        }),
        fetch('/api/send-email', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            to: 'suretechnetworkanddatasolution@gmail.com',
            subject: `New Booking: ${data.name} - ${new Date(data.date).toLocaleDateString()}`,
            html: companyEmailHtml,
          }),
        })
      ])

      if (!userEmailResponse.ok || !companyEmailResponse.ok) {
        console.warn('Email sending failed, but booking was saved to database')
      }

      toast.success('Booking submitted successfully! Check your email for confirmation details.')
      onSuccess()
    } catch (error) {
      console.error('Error submitting booking:', error)
      toast.error('Failed to submit booking. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const minDate = new Date().toISOString().split('T')[0]
  const maxDate = new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className="space-y-4"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white">Book Your Appointment</h3>
          <button
            onClick={onClose}
            className="p-1 text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Step 1: Personal Info */}
          {currentStep === 1 && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-3"
            >
              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1">Full Name *</label>
                <input
                  {...register('name', { required: 'Name is required' })}
                  type="text"
                  className="w-full bg-dark-800 border border-primary-500/20 rounded-lg px-3 py-2 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-primary-500 transition-colors"
                  placeholder="Ethan Cruz"
                />
                {errors.name && <p className="mt-1 text-xs text-red-400">{errors.name.message}</p>}
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1">Email *</label>
                <input
                  {...register('email', { 
                    required: 'Email is required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Invalid email'
                    }
                  })}
                  type="email"
                  className="w-full bg-dark-800 border border-primary-500/20 rounded-lg px-3 py-2 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-primary-500 transition-colors"
                  placeholder="ethan.cruz@suretechnetwork.com"
                />
                {errors.email && <p className="mt-1 text-xs text-red-400">{errors.email.message}</p>}
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1">Phone *</label>
                <input
                  {...register('phone', { required: 'Phone is required' })}
                  type="tel"
                  className="w-full bg-dark-800 border border-primary-500/20 rounded-lg px-3 py-2 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-primary-500 transition-colors"
                  placeholder="0970 210 1773"
                />
                {errors.phone && <p className="mt-1 text-xs text-red-400">{errors.phone.message}</p>}
              </div>

              <button
                type="button"
                onClick={() => setCurrentStep(2)}
                className="w-full px-4 py-2 bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg text-white text-sm font-semibold hover:shadow-lg hover:shadow-primary-500/50 transition-all"
              >
                Next: Service Details
              </button>
            </motion.div>
          )}

          {/* Step 2: Service & Date */}
          {currentStep === 2 && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-3"
            >
              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1 flex items-center">
                  <Wrench className="w-3 h-3 mr-1 text-primary-400" />
                  Service *
                </label>
                <select
                  {...register('service', { required: 'Service is required' })}
                  className="w-full bg-dark-800 border border-primary-500/20 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-primary-500 transition-colors"
                >
                  {services.map((service) => (
                    <option key={service.id} value={service.id}>{service.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1 flex items-center">
                  <MapPin className="w-3 h-3 mr-1 text-primary-400" />
                  Location Type *
                </label>
                <select
                  {...register('location', { required: 'Location is required' })}
                  className="w-full bg-dark-800 border border-primary-500/20 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-primary-500 transition-colors"
                >
                  <option value="">Select location</option>
                  <option value="home">Home/Residential</option>
                  <option value="office">Office/Business</option>
                  <option value="building">Building/Commercial</option>
                  <option value="other">Other</option>
                </select>
                {errors.location && <p className="mt-1 text-xs text-red-400">{errors.location.message}</p>}
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1">Address *</label>
                <textarea
                  {...register('address', { required: 'Address is required' })}
                  rows={2}
                  className="w-full bg-dark-800 border border-primary-500/20 rounded-lg px-3 py-2 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-primary-500 transition-colors resize-none"
                  placeholder="Street address, City, Province"
                />
                {errors.address && <p className="mt-1 text-xs text-red-400">{errors.address.message}</p>}
                <p className="mt-1 text-[10px] uppercase tracking-[0.4em] text-primary-300">
                  {SERVICE_AREA_LABEL} addresses only
                </p>
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setCurrentStep(1)}
                  className="flex-1 px-4 py-2 bg-dark-800 border border-primary-500/20 rounded-lg text-white text-sm font-semibold hover:bg-dark-700 transition-colors"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={() => setCurrentStep(3)}
                  className="flex-1 px-4 py-2 bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg text-white text-sm font-semibold hover:shadow-lg hover:shadow-primary-500/50 transition-all"
                >
                  Next: Date & Time
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 3: Date & Time */}
          {currentStep === 3 && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-3"
            >
              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1 flex items-center">
                  <Calendar className="w-3 h-3 mr-1 text-primary-400" />
                  Date *
                </label>
                <input
                  {...register('date', { required: 'Date is required' })}
                  type="date"
                  min={minDate}
                  max={maxDate}
                  onChange={handleDateChange}
                  className="w-full bg-dark-800 border border-primary-500/20 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-primary-500 transition-colors"
                />
                {errors.date && <p className="mt-1 text-xs text-red-400">{errors.date.message}</p>}
                {selectedDate && (
                  <p className="mt-1 text-xs text-gray-400">{formatBookingDate(selectedDate)}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1 flex items-center">
                  <Clock className="w-3 h-3 mr-1 text-primary-400" />
                  Time *
                </label>
                <select
                  {...register('time', { required: 'Time is required' })}
                  className="w-full bg-dark-800 border border-primary-500/20 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-primary-500 transition-colors"
                >
                  <option value="">Select time</option>
                  {availableSlots.map((slot) => (
                    <option key={slot.time} value={slot.time} disabled={!slot.available}>
                      {slot.time} {!slot.available && '(Booked)'}
                    </option>
                  ))}
                </select>
                {errors.time && <p className="mt-1 text-xs text-red-400">{errors.time.message}</p>}
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1 flex items-center">
                  <DollarSign className="w-3 h-3 mr-1 text-primary-400" />
                  Tip (Optional)
                </label>
                <input
                  {...register('tip', { valueAsNumber: true, min: 0 })}
                  type="number"
                  min="0"
                  step="100"
                  className="w-full bg-dark-800 border border-primary-500/20 rounded-lg px-3 py-2 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-primary-500 transition-colors"
                  placeholder="0"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1">Additional Notes</label>
                <textarea
                  {...register('message')}
                  rows={2}
                  className="w-full bg-dark-800 border border-primary-500/20 rounded-lg px-3 py-2 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-primary-500 transition-colors resize-none"
                  placeholder="Any specific requirements..."
                />
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  className="flex-1 px-4 py-2 bg-dark-800 border border-primary-500/20 rounded-lg text-white text-sm font-semibold hover:bg-dark-700 transition-colors"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 px-4 py-2 bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg text-white text-sm font-semibold hover:shadow-lg hover:shadow-primary-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Submitting...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Submit Booking</span>
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          )}
        </form>
      </motion.div>
    </AnimatePresence>
  )
}

