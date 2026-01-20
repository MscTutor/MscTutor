// Database Connection Verification

import { prisma } from './prisma'

export async function verifyDatabaseConnection(): Promise<{
  connected: boolean
  error?: string
}> {
  try {
    await prisma.$queryRaw`SELECT 1`
    return { connected: true }
  } catch (error) {
    return {
      connected: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}

export async function testDatabaseOperations() {
  try {
    // Test read
    const classes = await prisma.class.findMany({ take: 1 })
    
    // Test relations
    if (classes.length > 0) {
      const subjects = await prisma.subject.findMany({
        where: { classId: classes[0].id },
        take: 1,
      })
      
      return {
        success: true,
        message: 'Database operations working correctly',
        classesCount: classes.length,
        subjectsCount: subjects.length,
      }
    }
    
    return {
      success: true,
      message: 'Database connected but no data found',
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}
