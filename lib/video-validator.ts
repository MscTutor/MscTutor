// Video URL Validator - Only YouTube embeds allowed

export interface VideoValidationResult {
  valid: boolean
  error?: string
  youtubeId?: string
  embedUrl?: string
}

/**
 * Validate and extract YouTube video ID
 */
export function validateYouTubeUrl(url: string): VideoValidationResult {
  // YouTube URL patterns
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
    /youtube\.com\/watch\?.*v=([a-zA-Z0-9_-]{11})/,
  ]

  for (const pattern of patterns) {
    const match = url.match(pattern)
    if (match && match[1]) {
      const youtubeId = match[1]
      return {
        valid: true,
        youtubeId,
        embedUrl: `https://www.youtube.com/embed/${youtubeId}`,
      }
    }
  }

  return {
    valid: false,
    error: 'Invalid YouTube URL. Only YouTube videos are allowed.',
  }
}

/**
 * Extract YouTube ID from various URL formats
 */
export function extractYouTubeId(url: string): string | null {
  const validation = validateYouTubeUrl(url)
  return validation.youtubeId || null
}

/**
 * Convert YouTube URL to embed URL
 */
export function getYouTubeEmbedUrl(url: string): string | null {
  const validation = validateYouTubeUrl(url)
  return validation.embedUrl || null
}

/**
 * Check if URL is a valid video embed (YouTube only)
 */
export function isValidVideoEmbed(url: string): boolean {
  return validateYouTubeUrl(url).valid
}
