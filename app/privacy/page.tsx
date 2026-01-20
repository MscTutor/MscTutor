import Breadcrumbs from '@/components/Breadcrumbs'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy - MscTutor | Your Data Protection',
  description: 'Read MscTutor privacy policy. Learn how we protect your data and privacy. Contact us at help.msctutor@gmail.com for privacy concerns.',
  keywords: 'msctutor privacy policy, data protection, online learning privacy, education platform privacy',
}

export default function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumbs items={[{ label: 'Privacy Policy' }]} />
      <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
      <div className="max-w-3xl mx-auto prose dark:prose-invert">
        <p className="text-gray-600 dark:text-gray-400">
          Last updated: {new Date().toLocaleDateString()}
        </p>
        <section className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">Information We Collect</h2>
          <p>
            We collect information that you provide directly to us, including when you create an account, use our services, or contact us for support.
          </p>
        </section>
        <section className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">How We Use Your Information</h2>
          <p>
            We use the information we collect to provide, maintain, and improve our services, process transactions, and communicate with you.
          </p>
        </section>
        <section className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">Data Security</h2>
          <p>
            We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
          </p>
        </section>
        <section className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
          <p>
            For privacy concerns or questions, please contact us at:{' '}
            <a href="mailto:help.msctutor@gmail.com" className="text-primary-600 hover:underline">
              help.msctutor@gmail.com
            </a>
          </p>
          <p className="mt-2">
            <strong>Address:</strong> Dola, Madhya Pradesh, India
          </p>
          <p className="mt-2">
            <strong>Author:</strong> Riyaz Mohammad
          </p>
        </section>
      </div>
    </div>
  )
}
