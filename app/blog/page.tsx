import Breadcrumbs from '@/components/Breadcrumbs'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog - MscTutor | Educational Articles & Learning Tips',
  description: 'Read educational articles, learning tips, and updates from MscTutor. Get study tips for math, science, and commerce.',
  keywords: 'education blog, math tips, science tips, study tips, learning blog, educational articles, exam preparation tips',
}
  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumbs items={[{ label: 'Blog' }]} />
      <h1 className="text-4xl font-bold mb-8">Blog</h1>
      <p className="text-lg text-gray-600 dark:text-gray-400">
        Educational articles and updates will appear here.
      </p>
    </div>
  )
}
