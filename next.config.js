/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.unsplash.com', 'upload.wikimedia.org'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: '**.wikimedia.org',
      },
    ],
    // Enable lazy loading
    loading: 'lazy',
  },
  experimental: {
    serverActions: true,
  },
  // Optimize for mobile
  compress: true,
  poweredByHeader: false,
  // Enable static optimization
  swcMinify: true,
}

module.exports = nextConfig
