import 'server-only'
import type { PoolConfig } from 'pg'

// [!code modify] IPv4 DNS preference (use "dns", never "node:dns" — webpack cannot resolve node: in client fallbacks)
let ipv4OrderApplied = false
function applyIpv4DnsOrderOnce() {
  if (ipv4OrderApplied) return
  if (process.env.DATABASE_IPV4_FIRST !== '1' && process.env.DATABASE_IPV4_FIRST !== 'true') {
    return
  }
  ipv4OrderApplied = true
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { setDefaultResultOrder } = require('dns') as typeof import('dns')
  setDefaultResultOrder('ipv4first')
}

function extractHost(uri: string): string {
  const m = uri.match(/@([^/?:]+)(?::\d+)?(?:\/|\?|$)/)
  return m?.[1] ?? ''
}

function isLocalhost(uri: string): boolean {
  return /localhost|127\.0\.0\.1|::1/i.test(uri)
}

/**
 * node-pg applies sslmode from the connection URI; values like `verify-full` or merged defaults
 * can force cert verification and cause "self-signed certificate in certificate chain" even
 * when `pool.ssl.rejectUnauthorized` is set. We strip TLS query params and control TLS only via Pool.
 */
function stripSslRelatedQueryParams(uri: string): string {
  if (!uri.includes('ssl') && !uri.includes('gssencmode')) return uri
  let out = uri
    .replace(/[?&]sslmode=[^&]*/gi, '')
    .replace(/[?&]sslrootcert=[^&]*/gi, '')
    .replace(/[?&]sslcert=[^&]*/gi, '')
    .replace(/[?&]sslkey=[^&]*/gi, '')
    .replace(/[?&]sslcrl=[^&]*/gi, '')
    .replace(/[?&]gssencmode=[^&]*/gi, '')
    .replace(/\?&/g, '?')
    .replace(/&&+/g, '&')
    .replace(/[?&]$/g, '')
    .replace(/\?$/, '')

  // [!code ++] First param removed with its "?" can leave "path&rest=1" — PG URIs need "?" to start the query
  const firstQuestion = out.indexOf('?')
  const firstAmp = out.indexOf('&')
  if (firstAmp !== -1 && (firstQuestion === -1 || firstAmp < firstQuestion)) {
    out = out.slice(0, firstAmp) + '?' + out.slice(firstAmp + 1)
  }
  return out
}

/**
 * Add non-TLS query params only (never sslmode= — TLS is set via `pool.ssl` below).
 */
function appendConnectTimeout(uri: string, shouldAppend: boolean): string {
  if (!shouldAppend || !uri) return uri
  if (/[?&]connect_timeout=/i.test(uri)) return uri
  return uri + (uri.includes('?') ? '&' : '?') + 'connect_timeout=25'
}

/**
 * Tuned for Supabase + Vercel: TLS only via `ssl` object, longer idle, recycle before pooler drops.
 * [!code modify] Avoids SELF_SIGNED_CERT_IN_CHAIN when URI carries sslmode=verify-*
 */
export function getDatabasePoolOptions(): PoolConfig {
  applyIpv4DnsOrderOnce()
  const raw = process.env.DATABASE_URI?.trim() ?? ''
  if (!raw) {
    return { connectionString: '' }
  }

  const host = extractHost(raw)
  const isLocal = isLocalhost(raw)

  const forceSsl = process.env.DATABASE_SSL === 'true'
  const disableSsl = process.env.DATABASE_SSL === 'false'
  const looksLikeCloud =
    !isLocal &&
    (/supabase\.co|supabase\.com|neon\.tech|vercel\.storage|pooler\./i.test(host) ||
      /supabase|neon|vercel|render\.com|railway\.app|\.amazonaws\.com/i.test(raw))

  const useSsl = forceSsl || (!disableSsl && looksLikeCloud)
  // Default: do not verify chain (mitigates self-signed / corporate proxy / Supabase+Node quirks).
  const rejectUnauthorized = process.env.DATABASE_SSL_REJECT_UNAUTHORIZED === 'true'

  let connectionString = raw
  if (useSsl) {
    connectionString = stripSslRelatedQueryParams(raw)
  }
  connectionString = appendConnectTimeout(connectionString, looksLikeCloud)

  const isVercel = process.env.VERCEL === '1'
  const max = isVercel ? 5 : 10

  return {
    connectionString,
    max,
    min: 0,
    connectionTimeoutMillis: 30_000,
    idleTimeoutMillis: 60_000,
    allowExitOnIdle: false,
    maxLifetimeSeconds: 300,
    maxUses: 500,
    keepAlive: true,
    keepAliveInitialDelayMillis: 10_000,
    application_name: 'hfsourcing-payload',
    ...(useSsl
      ? {
          ssl: {
            rejectUnauthorized,
          },
        }
      : {}),
  } satisfies PoolConfig
}
