import vision from '@google-cloud/vision'

let visionClient: vision.ImageAnnotatorClient | null = null

export async function initializeVisionClient() {
  if (!visionClient && process.env.GOOGLE_VISION_API_KEY) {
    visionClient = new vision.ImageAnnotatorClient({
      keyFilename: process.env.GOOGLE_VISION_API_KEY,
    })
  }
  return visionClient
}

export async function detectTextFromImage(imageBuffer: Buffer): Promise<{
  text: string
  confidence: number
}> {
  const client = await initializeVisionClient()
  
  if (!client) {
    throw new Error('Google Vision client not initialized')
  }

  const [result] = await client.textDetection({
    image: { content: imageBuffer },
  })

  const detections = result.textAnnotations
  const fullText = detections?.[0]?.description || ''
  const confidence = detections?.[0]?.confidence || 0

  return {
    text: fullText,
    confidence: confidence,
  }
}

export async function detectMathSymbols(imageBuffer: Buffer): Promise<{
  hasMath: boolean
  latex: string
  confidence: number
}> {
  const client = await initializeVisionClient()
  
  if (!client) {
    return { hasMath: false, latex: '', confidence: 0 }
  }

  try {
    const [result] = await client.documentTextDetection({
      image: { content: imageBuffer },
    })

    // Basic math detection - can be enhanced
    const text = result.fullTextAnnotation?.text || ''
    const hasMath = /[+\-×÷=√∑∫≤≥≠]/g.test(text) || /[a-zA-Z]\^[0-9]/.test(text)
    
    return {
      hasMath,
      latex: text, // Placeholder - should convert to LaTeX
      confidence: 0.7,
    }
  } catch (error) {
    console.error('Math detection error:', error)
    return { hasMath: false, latex: '', confidence: 0 }
  }
}
