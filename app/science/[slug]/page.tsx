import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import Breadcrumbs from '@/components/Breadcrumbs'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const branch = await prisma.scienceBranch.findUnique({
    where: { slug: params.slug },
  })

  if (!branch) {
    return { title: 'Science Branch Not Found - MscTutor' }
  }

  return {
    title: `${branch.displayName} - MscTutor | Complete Online Classes`,
    description: `Learn ${branch.displayName} online. Complete chapters, experiments, formulas, and AI-powered solutions for all classes.`,
    keywords: `${branch.displayName.toLowerCase()}, science, online classes, experiments, formulas, ${branch.displayName.toLowerCase()} solutions`,
  }
}

export default async function ScienceBranchPage({
  params,
}: {
  params: { slug: string }
}) {
  const branch = await prisma.scienceBranch.findUnique({
    where: { slug: params.slug },
    include: {
      chapters: {
        include: {
          subject: {
            include: {
              class: true,
            },
          },
        },
        orderBy: [
          { subject: { class: { order: 'asc' } } },
          { order: 'asc' },
        ],
      },
    },
  })

  if (!branch) {
    notFound()
  }

  // Group chapters by class
  const chaptersByClass = branch.chapters.reduce((acc, chapter) => {
    const className = chapter.subject.class.displayName
    if (!acc[className]) {
      acc[className] = []
    }
    acc[className].push(chapter)
    return acc
  }, {} as Record<string, typeof branch.chapters>)

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumbs
        items={[
          { label: 'Science', href: '/science' },
          { label: branch.displayName },
        ]}
      />
      <h1 className="text-4xl font-bold mb-4">{branch.displayName}</h1>
      {branch.description && (
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
          {branch.description}
        </p>
      )}

      <div className="space-y-8">
        {Object.entries(chaptersByClass).map(([className, chapters]) => (
          <div key={className}>
            <h2 className="text-2xl font-semibold mb-4">{className}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {chapters.map((chapter) => (
                <Link
                  key={chapter.id}
                  href={`/class/${chapter.subject.class.name}/subject/${chapter.subject.slug}/chapter/${chapter.slug}`}
                  className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <h3 className="font-semibold mb-1">{chapter.name}</h3>
                  {chapter.description && (
                    <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                      {chapter.description}
                    </p>
                  )}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
