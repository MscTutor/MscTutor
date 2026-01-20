import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import Breadcrumbs from '@/components/Breadcrumbs'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Subjects - MscTutor | Math, Science & Commerce Online Classes',
  description: 'Explore Math, Science, and Commerce subjects for all classes. Free online learning with step-by-step solutions, formulas, and practice questions.',
  keywords: 'math subjects, science subjects, commerce subjects, online math, online science, algebra, geometry, physics, chemistry, biology, accountancy, economics',
}

export default async function SubjectsPage() {
  const subjects = await prisma.subject.findMany({
    include: {
      class: true,
    },
    orderBy: [
      { class: { order: 'asc' } },
      { displayName: 'asc' },
    ],
  })

  // Group by class
  const subjectsByClass = subjects.reduce((acc, subject) => {
    const className = subject.class.displayName
    if (!acc[className]) {
      acc[className] = []
    }
    acc[className].push(subject)
    return acc
  }, {} as Record<string, typeof subjects>)

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumbs items={[{ label: 'Subjects' }]} />
      <h1 className="text-4xl font-bold mb-8">Subjects</h1>
      {Object.entries(subjectsByClass).map(([className, classSubjects]) => (
        <div key={className} className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">{className}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {classSubjects.map((subject) => (
              <Link
                key={subject.id}
                href={`/class/${subject.class.name}/subject/${subject.slug}`}
                className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-lg transition-shadow border border-gray-200 dark:border-gray-700"
              >
                <h3 className="text-lg font-semibold mb-2">{subject.displayName}</h3>
                {subject.description && (
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {subject.description}
                  </p>
                )}
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
