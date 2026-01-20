import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import Breadcrumbs from '@/components/Breadcrumbs'
import type { Metadata } from 'next'
import { GraduationCap } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Exam Preparation - MscTutor | JEE, NEET, UPSC, State Board',
  description: 'Complete exam preparation for JEE, NEET, UPSC, and State Board exams. Syllabus mapping, PYQs, mock tests, and AI-powered practice.',
  keywords: 'JEE preparation, NEET preparation, UPSC preparation, exam preparation, PYQs, mock tests, exam strategy',
}

export default async function ExamsPage() {
  const exams = await prisma.exam.findMany({
    orderBy: { createdAt: 'desc' },
  })

  // Group by exam type
  const examsByType = exams.reduce((acc, exam) => {
    if (!acc[exam.examType]) {
      acc[exam.examType] = []
    }
    acc[exam.examType].push(exam)
    return acc
  }, {} as Record<string, typeof exams>)

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumbs items={[{ label: 'Exams' }]} />
      <h1 className="text-4xl font-bold mb-8">Exam Preparation</h1>
      <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
        Complete preparation resources for competitive and board exams with syllabus mapping, PYQs, and AI-powered practice.
      </p>

      <div className="space-y-12">
        {/* JEE */}
        {examsByType['jee'] && (
          <section>
            <div className="flex items-center gap-3 mb-6">
              <GraduationCap className="w-8 h-8 text-primary-600" />
              <h2 className="text-3xl font-semibold">JEE (Joint Entrance Examination)</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {examsByType['jee'].map((exam) => (
                <Link
                  key={exam.id}
                  href={`/exams/jee/${exam.slug}`}
                  className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-lg transition-shadow border border-gray-200 dark:border-gray-700"
                >
                  <h3 className="text-xl font-semibold mb-2">{exam.name}</h3>
                  {exam.description && (
                    <p className="text-gray-600 dark:text-gray-400 line-clamp-3">
                      {exam.description}
                    </p>
                  )}
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* NEET */}
        {examsByType['neet'] && (
          <section>
            <h2 className="text-3xl font-semibold mb-6">NEET (National Eligibility cum Entrance Test)</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {examsByType['neet'].map((exam) => (
                <Link
                  key={exam.id}
                  href={`/exams/neet/${exam.slug}`}
                  className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-lg transition-shadow border border-gray-200 dark:border-gray-700"
                >
                  <h3 className="text-xl font-semibold mb-2">{exam.name}</h3>
                  {exam.description && (
                    <p className="text-gray-600 dark:text-gray-400 line-clamp-3">
                      {exam.description}
                    </p>
                  )}
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* UPSC */}
        {examsByType['upsc'] && (
          <section>
            <h2 className="text-3xl font-semibold mb-6">UPSC (Union Public Service Commission)</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {examsByType['upsc'].map((exam) => (
                <Link
                  key={exam.id}
                  href={`/exams/upsc/${exam.slug}`}
                  className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-lg transition-shadow border border-gray-200 dark:border-gray-700"
                >
                  <h3 className="text-xl font-semibold mb-2">{exam.name}</h3>
                  {exam.description && (
                    <p className="text-gray-600 dark:text-gray-400 line-clamp-3">
                      {exam.description}
                    </p>
                  )}
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* State Board */}
        {examsByType['state-board'] && (
          <section>
            <h2 className="text-3xl font-semibold mb-6">State Board Exams</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {examsByType['state-board'].map((exam) => (
                <Link
                  key={exam.id}
                  href={`/exams/state-board/${exam.slug}`}
                  className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-lg transition-shadow border border-gray-200 dark:border-gray-700"
                >
                  <h3 className="text-xl font-semibold mb-2">{exam.name}</h3>
                  {exam.description && (
                    <p className="text-gray-600 dark:text-gray-400 line-clamp-3">
                      {exam.description}
                    </p>
                  )}
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}
