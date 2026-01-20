'use client'

import { useState, useRef } from 'react'
import { Upload, X, Loader2 } from 'lucide-react'
import { optimizeImage, validateImageFile } from '@/lib/image-optimizer'

interface ImageUploadProps {
  onUpload: (file: File) => Promise<string>
  maxSize?: number
  storageType?: 'admin' | 'user' | 'temp'
  userId?: string
}

export default function ImageUpload({
  onUpload,
  maxSize = 10 * 1024 * 1024,
  storageType = 'user',
  userId,
}: ImageUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [preview, setPreview] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate file
    const validation = validateImageFile(file)
    if (!validation.valid) {
      setError(validation.error || 'Invalid file')
      return
    }

    setError(null)
    setUploading(true)

    try {
      // Optimize image (mandatory)
      const optimizedFile = await optimizeImage(file, {
        maxWidth: 1600,
        quality: 0.7,
        format: 'webp',
        removeMetadata: true,
        targetSizeKB: 250,
      })

      // Show preview
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result as string)
      }
      reader.readAsDataURL(optimizedFile)

      // Upload optimized file
      const url = await onUpload(optimizedFile)
      setUploadedUrl(url)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed')
    } finally {
      setUploading(false)
    }
  }

  const reset = () => {
    setPreview(null)
    setUploadedUrl(null)
    setError(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <div className="space-y-4">
      <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
          disabled={uploading}
        />
        <button
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
          className="flex flex-col items-center gap-4 w-full disabled:opacity-50"
        >
          {uploading ? (
            <>
              <Loader2 className="w-12 h-12 text-primary-600 animate-spin" />
              <span>Optimizing and uploading...</span>
            </>
          ) : (
            <>
              <Upload className="w-12 h-12 text-gray-400" />
              <div>
                <p className="text-lg font-medium">Upload Image</p>
                <p className="text-sm text-gray-500">
                  Max 10MB • Auto-optimized to WebP
                </p>
              </div>
            </>
          )}
        </button>
      </div>

      {error && (
        <div className="p-4 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 rounded-lg">
          {error}
        </div>
      )}

      {preview && (
        <div className="relative">
          <img
            src={preview}
            alt="Preview"
            className="w-full max-h-64 object-contain rounded-lg border border-gray-300 dark:border-gray-600"
          />
          <button
            onClick={reset}
            className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {uploadedUrl && (
        <div className="p-4 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-lg">
          <p className="font-semibold mb-2">Upload successful!</p>
          <p className="text-sm break-all">{uploadedUrl}</p>
        </div>
      )}
    </div>
  )
}
