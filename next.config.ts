import type { NextConfig } from 'next'
import { withPayload } from '@payloadcms/next/withPayload'

const nextConfig: NextConfig = {
  // [!code ++] Hero lifestyle image on the marketing homepage (Unsplash).
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com', pathname: '/**' },
    ],
  },
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
