// Image Processing Utilities

import sharp from 'sharp'

export interface ImageProcessingOptions {
  maxWidth?: number
  maxHeight?: number
  quality?: number
  format?: 'webp' | 'jpeg' | 'png'
}

/**
 * Compress and resize image
 */
export async function processImage(
  buffer: Buffer,
  options: ImageProcessingOptions = {}
): Promise<Buffer> {
  const {
    maxWidth = 1600,
    maxHeight = 1600,
    quality = 85,
    format = 'webp',
  } = options

  let image = sharp(buffer)

  // Get metadata
  const metadata = await image.metadata()

  // Resize if needed
  if (metadata.width && metadata.width > maxWidth) {
    image = image.resize(maxWidth, null, {
      withoutEnlargement: true,
      fit: 'inside',
    })
  } else if (metadata.height && metadata.height > maxHeight) {
    image = image.resize(null, maxHeight, {
      withoutEnlargement: true,
      fit: 'inside',
    })
  }

  // Convert format and compress
  switch (format) {
    case 'webp':
      return await image.webp({ quality }).toBuffer()
    case 'jpeg':
      return await image.jpeg({ quality }).toBuffer()
    case 'png':
      return await image.png({ quality: Math.floor(quality * 0.9) }).toBuffer()
    default:
      return await image.webp({ quality }).toBuffer()
  }
}

/**
 * Get image dimensions
 */
export async function getImageDimensions(buffer: Buffer): Promise<{
  width: number
  height: number
}> {
  const metadata = await sharp(buffer).metadata()
  return {
    width: metadata.width || 0,
    height: metadata.height || 0,
  }
}

/**
 * Validate image file
 */
export function validateImage(file: File): { valid: boolean; error?: string } {
  // Check file type
  const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif']
  if (!validTypes.includes(file.type)) {
    return { valid: false, error: 'Invalid image type. Only JPEG, PNG, WebP, and GIF are allowed.' }
  }

  // Check file size (10MB max)
  const maxSize = 10 * 1024 * 1024
  if (file.size > maxSize) {
    return { valid: false, error: 'Image too large. Maximum size is 10MB.' }
  }

  return { valid: true }
}
