// Firebase Collections Structure and Helpers

import { adminDb } from './firebase-admin'
import { db } from './firebase'
import { collection, doc, setDoc, getDoc, updateDoc } from 'firebase/firestore'

// Collection Names
export const COLLECTIONS = {
  USERS: 'users',
  CREDITS: 'credits',
  HISTORY: 'history',
  MEMORY: 'memory',
  CHAT_LOGS: 'chatLogs',
  SCAN_HISTORY: 'scanHistory',
} as const

// User Roles
export enum UserRole {
  GUEST = 'guest',
  REGISTERED = 'registered',
  PAID = 'paid',
  ADMIN = 'admin',
  MODERATOR = 'moderator',
}

// User Document Structure
export interface UserDocument {
  uid: string
  email: string
  displayName?: string
  role: UserRole
  credits: number
  subscriptionPlan?: 'free' | 'basic' | 'premium' | 'pro'
  createdAt: Date
  updatedAt: Date
  lastActiveAt: Date
}

// Credit Document Structure
export interface CreditDocument {
  userId: string
  credits: number
  totalEarned: number
  totalSpent: number
  lastUpdated: Date
}

// Memory Document Structure
export interface MemoryDocument {
  userId: string
  questionId?: number
  content: string
  type: 'question' | 'formula' | 'conversation' | 'chapter'
  size: number // in bytes
  createdAt: Date
  expiresAt?: Date // Auto-delete after 6 months for user content
}

// Create User Document on Signup
export async function createUserDocument(
  uid: string,
  email: string,
  displayName?: string
): Promise<void> {
  const userDoc: UserDocument = {
    uid,
    email,
    displayName,
    role: UserRole.REGISTERED,
    credits: 10, // Free tier: 10 credits
    subscriptionPlan: 'free',
    createdAt: new Date(),
    updatedAt: new Date(),
    lastActiveAt: new Date(),
  }

  // Create in Firestore
  await adminDb.collection(COLLECTIONS.USERS).doc(uid).set(userDoc)

  // Create credits document
  const creditDoc: CreditDocument = {
    userId: uid,
    credits: 10,
    totalEarned: 10,
    totalSpent: 0,
    lastUpdated: new Date(),
  }
  await adminDb.collection(COLLECTIONS.CREDITS).doc(uid).set(creditDoc)
}

// Get User Document
export async function getUserDocument(uid: string): Promise<UserDocument | null> {
  const docRef = adminDb.collection(COLLECTIONS.USERS).doc(uid)
  const docSnap = await docRef.get()

  if (!docSnap.exists) {
    return null
  }

  return docSnap.data() as UserDocument
}

// Update User Credits
export async function updateUserCredits(
  uid: string,
  amount: number,
  operation: 'add' | 'subtract'
): Promise<number> {
  const userRef = adminDb.collection(COLLECTIONS.USERS).doc(uid)
  const creditRef = adminDb.collection(COLLECTIONS.CREDITS).doc(uid)

  const userDoc = await userRef.get()
  const creditDoc = await creditRef.get()

  const currentCredits = userDoc.data()?.credits || 0
  const creditData = creditDoc.data() || {
    totalEarned: 0,
    totalSpent: 0,
  }

  let newCredits = currentCredits
  if (operation === 'add') {
    newCredits = currentCredits + amount
    await creditRef.set(
      {
        credits: newCredits,
        totalEarned: creditData.totalEarned + amount,
        lastUpdated: new Date(),
      },
      { merge: true }
    )
  } else {
    newCredits = Math.max(0, currentCredits - amount)
    await creditRef.set(
      {
        credits: newCredits,
        totalSpent: creditData.totalSpent + amount,
        lastUpdated: new Date(),
      },
      { merge: true }
    )
  }

  await userRef.update({
    credits: newCredits,
    updatedAt: new Date(),
  })

  return newCredits
}

// Save to User Memory
export async function saveToMemory(
  userId: string,
  content: string,
  type: MemoryDocument['type'],
  questionId?: number
): Promise<void> {
  const memoryRef = adminDb
    .collection(COLLECTIONS.USERS)
    .doc(userId)
    .collection(COLLECTIONS.MEMORY)
    .doc()

  const expiresAt = new Date()
  expiresAt.setMonth(expiresAt.getMonth() + 6) // 6 months from now

  const memoryDoc: MemoryDocument = {
    userId,
    questionId,
    content,
    type,
    size: new Blob([content]).size,
    createdAt: new Date(),
    expiresAt,
  }

  await memoryRef.set(memoryDoc)
}

// Get User Memory
export async function getUserMemory(
  userId: string,
  limit: number = 50
): Promise<MemoryDocument[]> {
  const memoryRef = adminDb
    .collection(COLLECTIONS.USERS)
    .doc(userId)
    .collection(COLLECTIONS.MEMORY)
    .orderBy('createdAt', 'desc')
    .limit(limit)

  const snapshot = await memoryRef.get()
  return snapshot.docs.map((doc) => doc.data() as MemoryDocument)
}

// Cleanup Expired Memory (Run periodically)
export async function cleanupExpiredMemory(): Promise<number> {
  const now = new Date()
  let deletedCount = 0

  const usersRef = adminDb.collection(COLLECTIONS.USERS)
  const usersSnapshot = await usersRef.get()

  for (const userDoc of usersSnapshot.docs) {
    const memoryRef = userDoc.ref.collection(COLLECTIONS.MEMORY)
    const memorySnapshot = await memoryRef
      .where('expiresAt', '<=', now)
      .get()

    const batch = adminDb.batch()
    memorySnapshot.docs.forEach((doc) => {
      batch.delete(doc.ref)
      deletedCount++
    })

    await batch.commit()
  }

  return deletedCount
}

// Update Last Active
export async function updateLastActive(uid: string): Promise<void> {
  await adminDb.collection(COLLECTIONS.USERS).doc(uid).update({
    lastActiveAt: new Date(),
  })
}
