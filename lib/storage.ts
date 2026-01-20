// Cloudflare R2 Storage Adapter (Admin Uploads - Permanent)
import {
  DeleteObjectCommand,
  HeadObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3'

export class R2Storage {
  private accountId: string
  private accessKeyId: string
  private secretAccessKey: string
  private bucketName: string
  private publicUrl: string
  private client: S3Client

  constructor() {
    this.accountId = process.env.R2_ACCOUNT_ID || ''
    this.accessKeyId = process.env.R2_ACCESS_KEY_ID || ''
    this.secretAccessKey = process.env.R2_SECRET_ACCESS_KEY || ''
    this.bucketName = process.env.R2_BUCKET_NAME || ''
    this.publicUrl = process.env.R2_PUBLIC_URL || ''

    this.client = new S3Client({
      region: 'auto',
      endpoint: this.accountId
        ? `https://${this.accountId}.r2.cloudflarestorage.com`
        : undefined,
      credentials: {
        accessKeyId: this.accessKeyId,
        secretAccessKey: this.secretAccessKey,
      },
    })
  }

  async uploadFile(
    file: Buffer,
    fileName: string,
    contentType: string,
    compress: boolean = true
  ): Promise<string> {
    if (!this.accountId || !this.accessKeyId || !this.secretAccessKey || !this.bucketName) {
      throw new Error('R2 is not configured. Set R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY, R2_BUCKET_NAME.')
    }

    const key = `admin/${fileName}`
    await this.client.send(
      new PutObjectCommand({
        Bucket: this.bucketName,
        Key: key,
        Body: file,
        ContentType: contentType,
        CacheControl: 'public, max-age=31536000, immutable',
      })
    )

    if (this.publicUrl) return `${this.publicUrl}/${key}`
    return key
  }

  async deleteFile(fileName: string): Promise<void> {
    if (!this.bucketName) return
    const key = `admin/${fileName}`
    await this.client.send(
      new DeleteObjectCommand({
        Bucket: this.bucketName,
        Key: key,
      })
    )
  }

  async fileExists(fileName: string): Promise<boolean> {
    if (!this.bucketName) return false
    const key = `admin/${fileName}`
    try {
      await this.client.send(
        new HeadObjectCommand({
          Bucket: this.bucketName,
          Key: key,
        })
      )
      return true
    } catch {
      return false
    }
  }
}

// Storj Storage Adapter (Admin Backup - Permanent)
export class StorjStorage {
  private accessKey: string
  private secretKey: string
  private bucketName: string
  private endpoint: string

  constructor() {
    this.accessKey = process.env.STORJ_ACCESS_KEY || ''
    this.secretKey = process.env.STORJ_SECRET_KEY || ''
    this.bucketName = process.env.STORJ_BUCKET_NAME || ''
    this.endpoint = process.env.STORJ_ENDPOINT || ''
  }

  async uploadFile(
    file: Buffer,
    fileName: string,
    contentType: string,
    compress: boolean = true
  ): Promise<string> {
    // Storj is S3-compatible, use S3 SDK
    // TODO: Implement actual Storj upload
    // const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3')
    // const s3Client = new S3Client({
    //   endpoint: this.endpoint,
    //   credentials: { accessKeyId: this.accessKey, secretAccessKey: this.secretKey },
    // })
    // await s3Client.send(new PutObjectCommand({...}))
    
    return `https://${this.endpoint}/${this.bucketName}/backup/${fileName}`
  }

  async deleteFile(fileName: string): Promise<void> {
    // TODO: Implement Storj delete
  }

  async fileExists(fileName: string): Promise<boolean> {
    // TODO: Implement Storj file check
    return false
  }
}

// Firebase Storage Adapter (User Uploads - Auto-delete after 6 months)
export async function uploadToFirebaseStorage(
  file: Buffer,
  path: string,
  contentType: string,
  userId: string,
  compress: boolean = true
): Promise<string> {
  const { storage } = await import('./firebase-admin')
  const { processImage } = await import('./image-processing')
  
  const bucket = storage.bucket()
  
  // Process image if needed
  let processedFile = file
  if (compress && contentType.startsWith('image/')) {
    try {
      processedFile = await processImage(file, {
        maxWidth: 1600,
        maxHeight: 1600,
        quality: 85,
        format: 'webp',
      })
      contentType = 'image/webp'
      path = path.replace(/\.(jpg|jpeg|png)$/i, '.webp')
    } catch (error) {
      console.error('Image processing failed, using original:', error)
    }
  }

  const fileRef = bucket.file(`users/${userId}/${path}`)

  // Upload with metadata
  await fileRef.save(processedFile, {
    metadata: {
      contentType,
      metadata: {
        userId,
        uploadedAt: new Date().toISOString(),
        expiresAt: new Date(Date.now() + 6 * 30 * 24 * 60 * 60 * 1000).toISOString(), // 6 months
      },
    },
  })

  await fileRef.makePublic()
  return fileRef.publicUrl()
}

export async function deleteFromFirebaseStorage(path: string): Promise<void> {
  const { storage } = await import('./firebase-admin')
  const bucket = storage.bucket()
  await bucket.file(path).delete()
}

// Temporary Vision Storage (Delete within 60 seconds)
export async function uploadTempVisionFile(
  file: Buffer,
  fileName: string
): Promise<string> {
  const { storage } = await import('./firebase-admin')
  const bucket = storage.bucket()
  const fileRef = bucket.file(`temp/vision/${Date.now()}-${fileName}`)

  await fileRef.save(file, {
    metadata: {
      contentType: 'image/jpeg',
      metadata: {
        expiresAt: new Date(Date.now() + 60 * 1000).toISOString(), // 60 seconds
      },
    },
  })

  // Schedule deletion after 60 seconds
  setTimeout(async () => {
    try {
      await fileRef.delete()
    } catch (error) {
      console.error('Failed to delete temp file:', error)
    }
  }, 60000)

  return fileRef.publicUrl()
}

// Cleanup expired user files (Run periodically)
export async function cleanupExpiredUserFiles(): Promise<number> {
  const { storage } = await import('./firebase-admin')
  const bucket = storage.bucket()
  const now = new Date()
  let deletedCount = 0

  try {
    const [files] = await bucket.getFiles({ prefix: 'users/' })
    
    for (const file of files) {
      const metadata = await file.getMetadata()
      const expiresAt = metadata.metadata?.expiresAt
      
      if (expiresAt && new Date(expiresAt) < now) {
        await file.delete()
        deletedCount++
      }
    }
  } catch (error) {
    console.error('Cleanup error:', error)
  }

  return deletedCount
}

// Cleanup expired temp vision files
export async function cleanupExpiredTempFiles(): Promise<number> {
  const { storage } = await import('./firebase-admin')
  const bucket = storage.bucket()
  const now = new Date()
  let deletedCount = 0

  try {
    const [files] = await bucket.getFiles({ prefix: 'temp/vision/' })
    
    for (const file of files) {
      const metadata = await file.getMetadata()
      const expiresAt = metadata.metadata?.expiresAt
      
      if (expiresAt && new Date(expiresAt) < now) {
        await file.delete()
        deletedCount++
      }
    }
  } catch (error) {
    console.error('Temp cleanup error:', error)
  }

  return deletedCount
}
