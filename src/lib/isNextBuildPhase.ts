import 'server-only'

/** True only while `next build` is running (not on Vercel request runtime). */
export function isNextBuildPhase(): boolean {
  return process.env.NEXT_PHASE === 'phase-production-build'
}
