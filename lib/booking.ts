// Working hours configuration (Philippines timezone - UTC+8)
export const WORKING_HOURS = {
  start: 8, // 8 AM
  end: 18, // 6 PM
  days: [1, 2, 3, 4, 5], // Monday to Friday (0 = Sunday, 1 = Monday, etc.)
}

export interface TimeSlot {
  time: string
  available: boolean
}

export interface BookingData {
  name: string
  email: string
  phone: string
  service: string
  date: string
  time: string
  location: string
  address: string
  message?: string
  tip?: number
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled'
  timestamp: Date
}

// Check if a date is within working hours
export function isWithinWorkingHours(date: Date): boolean {
  const day = date.getDay()
  const hour = date.getHours()
  
  return WORKING_HOURS.days.includes(day) && 
         hour >= WORKING_HOURS.start && 
         hour < WORKING_HOURS.end
}

// Check if a date is a working day
export function isWorkingDay(date: Date): boolean {
  const day = date.getDay()
  return WORKING_HOURS.days.includes(day)
}

// Generate available time slots for a given date
export function generateTimeSlots(date: Date, bookedSlots: string[] = []): TimeSlot[] {
  const slots: TimeSlot[] = []
  const currentDate = new Date()
  const selectedDate = new Date(date)
  selectedDate.setHours(0, 0, 0, 0)
  
  const isToday = selectedDate.toDateString() === currentDate.toDateString()
  const currentHour = currentDate.getHours()
  
  for (let hour = WORKING_HOURS.start; hour < WORKING_HOURS.end; hour++) {
    // Skip past hours if booking for today
    if (isToday && hour <= currentHour) continue
    
    const timeString = `${hour.toString().padStart(2, '0')}:00`
    const isBooked = bookedSlots.includes(timeString)
    
    slots.push({
      time: timeString,
      available: !isBooked,
    })
  }
  
  return slots
}

// Format date for display
export function formatBookingDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

// Validate booking date and time
export function validateBookingDateTime(date: Date, time: string): { valid: boolean; error?: string } {
  const now = new Date()
  const [hours, minutes] = time.split(':').map(Number)
  const bookingDateTime = new Date(date)
  bookingDateTime.setHours(hours, minutes || 0, 0, 0)
  
  // Check if booking is in the past
  if (bookingDateTime < now) {
    return { valid: false, error: 'Cannot book appointments in the past' }
  }
  
  // Check if it's a working day
  if (!isWorkingDay(bookingDateTime)) {
    return { valid: false, error: 'We only accept bookings on weekdays (Monday-Friday)' }
  }
  
  // Check if it's within working hours
  if (!isWithinWorkingHours(bookingDateTime)) {
    return { valid: false, error: `Bookings are only available between ${WORKING_HOURS.start}:00 AM and ${WORKING_HOURS.end}:00 PM` }
  }
  
  return { valid: true }
}

