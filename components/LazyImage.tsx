'use client'

import { useState } from 'react'
import Image from 'next/image'

interface LazyImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
  priority?: boolean
}

export default function LazyImage({
  src,
  alt,
  width,
  height,
  className = '',
  priority = false,
}: LazyImageProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(false)

  return (
    <div className={`relative ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 animate-pulse rounded" />
      )}
      {error ? (
        <div className="w-full h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center rounded">
          <span className="text-gray-400 text-sm">Image not available</span>
        </div>
      ) : (
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className={`${className} transition-opacity duration-300 ${
            isLoading ? 'opacity-0' : 'opacity-100'
          }`}
          loading={priority ? 'eager' : 'lazy'}
          onLoad={() => setIsLoading(false)}
          onError={() => {
            setError(true)
            setIsLoading(false)
          }}
        />
      )}
    </div>
  )
}
