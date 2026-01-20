'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X, Search, User, CreditCard } from 'lucide-react'
import dynamic from 'next/dynamic'

// Lazy load CameraScanner for better performance
const CameraScanner = dynamic(() => import('./CameraScanner'), {
  loading: () => <div className="w-32 h-10 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse" />,
})

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isDark, setIsDark] = useState(false)

  const toggleTheme = () => {
    setIsDark(!isDark)
    document.documentElement.classList.toggle('dark')
  }

  return (
    <header className="sticky top-0 z-40 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-primary-600">
            MscTutor
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-4 lg:gap-6">
            <Link href="/classes" className="hover:text-primary-600 transition-colors text-sm lg:text-base">
              Classes
            </Link>
            <Link href="/subjects" className="hover:text-primary-600 transition-colors text-sm lg:text-base">
              Subjects
            </Link>
            <Link href="/blog" className="hover:text-primary-600 transition-colors text-sm lg:text-base">
              Blog
            </Link>
            <Link href="/pricing" className="hover:text-primary-600 transition-colors text-sm lg:text-base">
              Pricing
            </Link>
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center gap-2 sm:gap-4">
            <div className="hidden sm:block">
              <CameraScanner />
            </div>
            <button
              onClick={toggleTheme}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
              aria-label="Toggle theme"
            >
              {isDark ? '☀️' : '🌙'}
            </button>
            <Link
              href="/dashboard"
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
            >
              <User className="w-5 h-5" />
            </Link>
            <button className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors text-xs sm:text-sm">
              <CreditCard className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="hidden lg:inline">Credits: 0</span>
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex flex-col gap-4">
              <Link href="/classes" className="hover:text-primary-600">
                Classes
              </Link>
              <Link href="/subjects" className="hover:text-primary-600">
                Subjects
              </Link>
              <Link href="/blog" className="hover:text-primary-600">
                Blog
              </Link>
              <Link href="/pricing" className="hover:text-primary-600">
                Pricing
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}
