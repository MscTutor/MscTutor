import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import Breadcrumbs from '@/components/Breadcrumbs'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Classes 1-12 - MscTutor | Free Online Classes for Math, Science & Commerce',
  description: 'Browse all classes from Class 1 to Class 12. Free online math, science, and commerce classes with NCERT solutions, CBSE syllabus, and AI-powered learning.',
  keywords: 'class 1 to 12, online classes, free classes, class 10, class 12, CBSE classes, NCERT classes, math classes, science classes, commerce classes',
}

export default async function ClassesPage() {
  // Fetch classes from database
  const classes = await prisma.class.findMany({
    orderBy: { order: 'asc' },
  })

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumbs items={[{ label: 'Classes' }]} />
      <h1 className="text-4xl font-bold mb-8">Classes</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {classes.map((classItem) => (
          <Link
            key={classItem.id}
            href={`/class/${classItem.name}`}
            className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-lg transition-shadow border border-gray-200 dark:border-gray-700"
          >
            <h2 className="text-2xl font-semibold mb-2">{classItem.displayName}</h2>
            <p className="text-gray-600 dark:text-gray-400">
              Explore subjects and chapters for {classItem.displayName}
            </p>
          </Link>
        ))}
      </div>
    </div>
  )
}
