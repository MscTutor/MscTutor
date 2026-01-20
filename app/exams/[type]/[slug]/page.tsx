import { prisma } from '@/lib/prisma'
import Breadcrumbs from '@/components/Breadcrumbs'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import { BookOpen, Target, FileText, Brain } from 'lucide-react'

export async function generateMetadata({
  params,
}: {
  params: { type: string; slug: string }
}): Promise<Metadata> {
  const exam = await prisma.exam.findUnique({
    where: { slug: params.slug },
  })

  if (!exam) {
    return { title: 'Exam Not Found - MscTutor' }
  }

  return {
    title: `${exam.name} - Exam Preparation | MscTutor`,
    description: `Complete ${exam.name} preparation with syllabus mapping, PYQs, mock tests, and AI-powered practice questions.`,
    keywords: `${exam.name}, exam preparation, PYQs, mock tests, ${exam.examType} preparation, exam strategy`,
  }
}

export default async function ExamPage({
  params,
}: {
  params: { type: string; slug: string }
}) {
  const exam = await prisma.exam.findUnique({
    where: { slug: params.slug },
    include: {
      chapters: {
        include: {
          chapter: {
            include: {
              subject: {
                include: {
                  class: true,
                },
              },
            },
          },
        },
        orderBy: [
          { priority: 'desc' },
          { chapter: { order: 'asc' } },
        ],
      },
      questions: {
        include: {
          question: true,
        },
        take: 10,
        orderBy: { year: 'desc' },
      },
    },
  })

  if (!exam) {
    notFound()
  }

  // Group chapters by priority
  const highPriority = exam.chapters.filter(c => c.priority === 'high')
  const mediumPriority = exam.chapters.filter(c => c.priority === 'medium')
  const lowPriority = exam.chapters.filter(c => c.priority === 'low')

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumbs
        items={[
          { label: 'Exams', href: '/exams' },
          { label: exam.examType.toUpperCase(), href: `/exams/${exam.examType}` },
          { label: exam.name },
        ]}
      />
      <h1 className="text-4xl font-bold mb-4">{exam.name}</h1>
      {exam.description && (
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
          {exam.description}
        </p>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Syllabus */}
          {exam.syllabus && (
            <section className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-3 mb-4">
                <BookOpen className="w-6 h-6 text-primary-600" />
                <h2 className="text-2xl font-semibold">Syllabus</h2>
              </div>
              <div className="prose dark:prose-invert max-w-none">
                <div dangerouslySetInnerHTML={{ __html: exam.syllabus }} />
              </div>
            </section>
          )}

          {/* Chapter Priority */}
          <section className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3 mb-4">
              <Target className="w-6 h-6 text-primary-600" />
              <h2 className="text-2xl font-semibold">Chapter Priority</h2>
            </div>
            <div className="space-y-6">
              {highPriority.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-red-600 mb-2">
                    High Priority ({highPriority.length})
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {highPriority.map((examChapter) => (
                      <Link
                        key={examChapter.id}
                        href={`/class/${examChapter.chapter.subject.class.name}/subject/${examChapter.chapter.subject.slug}/chapter/${examChapter.chapter.slug}`}
                        className="p-3 bg-red-50 dark:bg-red-900/20 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors"
                      >
                        <p className="font-medium">{examChapter.chapter.name}</p>
                        {examChapter.weightage && (
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Weightage: {examChapter.weightage}%
                          </p>
                        )}
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {mediumPriority.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-yellow-600 mb-2">
                    Medium Priority ({mediumPriority.length})
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {mediumPriority.map((examChapter) => (
                      <Link
                        key={examChapter.id}
                        href={`/class/${examChapter.chapter.subject.class.name}/subject/${examChapter.chapter.subject.slug}/chapter/${examChapter.chapter.slug}`}
                        className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg hover:bg-yellow-100 dark:hover:bg-yellow-900/30 transition-colors"
                      >
                        <p className="font-medium">{examChapter.chapter.name}</p>
                        {examChapter.weightage && (
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Weightage: {examChapter.weightage}%
                          </p>
                        )}
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {lowPriority.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-green-600 mb-2">
                    Low Priority ({lowPriority.length})
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {lowPriority.map((examChapter) => (
                      <Link
                        key={examChapter.id}
                        href={`/class/${examChapter.chapter.subject.class.name}/subject/${examChapter.chapter.subject.slug}/chapter/${examChapter.chapter.slug}`}
                        className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors"
                      >
                        <p className="font-medium">{examChapter.chapter.name}</p>
                        {examChapter.weightage && (
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Weightage: {examChapter.weightage}%
                          </p>
                        )}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* PYQs */}
          {exam.questions.length > 0 && (
            <section className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-3 mb-4">
                <FileText className="w-6 h-6 text-primary-600" />
                <h2 className="text-2xl font-semibold">Previous Year Questions</h2>
              </div>
              <div className="space-y-3">
                {exam.questions.map((examQuestion) => (
                  <Link
                    key={examQuestion.id}
                    href={`/question/${examQuestion.question.slug}`}
                    className="block p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <p className="line-clamp-2">{examQuestion.question.questionText}</p>
                      {examQuestion.year && (
                        <span className="text-sm text-gray-500 ml-4">
                          {examQuestion.year}
                        </span>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Strategy */}
          {exam.strategy && (
            <section className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-3 mb-4">
                <Brain className="w-6 h-6 text-primary-600" />
                <h2 className="text-2xl font-semibold">Exam Strategy</h2>
              </div>
              <div className="prose dark:prose-invert max-w-none">
                <div dangerouslySetInnerHTML={{ __html: exam.strategy }} />
              </div>
            </section>
          )}
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border border-gray-200 dark:border-gray-700 sticky top-20">
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <div className="space-y-3">
              <Link
                href={`/exams/${params.type}/${params.slug}/mock-test`}
                className="block w-full px-4 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors text-center"
              >
                AI Mock Test
              </Link>
              <Link
                href={`/exams/${params.type}/${params.slug}/pyqs`}
                className="block w-full px-4 py-3 bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors text-center"
              >
                All PYQs
              </Link>
              <Link
                href={`/exams/${params.type}/${params.slug}/sample-papers`}
                className="block w-full px-4 py-3 bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors text-center"
              >
                Sample Papers
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
