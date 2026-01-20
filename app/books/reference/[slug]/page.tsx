import { prisma } from '@/lib/prisma'
import Breadcrumbs from '@/components/Breadcrumbs'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const book = await prisma.book.findUnique({
    where: { slug: params.slug },
  })

  if (!book) {
    return { title: 'Book Not Found - MscTutor' }
  }

  return {
    title: `${book.name} - Reference Book | MscTutor`,
    description: `Access ${book.name} reference book with solved questions, AI explanations, and practice problems.`,
    keywords: `${book.name}, reference book, ${book.name} solutions, study materials`,
  }
}

export default async function ReferenceBookPage({
  params,
}: {
  params: { slug: string }
}) {
  const book = await prisma.book.findUnique({
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
        orderBy: { order: 'asc' },
      },
    },
  })

  if (!book) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumbs
        items={[
          { label: 'Books', href: '/books' },
          { label: 'Reference', href: '/books/reference' },
          { label: book.name },
        ]}
      />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          {book.coverImage && (
            <img
              src={book.coverImage}
              alt={book.name}
              className="w-full rounded-lg shadow-lg mb-4"
            />
          )}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h1 className="text-2xl font-bold mb-2">{book.name}</h1>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Publisher: {book.publisher}
            </p>
            {book.isbn && (
              <p className="text-sm text-gray-500">ISBN: {book.isbn}</p>
            )}
            {book.description && (
              <p className="mt-4 text-gray-600 dark:text-gray-400">
                {book.description}
              </p>
            )}
          </div>
        </div>
        <div className="lg:col-span-2">
          <h2 className="text-2xl font-semibold mb-6">Chapters</h2>
          <div className="space-y-4">
            {book.chapters.map((bookChapter) => (
              <Link
                key={bookChapter.id}
                href={`/class/${bookChapter.chapter.subject.class.name}/subject/${bookChapter.chapter.subject.slug}/chapter/${bookChapter.chapter.slug}`}
                className="block p-4 bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-lg transition-shadow border border-gray-200 dark:border-gray-700"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold mb-1">
                      {bookChapter.chapter.name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {bookChapter.chapter.subject.class.displayName} - {bookChapter.chapter.subject.displayName}
                    </p>
                  </div>
                  {bookChapter.pageNumber && (
                    <span className="text-sm text-gray-500">
                      Page {bookChapter.pageNumber}
                    </span>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
