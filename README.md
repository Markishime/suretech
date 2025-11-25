# Suretech Network and Data Solution Website

A modern, AI-powered website built with Next.js, Firebase, and Gemini AI for Suretech Network and Data Solution - a trusted provider of comprehensive ICT solutions in Cebu, Philippines.

## Features

- 🚀 **Next.js 14** - Fast, SEO-friendly React app with server-side rendering
- 🔥 **Firebase** - Authentication, Firestore database, and hosting
- 🤖 **Gemini AI** - 24/7 AI chatbot for customer support
- 🎨 **Modern UI** - Dark green/teal theme with AI-inspired design elements
- ✨ **Framer Motion** - Smooth animations and transitions
- 📱 **Responsive Design** - Mobile-first, fully responsive layout
- 🎯 **SEO Optimized** - Meta tags and structured data for search engines

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Forms**: React Hook Form
- **Notifications**: React Hot Toast
- **Backend**: Firebase (Firestore, Auth, Storage)
- **AI**: Google Gemini API

## Firebase Setup

1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
2. Enable Firestore Database
3. Set up Firestore security rules:
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /inquiries/{document=**} {
      allow create: if true;
      allow read, update, delete: if request.auth != null;
    }
  }
}
```
4. Copy your Firebase config values to `.env.local`

## Gemini AI Setup

1. Get your API key from [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Add the key to `.env.local` as `NEXT_PUBLIC_GEMINI_API_KEY`

## Project Structure

```
suretech/
├── app/                    # Next.js App Router pages
│   ├── about/             # About Us page
│   ├── services/          # Services page
│   ├── clients/           # Clients/Industries page
│   ├── why-choose-us/     # Why Choose Us page
│   ├── certifications/    # Certifications page
│   ├── contact/           # Contact page
│   ├── insights/          # Tech Insights page
│   ├── innovation/        # Innovation Hub page
│   ├── shop/              # Shop page (placeholder)
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   ├── not-found.tsx      # 404 page
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── Header.tsx         # Navigation header
│   ├── Footer.tsx         # Footer component
│   └── ChatbotWidget.tsx  # AI chatbot widget
├── lib/                   # Utility libraries
│   ├── firebase.ts        # Firebase configuration
│   └── gemini.ts          # Gemini AI integration
└── public/                # Static assets
```

## Pages

- **Home** (`/`) - Landing page with hero section, services overview, and CTAs
- **About Us** (`/about`) - Company overview, vision, mission, and core values
- **Services** (`/services`) - Detailed service offerings
- **Clients** (`/clients`) - Industries served
- **Why Choose Us** (`/why-choose-us`) - Competitive advantages
- **Certifications** (`/certifications`) - Business registrations and certificates
- **Contact** (`/contact`) - Contact form and information

## Features Overview

### AI Chatbot
- 24/7 availability via Gemini AI
- Answers questions about services, pricing, and company information
- Floating chat widget accessible from all pages

### Contact Form
- Integrated with Firebase Firestore
- Form validation with React Hook Form
- Email notifications (via Firebase Functions - to be configured)

### Responsive Design
- Mobile-first approach
- Optimized for all screen sizes
- Touch-friendly navigation

### SEO Optimization
- Meta tags for all pages
- Semantic HTML structure
- Optimized images with Next.js Image component

## Customization

### Colors
Edit `tailwind.config.ts` to customize the color scheme:
- Primary colors: Dark green/teal theme
- AI accent colors: Glow effects

### Content
- Update company information in respective page components
- Modify chatbot knowledge base in `lib/gemini.ts`
- Add/remove services in `app/services/page.tsx`

## Future Enhancements

- [ ] CMS-powered publishing for Tech Insights
- [ ] Innovation Hub success stories archive
- [ ] Online shop integration
- [ ] Google Analytics integration
- [ ] Email notifications via Firebase Functions
- [ ] Multi-language support
- [ ] Admin dashboard for content management

## Support

For questions or support, contact:
- Email: suretechnetworkanddatasolution@gmail.com
- Phone: 0970 210 1773 / 0956 703 1254

## License

© 2025 Suretech Network and Data Solution. All rights reserved.
