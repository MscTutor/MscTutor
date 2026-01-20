import { MetadataRoute } from 'next'
import { prisma } from '@/lib/prisma'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://msctutor.com'

  // Static pages
  const staticPages = [
    '',
    '/classes',
    '/subjects',
    '/pricing',
    '/blog',
    '/contact',
    '/support',
    '/privacy',
    '/terms',
    '/dmca',
    '/attribution',
  ].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: path === '' ? 1 : 0.8,
  }))

  // Dynamic pages - classes, subjects, chapters
  const classes = await prisma.class.findMany()
  const classPages = classes.map((classItem) => ({
    url: `${baseUrl}/class/${classItem.name}`,
    lastModified: classItem.updatedAt,
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  const subjects = await prisma.subject.findMany({
    include: { class: true },
  })
  const subjectPages = subjects.map((subject) => ({
    url: `${baseUrl}/class/${subject.class.name}/subject/${subject.slug}`,
    lastModified: subject.updatedAt,
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  const chapters = await prisma.chapter.findMany({
    include: {
      subject: {
        include: { class: true },
      },
    },
  })
  const chapterPages = chapters.map((chapter) => ({
    url: `${baseUrl}/class/${chapter.subject.class.name}/subject/${chapter.subject.slug}/chapter/${chapter.slug}`,
    lastModified: chapter.updatedAt,
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }))

  // Question pages
  const questions = await prisma.question.findMany({
    select: { slug: true, updatedAt: true },
  })
  const questionPages = questions.map((question) => ({
    url: `${baseUrl}/question/${question.slug}`,
    lastModified: question.updatedAt,
    changeFrequency: 'daily' as const,
    priority: 0.9, // High priority for SEO
  }))

  return [
    ...staticPages,
    ...classPages,
    ...subjectPages,
    ...chapterPages,
    ...questionPages,
  ]
}
