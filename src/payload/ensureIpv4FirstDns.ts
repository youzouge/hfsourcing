import 'server-only'

/**
 * Vercel / some networks: Supabase host resolves to IPv6 first; the path returns ENETUNREACH.
 * Run before any `pg` connection. `NODE_OPTIONS=--dns-result-order=ipv4first` in package.json
 * is the most reliable; this is a second line of defense.
 * [!code]
 */
const uri = process.env.DATABASE_URI ?? ''
const wantIpv4First =
  process.env.VERCEL === '1' ||
  process.env.DATABASE_IPV4_FIRST === '1' ||
  process.env.DATABASE_IPV4_FIRST === 'true' ||
  /supabase\.co|supabase\.com|pooler\.supabase\.com|neon\.tech/i.test(uri)

if (wantIpv4First) {
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { setDefaultResultOrder } = require('dns') as typeof import('dns')
    setDefaultResultOrder('ipv4first')
  } catch {
    // ignore
  }
}

export {}
