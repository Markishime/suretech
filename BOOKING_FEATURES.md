# Booking System & Business Features Documentation

## Overview
This document outlines all the booking and business enhancement features added to the Suretech Network and Data Solution website.

## 🎯 Core Booking Features

### 1. Manual Booking System (`/book`)
- **Full-featured booking form** with:
  - Service selection (7 service types)
  - Date picker (Monday-Friday only, up to 90 days ahead)
  - Time slot selection (8 AM - 6 PM, with availability checking)
  - Location type selection (Home/Office/Building/Other)
  - Full address input
  - Optional tip/compensation field
  - Additional message field

- **Working Hours Validation**:
  - Only accepts bookings Monday-Friday
  - Time slots: 8:00 AM - 6:00 PM
  - Automatically filters out past dates/times
  - Checks for already booked slots

- **Firestore Collection**: `bookings`
  - Stores all booking data
  - Status tracking: pending → confirmed → completed → cancelled
  - Includes tip/compensation field

### 2. AI Chatbot Booking (`/components/ChatbotWidget.tsx`)
- **Enhanced chatbot** that can:
  - Detect booking intent from user messages
  - Guide users through booking process
  - Provide booking information
  - Quick action button to `/book` page

- **Booking Detection** (`/lib/gemini-booking.ts`):
  - Uses Gemini AI to detect booking requests
  - Extracts booking information from natural language
  - Guides users to provide required details

## 📦 Business Enhancement Features

### 3. Service Packages (`/packages`)
- **Three pricing tiers**:
  - Basic Package: ₱5,000+ (small homes/offices)
  - Professional Package: ₱15,000+ (medium businesses) - Most Popular
  - Enterprise Package: Custom Quote (large businesses)

- Features comparison
- Direct booking links for each package

### 4. Reviews & Ratings System (`/reviews`)
- **Customer review system**:
  - 5-star rating system
  - Written reviews with service type
  - Average rating display
  - Verified review badges
  - Review submission form

- **Firestore Collection**: `reviews`
  - Stores customer reviews
  - Includes rating, comment, service type
  - Timestamp and verification status

### 5. Referral Program (`/referral`)
- **Referral system** with:
  - Unique referral codes
  - Shareable referral links
  - Benefits for both referrer and referee:
    - Referrer: 10% discount on next service
    - Referee: 5% discount on first booking
  - Step-by-step guide
  - Terms & conditions

## 🔧 Technical Implementation

### Firestore Collections

1. **`bookings`**
   ```typescript
   {
     name: string
     email: string
     phone: string
     service: string
     date: string (YYYY-MM-DD)
     time: string (HH:MM)
     location: string (home/office/building/other)
     address: string
     message?: string
     tip?: number
     status: 'pending' | 'confirmed' | 'completed' | 'cancelled'
     timestamp: Date
   }
   ```

2. **`reviews`**
   ```typescript
   {
     name: string
     email: string
     rating: number (1-5)
     service: string
     comment: string
     timestamp: Date
     verified: boolean
   }
   ```

3. **`inquiries`** (existing)
   - Contact form submissions

### Security Rules (`firestore.rules`)
- Bookings: Anyone can create, authenticated users can read/update/delete
- Reviews: Anyone can create/read, users can update/delete their own
- Inquiries: Anyone can create, authenticated users can read/update/delete

### Working Hours Configuration (`lib/booking.ts`)
- Start: 8:00 AM
- End: 6:00 PM
- Days: Monday-Friday (1-5)
- Timezone: Philippines (UTC+8)

## 🎨 UI/UX Features

### Navigation Updates
- Added "Book" link to main navigation
- Added booking-related links to footer
- Quick booking button in chatbot

### Home Page Updates
- Primary CTA changed to "Book Appointment Now"
- Booking-focused messaging

### Chatbot Enhancements
- Booking detection and guidance
- Quick action button for booking
- Enhanced welcome message with booking info

## 📱 User Flow

### Booking Flow
1. User visits `/book` or chats with AI
2. Selects service type
3. Chooses date (Monday-Friday only)
4. Selects available time slot
5. Provides location and address
6. Optionally adds tip/compensation
7. Submits booking
8. Receives confirmation message
9. Booking stored in Firestore with "pending" status

### Review Flow
1. User visits `/reviews`
2. Views existing reviews and ratings
3. Clicks "Write a Review"
4. Fills out review form
5. Submits review
6. Review stored in Firestore (pending verification)

### Referral Flow
1. User visits `/referral`
2. Views referral benefits
3. Copies referral link/code
4. Shares with friends
5. Friend books using referral link
6. Both parties receive discounts

## 🚀 Future Enhancements

### Admin Dashboard (Pending)
- View and manage bookings
- Update booking status
- View analytics and reports
- Manage reviews (verify/approve)

### Email Notifications
- Booking confirmation emails
- Reminder emails
- Review verification emails

### Calendar Integration
- Google Calendar sync
- Outlook calendar support

### Payment Integration
- Online payment for tips
- Deposit/payment options

## 📊 Analytics & Tracking

### Metrics to Track
- Booking conversion rate
- Most popular services
- Average tip amount
- Review ratings distribution
- Referral program usage
- Peak booking times

## 🔐 Security Considerations

- All bookings validated for working hours
- Date/time validation prevents past bookings
- Firestore security rules protect data
- Email verification for reviews (future)
- Rate limiting for booking submissions (future)

## 📝 Notes

- Working hours are hardcoded but can be made configurable
- Time slots are generated dynamically based on availability
- Tips are optional and stored as numbers (PHP)
- Referral codes are currently static but can be made dynamic per user
- Review verification is manual (can be automated)

