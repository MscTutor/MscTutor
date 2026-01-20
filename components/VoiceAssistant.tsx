'use client'

import { useState } from 'react'
import { Mic, MicOff, X } from 'lucide-react'

export default function VoiceAssistant() {
  const [isOpen, setIsOpen] = useState(false)
  const [isListening, setIsListening] = useState(false)

  const toggleListening = () => {
    setIsListening(!isListening)
    // Placeholder - implement voice recognition
  }

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-primary-600 text-white rounded-full shadow-lg hover:bg-primary-700 transition-colors flex items-center justify-center z-50"
        aria-label="Open voice assistant"
      >
        <Mic className="w-6 h-6" />
      </button>

      {/* Voice Assistant Panel */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 z-50">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
            <h3 className="font-semibold">Voice Assistant</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="p-4">
            <div className="flex items-center justify-center mb-4">
              <button
                onClick={toggleListening}
                className={`w-16 h-16 rounded-full flex items-center justify-center transition-colors ${
                  isListening
                    ? 'bg-red-500 hover:bg-red-600'
                    : 'bg-primary-600 hover:bg-primary-700'
                } text-white`}
              >
                {isListening ? (
                  <MicOff className="w-8 h-8" />
                ) : (
                  <Mic className="w-8 h-8" />
                )}
              </button>
            </div>
            <p className="text-sm text-center text-gray-600 dark:text-gray-400">
              {isListening
                ? 'Listening... Speak your question'
                : 'Click to start listening'}
            </p>
            <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-900 rounded text-sm">
              <p className="text-gray-600 dark:text-gray-400">
                Voice responses will appear here...
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
