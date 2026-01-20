import { prisma } from '@/lib/prisma'
import Breadcrumbs from '@/components/Breadcrumbs'
import { notFound } from 'next/navigation'
import QuestionPageClient from './QuestionPageClient'
import type { Metadata } from 'next'

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const question = await prisma.question.findUnique({
    where: { slug: params.slug },
    include: {
      chapter: {
        include: {
          subject: {
            include: { class: true },
          },
        },
      },
    },
  })

  if (!question) {
    return {
      title: 'Question Not Found - MscTutor',
    }
  }

  const questionText = question.questionText.substring(0, 150)

  return {
    title: `Question Solution - ${question.chapter.name} | MscTutor`,
    description: `Get step-by-step solution for: ${questionText}... Complete solution with explanations, formulas, and related questions for ${question.chapter.subject.displayName} Class ${question.chapter.subject.class.displayName}.`,
    keywords: `${question.chapter.name}, ${question.chapter.subject.displayName.toLowerCase()}, class ${question.chapter.subject.class.displayName}, solved question, step by step solution, NCERT solution, CBSE solution, math solution, science solution`,
  }
}

export default async function QuestionPage({
  params,
}: {
  params: { slug: string }
}) {
  const question = await prisma.question.findUnique({
    where: { slug: params.slug },
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
      solutions: {
        orderBy: { stepNumber: 'asc' },
      },
      variations: true,
      relatedQuestions: {
        include: {
          related: true,
        },
        take: 5,
      },
      discussions: {
        where: { isApproved: true },
        orderBy: { createdAt: 'desc' },
        take: 10,
      },
    },
  })

  if (!question) {
    notFound()
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Question',
    name: question.questionText,
    text: question.questionText,
    about: {
      '@type': 'Chapter',
      name: question.chapter.name,
      partOf: {
        '@type': 'Course',
        name: question.chapter.subject.displayName,
      },
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="container mx-auto px-4 py-8">
        <Breadcrumbs
          items={[
            { label: 'Classes', href: '/classes' },
            {
              label: question.chapter.subject.class.displayName,
              href: `/class/${question.chapter.subject.class.name}`,
            },
            {
              label: question.chapter.subject.displayName,
              href: `/class/${question.chapter.subject.class.name}/subject/${question.chapter.subject.slug}`,
            },
            {
              label: question.chapter.name,
              href: `/class/${question.chapter.subject.class.name}/subject/${question.chapter.subject.slug}/chapter/${question.chapter.slug}`,
            },
            { label: 'Question' },
          ]}
        />
        <QuestionPageClient question={question} />
      </div>
    </>
  )
}
