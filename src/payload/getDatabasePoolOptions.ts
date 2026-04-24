import 'server-only'
import { execFileSync } from 'node:child_process'
import { parse as parseConnectionString } from 'pg-connection-string'
import type { PoolConfig } from 'pg'

import { isNextBuildPhase } from '@/lib/isNextBuildPhase'

/** [!code] node `net.connect` may still pick AAAA first; force A record for cloud DBs. */
const ipv4Cache = new Map<string, string>()

function resolveHostToIpv4Sync(hostname: string): string | null {
  if (/^\d{1,3}(?:\.\d{1,3}){3}$/.test(hostname)) return hostname
  if (!/^[a-zA-Z0-9.-]+$/.test(hostname)) return null
  const cached = ipv4Cache.get(hostname)
  if (cached) return cached
  try {
    const script = `require('dns').lookup(${JSON.stringify(hostname)},{family:4},(e,a)=>{if(e)process.exit(1);process.stdout.write(a)})`
    const ip = execFileSync(process.execPath, ['-e', script], {
      encoding: 'utf8',
      maxBuffer: 256,
      timeout: 15_000,
    }).trim()
    if (ip && /^\d{1,3}(?:\.\d{1,3}){3}$/.test(ip)) {
      ipv4Cache.set(hostname, ip)
      return ip
    }
  } catch {
    // fallback: keep hostname
  }
  return null
}

function extractHost(uri: string): string {
  const m = uri.match(/@([^/?:]+)(?::\d+)?(?:\/|\?|$)/)
  return m?.[1] ?? ''
}

function isLocalhost(uri: string): boolean {
  return /localhost|127\.0\.0\.1|::1/i.test(uri)
}

/**
 * node-pg applies sslmode from the connection URI; strip TLS query params; Pool.ssl controls verification.
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

  const firstQuestion = out.indexOf('?')
  const firstAmp = out.indexOf('&')
  if (firstAmp !== -1 && (firstQuestion === -1 || firstAmp < firstQuestion)) {
    out = out.slice(0, firstAmp) + '?' + out.slice(firstAmp + 1)
  }
  return out
}

function appendConnectTimeout(uri: string, shouldAppend: boolean): string {
  if (!shouldAppend || !uri) return uri
  if (/[?&]connect_timeout=/i.test(uri)) return uri
  return uri + (uri.includes('?') ? '&' : '?') + 'connect_timeout=25'
}

function shouldForceIpv4Host(hostFromUri: string, looksLikeCloud: boolean, isLocal: boolean): boolean {
  if (!looksLikeCloud || isLocal) return false
  if (process.env.DATABASE_PREFER_IPV4 === '0' || process.env.DATABASE_PREFER_IPV4 === 'false') {
    return false
  }
  if (process.env.VERCEL === '1' || /supabase\.co|supabase\.com|pooler\./i.test(hostFromUri)) {
    return true
  }
  if (process.env.DATABASE_PREFER_IPV4 === '1' || process.env.DATABASE_PREFER_IPV4 === 'true') {
    return true
  }
  return false
}

/**
 * Tuned for Supabase + Vercel: prefer IPv4 literal host + SNI, TLS via Pool only.
 * [!code modify] Fixes ENETUNREACH to Supabase AAAA on broken IPv6 paths.
 */
export function getDatabasePoolOptions(): PoolConfig {
  const raw = process.env.DATABASE_URI?.trim() ?? ''
  if (!raw) {
    return { connectionString: '' }
  }

  const hostFromUri = extractHost(raw)
  const isLocal = isLocalhost(raw)

  const forceSsl = process.env.DATABASE_SSL === 'true'
  const disableSsl = process.env.DATABASE_SSL === 'false'
  const looksLikeCloud =
    !isLocal &&
    (/supabase\.co|supabase\.com|neon\.tech|vercel\.storage|pooler\./i.test(hostFromUri) ||
      /supabase|neon|vercel|render\.com|railway\.app|\.amazonaws\.com/i.test(raw))

  const useSsl = forceSsl || (!disableSsl && looksLikeCloud)
  const rejectUnauthorized = process.env.DATABASE_SSL_REJECT_UNAUTHORIZED === 'true'

  let connectionString = raw
  if (useSsl) {
    connectionString = stripSslRelatedQueryParams(raw)
  }
  connectionString = appendConnectTimeout(connectionString, looksLikeCloud)

  const isVercel = process.env.VERCEL === '1'
  const max = isVercel ? 5 : 10

  const basePool: PoolConfig = {
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
  }

  // [!code modify] `next build`: no IPv4 subprocess, no assumption that DB is reachable (Vercel build env).
  if (isNextBuildPhase()) {
    return {
      ...basePool,
      connectionString,
      ...(useSsl
        ? {
            ssl: {
              rejectUnauthorized,
            },
          }
        : {}),
    } satisfies PoolConfig
  }

  const tryIpv4 = shouldForceIpv4Host(hostFromUri, looksLikeCloud, isLocal)
  if (tryIpv4) {
    try {
      const parsed = parseConnectionString(connectionString)
      const originalHost = parsed.host?.trim()
      if (originalHost) {
        const ipv4 = resolveHostToIpv4Sync(originalHost)
        if (ipv4) {
          const port = parsed.port != null && parsed.port !== '' ? parseInt(String(parsed.port), 10) : 5432
          return {
            ...basePool,
            host: ipv4,
            port: Number.isNaN(port) ? 5432 : port,
            user: parsed.user,
            password: parsed.password,
            database: parsed.database ?? undefined,
            ...(useSsl
              ? {
                  ssl: {
                    rejectUnauthorized,
                    servername: originalHost,
                  },
                }
              : {}),
          } satisfies PoolConfig
        }
      }
    } catch {
      // fall through to connection string
    }
  }

  return {
    ...basePool,
    connectionString,
    ...(useSsl
      ? {
          ssl: {
            rejectUnauthorized,
          },
        }
      : {}),
  } satisfies PoolConfig
}
