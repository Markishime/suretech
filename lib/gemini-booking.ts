import { GoogleGenerativeAI } from '@google/generative-ai'
import { collection, addDoc } from 'firebase/firestore'
import { db } from './firebase'
import { validateBookingDateTime, WORKING_HOURS, type BookingData, isWithinServiceArea, SERVICE_AREA_LABEL } from './booking'

// Initialize with empty string, will be set when API key is available
const getGenAI = () => {
  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY
  if (!apiKey || apiKey.trim() === '') {
    throw new Error('Gemini API key not configured')
  }
  return new GoogleGenerativeAI(apiKey)
}

const knowledgeBase = `
Suretech Network and Data Solution is a trusted provider of comprehensive ICT solutions, specializing in design, implementation, and maintenance of reliable and secure network infrastructures.

Services Available for Booking:
1. CCTV Installation and Configuration - Setup of advanced surveillance systems
2. Structured Cabling Solutions - Design and installation of structured cabling systems
3. Network Design and Implementation - Development of robust network architectures
4. Server Installation and Configuration - Deployment and management of servers
5. IT Support and Maintenance - Comprehensive technical support services
6. Cybersecurity Solutions - Implementation of proactive security measures
7. Other IT-Related Services - Customized ICT services

Working Hours: Monday to Friday, 8:00 AM to 6:00 PM (Philippines Time)
Location: Tulay Minglanilla, Cebu, Philippines
Contact: 
- Phone: 0970 210 1773 / 0956 703 1254
- Email: suretechnetworkanddatasolution@gmail.com

Service Coverage:
- Onsite services available within Cebu Province, Philippines (Cebu City, Mandaue, Lapu-Lapu, Talisay, Minglanilla, Consolacion, and nearby areas)
- Remote diagnostics and consultations offered nationwide upon request

Booking Information:
- Bookings are only accepted during working hours (Monday-Friday, 8 AM - 6 PM)
- Customers can provide optional tips/compensation
- We need: Name, Email, Phone, Service Type, Date, Time, Location Type, Address
- Bookings are confirmed within 24 hours
`

export interface BookingIntent {
  intent: 'booking'
  data: Partial<BookingData>
  missingFields: string[]
}

export async function detectBookingIntent(message: string): Promise<BookingIntent | null> {
  try {
    const genAI = getGenAI()

    // Configure generation parameters up front
    const generationConfig = {
      temperature: 0.5,
      maxOutputTokens: 2048,
    }

    // Try available Gemini models
    const availableModels = ['gemini-2.5-pro', 'gemini-2.0-flash-exp', 'gemini-1.5-flash', 'gemini-1.5-pro']
    let model = null
    let lastError = null

    for (const modelName of availableModels) {
      try {
        console.log(`Trying booking detection model: ${modelName}`)
        model = genAI.getGenerativeModel({ model: modelName })
        // Test the model by making a simple call
        const testResult = await model.generateContent({
          contents: [{ role: 'user', parts: [{ text: 'Hello' }] }],
          generationConfig,
        })
        await testResult.response
        console.log(`Booking detection model ${modelName} is working!`)
        break
      } catch (err: any) {
        lastError = err
        console.log(`Booking detection model ${modelName} failed:`, err.message)
        continue
      }
    }

    if (!model) {
      console.error('No working booking detection Gemini models found. Last error:', lastError)
      return null
    }

    const prompt = `${knowledgeBase}

Analyze if the customer wants to book a service. Look for keywords like: book, schedule, appointment, install, setup, service, need, want.

If they want to book, extract:
- Service type (if mentioned)
- Date preference (if mentioned)
- Time preference (if mentioned)
- Location type: home, office, building, or other
- Any other relevant details

Respond ONLY with JSON in this exact format:
{
  "isBooking": true/false,
  "service": "service name or null",
  "date": "date in YYYY-MM-DD format or null",
  "time": "time in HH:MM format or null",
  "location": "home/office/building/other or null",
  "extractedInfo": "any other relevant info"
}

If NOT a booking request, respond with: {"isBooking": false}

Customer Message: ${message}

Response:`

    const result = await model.generateContent({
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      generationConfig,
    })
    const response = await result.response
    const text = response.text().trim()
    
    // Try to parse JSON from response
    const jsonMatch = text.match(/\{[\s\S]*\}/)
    if (jsonMatch) {
      const parsed = JSON.parse(jsonMatch[0])
      if (parsed.isBooking) {
        return {
          intent: 'booking',
          data: {
            service: parsed.service || null,
            date: parsed.date || null,
            time: parsed.time || null,
            location: parsed.location || null,
          },
          missingFields: [],
        }
      }
    }
    
    return null
  } catch (error) {
    console.error('Error detecting booking intent:', error)
    return null
  }
}

