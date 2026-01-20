import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import VoiceAssistant from '@/components/VoiceAssistant'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'MscTutor - Free Online Math, Science & Commerce Classes 1-12 | AI Tutor',
  description: 'Complete free online education platform for Class 1-12 Math, Science & Commerce. AI-powered question solving, step-by-step solutions, NCERT solutions, CBSE syllabus, and interactive learning. Learn algebra, geometry, physics, chemistry, biology online.',
  keywords: 'online math classes, free math tutor, science classes online, commerce classes, class 10 math, class 12 math, NCERT solutions, CBSE syllabus, algebra, geometry, trigonometry, calculus, physics, chemistry, biology, online learning, AI tutor, math help, science help, homework help, exam preparation, study materials, practice questions, solved examples',
  authors: [{ name: 'Riyaz Mohammad' }],
  creator: 'Riyaz Mohammad',
  publisher: 'MscTutor',
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://msctutor.com'),
  openGraph: {
    title: 'MscTutor - Free Online Math, Science & Commerce Classes',
    description: 'Complete free online education platform for Class 1-12 with AI-powered solutions',
    type: 'website',
    locale: 'en_IN',
    siteName: 'MscTutor',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MscTutor - Free Online Math, Science & Commerce Classes',
    description: 'Complete free online education platform for Class 1-12',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta name="author" content="Riyaz Mohammad" />
        <meta name="geo.region" content="IN-MP" />
        <meta name="geo.placename" content="Dola, Madhya Pradesh" />
      </head>
      <body className={inter.className}>
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
        <VoiceAssistant />
      </body>
    </html>
  )
}
