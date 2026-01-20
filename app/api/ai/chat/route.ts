import { NextRequest, NextResponse } from 'next/server'
import { adminDb } from '@/lib/firebase-admin'
import { generateAIResponse } from '@/lib/ai-service'
import { updateUserCredits, saveToMemory } from '@/lib/firebase-collections'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { questionId, questionText, message, history, detectedFormula, chapterContext } = body

    // Get user ID from auth (placeholder - implement actual auth)
    const userId = request.headers.get('x-user-id') || 'anonymous'

    // Check credits
    if (userId !== 'anonymous') {
      const userRef = adminDb.collection('users').doc(userId)
      const userDoc = await userRef.get()
      const credits = userDoc.data()?.credits || 0

      if (credits < 1) {
        return NextResponse.json(
          { error: 'Insufficient credits' },
          { status: 402 }
        )
      }
    }

    // Get question context from database
    let subject: 'math' | 'physics' | 'chemistry' | 'commerce' | undefined
    if (questionId) {
      const question = await prisma.question.findUnique({
        where: { id: questionId },
        include: {
          chapter: {
            include: {
              subject: true,
            },
          },
        },
      })
      
      if (question) {
        const subjectSlug = question.chapter.subject.slug.toLowerCase()
        if (subjectSlug.includes('math')) subject = 'math'
        else if (subjectSlug.includes('physics')) subject = 'physics'
        else if (subjectSlug.includes('chemistry')) subject = 'chemistry'
        else if (subjectSlug.includes('commerce')) subject = 'commerce'
      }
    }

    // Generate AI response
    const aiResponse = await generateAIResponse(
      {
        questionText: questionText || '',
        detectedFormula,
        chapterContext,
        userMessage: message,
        history: history || [],
        subject,
      },
      userId !== 'anonymous' ? userId : undefined
    )

    // Deduct credit
    let creditsRemaining: number | null = null
    if (userId !== 'anonymous') {
      creditsRemaining = await updateUserCredits(userId, 1, 'subtract')
      
      // Save to user memory
      await saveToMemory(
        userId,
        `Q: ${message}\nA: ${aiResponse.response}`,
        'conversation',
        questionId
      )

      // Save to chat logs
      await adminDb.collection('users').doc(userId).collection('chatLogs').add({
        questionId,
        questionText,
        userMessage: message,
        aiResponse: aiResponse.response,
        stepByStepSolution: aiResponse.stepByStepSolution,
        explanation: aiResponse.explanation,
        timestamp: new Date(),
      })
    }

    return NextResponse.json({
      response: aiResponse.response,
      stepByStepSolution: aiResponse.stepByStepSolution,
      explanation: aiResponse.explanation,
      examples: aiResponse.examples,
      creditsRemaining,
    })
  } catch (error) {
    console.error('AI chat error:', error)
    return NextResponse.json(
      {
        error: 'Failed to process AI request',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}
