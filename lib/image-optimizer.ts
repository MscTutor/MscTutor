// Client-side Image Optimization (Mandatory before upload)

export interface ImageOptimizationOptions {
  maxWidth?: number
  quality?: number
  format?: 'webp'
  removeMetadata?: boolean
  targetSizeKB?: number
}

/**
 * Optimize image before upload
 * Resize max width 1600px, Convert to WebP, Quality 70%, Remove metadata
 * Target size: 150-300KB
 */
export async function optimizeImage(
  file: File,
  options: ImageOptimizationOptions = {}
): Promise<File> {
  const {
    maxWidth = 1600,
    quality = 0.7,
    format = 'webp',
    removeMetadata = true,
    targetSizeKB = 250,
  } = options

  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    
    reader.onload = (e) => {
      const img = new Image()
      
      img.onload = () => {
        // Calculate new dimensions
        let width = img.width
        let height = img.height
        
        if (width > maxWidth) {
          height = (height * maxWidth) / width
          width = maxWidth
        }

        // Create canvas
        const canvas = document.createElement('canvas')
        canvas.width = width
        canvas.height = height
        const ctx = canvas.getContext('2d')
        
        if (!ctx) {
          reject(new Error('Could not get canvas context'))
          return
        }

        // Draw image
        ctx.drawImage(img, 0, 0, width, height)

        // Convert to WebP with quality
        canvas.toBlob(
          (blob) => {
            if (!blob) {
              reject(new Error('Failed to create blob'))
              return
            }

            // Check size and adjust quality if needed
            const sizeKB = blob.size / 1024
            
            if (sizeKB > targetSizeKB * 1.2) {
              // Re-optimize with lower quality
              canvas.toBlob(
                (adjustedBlob) => {
                  if (!adjustedBlob) {
                    reject(new Error('Failed to create adjusted blob'))
                    return
                  }
                  
                  const optimizedFile = new File(
                    [adjustedBlob],
                    file.name.replace(/\.[^/.]+$/, '.webp'),
                    { type: 'image/webp' }
                  )
                  resolve(optimizedFile)
                },
                'image/webp',
                quality * 0.8 // Reduce quality further
              )
            } else {
              const optimizedFile = new File(
                [blob],
                file.name.replace(/\.[^/.]+$/, '.webp'),
                { type: 'image/webp' }
              )
              resolve(optimizedFile)
            }
          },
          'image/webp',
          quality
        )
      }
      
      img.onerror = () => reject(new Error('Failed to load image'))
      img.src = e.target?.result as string
    }
    
    reader.onerror = () => reject(new Error('Failed to read file'))
    reader.readAsDataURL(file)
  })
}

/**
 * Validate image file
 */
export function validateImageFile(file: File): { valid: boolean; error?: string } {
  // Check file type
  const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif']
  if (!validTypes.includes(file.type)) {
    return {
      valid: false,
      error: 'Invalid image type. Only JPEG, PNG, WebP, and GIF are allowed.',
    }
  }

  // Check file size (10MB max before optimization)
  const maxSize = 10 * 1024 * 1024
  if (file.size > maxSize) {
    return {
      valid: false,
      error: 'Image too large. Maximum size is 10MB.',
    }
  }

  return { valid: true }
}

/**
 * Get image dimensions
 */
export function getImageDimensions(file: File): Promise<{ width: number; height: number }> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      const img = new Image()
      img.onload = () => {
        resolve({ width: img.width, height: img.height })
      }
      img.onerror = () => reject(new Error('Failed to load image'))
      img.src = e.target?.result as string
    }
    reader.onerror = () => reject(new Error('Failed to read file'))
    reader.readAsDataURL(file)
  })
}
