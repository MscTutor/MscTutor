// Rate Limiting Utility for API Routes

interface RateLimitStore {
  [key: string]: {
    count: number
    resetTime: number
  }
}

const store: RateLimitStore = {}

export interface RateLimitOptions {
  maxRequests: number
  windowMs: number
}

export function checkRateLimit(
  identifier: string,
  options: RateLimitOptions = { maxRequests: 10, windowMs: 60000 }
): { allowed: boolean; remaining: number; resetTime: number } {
  const now = Date.now()
  const record = store[identifier]

  // If no record or window expired, create new record
  if (!record || now > record.resetTime) {
    store[identifier] = {
      count: 1,
      resetTime: now + options.windowMs,
    }
    return {
      allowed: true,
      remaining: options.maxRequests - 1,
      resetTime: now + options.windowMs,
    }
  }

  // If limit exceeded
  if (record.count >= options.maxRequests) {
    return {
      allowed: false,
      remaining: 0,
      resetTime: record.resetTime,
    }
  }

  // Increment count
  record.count++
  return {
    allowed: true,
    remaining: options.maxRequests - record.count,
    resetTime: record.resetTime,
  }
}

export function getClientIdentifier(request: Request): string {
  // Try to get user ID from header
  const userId = request.headers.get('x-user-id')
  if (userId && userId !== 'anonymous') {
    return `user:${userId}`
  }

  // Fallback to IP address
  const forwarded = request.headers.get('x-forwarded-for')
  const ip = forwarded ? forwarded.split(',')[0] : request.headers.get('x-real-ip') || 'unknown'
  return `ip:${ip}`
}

// Cleanup old entries periodically
setInterval(() => {
  const now = Date.now()
  Object.keys(store).forEach((key) => {
    if (store[key].resetTime < now) {
      delete store[key]
    }
  })
}, 60000) // Cleanup every minute
