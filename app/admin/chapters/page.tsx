import Breadcrumbs from '@/components/Breadcrumbs'
import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { Plus } from 'lucide-react'

export default async function AdminChaptersPage() {
  const chapters = await prisma.chapter.findMany({
    include: {
      subject: {
        include: {
          class: true,
        },
      },
      scienceBranch: true,
    },
    take: 50,
    orderBy: { createdAt: 'desc' },
  })

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumbs
        items={[
          { label: 'Admin', href: '/admin' },
          { label: 'Chapters' },
        ]}
      />
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Manage Chapters</h1>
        <Link
          href="/admin/chapters/new"
          className="flex items-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
        >
          <Plus className="w-5 h-5" />
          Add Chapter
        </Link>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-gray-900">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                Chapter
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                Subject
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                Science Branch
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {chapters.map((chapter) => (
              <tr key={chapter.id}>
                <td className="px-6 py-4">
                  <div className="font-semibold">{chapter.name}</div>
                  <div className="text-sm text-gray-500">{chapter.slug}</div>
                </td>
                <td className="px-6 py-4 text-sm">
                  {chapter.subject.class.displayName} - {chapter.subject.displayName}
                </td>
                <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                  {chapter.scienceBranch?.displayName || '-'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <Link
                    href={`/admin/chapters/${chapter.id}/edit`}
                    className="text-primary-600 hover:text-primary-700 mr-4"
                  >
                    Edit
                  </Link>
                  <Link
                    href={`/class/${chapter.subject.class.name}/subject/${chapter.subject.slug}/chapter/${chapter.slug}`}
                    className="text-blue-600 hover:text-blue-700"
                    target="_blank"
                  >
                    View
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
