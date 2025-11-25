import { GoogleGenerativeAI } from '@google/generative-ai'

// Initialize genAI only when API key is available
const getGenAI = () => {
  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY
  if (!apiKey || apiKey.trim() === '') {
    throw new Error('Gemini API key not configured')
  }
  return new GoogleGenerativeAI(apiKey)
}

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

export async function chatWithGemini(
  message: string,
  conversationHistory: Array<{ role: string; content: string }> = []
): Promise<string> {
  try {
    // Use API route instead of direct client-side call
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message,
        conversationHistory,
      }),
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.error || `API request failed with status ${response.status}`)
    }

    const data = await response.json()
    return data.response || 'I apologize, but I didn\'t receive a proper response. Please try again.'
  } catch (error: any) {
    console.error('Chat API Error:', error)
    console.error('Error details:', {
      message: error?.message,
      stack: error?.stack,
      name: error?.name,
    })
    
    // Re-throw with more context
    const errorMessage = error?.message || 'Unknown error occurred'
    throw new Error(`Chat API Error: ${errorMessage}`)
  }
}

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

