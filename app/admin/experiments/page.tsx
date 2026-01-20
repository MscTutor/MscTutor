import Breadcrumbs from '@/components/Breadcrumbs'
import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { Plus } from 'lucide-react'

export default async function AdminExperimentsPage() {
  const experiments = await prisma.experiment.findMany({
    where: { isDeleted: false },
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
          { label: 'Experiments' },
        ]}
      />
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Manage Experiments</h1>
        <Link
          href="/admin/experiments/new"
          className="flex items-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
        >
          <Plus className="w-5 h-5" />
          Add Experiment
        </Link>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-gray-900">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                Experiment
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                Chapter
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {experiments.map((experiment) => (
              <tr key={experiment.id}>
                <td className="px-6 py-4">
                  <div className="font-semibold">{experiment.name}</div>
                  <div className="text-sm text-gray-500 line-clamp-2">
                    {experiment.description}
                  </div>
                </td>
                <td className="px-6 py-4 text-sm">
                  {experiment.chapter.subject.class.displayName} - {experiment.chapter.subject.displayName} - {experiment.chapter.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <Link
                    href={`/admin/experiments/${experiment.id}/edit`}
                    className="text-primary-600 hover:text-primary-700 mr-4"
                  >
                    Edit
                  </Link>
                  <button className="text-red-600 hover:text-red-700">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
