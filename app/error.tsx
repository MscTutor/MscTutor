'use client'

import { useEffect } from 'react'
import Link from 'next/link'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <h1 className="text-6xl font-bold mb-4">500</h1>
      <h2 className="text-2xl font-semibold mb-4">Something went wrong!</h2>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        {error.message || 'An unexpected error occurred'}
      </p>
      <div className="flex gap-4 justify-center">
        <button
          onClick={reset}
          className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
        >
          Try Again
        </button>
        <Link
          href="/"
          className="px-6 py-3 bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
        >
          Go Home
        </Link>
      </div>
    </div>
  )
}
