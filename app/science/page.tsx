import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import Breadcrumbs from '@/components/Breadcrumbs'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Science Subjects - MscTutor | Physics, Chemistry, Biology Online Classes',
  description: 'Explore Science subjects: Physics, Chemistry, Biology, Geology, Environmental Science, Astronomy. Complete online classes with experiments, formulas, and AI-powered learning.',
  keywords: 'physics, chemistry, biology, science subjects, online science classes, science experiments, science formulas',
}

export default async function SciencePage() {
  const branches = await prisma.scienceBranch.findMany({
    orderBy: { order: 'asc' },
  })

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumbs items={[{ label: 'Science' }]} />
      <h1 className="text-4xl font-bold mb-8">Science Subjects</h1>
      <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
        Explore all science branches with complete chapters, experiments, formulas, and AI-powered learning.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {branches.map((branch) => (
          <Link
            key={branch.id}
            href={`/science/${branch.slug}`}
            className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-lg transition-shadow border border-gray-200 dark:border-gray-700"
          >
            <h2 className="text-2xl font-semibold mb-2">{branch.displayName}</h2>
            {branch.description && (
              <p className="text-gray-600 dark:text-gray-400">{branch.description}</p>
            )}
          </Link>
        ))}
      </div>
    </div>
  )
}
