import Breadcrumbs from '@/components/Breadcrumbs'
import Link from 'next/link'
import { prisma } from '@/lib/prisma'

export default async function AdminQuestionsPage() {
  const questions = await prisma.question.findMany({
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
    take: 50,
    orderBy: { createdAt: 'desc' },
  })

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumbs
        items={[
          { label: 'Admin', href: '/admin' },
          { label: 'Questions' },
        ]}
      />
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Manage Questions</h1>
        <Link
          href="/admin/questions/new"
          className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
        >
          Add New Question
        </Link>
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-gray-900">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Question
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Chapter
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Difficulty
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {questions.map((question) => (
              <tr key={question.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <p className="text-sm line-clamp-2">{question.questionText}</p>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  {question.chapter.subject.class.displayName} - {question.chapter.subject.displayName} - {question.chapter.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 py-1 text-xs rounded-full bg-gray-200 dark:bg-gray-700">
                    {question.difficulty}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <Link
                    href={`/question/${question.slug}`}
                    className="text-primary-600 hover:text-primary-700 mr-4"
                  >
                    View
                  </Link>
                  <Link
                    href={`/admin/questions/${question.id}/edit`}
                    className="text-blue-600 hover:text-blue-700"
                  >
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
