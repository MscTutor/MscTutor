import Breadcrumbs from '@/components/Breadcrumbs'
import type { Metadata } from 'next'
import { Mail } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Support - MscTutor | Help Center for Math, Science & Commerce',
  description: 'Get support for MscTutor. Find answers to FAQs, contact us at help.msctutor@gmail.com, or visit our help center.',
  keywords: 'msctutor support, math help, science help, commerce help, online learning support, education help',
}

export default function SupportPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumbs items={[{ label: 'Support' }]} />
      <h1 className="text-4xl font-bold mb-8">Support</h1>
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="bg-primary-50 dark:bg-primary-900/20 rounded-lg p-6 border border-primary-200 dark:border-primary-800">
          <div className="flex items-center gap-3 mb-2">
            <Mail className="w-5 h-5 text-primary-600" />
            <h2 className="text-xl font-semibold">Need Help?</h2>
          </div>
          <p className="text-gray-700 dark:text-gray-300 mb-2">
            Contact us at: <a href="mailto:help.msctutor@gmail.com" className="text-primary-600 hover:underline font-semibold">help.msctutor@gmail.com</a>
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            We typically respond within 24 hours.
          </p>
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <h3 className="font-semibold mb-2">How do credits work?</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Credits are used for AI queries, image uploads, and memory storage. Each action consumes a certain number of credits based on your plan.
              </p>
            </div>
            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <h3 className="font-semibold mb-2">Can I cancel my subscription?</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Yes, you can cancel your subscription at any time from your dashboard. Your access will continue until the end of your billing period.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
