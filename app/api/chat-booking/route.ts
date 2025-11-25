import { NextRequest, NextResponse } from 'next/server'
import { GoogleGenerativeAI } from '@google/generative-ai'

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

Booking Information:
- Bookings are only accepted during working hours (Monday-Friday, 8 AM - 6 PM)
- Customers can provide optional tips/compensation
- We need: Name, Email, Phone, Service Type, Date, Time, Location Type, Address
- Bookings are confirmed within 24 hours
`

export async function POST(request: NextRequest) {
  try {
    const { userMessage, conversationHistory = [] } = await request.json()

    if (!userMessage || typeof userMessage !== 'string') {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      )
    }

    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY
    if (!apiKey || apiKey.trim() === '') {
      return NextResponse.json(
        { error: 'API key not configured' },
        { status: 500 }
      )
    }

    // Configure generation parameters up front so they can be reused
    const generationConfig = {
      temperature: 0.5,
      maxOutputTokens: 2048,
    }

    const genAI = new GoogleGenerativeAI(apiKey, { apiVersion: 'v1beta' })

    // Try available Gemini models
    const availableModels = ['gemini-2.5-pro', 'gemini-2.0-flash-exp', 'gemini-1.5-flash', 'gemini-1.5-pro']
    let model = null
    let lastError = null

    for (const modelName of availableModels) {
      try {
        console.log(`Trying booking model: ${modelName}`)
        model = genAI.getGenerativeModel({ model: modelName })
        // Test the model by making a simple call
        const testResult = await model.generateContent({
          contents: [{ role: 'user', parts: [{ text: 'Hello' }] }],
          generationConfig,
        })
        await testResult.response
        console.log(`Booking model ${modelName} is working!`)
        break
      } catch (err: any) {
        lastError = err
        console.log(`Booking model ${modelName} failed:`, err.message)
        continue
      }
    }

    if (!model) {
      console.error('No working booking Gemini models found. Last error:', lastError)
      throw new Error(`No available Gemini models found. Last error: ${lastError?.message || 'Unknown'}`)
    }

    const prompt = `${knowledgeBase}

You are a professional, friendly, and engaging AI assistant for Suretech Network and Data Solution. Your role is to help customers with booking appointments and answering ANY questions they may have.

IMPORTANT: Answer ALL questions asked by users, regardless of topic. Do not limit responses to only Suretech-related topics.

BOOKING PROCESS:
To complete a booking, customers need to provide:
1. Full Name
2. Email Address
3. Phone Number
4. Service Type (CCTV Installation, Network Setup, etc.)
5. Preferred Date (Monday-Friday only)
6. Preferred Time (8:00 AM - 6:00 PM)
7. Location Type (Home/Office/Building/Other)
8. Full Address

IMPORTANT:
- Working hours: Monday-Friday, 8:00 AM to 6:00 PM (Philippines Time)
- Bookings are only accepted during working hours
- Bookings are confirmed within 24 hours
- Customers can provide optional tips/compensation

RESPONSE GUIDELINES:
- Answer ANY question asked by the user - be helpful and informative on any topic
- DO NOT limit responses to only Suretech-related topics
- Be professional, friendly, warm, and engaging
- DO NOT use markdown formatting like **bold** or *italic* - use plain text only
- Use emojis sparingly and appropriately (📅 💼 🔧 ✅ etc.) to make responses more engaging
- Use clear formatting with bullet points (•) or numbered lists
- If they want to book, guide them step-by-step through providing required information
- Always mention working hours when discussing bookings
- If they provide partial information, acknowledge it and ask for remaining details
- Direct them to use the booking form button for faster booking experience
- Show enthusiasm about helping customers
- Use friendly language like "I'd be happy to help!" or "Great question!"
- Provide comprehensive and detailed answers - do not limit response length
- For Suretech-related questions, use the knowledge base information
- For general questions, provide accurate and helpful information

Conversation History:
${conversationHistory.length > 0 
  ? conversationHistory.slice(-4).map((msg: any) => `${msg.role === 'user' ? 'Customer' : 'Assistant'}: ${msg.content}`).join('\n')
  : 'No previous conversation'}

Customer Message: ${userMessage}

Provide a professional, engaging, comprehensive, and helpful response. Answer the question fully regardless of topic. Use plain text only (no markdown formatting):`

    const result = await model.generateContent({
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      generationConfig,
    })
    const response = await result.response
    let text = response.text().trim()
    
    // Remove markdown formatting
    text = text
      .replace(/\*\*(.*?)\*\*/g, '$1')
      .replace(/\*(.*?)\*/g, '$1')
      .replace(/`(.*?)`/g, '$1')
      .replace(/\[(.*?)\]\(.*?\)/g, '$1')
      .replace(/#{1,6}\s/g, '')
      .replace(/\*\*/g, '')
      .replace(/\*/g, '')
    
    return NextResponse.json({ response: text })
  } catch (error: any) {
    console.error('Booking Chat API Error:', error)
    return NextResponse.json(
      { error: error?.message || 'Failed to get response from AI' },
      { status: 500 }
    )
  }
}

