import Breadcrumbs from '@/components/Breadcrumbs'
import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { Plus } from 'lucide-react'

export default async function AdminProjectsPage() {
  const projects = await prisma.project.findMany({
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
          { label: 'Projects' },
        ]}
      />
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Manage Projects</h1>
        <Link
          href="/admin/projects/new"
          className="flex items-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
        >
          <Plus className="w-5 h-5" />
          Add Project
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div
            key={project.id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-6"
          >
            {project.imageUrl && (
              <img
                src={project.imageUrl}
                alt={project.title}
                className="w-full h-48 object-cover rounded mb-4"
              />
            )}
            <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              {project.chapter.subject.class.displayName} - {project.chapter.name}
            </p>
            <p className="text-sm text-gray-500 mb-4 line-clamp-2">
              {project.description}
            </p>
            <div className="flex gap-2">
              <Link
                href={`/admin/projects/${project.id}/edit`}
                className="flex-1 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 text-center text-sm"
              >
                Edit
              </Link>
              <button className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 text-sm">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
