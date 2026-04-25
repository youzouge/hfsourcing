import type { NextConfig } from 'next'
import { withPayload } from '@payloadcms/next/withPayload'
import createNextIntlPlugin from 'next-intl/plugin'

// [!code ++] next-intl: wires `i18n/request` into the Next build
const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts')

const nextConfig: NextConfig = {
  // [!code ++] Hero lifestyle image on the marketing homepage (Unsplash).
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com', pathname: '/**' },
    ],
  },
}

export default withNextIntl(withPayload(nextConfig, { devBundleServerPackages: false }))
