import { NextResponse } from 'next/server'
import { verifyDatabaseConnection, testDatabaseOperations } from '@/lib/db-connection'

export async function GET() {
  try {
    const connection = await verifyDatabaseConnection()
    
    if (!connection.connected) {
      return NextResponse.json(
        {
          status: 'error',
          message: 'Database connection failed',
          error: connection.error,
        },
        { status: 500 }
      )
    }

    const operations = await testDatabaseOperations()

    return NextResponse.json({
      status: 'success',
      database: 'connected',
      operations: operations,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    return NextResponse.json(
      {
        status: 'error',
        message: 'Database test failed',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}
