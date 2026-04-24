import path from 'path'
import { fileURLToPath } from 'url'

// [!code ++] Load before db pool: prefer IPv4 for Supabase on Vercel (avoid ENETUNREACH on IPv6)
import './payload/ensureIpv4FirstDns'

import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { buildConfig } from 'payload'
import sharp from 'sharp'

// [!code modify] ESM CLI (payload migrate) requires explicit file extensions.
import { Users } from './payload/collections/Users.ts'
import { Media } from './payload/collections/Media.ts'
import { getDatabasePoolOptions } from './payload/getDatabasePoolOptions.ts'
import { resolvePayloadSecret } from './payload/resolvePayloadSecret.ts'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

function getServerUrl(): string {
  const fromEnv = process.env.NEXT_PUBLIC_SERVER_URL?.trim() || process.env.PAYLOAD_SERVER_URL?.trim()
  if (fromEnv) return fromEnv
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`
  return 'http://localhost:3000'
}

export default buildConfig({
  // [!code modify] Used for admin URL, CORS, upload URLs, CSRF. Keep in sync with deployment URL.
  serverURL: getServerUrl(),
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    meta: {
      titleSuffix: '- HFsourcing',
    },
  },
  collections: [Users, Media],
  editor: lexicalEditor(),
  secret: resolvePayloadSecret(),
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: getDatabasePoolOptions(),
    // [!code modify] Prod uses push: false by default. Set PAYLOAD_DB_PUSH=true on Vercel until you use proper migrations.
    push:
      process.env.PAYLOAD_DB_PUSH === 'true' ||
      (process.env.NODE_ENV !== 'production' && process.env.PAYLOAD_DB_PUSH !== 'false'),
  }),
  sharp,
  plugins: [],
  cors: (process.env.PAYLOAD_PUBLIC_CORS_URLS ?? '')
    .split(',')
    .map((url) => url.trim())
    .filter(Boolean),
})
