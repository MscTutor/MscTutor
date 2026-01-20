import { NextRequest, NextResponse } from 'next/server'
import { createQuestionFromVisual } from '@/lib/visualQuestionBuilder'
import { adminDb } from '@/lib/firebase-admin'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { text, latex, shapes } = body

    if (!text) {
      return NextResponse.json(
        { error: 'Text is required' },
        { status: 400 }
      )
    }

    // Get user ID from auth (placeholder - implement actual auth)
    const userId = request.headers.get('x-user-id') || 'anonymous'

    // Create question
    const question = await createQuestionFromVisual({
      text,
      latex: latex || text,
      shapes,
    })

    // Deduct credits and save to user history
    if (userId !== 'anonymous') {
      await adminDb.collection('users').doc(userId).collection('scanHistory').add({
        questionId: question.questionId,
        questionSlug: question.slug,
        scannedAt: new Date(),
        creditsUsed: 1,
      })

      // Deduct credits (placeholder)
      const userRef = adminDb.collection('users').doc(userId)
      const userDoc = await userRef.get()
      const currentCredits = userDoc.data()?.credits || 0
      await userRef.update({
        credits: Math.max(0, currentCredits - 1),
      })
    }

    return NextResponse.json({
      success: true,
      ...question,
    })
  } catch (error) {
    console.error('Create question error:', error)
    return NextResponse.json(
      { error: 'Failed to create question' },
      { status: 500 }
    )
  }
}
