import Breadcrumbs from '@/components/Breadcrumbs'
import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { Plus } from 'lucide-react'

export default async function AdminBooksPage() {
  const books = await prisma.book.findMany({
    orderBy: { createdAt: 'desc' },
  })

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumbs
        items={[
          { label: 'Admin', href: '/admin' },
          { label: 'Books' },
        ]}
      />
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Manage Books</h1>
        <Link
          href="/admin/books/new"
          className="flex items-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
        >
          <Plus className="w-5 h-5" />
          Add Book
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {books.map((book) => (
          <div
            key={book.id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-6"
          >
            {book.coverImage && (
              <img
                src={book.coverImage}
                alt={book.name}
                className="w-full h-48 object-cover rounded mb-4"
              />
            )}
            <h3 className="text-xl font-semibold mb-2">{book.name}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              {book.publisher} • {book.bookType}
            </p>
            <div className="flex gap-2 mt-4">
              <Link
                href={`/admin/books/${book.id}/edit`}
                className="flex-1 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 text-center text-sm"
              >
                Edit
              </Link>
              <Link
                href={`/books/${book.bookType}/${book.slug}`}
                className="flex-1 px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 text-center text-sm"
                target="_blank"
              >
                View
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
