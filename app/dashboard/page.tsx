import { CreditCard, History, Bookmark, Upload } from 'lucide-react'
import Breadcrumbs from '@/components/Breadcrumbs'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Dashboard - MscTutor | Your Learning Dashboard',
  description: 'Access your MscTutor dashboard. View credits, solved questions, saved items, and learning history.',
  keywords: 'msctutor dashboard, learning dashboard, student dashboard, online learning dashboard',
}
  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumbs items={[{ label: 'Dashboard' }]} />
      <h1 className="text-4xl font-bold mb-8">Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
        <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-primary-100 dark:bg-primary-900 rounded-lg">
              <CreditCard className="w-6 h-6 text-primary-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Credits</p>
              <p className="text-2xl font-bold">0</p>
            </div>
          </div>
        </div>
        <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-100 dark:bg-green-900 rounded-lg">
              <History className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Questions Solved</p>
              <p className="text-2xl font-bold">0</p>
            </div>
          </div>
        </div>
        <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
              <Bookmark className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Saved Questions</p>
              <p className="text-2xl font-bold">0</p>
            </div>
          </div>
        </div>
        <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-lg">
              <Upload className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Uploads</p>
              <p className="text-2xl font-bold">0</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
          <p className="text-gray-600 dark:text-gray-400">No recent activity</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-xl font-semibold mb-4">AI Memory</h2>
          <p className="text-gray-600 dark:text-gray-400">Your AI conversations and saved formulas will appear here</p>
        </div>
      </div>
    </div>
  )
}
