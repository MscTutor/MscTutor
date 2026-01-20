import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import Breadcrumbs from '@/components/Breadcrumbs'
import type { Metadata } from 'next'
import { BookOpen } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Books - MscTutor | NCERT, Reference Books & Study Materials',
  description: 'Access NCERT books, reference books, and study materials. Map book chapters to online content with solved questions and AI explanations.',
  keywords: 'NCERT books, reference books, study materials, online books, NCERT solutions',
}

export default async function BooksPage() {
  const books = await prisma.book.findMany({
    orderBy: { createdAt: 'desc' },
  })

  // Group by book type
  const booksByType = books.reduce((acc, book) => {
    if (!acc[book.bookType]) {
      acc[book.bookType] = []
    }
    acc[book.bookType].push(book)
    return acc
  }, {} as Record<string, typeof books>)

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumbs items={[{ label: 'Books' }]} />
      <h1 className="text-4xl font-bold mb-8">Books & Study Materials</h1>

      <div className="space-y-12">
        {/* NCERT Books */}
        {booksByType['ncert'] && (
          <section>
            <div className="flex items-center gap-3 mb-6">
              <BookOpen className="w-8 h-8 text-primary-600" />
              <h2 className="text-3xl font-semibold">NCERT Books</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {booksByType['ncert'].map((book) => (
                <Link
                  key={book.id}
                  href={`/books/ncert/${book.slug}`}
                  className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-lg transition-shadow border border-gray-200 dark:border-gray-700"
                >
                  {book.coverImage && (
                    <img
                      src={book.coverImage}
                      alt={book.name}
                      className="w-full h-48 object-cover rounded mb-4"
                    />
                  )}
                  <h3 className="text-xl font-semibold mb-2">{book.name}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {book.publisher}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Reference Books */}
        {booksByType['reference'] && (
          <section>
            <h2 className="text-3xl font-semibold mb-6">Reference Books</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {booksByType['reference'].map((book) => (
                <Link
                  key={book.id}
                  href={`/books/reference/${book.slug}`}
                  className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-lg transition-shadow border border-gray-200 dark:border-gray-700"
                >
                  {book.coverImage && (
                    <img
                      src={book.coverImage}
                      alt={book.name}
                      className="w-full h-48 object-cover rounded mb-4"
                    />
                  )}
                  <h3 className="text-xl font-semibold mb-2">{book.name}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {book.publisher}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}
