'use client'

import { useState } from 'react'
import { BookOpen, Calculator, Beaker, Image as ImageIcon, Play, FileText, Brain } from 'lucide-react'
import dynamic from 'next/dynamic'
import LazyImage from './LazyImage'

const AIChat = dynamic(() => import('./AIChat'), {
  loading: () => <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg animate-pulse">Loading...</div>,
})

interface ChapterBlock {
  id: number
  blockType: string
  title?: string | null
  content: string
  contentLatex?: string | null
  order: number
  metadata?: string | null
}

interface ChapterBlocksProps {
  blocks: ChapterBlock[]
  chapterId: number
  chapterName: string
}

export default function ChapterBlocks({ blocks, chapterId, chapterName }: ChapterBlocksProps) {
  const [expandedBlocks, setExpandedBlocks] = useState<Set<number>>(new Set())
  const [aiChatBlock, setAiChatBlock] = useState<number | null>(null)

  const toggleBlock = (blockId: number) => {
    const newExpanded = new Set(expandedBlocks)
    if (newExpanded.has(blockId)) {
      newExpanded.delete(blockId)
    } else {
      newExpanded.add(blockId)
    }
    setExpandedBlocks(newExpanded)
  }

  const getBlockIcon = (blockType: string) => {
    switch (blockType) {
      case 'introduction':
        return <BookOpen className="w-5 h-5" />
      case 'theory':
        return <FileText className="w-5 h-5" />
      case 'formula':
        return <Calculator className="w-5 h-5" />
      case 'derivation':
        return <Calculator className="w-5 h-5" />
      case 'diagram':
        return <ImageIcon className="w-5 h-5" />
      case 'experiment':
        return <Beaker className="w-5 h-5" />
      case 'project':
        return <Beaker className="w-5 h-5" />
      case 'video':
        return <Play className="w-5 h-5" />
      case 'ai_practice':
        return <Brain className="w-5 h-5" />
      default:
        return <FileText className="w-5 h-5" />
    }
  }

  const getBlockTitle = (block: ChapterBlock) => {
    if (block.title) return block.title
    
    const titles: Record<string, string> = {
      introduction: 'Introduction',
      theory: 'Theory',
      formula: 'Formulas',
      derivation: 'Derivations',
      diagram: 'Diagrams',
      experiment: 'Experiments',
      project: 'Projects',
      solved_question: 'Solved Questions',
      practice: 'Practice Questions',
      exam_question: 'Exam-Oriented Questions',
      ai_practice: 'AI Practice Mode',
      video: 'Video Lessons',
    }
    
    return titles[block.blockType] || 'Content'
  }

  const renderBlockContent = (block: ChapterBlock) => {
    switch (block.blockType) {
      case 'formula':
        return (
          <div className="space-y-3">
            {block.contentLatex && (
              <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
                <code className="text-sm">{block.contentLatex}</code>
              </div>
            )}
            {block.content && (
              <p className="text-gray-700 dark:text-gray-300">{block.content}</p>
            )}
          </div>
        )

      case 'diagram':
        const metadata = block.metadata ? JSON.parse(block.metadata) : {}
        if (metadata.imageUrl) {
          return (
            <LazyImage
              src={metadata.imageUrl}
              alt={block.title || 'Diagram'}
              width={800}
              height={600}
              className="w-full rounded-lg"
            />
          )
        }
        return <p className="text-gray-700 dark:text-gray-300">{block.content}</p>

      case 'video':
        const videoMetadata = block.metadata ? JSON.parse(block.metadata) : {}
        if (videoMetadata.youtubeId) {
          return (
            <div className="aspect-video w-full">
              <iframe
                src={`https://www.youtube.com/embed/${videoMetadata.youtubeId}`}
                title={block.title || 'Video'}
                className="w-full h-full rounded-lg"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          )
        }
        return <p className="text-gray-700 dark:text-gray-300">{block.content}</p>

      case 'ai_practice':
        return (
          <div className="space-y-4">
            <p className="text-gray-700 dark:text-gray-300">{block.content}</p>
            <button
              onClick={() => setAiChatBlock(block.id)}
              className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
              Start AI Practice
            </button>
            {aiChatBlock === block.id && (
              <AIChat
                questionId={chapterId}
                questionText={`Practice questions for ${chapterName}`}
              />
            )}
          </div>
        )

      default:
        return (
          <div className="prose dark:prose-invert max-w-none">
            {block.contentLatex && (
              <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg mb-4">
                <code className="text-sm">{block.contentLatex}</code>
              </div>
            )}
            <div dangerouslySetInnerHTML={{ __html: block.content }} />
          </div>
        )
    }
  }

  // Sort blocks by order
  const sortedBlocks = [...blocks].sort((a, b) => a.order - b.order)

  return (
    <div className="space-y-6">
      {sortedBlocks.map((block) => (
        <div
          key={block.id}
          className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 overflow-hidden"
        >
          <button
            onClick={() => toggleBlock(block.id)}
            className="w-full p-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="text-primary-600">
                {getBlockIcon(block.blockType)}
              </div>
              <h3 className="text-lg font-semibold text-left">
                {getBlockTitle(block)}
              </h3>
            </div>
            <span className="text-gray-500">
              {expandedBlocks.has(block.id) ? '−' : '+'}
            </span>
          </button>
          
          {expandedBlocks.has(block.id) && (
            <div className="p-4 border-t border-gray-200 dark:border-gray-700">
              {renderBlockContent(block)}
              
              {/* AI Explanation Button */}
              <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <button
                  onClick={() => setAiChatBlock(block.id)}
                  className="flex items-center gap-2 px-4 py-2 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 rounded-lg hover:bg-primary-200 dark:hover:bg-primary-800 transition-colors text-sm"
                >
                  <Brain className="w-4 h-4" />
                  Get AI Explanation
                </button>
                {aiChatBlock === block.id && (
                  <div className="mt-4">
                    <AIChat
                      questionId={chapterId}
                      questionText={`Explain: ${block.title || block.content.substring(0, 100)}`}
                    />
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
