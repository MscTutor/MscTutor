import Breadcrumbs from '@/components/Breadcrumbs'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Attribution - MscTutor | Credits and Acknowledgments',
  description: 'Attribution and credits for MscTutor. Learn about the open-source libraries and resources used. Contact: help.msctutor@gmail.com',
  keywords: 'msctutor attribution, credits, open source, education platform credits',
}

export default function AttributionPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumbs items={[{ label: 'Attribution' }]} />
      <h1 className="text-4xl font-bold mb-8">Attribution</h1>
      <div className="max-w-3xl mx-auto prose dark:prose-invert">
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">About MscTutor</h2>
          <p>
            <strong>Author:</strong> Riyaz Mohammad
          </p>
          <p>
            <strong>Address:</strong> Dola, Madhya Pradesh, India
          </p>
          <p>
            <strong>Contact:</strong> <a href="mailto:help.msctutor@gmail.com" className="text-primary-600 hover:underline">help.msctutor@gmail.com</a>
          </p>
        </section>
        <p>
          MscTutor uses various open-source libraries and resources. We acknowledge and thank the following:
        </p>
        <section className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">Images</h2>
          <p>
            Images are sourced from Unsplash and Wikimedia Commons under their respective licenses.
          </p>
        </section>
        <section className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">Icons</h2>
          <p>
            Icons provided by Lucide React and other open-source icon libraries.
          </p>
        </section>
        <section className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">Libraries</h2>
          <p>
            This project uses Next.js, React, Tailwind CSS, Prisma, Firebase, and other open-source technologies.
          </p>
        </section>
      </div>
    </div>
  )
}
