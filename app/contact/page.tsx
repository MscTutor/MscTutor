import Breadcrumbs from '@/components/Breadcrumbs'
import type { Metadata } from 'next'
import { Mail, MapPin } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Contact Us - MscTutor | Get Help with Math, Science & Commerce',
  description: 'Contact MscTutor for support, questions, or feedback. Email us at help.msctutor@gmail.com. Located in Dola, Madhya Pradesh, India.',
  keywords: 'contact msctutor, math help, science help, commerce help, online tutor contact, education support',
}

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumbs items={[{ label: 'Contact' }]} />
      <h1 className="text-4xl font-bold mb-8">Contact Us</h1>
      <div className="max-w-2xl mx-auto space-y-6 mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-semibold mb-4">Get in Touch</h2>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Mail className="w-5 h-5 text-primary-600 mt-1 flex-shrink-0" />
              <div>
                <p className="font-semibold">Email</p>
                <a href="mailto:help.msctutor@gmail.com" className="text-primary-600 hover:underline">
                  help.msctutor@gmail.com
                </a>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-primary-600 mt-1 flex-shrink-0" />
              <div>
                <p className="font-semibold">Address</p>
                <p className="text-gray-600 dark:text-gray-400">
                  Dola, Madhya Pradesh, India
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-5 h-5 mt-1 flex-shrink-0"></div>
              <div>
                <p className="font-semibold">Author</p>
                <p className="text-gray-600 dark:text-gray-400">
                  Riyaz Mohammad
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-2xl mx-auto">
        <form className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium mb-2">
              Message
            </label>
            <textarea
              id="message"
              rows={6}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
          <button
            type="submit"
            className="w-full px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  )
}
