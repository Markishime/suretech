# Quick Start Guide

## Step 1: Install Dependencies

```bash
npm install
```

## Step 2: Set Up Environment Variables

1. Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

2. Fill in your Firebase and Gemini API credentials in `.env.local`

## Step 3: Set Up Firebase

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project
3. Enable Firestore Database
4. Copy your Firebase config values to `.env.local`

## Step 4: Set Up Gemini AI

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create an API key
3. Add it to `.env.local` as `NEXT_PUBLIC_GEMINI_API_KEY`

## Step 5: Run Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

## Step 6: Build for Production

```bash
npm run build
```

## Step 7: Deploy

### Option A: Firebase Hosting

```bash
firebase login
firebase init
firebase deploy
```

### Option B: Vercel

1. Push to GitHub
2. Import in Vercel
3. Add environment variables
4. Deploy

## Troubleshooting

### TypeScript Errors
Run `npm install` to install all dependencies first.

### Firebase Connection Issues
- Verify your Firebase config in `.env.local`
- Check Firestore rules in `firestore.rules`
- Ensure Firestore is enabled in Firebase Console

### Gemini AI Not Working
- Verify your API key is correct
- Check API quota limits
- Ensure the key has proper permissions

## Next Steps

1. Customize content in page components
2. Update chatbot knowledge base in `lib/gemini.ts`
3. Add your company images to `public/` folder
4. Configure email notifications via Firebase Functions
5. Set up Google Analytics

