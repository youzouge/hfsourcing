/**
 * Payload throws at runtime if `secret` is empty. Vercel often omits PAYLOAD_SECRET
 * or only enables it for Runtime (not Build) — then /admin RSC shows Next global-error.
 * [!code]
 */
export function resolvePayloadSecret(): string {
  const fromEnv = process.env.PAYLOAD_SECRET?.trim()
  if (fromEnv) return fromEnv
  if (process.env.NODE_ENV !== 'production') {
    return 'local-dev-payload-secret-min-32-chars-xxxxxxxx1'
  }
  throw new Error(
    'PAYLOAD_SECRET is missing. Vercel: Project → Environment Variables: add PAYLOAD_SECRET for Production, Preview, and turn ON "All scopes" (or at least include Build + Runtime), then Redeploy.',
  )
}
