import { prisma } from './prisma'
import { parseFormulaToLatex, detectSubjectFromText, detectChapterFromKeywords } from './formulaParser'

export interface VisualQuestionInput {
  text: string
  latex: string
  shapes?: any[]
  imageUrl?: string
}

export async function createQuestionFromVisual(input: VisualQuestionInput): Promise<{
  questionId: number
  slug: string
  url: string
}> {
  const { text, latex, shapes, imageUrl } = input

  // Detect subject
  const subjectSlug = detectSubjectFromText(text)
  if (subjectSlug === 'unknown') {
    throw new Error('Could not detect subject from question')
  }

  // Find or create subject (placeholder - should query actual DB)
  // For now, we'll assume subject exists
  const subject = await prisma.subject.findFirst({
    where: { slug: subjectSlug },
  })

  if (!subject) {
    throw new Error(`Subject ${subjectSlug} not found`)
  }

  // Detect chapter
  const chapterSlug = detectChapterFromKeywords(text, subjectSlug)
  let chapter
  
  if (chapterSlug) {
    chapter = await prisma.chapter.findFirst({
      where: {
        slug: chapterSlug,
        subjectId: subject.id,
      },
    })
  }

  // If chapter not found, use first chapter or create placeholder
  if (!chapter) {
    const chapters = await prisma.chapter.findMany({
      where: { subjectId: subject.id },
      orderBy: { order: 'asc' },
      take: 1,
    })
    chapter = chapters[0]
  }

  if (!chapter) {
    throw new Error(`No chapter found for subject ${subjectSlug}`)
  }

  // Generate SEO-friendly slug
  const slug = generateQuestionSlug(text)

  // Create question
  const question = await prisma.question.create({
    data: {
      questionText: text,
      questionLatex: latex,
      slug,
      chapterId: chapter.id,
      questionType: imageUrl ? 'image' : 'text',
      imageUrl: imageUrl || null,
      vectorData: shapes ? JSON.stringify(shapes) : null,
    },
  })

  return {
    questionId: question.id,
    slug: question.slug,
    url: `/question/${question.slug}`,
  }
}

function generateQuestionSlug(text: string): string {
  // Generate SEO-friendly slug from question text
  const slug = text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .substring(0, 50)
  
  const timestamp = Date.now().toString().slice(-6)
  return `q-${slug}-${timestamp}`
}
