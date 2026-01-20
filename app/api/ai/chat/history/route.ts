import { NextRequest, NextResponse } from 'next/server'
import { adminDb } from '@/lib/firebase-admin'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const questionId = searchParams.get('questionId')
    const userId = request.headers.get('x-user-id') || 'anonymous'

    if (userId === 'anonymous') {
      return NextResponse.json({ history: [] })
    }

    if (!questionId) {
      return NextResponse.json({ history: [] })
    }

    // Fetch chat history for this question
    const questionIdNum = parseInt(questionId)
    const chatLogsRef = adminDb
      .collection('users')
      .doc(userId)
      .collection('chatLogs')
      .where('questionId', '==', questionIdNum)
      .orderBy('timestamp', 'asc')

    const snapshot = await chatLogsRef.get()
    
    const history = snapshot.docs.map((doc) => {
      const data = doc.data()
      return [
        { role: 'user' as const, content: data.userMessage },
        { role: 'assistant' as const, content: data.aiResponse },
      ]
    }).flat()

    return NextResponse.json({ history })
  } catch (error) {
    console.error('Chat history fetch error:', error)
    return NextResponse.json(
      {
        error: 'Failed to fetch chat history',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}
