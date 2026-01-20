import { NextRequest, NextResponse } from 'next/server'
import { cleanupExpiredUserFiles, cleanupExpiredTempFiles } from '@/lib/storage'
import { cleanupExpiredMemory } from '@/lib/firebase-collections'

// This endpoint should be called periodically (cron job)
export async function POST(request: NextRequest) {
  try {
    // Verify admin access
    const authHeader = request.headers.get('authorization')
    if (authHeader !== `Bearer ${process.env.CLEANUP_SECRET}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Cleanup expired user files (6 months)
    const deletedFiles = await cleanupExpiredUserFiles()
    
    // Cleanup expired temp vision files (60 seconds)
    const deletedTempFiles = await cleanupExpiredTempFiles()
    
    // Cleanup expired memory (6 months)
    const deletedMemory = await cleanupExpiredMemory()

    return NextResponse.json({
      success: true,
      deletedFiles,
      deletedTempFiles,
      deletedMemory,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error('Cleanup error:', error)
    return NextResponse.json(
      {
        error: 'Cleanup failed',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}