export async function processBookingViaChat(
  userMessage: string,
  conversationHistory: Array<{ role: string; content: string }>
): Promise<{ response: string; bookingCreated?: boolean }> {
  try {
    const bookingIntent = await detectBookingIntent(userMessage)
    
    if (!bookingIntent) {
      // Not a booking request, use API route
      try {
        const apiResponse = await fetch('/api/chat-booking', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userMessage,
            conversationHistory,
          }),
        })

        if (!apiResponse.ok) {
          const errorData = await apiResponse.json().catch(() => ({}))
          throw new Error(errorData.error || `API request failed with status ${apiResponse.status}`)
        }

        const data = await apiResponse.json()
        return { response: data.response || 'I apologize, but I didn\'t receive a proper response. Please try again.' }
      } catch (apiError: any) {
        console.error('API Error in booking chat:', apiError)
        throw apiError
      }
    }
    
    // Handle booking intent
    return {
      response: 'I can help you book a service within Cebu Province, Philippines! To complete your booking, I need a few details:\n\n' +
                '1. Your full name\n' +
                '2. Your email address\n' +
                '3. Your phone number\n' +
                '4. Service type (CCTV Installation, Network Setup, etc.)\n' +
                '5. Preferred date (Monday-Friday)\n' +
                '6. Preferred time (8 AM - 6 PM)\n' +
                '7. Location type (Home, Office, Building, or Other)\n' +
                '8. Full address\n\n' +
                'Please provide these details, or visit our booking page at /book for a faster experience!',
      bookingCreated: false,
    }
  } catch (error) {
    console.error('Error processing booking chat:', error)
    return {
      response: 'I\'d be happy to help you book a service! 📅 For the best booking experience, please click the "Book Appointment" button below or visit our booking page. You can also contact us directly:\n\n📞 Phone: 0970 210 1773 / 0956 703 1254\n📧 Email: suretechnetworkanddatasolution@gmail.com\n\nPlease note: onsite services are currently available within Cebu Province, Philippines. We\'re here to help!'
    }
  }
}

export async function createBookingFromChat(bookingData: Partial<BookingData>): Promise<{ success: boolean; message: string }> {
  try {
    // Validate required fields
    const requiredFields = ['name', 'email', 'phone', 'service', 'date', 'time', 'location', 'address']
    const missing = requiredFields.filter(field => !bookingData[field as keyof BookingData])
    
    if (missing.length > 0) {
      return {
        success: false,
        message: `Missing required fields: ${missing.join(', ')}`,
      }
    }
    
    if (!isWithinServiceArea(bookingData.address as string)) {
      return {
        success: false,
        message: `We currently provide onsite services within ${SERVICE_AREA_LABEL}. Please share a Cebu-based address or contact us for remote support options.`,
      }
    }
    
    // Validate date and time
    const bookingDate = new Date(bookingData.date as string)
    const validation = validateBookingDateTime(bookingDate, bookingData.time as string)
    
    if (!validation.valid) {
      return {
        success: false,
        message: validation.error || 'Invalid booking date/time',
      }
    }
    
    // Create booking
    const fullBookingData: BookingData = {
      name: bookingData.name as string,
      email: bookingData.email as string,
      phone: bookingData.phone as string,
      service: bookingData.service as string,
      date: bookingData.date as string,
      time: bookingData.time as string,
      location: bookingData.location as string,
      address: bookingData.address as string,
      message: bookingData.message || '',
      tip: bookingData.tip || 0,
      status: 'pending',
      timestamp: new Date(),
    }
    
    await addDoc(collection(db, 'bookings'), fullBookingData)
    
    return {
      success: true,
      message: 'Booking created successfully! We will confirm your appointment within 24 hours.',
    }
  } catch (error) {
    console.error('Error creating booking:', error)
    return {
      success: false,
      message: 'Failed to create booking. Please try again or contact us directly.',
    }
  }
}

