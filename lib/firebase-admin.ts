import * as admin from 'firebase-admin'

if (!admin.apps.length) {
  try {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
        clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      }),
      storageBucket: process.env.FIREBASE_ADMIN_STORAGE_BUCKET,
    })
  } catch (error) {
    console.error('Firebase Admin initialization error:', error)
  }
}

export const adminDb = admin.firestore()
export const adminAuth = admin.auth()
export const adminStorage = admin.storage()

// Backwards-compatible named exports used in other modules (e.g. lib/storage.ts)
export const db = adminDb
export const auth = adminAuth
export const storage = adminStorage
