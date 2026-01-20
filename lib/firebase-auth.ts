// Firebase Authentication Helpers

import { auth, db } from './firebase'
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth'
import { createUserDocument, updateLastActive, getUserDocument, UserRole } from './firebase-collections'
import { doc, getDoc } from 'firebase/firestore'

// Sign up with email/password
export async function signUp(email: string, password: string, displayName?: string) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    const user = userCredential.user

    // Create user document in Firestore
    await createUserDocument(user.uid, email, displayName)

    // Update display name if provided
    if (displayName) {
      await user.updateProfile({ displayName })
    }

    return { user, error: null }
  } catch (error: any) {
    return { user: null, error: error.message }
  }
}

// Sign in with email/password
export async function signIn(email: string, password: string) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    const user = userCredential.user

    // Update last active
    await updateLastActive(user.uid)

    return { user, error: null }
  } catch (error: any) {
    return { user: null, error: error.message }
  }
}

// Sign in with Google
export async function signInWithGoogle() {
  try {
    const provider = new GoogleAuthProvider()
    const userCredential = await signInWithPopup(auth, provider)
    const user = userCredential.user

    // Check if user document exists
    const userDoc = await getUserDocument(user.uid)
    if (!userDoc) {
      // Create user document if doesn't exist
      await createUserDocument(user.uid, user.email || '', user.displayName || undefined)
    } else {
      // Update last active
      await updateLastActive(user.uid)
    }

    return { user, error: null }
  } catch (error: any) {
    return { user: null, error: error.message }
  }
}

// Sign out
export async function signOutUser() {
  try {
    await signOut(auth)
    return { error: null }
  } catch (error: any) {
    return { error: error.message }
  }
}

// Get current user
export function getCurrentUser(): User | null {
  return auth.currentUser
}

// Auth state observer
export function onAuthChange(callback: (user: User | null) => void) {
  return onAuthStateChanged(auth, callback)
}

// Get user role
export async function getUserRole(uid: string): Promise<UserRole | null> {
  try {
    const userDoc = await getUserDocument(uid)
    return userDoc?.role || null
  } catch (error) {
    console.error('Error getting user role:', error)
    return null
  }
}

// Check if user has required role
export async function hasRole(uid: string, requiredRole: UserRole): Promise<boolean> {
  const userRole = await getUserRole(uid)
  if (!userRole) return false

  const roleHierarchy = {
    [UserRole.GUEST]: 0,
    [UserRole.REGISTERED]: 1,
    [UserRole.PAID]: 2,
    [UserRole.MODERATOR]: 3,
    [UserRole.ADMIN]: 4,
  }

  return roleHierarchy[userRole] >= roleHierarchy[requiredRole]
}
