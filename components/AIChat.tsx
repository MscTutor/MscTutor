'use client'

import { useState, useEffect } from 'react'
import { Send, Loader2 } from 'lucide-react'

interface AIChatProps {
  questionId: number
  questionText: string
}

export default function AIChat({ questionId, questionText }: AIChatProps) {
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'assistant'; content: string }>>([
    {
      role: 'assistant',
      content: `I can help you understand this question: "${questionText.substring(0, 100)}...". What would you like to know?`,
    },
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingHistory, setIsLoadingHistory] = useState(true)

  // Load chat history on mount
  useEffect(() => {
    const loadChatHistory = async () => {
      try {
        // Get user ID from localStorage or auth (placeholder)
        const userId = localStorage.getItem('userId') || 'anonymous'
        
        const response = await fetch(`/api/ai/chat/history?questionId=${questionId}`, {
          headers: {
            'x-user-id': userId,
          },
        })

        if (response.ok) {
          const data = await response.json()
          if (data.history && data.history.length > 0) {
            // If we have history, replace the initial message
            setMessages(data.history)
          } else {
            // Keep the initial welcome message
            setMessages([
              {
                role: 'assistant',
                content: `I can help you understand this question: "${questionText.substring(0, 100)}...". What would you like to know?`,
              },
            ])
          }
        }
      } catch (error) {
        console.error('Failed to load chat history:', error)
        // Keep the initial welcome message on error
      } finally {
        setIsLoadingHistory(false)
      }
    }

    loadChatHistory()
  }, [questionId, questionText])

  const handleSend = async () => {
    if (!input.trim() || isLoading) return

    const userMessage = input.trim()
    setInput('')
    setMessages((prev) => [...prev, { role: 'user', content: userMessage }])
    setIsLoading(true)

    try {
      // Get user ID from localStorage or auth (placeholder)
      const userId = localStorage.getItem('userId') || 'anonymous'
      
      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'x-user-id': userId,
        },
        body: JSON.stringify({
          questionId,
          questionText,
          message: userMessage,
          history: messages,
        }),
      })

      if (response.ok) {
        const data = await response.json()
        setMessages((prev) => [
          ...prev,
          { role: 'assistant', content: data.response },
        ])
      } else {
        throw new Error('Failed to get response')
      }
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: 'Sorry, I encountered an error. Please try again.',
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 h-[500px] flex flex-col">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <h3 className="font-semibold">AI Assistant</h3>
        <p className="text-xs text-gray-500">Context locked to this question</p>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {isLoadingHistory && (
          <div className="flex justify-center items-center h-full">
            <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
          </div>
        )}
        {!isLoadingHistory && messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-lg p-3 ${
                message.role === 'user'
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-700'
              }`}
            >
              <p className="text-sm">{message.content}</p>
            </div>
          </div>
        ))}
        {!isLoadingHistory && isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-3">
              <Loader2 className="w-5 h-5 animate-spin" />
            </div>
          </div>
        )}
      </div>
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask a question..."
            className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
          <button
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  )
}
