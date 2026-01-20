import { NextResponse } from 'next/server'
import { adminDb } from '@/lib/firebase-admin'
import { COLLECTIONS } from '@/lib/firebase-collections'

export async function GET() {
  try {
    // Test Firebase Admin connection
    const testDoc = adminDb.collection('test').doc('connection')
    await testDoc.set({
      timestamp: new Date(),
      status: 'connected',
    })

    // Check collections structure
    const collections = [
      COLLECTIONS.USERS,
      COLLECTIONS.CREDITS,
      COLLECTIONS.HISTORY,
      COLLECTIONS.MEMORY,
      COLLECTIONS.CHAT_LOGS,
    ]

    // Cleanup test document
    await testDoc.delete()

    return NextResponse.json({
      status: 'success',
      firebase: 'connected',
      collections: collections,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    return NextResponse.json(
      {
        status: 'error',
        message: 'Firebase connection failed',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}
