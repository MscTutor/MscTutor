import { NextResponse } from 'next/server'
import { getAIService } from '@/lib/ai-service'

export async function GET() {
  try {
    // Test AI service initialization
    const aiService = getAIService()
    
    return NextResponse.json({
      status: 'success',
      message: 'AI service initialized',
      provider: process.env.AI_PROVIDER || 'deepseek',
      hasApiKey: !!process.env.DEEPSEEK_API_KEY || !!process.env.OPENAI_API_KEY,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    return NextResponse.json(
      {
        status: 'error',
        message: 'AI service initialization failed',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}
