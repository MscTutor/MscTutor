import Breadcrumbs from '@/components/Breadcrumbs'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service - MscTutor | User Agreement',
  description: 'Read MscTutor terms of service. Understand our user agreement and policies. Contact us at help.msctutor@gmail.com for questions.',
  keywords: 'msctutor terms of service, user agreement, online learning terms, education platform terms',
}

export default function TermsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumbs items={[{ label: 'Terms of Service' }]} />
      <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
      <div className="max-w-3xl mx-auto prose dark:prose-invert">
        <p className="text-gray-600 dark:text-gray-400">
          Last updated: {new Date().toLocaleDateString()}
        </p>
        <section className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">Acceptance of Terms</h2>
          <p>
            By accessing and using MscTutor, you accept and agree to be bound by the terms and provision of this agreement.
          </p>
        </section>
        <section className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">Use License</h2>
          <p>
            Permission is granted to temporarily access the materials on MscTutor for personal, non-commercial transitory viewing only.
          </p>
        </section>
        <section className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">User Accounts</h2>
          <p>
            You are responsible for maintaining the confidentiality of your account and password and for restricting access to your computer.
          </p>
        </section>
        <section className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
          <p>
            For questions about these terms, please contact us at:{' '}
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
