import Breadcrumbs from '@/components/Breadcrumbs'
import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { Upload, Image as ImageIcon } from 'lucide-react'

export default async function AdminMediaPage() {
  const media = await prisma.media.findMany({
    orderBy: { createdAt: 'desc' },
    take: 50,
  })

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumbs
        items={[
          { label: 'Admin', href: '/admin' },
          { label: 'Media' },
        ]}
      />
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Media Library</h1>
        <Link
          href="/admin/media/upload"
          className="flex items-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
        >
          <Upload className="w-5 h-5" />
          Upload Media
        </Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {media.map((item) => (
          <div
            key={item.id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 overflow-hidden"
          >
            {item.fileType === 'image' ? (
              <img
                src={item.fileUrl}
                alt={item.fileName}
                className="w-full h-32 object-cover"
              />
            ) : (
              <div className="w-full h-32 bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                <ImageIcon className="w-8 h-8 text-gray-400" />
              </div>
            )}
            <div className="p-2">
              <p className="text-xs font-medium truncate">{item.fileName}</p>
              <p className="text-xs text-gray-500">
                {(item.size / 1024).toFixed(1)} KB
              </p>
              <p className="text-xs text-gray-500">{item.storageType}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
