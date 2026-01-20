import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import Breadcrumbs from '@/components/Breadcrumbs'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

export async function generateMetadata({
  params,
}: {
  params: { class: string; subject: string }
}): Promise<Metadata> {
  const subject = await prisma.subject.findFirst({
    where: {
      slug: params.subject,
      class: { name: params.class },
    },
    include: { class: true },
  })

  if (!subject) {
    return {
      title: 'Subject Not Found - MscTutor',
    }
  }

  const subjectKeywords = {
    math: 'algebra, geometry, trigonometry, calculus, mathematics, math problems, math solutions',
    science: 'physics, chemistry, biology, science experiments, science solutions',
    commerce: 'accountancy, economics, business studies, commerce solutions',
  }

  return {
    title: `${subject.displayName} - Class ${subject.class.displayName} | MscTutor`,
    description: `Free online ${subject.displayName.toLowerCase()} classes for ${subject.class.displayName}. Complete syllabus, NCERT solutions, CBSE solutions, chapter-wise study materials, and practice questions.`,
    keywords: `${subject.displayName.toLowerCase()}, class ${subject.class.displayName}, ${subjectKeywords[subject.slug as keyof typeof subjectKeywords] || ''}, NCERT solutions, CBSE syllabus, online learning`,
  }
}

export default async function SubjectPage({
  params,
}: {
  params: { class: string; subject: string }
}) {
  const subject = await prisma.subject.findFirst({
    where: {
      slug: params.subject,
      class: {
        name: params.class,
      },
    },
    include: {
      class: true,
      chapters: {
        orderBy: { order: 'asc' },
      },
    },
  })

  if (!subject) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumbs
        items={[
          { label: 'Classes', href: '/classes' },
          { label: subject.class.displayName, href: `/class/${subject.class.name}` },
          { label: subject.displayName },
        ]}
      />
      <h1 className="text-4xl font-bold mb-4">{subject.displayName}</h1>
      {subject.description && (
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
          {subject.description}
        </p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {subject.chapters.map((chapter) => (
          <Link
            key={chapter.id}
            href={`/class/${params.class}/subject/${params.subject}/chapter/${chapter.slug}`}
            className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-lg transition-shadow border border-gray-200 dark:border-gray-700"
          >
            <h2 className="text-xl font-semibold mb-2">{chapter.name}</h2>
            {chapter.description && (
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {chapter.description}
              </p>
            )}
          </Link>
        ))}
      </div>
    </div>
  )
}
