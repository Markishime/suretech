import { NextRequest, NextResponse } from 'next/server'
import { GoogleGenerativeAI } from '@google/generative-ai'

const knowledgeBase = `
COMPANY INFORMATION:
Suretech Network and Data Solution is a trusted provider of comprehensive ICT solutions, specializing in design, implementation, and maintenance of reliable and secure network infrastructures. We are based in Tulay Minglanilla, Cebu, Philippines.

VISION:
To be a leading and trusted provider of innovative network and data solutions that empower organizations to achieve seamless connectivity, operational efficiency, and digital transformation.

MISSION:
To deliver reliable, secure, and high-performance ICT infrastructure and services tailored to clients' evolving needs.

CORE VALUES:
- Integrity: Uphold honesty and transparency in all dealings
- Excellence: Strive for superior quality and continuous improvement
- Innovation: Embrace emerging technologies and forward-thinking approaches
- Customer Commitment: Clients' success drives our success
- Teamwork: Believe in collaboration and mutual respect
- Reliability: Stand by commitments, providing consistent and dependable service

SERVICES OFFERED:
1. CCTV Installation and Configuration
   - Setup of advanced surveillance systems for enhanced security and monitoring
   - Professional installation with HD camera systems
   - Remote monitoring capabilities
   - Mobile app access

2. Structured Cabling Solutions
   - Design and installation of structured cabling systems
   - Organized, scalable, and efficient communication infrastructure
   - Industry-standard compliance
   - Customized cabling design

3. Network Design and Implementation
   - Development of robust network architectures
   - Tailored to client requirements
   - Performance optimization and scalability planning
   - Reliability assurance

4. Server Installation and Configuration
   - Deployment and management of servers
   - Support for business-critical operations
   - Enhanced data availability
   - Configuration management and performance tuning

5. IT Support and Maintenance
   - Comprehensive technical support services
   - 24/7 technical support available
   - System uptime assurance
   - Performance optimization and fast issue resolution
   - Proactive monitoring

6. Cybersecurity Solutions
   - Implementation of proactive security measures
   - Safeguard data, networks, and systems from cyber threats
   - Threat assessment and ongoing monitoring
   - Incident response capabilities

7. Other IT-Related Services
   - Customized ICT services based on client needs
   - IT consulting and system integration
   - Technical project management
   - Custom solutions

SERVICE PACKAGES:
- Basic Package: Starting at ₱5,000
  Perfect for small homes and offices
  Includes: Basic CCTV installation (2-4 cameras), Basic network setup, 1 month support, Basic cabling

- Professional Package: Starting at ₱15,000 (Most Popular)
  Ideal for medium-sized businesses
  Includes: Professional CCTV system (4-8 cameras), Structured cabling, Network design & setup, 3 months support, Cybersecurity basics

- Enterprise Package: Custom Quote
  Complete solution for large businesses
  Includes: Enterprise CCTV system (8+ cameras), Full network infrastructure, Server installation, Advanced cybersecurity, 6 months support, 24/7 monitoring, Custom solutions

BOOKING INFORMATION:
- Online booking available at /book or through this chatbot
- Working Hours: Monday to Friday, 8:00 AM to 6:00 PM (Philippines Time, UTC+8)
- Bookings are only accepted during working hours
- Customers can provide optional tips/compensation when booking
- Bookings are confirmed within 24 hours via email or phone
- Required information for booking:
  * Full Name
  * Email Address
  * Phone Number
  * Service Type
  * Preferred Date (Monday-Friday only)
  * Preferred Time (8:00 AM - 6:00 PM)
  * Location Type (Home/Office/Building/Other)
  * Full Address

CONTACT INFORMATION:
- Office Address: Tulay Minglanilla, Cebu, Philippines
- Phone: 0970 210 1773 / 0956 703 1254
- Email: suretechnetworkanddatasolution@gmail.com
- Social Media: Facebook, Instagram, TikTok - Suretech Network and Data Solution

SERVICE COVERAGE:
- Onsite services available within Cebu Province, Philippines (Cebu City, Mandaue, Lapu-Lapu, Talisay, Minglanilla, Consolacion, and nearby areas)
- Remote consultations and diagnostics offered nationwide upon request

WHY CHOOSE US:
- Proven track record in system installation and network maintenance
- Customized and cost-effective solutions tailored to your needs
- 24/7 technical support available
- Commitment to security, efficiency, and customer satisfaction
- Expert team with industry certifications
- Cutting-edge technology solutions
- Quick response times
- Comprehensive project management
- Ongoing maintenance and support
- Transparent communication

INDUSTRIES SERVED:
- Corporate Offices
- Educational Institutions
- Government Agencies
- Data Centers
- Residential and Private Properties

ADDITIONAL FEATURES:
- Customer Reviews: Share your experience at /reviews
- Referral Program: Get discounts by referring friends at /referral
- Service Packages: View detailed pricing packages at /packages
- Innovation Hub: Explore R&D initiatives at /innovation
- Tech Insights: Read ICT trends at /insights

CERTIFICATIONS:
- BIR Registered (TIN: 676-806-814-00000)
- DTI Certified (Business Name No. 7517058)
- Industry Certified Professionals
`

