import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import Breadcrumbs from '@/components/Breadcrumbs'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import ChapterBlocks from '@/components/ChapterBlocks'
import ChapterBlocks from '@/components/ChapterBlocks'

export async function generateMetadata({
  params,
}: {
  params: { class: string; subject: string; chapter: string }
}): Promise<Metadata> {
  const chapter = await prisma.chapter.findFirst({
    where: {
      slug: params.chapter,
      subject: {
        slug: params.subject,
        class: { name: params.class },
      },
    },
    include: {
      subject: {
        include: { class: true },
      },
    },
  })

  if (!chapter) {
    return {
      title: 'Chapter Not Found - MscTutor',
    }
  }

  return {
    title: `${chapter.name} - ${chapter.subject.displayName} Class ${chapter.subject.class.displayName} | MscTutor`,
    description: `Learn ${chapter.name} for ${chapter.subject.displayName} Class ${chapter.subject.class.displayName}. Complete chapter notes, formulas, solved examples, practice questions, and NCERT solutions.`,
    keywords: `${chapter.name}, ${chapter.subject.displayName.toLowerCase()}, class ${chapter.subject.class.displayName}, chapter notes, formulas, solved examples, practice questions, NCERT solutions, CBSE solutions`,
  }
}

export default async function ChapterPage({
  params,
}: {
  params: { class: string; subject: string; chapter: string }
}) {
  const chapter = await prisma.chapter.findFirst({
    where: {
      slug: params.chapter,
      subject: {
        slug: params.subject,
        class: {
          name: params.class,
        },
      },
    },
    include: {
      subject: {
        include: {
          class: true,
        },
      },
      questions: {
        take: 10,
        orderBy: { createdAt: 'desc' },
      },
      formulas: true,
      experiments: true,
    },
  })

  if (!chapter) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumbs
        items={[
          { label: 'Classes', href: '/classes' },
          {
            label: chapter.subject.class.displayName,
            href: `/class/${params.class}`,
          },
          {
            label: chapter.subject.displayName,
            href: `/class/${params.class}/subject/${params.subject}`,
          },
          { label: chapter.name },
        ]}
      />
      <h1 className="text-4xl font-bold mb-4">{chapter.name}</h1>
      {chapter.description && (
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
          {chapter.description}
        </p>
      )}

      {/* Chapter Blocks */}
      {chapter.blocks && chapter.blocks.length > 0 && (
        <section className="mb-12">
          <ChapterBlocks
            blocks={chapter.blocks}
            chapterId={chapter.id}
            chapterName={chapter.name}
          />
        </section>
      )}

      {/* Chapter Blocks */}
      {chapter.blocks && chapter.blocks.length > 0 && (
        <section className="mb-12">
          <ChapterBlocks
            blocks={chapter.blocks}
            chapterId={chapter.id}
            chapterName={chapter.name}
          />
        </section>
      )}

      {/* Chapter Sections */}
      <div className="space-y-12">
        {/* Formulas */}
        {chapter.formulas.length > 0 && (
          <section>
            <h2 className="text-2xl font-semibold mb-4">Formula Bank</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {chapter.formulas.map((formula) => (
                <div
                  key={formula.id}
                  className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
                >
                  <h3 className="font-semibold mb-2">{formula.name}</h3>
                  <code className="text-sm bg-white dark:bg-gray-900 p-2 rounded block">
                    {formula.formulaLatex}
                  </code>
                  {formula.description && (
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                      {formula.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Questions */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Questions</h2>
          <div className="space-y-4">
            {chapter.questions.map((question) => (
              <Link
                key={question.id}
                href={`/question/${question.slug}`}
                className="block p-4 bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-lg transition-shadow border border-gray-200 dark:border-gray-700"
              >
                <p className="line-clamp-2">{question.questionText}</p>
                <span className="text-xs text-gray-500 mt-2 inline-block">
                  {question.difficulty}
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* Experiments */}
        {chapter.experiments.length > 0 && (
          <section>
            <h2 className="text-2xl font-semibold mb-4">Experiments & Examples</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {chapter.experiments.map((experiment) => (
                <div
                  key={experiment.id}
                  className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700"
                >
                  <h3 className="font-semibold mb-2">{experiment.name}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {experiment.description}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}
