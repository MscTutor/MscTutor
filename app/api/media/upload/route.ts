import { NextRequest, NextResponse } from 'next/server'
import { uploadFile, StorageType } from '@/lib/storage-adapter'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    const storageType = formData.get('storageType') as string
    const userId = formData.get('userId') as string | null

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      )
    }

    // Determine storage type
    let storage: StorageType
    if (storageType === 'admin') {
      storage = StorageType.ADMIN_R2
    } else if (storageType === 'temp') {
      storage = StorageType.TEMP_VISION
    } else {
      storage = StorageType.USER_FIREBASE
    }

    // Convert file to buffer
    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    // Upload file
    const fileUrl = await uploadFile(
      buffer,
      file.name,
      file.type,
      storage,
      userId || undefined
    )

    // Get image dimensions if image
    let width: number | undefined
    let height: number | undefined
    if (file.type.startsWith('image/')) {
      // Use sharp to get dimensions
      const sharp = require('sharp')
      const metadata = await sharp(buffer).metadata()
      width = metadata.width
      height = metadata.height
    }

    // Save to database
    const media = await prisma.media.create({
      data: {
        fileName: file.name,
        fileUrl,
        fileType: file.type.startsWith('image/') ? 'image' : 'other',
        storageType: storage,
        size: file.size,
        width,
        height,
        uploadedBy: userId || 'admin',
        isPublic: storageType === 'admin',
      },
    })

    return NextResponse.json({
      success: true,
      media: {
        id: media.id,
        url: fileUrl,
        fileName: file.name,
        size: file.size,
      },
    })
  } catch (error) {
    console.error('Media upload error:', error)
    return NextResponse.json(
      {
        error: 'Upload failed',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}
