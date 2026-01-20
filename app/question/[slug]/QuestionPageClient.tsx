'use client'

import { useState, lazy, Suspense } from 'react'
import { MessageSquare, Volume2, BookOpen } from 'lucide-react'
import dynamic from 'next/dynamic'
import LazyImage from '@/components/LazyImage'

// Lazy load AI Chat component
const AIChat = dynamic(() => import('@/components/AIChat'), {
  loading: () => <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg animate-pulse">Loading AI Chat...</div>,
})

interface QuestionPageClientProps {
  question: any
}

export default function QuestionPageClient({ question }: QuestionPageClientProps) {
  const [showAIChat, setShowAIChat] = useState(false)

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
      {/* Main Content */}
      <div className="lg:col-span-2 space-y-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold mb-4 break-words">{question.questionText}</h1>
          {question.questionLatex && (
            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg mb-4">
              <code className="text-sm">{question.questionLatex}</code>
            </div>
          )}
          {question.imageUrl && (
            <LazyImage
              src={question.imageUrl}
              alt="Question"
              width={800}
              height={600}
              className="max-w-full rounded-lg mb-4"
            />
          )}
        </div>

        {/* Variations */}
        {question.variations && question.variations.length > 0 && (
          <section>
            <h2 className="text-2xl font-semibold mb-4">Question Variations</h2>
            <div className="space-y-3">
              {question.variations.map((variation: any, index: number) => (
                <div
                  key={variation.id}
                  className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
                >
                  <p className="font-medium mb-1">Variation {index + 1}</p>
                  <p>{variation.text}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Solutions */}
        {question.solutions && question.solutions.length > 0 && (
          <section>
            <h2 className="text-2xl font-semibold mb-4">Step-by-Step Solution</h2>
            <div className="space-y-4">
              {question.solutions.map((solution: any) => (
                <div
                  key={solution.id}
                  className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center font-semibold">
                      {solution.stepNumber}
                    </div>
                    <div className="flex-1">
                      <p className="mb-2">{solution.stepText}</p>
                      {solution.stepLatex && (
                        <code className="text-sm bg-gray-50 dark:bg-gray-900 p-2 rounded block">
                          {solution.stepLatex}
                        </code>
                      )}
                      {solution.explanation && (
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                          {solution.explanation}
                        </p>
                      )}
                      {solution.imageUrl && (
                        <LazyImage
                          src={solution.imageUrl}
                          alt={`Step ${solution.stepNumber}`}
                          width={600}
                          height={400}
                          className="mt-2 max-w-full rounded"
                        />
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Related Questions */}
        {question.relatedQuestions && question.relatedQuestions.length > 0 && (
          <section>
            <h2 className="text-2xl font-semibold mb-4">Related Questions</h2>
            <div className="space-y-2">
              {question.relatedQuestions.map((relation: any) => (
                <a
                  key={relation.id}
                  href={`/question/${relation.related.slug}`}
                  className="block p-3 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <p className="line-clamp-2">{relation.related.questionText}</p>
                </a>
              ))}
            </div>
          </section>
        )}

        {/* Discussions */}
        {question.discussions && question.discussions.length > 0 && (
          <section>
            <h2 className="text-2xl font-semibold mb-4">User Discussions</h2>
            <div className="space-y-4">
              {question.discussions.map((discussion: any) => (
                <div
                  key={discussion.id}
                  className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-semibold">{discussion.userName}</span>
                    <span className="text-xs text-gray-500">
                      {new Date(discussion.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p>{discussion.content}</p>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Sidebar */}
      <div className="lg:col-span-1 order-first lg:order-last">
        <div className="lg:sticky lg:top-20 space-y-3 sm:space-y-4">
          <button
            onClick={() => setShowAIChat(!showAIChat)}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            <MessageSquare className="w-5 h-5" />
            <span>AI Chat</span>
          </button>
          <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">
            <Volume2 className="w-5 h-5" />
            <span>Voice Explanation</span>
          </button>
          <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">
            <BookOpen className="w-5 h-5" />
            <span>Save Question</span>
          </button>
        </div>

        {showAIChat && (
          <div className="mt-4">
            <Suspense fallback={<div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">Loading...</div>}>
              <AIChat questionId={question.id} questionText={question.questionText} />
            </Suspense>
          </div>
        )}
      </div>
    </div>
  )
}
