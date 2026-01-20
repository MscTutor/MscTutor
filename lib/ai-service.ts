// AI Service Adapter - Supports Multiple AI Providers

export enum AIProvider {
  DEEPSEEK = 'deepseek',
  OPENAI = 'openai',
  ANTHROPIC = 'anthropic',
  CUSTOM = 'custom',
}

export interface AIRequest {
  questionText: string
  detectedFormula?: string
  chapterContext?: string
  userMessage: string
  history?: Array<{ role: 'user' | 'assistant'; content: string }>
  userMemory?: string[] // Limited memory based on subscription
  subject?: 'math' | 'physics' | 'chemistry' | 'commerce'
}

export interface AIResponse {
  response: string
  stepByStepSolution?: string[]
  explanation?: string
  examples?: string[]
  confidence?: number
}

export interface AIConfig {
  provider: AIProvider
  apiKey: string
  apiUrl?: string
  model?: string
  maxTokens?: number
  temperature?: number
}

/**
 * DeepSeek AI Service
 */
export class DeepSeekService {
  private apiKey: string
  private apiUrl: string
  private model: string

  constructor(config: { apiKey: string; apiUrl?: string; model?: string }) {
    this.apiKey = config.apiKey
    this.apiUrl = config.apiUrl || 'https://api.deepseek.com/v1/chat/completions'
    this.model = config.model || 'deepseek-chat'
  }

  async generateResponse(request: AIRequest): Promise<AIResponse> {
    try {
      // Build system prompt with context
      const systemPrompt = this.buildSystemPrompt(request)
      
      // Build messages array
      const messages = [
        { role: 'system', content: systemPrompt },
        ...(request.history || []),
        { role: 'user', content: request.userMessage },
      ]

      // Call DeepSeek API
      const response = await fetch(this.apiUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: this.model,
          messages,
          temperature: 0.7,
          max_tokens: 2000,
        }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(`DeepSeek API error: ${error.error?.message || 'Unknown error'}`)
      }

      const data = await response.json()
      const aiResponse = data.choices[0]?.message?.content || ''

      // Parse response for step-by-step solution
      const stepByStepSolution = this.parseStepByStepSolution(aiResponse)
      const explanation = this.extractExplanation(aiResponse)

      return {
        response: aiResponse,
        stepByStepSolution,
        explanation,
        confidence: 0.9,
      }
    } catch (error) {
      console.error('DeepSeek API error:', error)
      throw error
    }
  }

  private buildSystemPrompt(request: AIRequest): string {
    let prompt = `You are an expert tutor helping students with ${request.subject || 'academic'} questions.\n\n`
    
    if (request.questionText) {
      prompt += `Current Question: ${request.questionText}\n\n`
    }
    
    if (request.detectedFormula) {
      prompt += `Detected Formula: ${request.detectedFormula}\n\n`
    }
    
    if (request.chapterContext) {
      prompt += `Chapter Context: ${request.chapterContext}\n\n`
    }
    
    if (request.userMemory && request.userMemory.length > 0) {
      prompt += `User's Previous Learning:\n${request.userMemory.slice(0, 5).join('\n')}\n\n`
    }
    
    prompt += `Instructions:
- Provide clear, step-by-step solutions
- Explain each step in detail
- Use appropriate mathematical notation
- Be encouraging and supportive
- Keep responses concise but comprehensive
- Context is locked to this specific question`

    return prompt
  }

  private parseStepByStepSolution(response: string): string[] {
    // Try to extract numbered steps
    const stepPattern = /(?:Step\s*\d+|^\d+\.)\s*(.+?)(?=(?:Step\s*\d+|^\d+\.|$))/gims
    const steps: string[] = []
    let match

    while ((match = stepPattern.exec(response)) !== null) {
      steps.push(match[1].trim())
    }

    // If no steps found, split by newlines
    if (steps.length === 0) {
      return response.split('\n').filter(line => line.trim().length > 0)
    }

    return steps
  }

  private extractExplanation(response: string): string {
    // Extract explanation section if present
    const explanationPattern = /(?:Explanation|Why|Reason):\s*(.+?)(?=(?:Step|Example|$))/gims
    const match = explanationPattern.exec(response)
    return match ? match[1].trim() : response.substring(0, 200)
  }
}

/**
 * OpenAI Service (Alternative)
 */
export class OpenAIService {
  private apiKey: string
  private apiUrl: string
  private model: string

  constructor(config: { apiKey: string; apiUrl?: string; model?: string }) {
    this.apiKey = config.apiKey
    this.apiUrl = config.apiUrl || 'https://api.openai.com/v1/chat/completions'
    this.model = config.model || 'gpt-4'
  }

  async generateResponse(request: AIRequest): Promise<AIResponse> {
    // Similar implementation to DeepSeek
    // TODO: Implement OpenAI-specific logic
    throw new Error('OpenAI service not yet implemented')
  }
}

/**
 * AI Service Factory
 */
export class AIServiceFactory {
  static create(config: AIConfig): DeepSeekService | OpenAIService {
    switch (config.provider) {
      case AIProvider.DEEPSEEK:
        return new DeepSeekService({
          apiKey: config.apiKey,
          apiUrl: config.apiUrl,
          model: config.model,
        })
      case AIProvider.OPENAI:
        return new OpenAIService({
          apiKey: config.apiKey,
          apiUrl: config.apiUrl,
          model: config.model,
        })
      default:
        throw new Error(`Unsupported AI provider: ${config.provider}`)
    }
  }
}

/**
 * Get AI Service from environment
 */
export function getAIService(): DeepSeekService | OpenAIService {
  const provider = (process.env.AI_PROVIDER || 'deepseek') as AIProvider
  const apiKey = process.env.DEEPSEEK_API_KEY || process.env.OPENAI_API_KEY || ''
  
  if (!apiKey) {
    throw new Error('AI API key not configured')
  }

  const config: AIConfig = {
    provider,
    apiKey,
    apiUrl: process.env.AI_API_URL,
    model: process.env.AI_MODEL,
  }

  return AIServiceFactory.create(config)
}

/**
 * Generate AI response with context locking
 */
export async function generateAIResponse(
  request: AIRequest,
  userId?: string
): Promise<AIResponse> {
  // Get user memory if available
  if (userId) {
    const { getUserMemory } = await import('./firebase-collections')
    const memory = await getUserMemory(userId, 10) // Last 10 items
    request.userMemory = memory.map(m => m.content)
  }

  // Get AI service
  const aiService = getAIService()

  // Generate response
  return await aiService.generateResponse(request)
}
