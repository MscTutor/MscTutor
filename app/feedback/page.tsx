import Breadcrumbs from '@/components/Breadcrumbs'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Feedback - MscTutor | Share Your Thoughts',
  description: 'Share your feedback about MscTutor. Help us improve our platform for math, science, and commerce education.',
  keywords: 'msctutor feedback, education feedback, online learning feedback, math tutor feedback',
}

export default function FeedbackPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumbs items={[{ label: 'Feedback' }]} />
      <h1 className="text-4xl font-bold mb-8">Feedback</h1>
      <div className="max-w-2xl mx-auto space-y-6 mb-6">
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
          <p className="text-sm text-gray-700 dark:text-gray-300">
            Your feedback helps us improve. You can also email us directly at:{' '}
            <a href="mailto:help.msctutor@gmail.com" className="text-blue-600 dark:text-blue-400 hover:underline font-semibold">
              help.msctutor@gmail.com
            </a>
          </p>
        </div>
      </div>
      <div className="max-w-2xl mx-auto">
        <form className="space-y-6">
          <div>
            <label htmlFor="feedback" className="block text-sm font-medium mb-2">
              Your Feedback
            </label>
            <textarea
              id="feedback"
              rows={8}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder="Share your thoughts, suggestions, or report issues..."
            />
          </div>
          <button
            type="submit"
            className="w-full px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            Submit Feedback
          </button>
        </form>
      </div>
    </div>
  )
}
