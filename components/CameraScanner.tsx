'use client'

import { useState, useRef } from 'react'
import { Camera, Upload, X, Loader2 } from 'lucide-react'

interface ScanResult {
  rawText: string
  mathLatex: string
  detectedShapes: any[]
  confidence: number
  hasMath: boolean
  structures: {
    fractions: number
    superscripts: number
    subscripts: number
    roots: number
    equations: number
  }
}

export default function CameraScanner() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScanning, setIsScanning] = useState(false)
  const [preview, setPreview] = useState<string | null>(null)
  const [result, setResult] = useState<ScanResult | null>(null)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const streamRef = useRef<MediaStream | null>(null)

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      handleImageFile(file)
    }
  }

  const handleImageFile = async (file: File) => {
    setError(null)
    setResult(null)
    
    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Please select an image file')
      return
    }

    // Create preview
    const reader = new FileReader()
    reader.onloadend = () => {
      setPreview(reader.result as string)
    }
    reader.readAsDataURL(file)

    // Scan image
    await scanImage(file)
  }

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' }, // Use back camera on mobile
      })
      streamRef.current = stream
      if (videoRef.current) {
        videoRef.current.srcObject = stream
      }
    } catch (err) {
      setError('Could not access camera. Please use file upload instead.')
      console.error('Camera error:', err)
    }
  }

  const capturePhoto = async () => {
    if (!videoRef.current) return

    const canvas = document.createElement('canvas')
    canvas.width = videoRef.current.videoWidth
    canvas.height = videoRef.current.videoHeight
    const ctx = canvas.getContext('2d')
    
    if (ctx) {
      ctx.drawImage(videoRef.current, 0, 0)
      canvas.toBlob(async (blob) => {
        if (blob) {
          const file = new File([blob], 'capture.jpg', { type: 'image/jpeg' })
          setPreview(URL.createObjectURL(blob))
          stopCamera()
          await scanImage(file)
        }
      }, 'image/jpeg')
    }
  }

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop())
      streamRef.current = null
    }
  }

  const scanImage = async (file: File) => {
    setIsScanning(true)
    setError(null)

    try {
      const formData = new FormData()
      formData.append('image', file)

      const response = await fetch('/api/vision/scan', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Scan failed')
      }

      const data = await response.json()
      setResult(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to scan image')
    } finally {
      setIsScanning(false)
    }
  }

  const handleCreateQuestion = async () => {
    if (!result) return

    try {
      const response = await fetch('/api/questions/create-from-visual', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: result.rawText,
          latex: result.mathLatex,
          shapes: result.detectedShapes,
        }),
      })

      if (response.ok) {
        const data = await response.json()
        window.location.href = data.url
      } else {
        setError('Failed to create question')
      }
    } catch (err) {
      setError('Failed to create question')
    }
  }

  const reset = () => {
    setPreview(null)
    setResult(null)
    setError(null)
    stopCamera()
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const closeModal = () => {
    reset()
    setIsOpen(false)
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
      >
        <Camera className="w-5 h-5" />
        <span>Scan Question</span>
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Scan Question</h2>
                <button
                  onClick={closeModal}
                  className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {!preview && !result && (
                <div className="space-y-4">
                  <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center">
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleFileSelect}
                      className="hidden"
                    />
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="flex flex-col items-center gap-4 w-full"
                    >
                      <Upload className="w-12 h-12 text-gray-400" />
                      <div>
                        <p className="text-lg font-medium">Upload Image</p>
                        <p className="text-sm text-gray-500">or use camera</p>
                      </div>
                    </button>
                  </div>

                  <div className="flex gap-4">
                    <button
                      onClick={startCamera}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
                    >
                      <Camera className="w-5 h-5" />
                      Use Camera
                    </button>
                  </div>

                  {videoRef.current?.srcObject && (
                    <div className="relative">
                      <video
                        ref={videoRef}
                        autoPlay
                        playsInline
                        className="w-full rounded-lg"
                      />
                      <button
                        onClick={capturePhoto}
                        className="absolute bottom-4 left-1/2 transform -translate-x-1/2 px-6 py-3 bg-primary-600 text-white rounded-full hover:bg-primary-700"
                      >
                        Capture
                      </button>
                    </div>
                  )}
                </div>
              )}

              {preview && (
                <div className="space-y-4">
                  <img
                    src={preview}
                    alt="Preview"
                    className="w-full rounded-lg border border-gray-300 dark:border-gray-600"
                  />

                  {isScanning && (
                    <div className="flex items-center justify-center gap-2 py-4">
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Scanning image...</span>
                    </div>
                  )}

                  {error && (
                    <div className="p-4 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 rounded-lg">
                      {error}
                    </div>
                  )}

                  {result && (
                    <div className="space-y-4">
                      <div className="p-4 bg-green-100 dark:bg-green-900 rounded-lg">
                        <p className="font-medium mb-2">Detected Text:</p>
                        <p className="text-sm">{result.rawText}</p>
                        {result.hasMath && (
                          <div className="mt-2">
                            <p className="font-medium mb-1">LaTeX Formula:</p>
                            <code className="text-xs bg-white dark:bg-gray-800 p-2 rounded block">
                              {result.mathLatex}
                            </code>
                          </div>
                        )}
                        <p className="text-xs mt-2 text-gray-600 dark:text-gray-400">
                          Confidence: {(result.confidence * 100).toFixed(1)}%
                        </p>
                      </div>

                      <div className="flex gap-2">
                        <button
                          onClick={handleCreateQuestion}
                          className="flex-1 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
                        >
                          Create Question
                        </button>
                        <button
                          onClick={reset}
                          className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600"
                        >
                          Scan Another
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
