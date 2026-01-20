# MscTutor - Complete Education Platform

A production-grade global education platform for Math, Science & Commerce (Class 1-12) with AI-powered question solving, step-by-step solutions, and interactive learning.

## Features

- **Question-Centric Architecture**: Every question is a permanent, SEO-indexable page
- **AI-Powered Learning**: DeepSeek AI integration with context-locked chat
- **Visual Question Scanner**: Camera-based OCR with Google Lens-style functionality
- **Voice Assistant**: Multilingual voice explanations
- **Interactive Calculators**: Scientific, Graphing, and Unit Converter
- **Credit System**: Flexible pricing with credit-based AI usage
- **Multi-Database Architecture**: MySQL (PlanetScale) + Firebase + Cloudflare R2 + Storj

## Tech Stack

- **Frontend**: Next.js 14 (App Router), Tailwind CSS, TypeScript
- **Backend**: Next.js Server Actions, Prisma ORM
- **Database**: MySQL (PlanetScale), Firebase Firestore
- **Storage**: Cloudflare R2, Storj, Firebase Storage
- **AI**: DeepSeek API (placeholder)
- **OCR**: Google Vision API, EasyOCR, PaddleOCR (placeholders)

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn
- MySQL database (or PlanetScale account)
- Firebase project
- Google Cloud Vision API key (optional, for OCR)

### Installation

1. Clone the repository:
```bash
cd Desktop/MscTutor
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

Edit `.env` with your configuration:
- Database URL (MySQL/PlanetScale)
- Firebase credentials
- Google Vision API key
- Cloudflare R2 credentials
- Storj credentials
- DeepSeek API key

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
1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

### Cloud Run Deployment
1. Build Docker image
2. Push to Google Container Registry
3. Deploy to Cloud Run
4. Configure environment variables

## Environment Variables

See `.env.example` for all required environment variables.

## License

[Add your license here]

## Support

For support, email help.msctutor@gmail.com or visit the support page.

## Contact

**Email:** help.msctutor@gmail.com  
**Address:** Dola, Madhya Pradesh, India  
**Author:** Riyaz Mohammad
