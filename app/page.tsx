import Link from 'next/link'
import { BookOpen, Calculator, Brain, Users } from 'lucide-react'
import CameraScanner from '@/components/CameraScanner'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'MscTutor - Free Online Math, Science & Commerce Classes 1-12 | AI Tutor',
  description: 'Complete free online education platform for Class 1-12 Math, Science & Commerce. AI-powered question solving, step-by-step solutions, NCERT solutions, CBSE syllabus. Learn algebra, geometry, physics, chemistry online.',
  keywords: 'online math classes, free math tutor, science classes online, commerce classes, class 10 math, class 12 math, NCERT solutions, CBSE syllabus, algebra, geometry, trigonometry, calculus, physics, chemistry, biology, online learning, AI tutor',
}

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6">
              Welcome to MscTutor
            </h1>
            <p className="text-xl mb-8 text-primary-100">
              Your complete learning platform for Math, Science & Commerce
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <CameraScanner />
              <Link
                href="/classes"
                className="px-6 py-3 bg-white text-primary-600 rounded-lg hover:bg-primary-50 transition-colors font-medium"
              >
                Browse Classes
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 sm:py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12">
            Why Choose MscTutor?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <BookOpen className="w-12 h-12 text-primary-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Comprehensive Content</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Class 1-12 curriculum with detailed chapters, formulas, and solutions
              </p>
            </div>
            <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <Brain className="w-12 h-12 text-primary-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">AI-Powered Learning</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Get instant help with AI chat, step-by-step solutions, and personalized guidance
              </p>
            </div>
            <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <Calculator className="w-12 h-12 text-primary-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Interactive Tools</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Scientific calculator, graphing tools, and unit converters at your fingertips
              </p>
            </div>
            <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <Users className="w-12 h-12 text-primary-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Community Support</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Discuss questions, share solutions, and learn together
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-12 sm:py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12">
            Get Started
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 max-w-4xl mx-auto">
            <Link
              href="/classes"
              className="p-6 bg-white dark:bg-gray-900 rounded-lg shadow hover:shadow-lg transition-shadow"
            >
              <h3 className="text-xl font-semibold mb-2">Browse Classes</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Explore content from Class 1 to Class 12
              </p>
            </Link>
            <Link
              href="/subjects"
              className="p-6 bg-white dark:bg-gray-900 rounded-lg shadow hover:shadow-lg transition-shadow"
            >
              <h3 className="text-xl font-semibold mb-2">View Subjects</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Math, Science, Commerce and more
              </p>
            </Link>
            <Link
              href="/pricing"
              className="p-6 bg-white dark:bg-gray-900 rounded-lg shadow hover:shadow-lg transition-shadow"
            >
              <h3 className="text-xl font-semibold mb-2">View Pricing</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Choose the plan that works for you
              </p>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
