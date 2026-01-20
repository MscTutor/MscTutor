import { NextRequest, NextResponse } from 'next/server'
import { detectTextFromImage, detectMathSymbols } from '@/lib/googleVision'
import { parseFormulaToLatex } from '@/lib/formulaParser'
import { checkRateLimit, getClientIdentifier } from '@/lib/rateLimit'

export const runtime = 'nodejs'
export const maxDuration = 30

export async function POST(request: NextRequest) {
  try {
    // Rate limiting: 10 scans per minute per user/IP
    const identifier = getClientIdentifier(request)
    const rateLimit = checkRateLimit(identifier, {
      maxRequests: 10,
      windowMs: 60000, // 1 minute
    })

    if (!rateLimit.allowed) {
      return NextResponse.json(
        {
          error: 'Rate limit exceeded',
          message: `Too many requests. Please try again after ${Math.ceil((rateLimit.resetTime - Date.now()) / 1000)} seconds.`,
          resetTime: rateLimit.resetTime,
        },
        {
          status: 429,
          headers: {
            'X-RateLimit-Limit': '10',
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': rateLimit.resetTime.toString(),
          },
        }
      )
    }

    const formData = await request.formData()
    const file = formData.get('image') as File

    if (!file) {
      return NextResponse.json(
        { error: 'No image provided' },
        { status: 400 }
      )
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json(
        { error: 'Image too large. Maximum size is 10MB' },
        { status: 400 }
      )
    }

    // Convert file to buffer
    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    // Step 1: Run EasyOCR (CPU) - Placeholder
    // In production, this would call EasyOCR service
    const easyOCRResult = {
      text: '',
      confidence: 0,
    }

    // Step 2: Run PaddleOCR (CPU) - Placeholder
    // In production, this would call PaddleOCR service
    const paddleOCRResult = {
      text: '',
      confidence: 0,
    }

    // Step 3: Merge OCR results
    let mergedText = easyOCRResult.text || paddleOCRResult.text
    let mergedConfidence = Math.max(easyOCRResult.confidence, paddleOCRResult.confidence)

    // Step 4: If confidence low, use Google Vision API
    if (mergedConfidence < 0.75) {
      try {
        const visionResult = await detectTextFromImage(buffer)
        if (visionResult.confidence > mergedConfidence) {
          mergedText = visionResult.text
          mergedConfidence = visionResult.confidence
        }
      } catch (error) {
        console.error('Google Vision API error:', error)
      }
    }

    // Step 5: Detect math symbols
    const mathDetection = await detectMathSymbols(buffer)
    
    // Step 6: Convert to LaTeX
    const formulaResult = parseFormulaToLatex(mergedText)
    
    // Step 7: Detect shapes (placeholder)
    const detectedShapes: any[] = []

    // Step 8: Delete image immediately (already in memory, no persistent storage)

    return NextResponse.json(
      {
        rawText: mergedText,
        mathLatex: mathDetection.hasMath ? formulaResult.latex : mergedText,
        detectedShapes,
        confidence: Math.max(mergedConfidence, mathDetection.confidence),
        hasMath: mathDetection.hasMath,
        structures: formulaResult.detectedStructures,
      },
      {
        headers: {
          'X-RateLimit-Limit': '10',
          'X-RateLimit-Remaining': rateLimit.remaining.toString(),
          'X-RateLimit-Reset': rateLimit.resetTime.toString(),
        },
      }
    )
  } catch (error) {
    console.error('OCR scan error:', error)
    return NextResponse.json(
      { error: 'Failed to process image' },
      { status: 500 }
    )
  }
}
