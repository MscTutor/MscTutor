// Storage Adapter Abstraction Layer

import { R2Storage } from './storage'
import { StorjStorage } from './storage'
import { uploadToFirebaseStorage, uploadTempVisionFile } from './storage'
import { processImage } from './image-processing'

export enum StorageType {
  ADMIN_R2 = 'admin_r2',
  ADMIN_STORJ = 'admin_storj',
  USER_FIREBASE = 'user_firebase',
  TEMP_VISION = 'temp_vision',
}

export interface UploadOptions {
  compress?: boolean
  maxWidth?: number
  maxHeight?: number
  quality?: number
  format?: 'webp' | 'jpeg' | 'png'
}

/**
 * Unified storage upload interface
 */
export async function uploadFile(
  file: Buffer,
  fileName: string,
  contentType: string,
  storageType: StorageType,
  userId?: string,
  options: UploadOptions = {}
): Promise<string> {
  const {
    compress = true,
    maxWidth = 1600,
    maxHeight = 1600,
    quality = 85,
    format = 'webp',
  } = options

  // Process image if needed
  let processedFile = file
  if (compress && contentType.startsWith('image/')) {
    try {
      processedFile = await processImage(file, {
        maxWidth,
        maxHeight,
        quality,
        format,
      })
      if (format === 'webp') {
        contentType = 'image/webp'
        fileName = fileName.replace(/\.(jpg|jpeg|png)$/i, '.webp')
      }
    } catch (error) {
      console.error('Image processing failed, using original:', error)
    }
  }

  switch (storageType) {
    case StorageType.ADMIN_R2:
      const r2Storage = new R2Storage()
      return await r2Storage.uploadFile(processedFile, fileName, contentType, compress)

    case StorageType.ADMIN_STORJ:
      const storjStorage = new StorjStorage()
      return await storjStorage.uploadFile(processedFile, fileName, contentType, compress)

    case StorageType.USER_FIREBASE:
      if (!userId) {
        throw new Error('User ID required for Firebase storage')
      }
      return await uploadToFirebaseStorage(processedFile, fileName, contentType, userId, compress)

    case StorageType.TEMP_VISION:
      return await uploadTempVisionFile(processedFile, fileName)

    default:
      throw new Error(`Unknown storage type: ${storageType}`)
  }
}

/**
 * Get storage URL based on type
 */
export function getStorageUrl(fileName: string, storageType: StorageType): string {
  switch (storageType) {
    case StorageType.ADMIN_R2:
      return `${process.env.R2_PUBLIC_URL}/admin/${fileName}`
    case StorageType.ADMIN_STORJ:
      return `https://${process.env.STORJ_ENDPOINT}/${process.env.STORJ_BUCKET_NAME}/backup/${fileName}`
    case StorageType.USER_FIREBASE:
      return `https://storage.googleapis.com/${process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET}/users/${fileName}`
    case StorageType.TEMP_VISION:
      return `https://storage.googleapis.com/${process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET}/temp/vision/${fileName}`
    default:
      return ''
  }
}