function formatResponse(text: string): string {
  // Clean up formatting - remove all markdown
  text = text
    .replace(/\*\*(.*?)\*\*/g, '$1') // Remove markdown bold
    .replace(/\*(.*?)\*/g, '$1') // Remove markdown italic
    .replace(/`(.*?)`/g, '$1') // Remove code backticks
    .replace(/\[(.*?)\]\(.*?\)/g, '$1') // Remove markdown links, keep text
    .replace(/#{1,6}\s/g, '') // Remove markdown headers
    .replace(/^(\d+)\.\s/gm, '$1. ') // Ensure numbered lists are formatted
    .replace(/\n{3,}/g, '\n\n') // Remove excessive line breaks
    .trim()

  // Ensure proper spacing for lists
  text = text.replace(/([.!?])\n([A-Z])/g, '$1\n\n$2')
  
  // Clean up any remaining markdown artifacts
  text = text.replace(/\*\*/g, '').replace(/\*/g, '')
  
  return text
}

export async function POST(request: NextRequest) {
  try {
    const { message, conversationHistory = [] } = await request.json()

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      )
    }

    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY
    if (!apiKey || apiKey.trim() === '') {
      console.error('Gemini API key is missing')
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

    const genAI = new GoogleGenerativeAI(apiKey)

    // Try available Gemini models
    const availableModels = ['gemini-2.5-pro', 'gemini-2.0-flash-exp', 'gemini-1.5-flash', 'gemini-1.5-pro']
    let model = null
    let lastError = null

    for (const modelName of availableModels) {
      try {
        console.log(`Trying model: ${modelName}`)
        model = genAI.getGenerativeModel({ model: modelName })
        // Test the model by making a simple call
        const testResult = await model.generateContent({
          contents: [{ role: 'user', parts: [{ text: 'Hello' }] }],
          generationConfig,
        })
        await testResult.response
        console.log(`Model ${modelName} is working!`)
        break
      } catch (err: any) {
        lastError = err
        console.log(`Model ${modelName} failed:`, err.message)
        continue
      }
    }

    if (!model) {
      console.error('No working Gemini models found. Last error:', lastError)
      return NextResponse.json(
        {
          error: `No available Gemini models found. This might be due to API key permissions or project configuration. Please check:\n1. Google Cloud Generative AI API is enabled\n2. API key has proper permissions\n3. Billing is enabled on your Google Cloud project\n\nLast error: ${lastError?.message || 'Unknown'}`
        },
        { status: 500 }
      )
    }

    // Build conversation context
    const historyContext = conversationHistory.length > 0
      ? `\n\nPrevious Conversation:\n${conversationHistory
          .slice(-6) // Keep last 6 messages for context
          .map((msg: any) => `${msg.role === 'user' ? 'Customer' : 'Assistant'}: ${msg.content}`)
          .join('\n')}`
      : ''

    const prompt = `You are a professional, friendly, and engaging AI assistant for Suretech Network and Data Solution, an ICT solutions provider based in Cebu, Philippines.

Your role is to:
1. Answer ANY questions asked by users - be helpful and informative on any topic
2. Answer questions about Suretech services, pricing, company information, and capabilities
3. Provide helpful information about booking appointments
4. Guide customers through our service offerings when relevant
5. Maintain a professional, friendly, warm, and engaging tone
6. Make customers feel valued and understood

IMPORTANT GUIDELINES:
- Always be professional, courteous, warm, and genuinely helpful
- Answer ALL questions asked by users, regardless of topic
- DO NOT limit responses to only Suretech-related topics
- If asked about Suretech services, provide detailed information from the knowledge base
- If asked about general topics (technology, ICT, networking, etc.), provide helpful and accurate information
- If asked about unrelated topics, still provide helpful answers while naturally mentioning Suretech services when relevant
- Use clear, well-formatted responses with proper spacing
- DO NOT use markdown formatting like **bold** or *italic* - use plain text only
- Use emojis sparingly and appropriately (📞 📧 💼 🔧 ✅ etc.) to make responses more engaging
- For booking requests, guide them to provide required information or direct them to use the booking form
- Always mention our working hours (Monday-Friday, 8 AM - 6 PM) when discussing bookings
- Use bullet points (•) or numbered lists for multiple items
- Keep responses informative, detailed, and engaging - do not limit response length
- Show enthusiasm about helping customers
- Use friendly language like "I'd be happy to help!" or "Great question!"
- Provide comprehensive answers to questions
- Make responses conversational and natural, not robotic
- If you don't know something specific about Suretech, direct them to contact us directly
- For general knowledge questions, provide accurate and helpful information

${knowledgeBase}${historyContext}

Customer Question: ${message}

Provide a professional, engaging, and comprehensive response. Answer the question fully and helpfully. Use plain text only (no markdown formatting):`

    const result = await model.generateContent({
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      generationConfig,
    })
    const response = await result.response
    let text = response.text().trim()

    // Format the response for better readability
    text = formatResponse(text)

    return NextResponse.json({ response: text })
  } catch (error: any) {
    console.error('Gemini API Error:', error)
    console.error('Error details:', {
      message: error?.message,
      stack: error?.stack,
      name: error?.name,
    })
    
    return NextResponse.json(
      { error: error?.message || 'Failed to get response from AI' },
      { status: 500 }
    )
  }
}

