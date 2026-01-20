import Breadcrumbs from '@/components/Breadcrumbs'
import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { Plus } from 'lucide-react'

export default async function AdminScienceBranchesPage() {
  const branches = await prisma.scienceBranch.findMany({
    orderBy: { order: 'asc' },
  })

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumbs
        items={[
          { label: 'Admin', href: '/admin' },
          { label: 'Science Branches' },
        ]}
      />
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Manage Science Branches</h1>
        <Link
          href="/admin/science-branches/new"
          className="flex items-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
        >
          <Plus className="w-5 h-5" />
          Add Branch
        </Link>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-gray-900">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                Slug
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                Order
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {branches.map((branch) => (
              <tr key={branch.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="font-semibold">{branch.displayName}</div>
                  {branch.description && (
                    <div className="text-sm text-gray-500 line-clamp-1">
                      {branch.description}
                    </div>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">
                  {branch.slug}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  {branch.order}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <Link
                    href={`/admin/science-branches/${branch.id}/edit`}
                    className="text-primary-600 hover:text-primary-700 mr-4"
                  >
                    Edit
                  </Link>
                  <Link
                    href={`/science/${branch.slug}`}
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
