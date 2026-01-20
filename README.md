# MscTutor - Complete Education Platform

A production-grade global education platform for Math, Science & Commerce (Class 1-12) with AI-powered question solving, step-by-step solutions, and interactive learning.

**Website:** [msctutor.com](https://msctutor.com)  
**Firebase Project:** `msctutor-2fcbb`

## Features

- **Question-Centric Architecture**: Every question is a permanent, SEO-indexable page
- **AI-Powered Learning**: DeepSeek AI integration with context-locked chat and history
- **Visual Question Scanner**: Camera-based OCR with Google Vision API
- **Voice Assistant**: Multilingual voice explanations
- **Interactive Calculators**: Scientific and Unit Converter
- **Credit System**: Flexible pricing with credit-based AI usage
- **Multi-Database Architecture**: MySQL (PlanetScale) + Firebase Firestore + Cloudflare R2

## Tech Stack

- **Frontend**: Next.js 14 (App Router), Tailwind CSS, TypeScript
- **Backend**: Next.js Server Actions, Prisma ORM
- **Database**: MySQL (PlanetScale), Firebase Firestore
- **Storage**: Cloudflare R2, Firebase Storage
- **AI**: DeepSeek API / OpenAI
- **OCR**: Google Cloud Vision API

## Quick Start

### Prerequisites

- Node.js 18+ and npm/yarn
- MySQL database (or PlanetScale account)
- Firebase project (`msctutor-2fcbb`)
- Google Cloud Vision API key (optional, for OCR)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/MscTutor/MscTutor.git
cd MscTutor
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

Edit `.env` with your configuration. See `.env.example` for all required variables.

4. Set up the database:
```bash
npx prisma generate
npx prisma db push
```

5. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Firebase Setup

See `SETUP_FIREBASE_R2_MSCTUTOR.md` for detailed Firebase console setup instructions.

**Quick steps:**
1. Enable Authentication (Email/Password)
2. Create Firestore Database (Production mode)
3. Enable Storage
4. Generate Service Account key
5. Copy all keys to `.env` file

## Project Structure

```
MscTutor/
├── app/                    # Next.js App Router pages
│   ├── api/               # API routes
│   ├── classes/           # Classes listing
│   ├── subjects/          # Subjects listing
│   ├── class/[class]/     # Class-specific pages
│   ├── question/[slug]/   # Question pages
│   ├── dashboard/         # User dashboard
│   ├── admin/            # Admin panel
│   └── ...
├── components/            # React components
│   ├── CameraScanner.tsx  # Visual question scanner
│   ├── AIChat.tsx        # AI chat interface
│   ├── VoiceAssistant.tsx # Voice assistant
│   └── calculators/      # Calculator components
├── lib/                   # Utility libraries
│   ├── prisma.ts         # Prisma client
│   ├── firebase.ts       # Firebase client
│   ├── googleVision.ts   # Google Vision API
│   ├── formulaParser.ts  # Formula parsing
│   └── visualQuestionBuilder.ts # Question creation
└── prisma/
    └── schema.prisma     # Database schema
```

## Key Features Implementation

### Visual Question Scanner
- Mobile camera support
- Desktop image upload
- OCR pipeline (EasyOCR + PaddleOCR + Google Vision)
- Formula detection and LaTeX conversion
- Automatic question creation

### AI System
- Context-locked chat per question
- Credit-based usage
- User memory storage
- DeepSeek API integration (placeholder)

### SEO Optimization
- Dynamic sitemap generation
- JSON-LD schema markup
- Breadcrumb navigation
- Internal linking mesh
- Question-based URLs

### Admin System
- Content management (classes, subjects, chapters, questions)
- Formula and experiment management
- Image upload management
- User content moderation

## Database Schema

- **Classes**: Class 1-12
- **Subjects**: Math, Science, Commerce
- **Chapters**: Subject chapters
- **Questions**: Core question unit
- **Solutions**: Step-by-step solutions
- **Formulas**: Formula bank
- **Experiments**: Experiments and examples

## Deployment

### Vercel Deployment

1. Push code to GitHub (already done)
2. Import project in Vercel: [vercel.com](https://vercel.com)
3. Add all environment variables from `.env.example` to Vercel → Project → Settings → Environment Variables
4. Set `NODE_ENV=production` and `NEXT_PUBLIC_APP_URL=https://msctutor.com`
5. Deploy

**Important:** For `FIREBASE_ADMIN_PRIVATE_KEY`, paste the entire key including `\n` characters. Vercel supports multi-line environment variables.

## Environment Variables

See `.env.example` for complete list of all required environment variables with detailed comments.

**Key variables:**
- `DATABASE_URL` - MySQL connection string
- `NEXT_PUBLIC_FIREBASE_*` - Firebase client config
- `FIREBASE_ADMIN_*` - Firebase Admin SDK credentials
- `DEEPSEEK_API_KEY` or `OPENAI_API_KEY` - AI service
- `GOOGLE_VISION_API_KEY` - OCR service
- `R2_*` - Cloudflare R2 storage (optional for now)

## License

[Add your license here]

## Support

For support, email help.msctutor@gmail.com or visit the support page.

## Contact

**Email:** help.msctutor@gmail.com  
**Address:** Dola, Madhya Pradesh, India  
**Author:** Riyaz Mohammad
=======
