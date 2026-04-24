import Link from 'next/link'
import { getPayload } from 'payload'
import { ExternalLink, ShieldCheck } from 'lucide-react'

import config from '@payload-config'
import { isNextBuildPhase } from '@/lib/isNextBuildPhase'
import { Button } from '@/components/ui/button'

// [!code ++] Vercel: do not SSG a page that opens Postgres; avoids build-time connect errors / log spam.
export const dynamic = 'force-dynamic'

async function getUserCount() {
  if (isNextBuildPhase()) {
    return { status: 'build' as const }
  }
  try {
    const payload = await getPayload({ config })
    const { totalDocs } = await payload.count({ collection: 'users' })
    return { status: 'ok' as const, count: totalDocs }
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.warn('[Home] user count:', error)
    }
    return { status: 'error' as const }
  }
}

const HomePage = async () => {
  const result = await getUserCount()
  const userLine =
    result.status === 'ok'
      ? `Users in database: ${result.count}.`
      : 'Open /admin to sign in and manage content.'

  return (
    <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col items-center justify-center gap-10 px-6 py-24 text-center">
      <div className="space-y-4">
        <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
          HFsourcing Platform
        </p>
        <h1 className="text-4xl font-semibold tracking-tight sm:text-6xl">
          Next.js 16 · Payload CMS 3 · Tailwind v4
        </h1>
        <p className="mx-auto max-w-2xl text-balance text-lg text-muted-foreground">
          {userLine}
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3">
        <Button asChild size="lg">
          <Link href="/admin">
            <ShieldCheck className="size-4" />
            Open admin
          </Link>
        </Button>
        <Button asChild variant="outline" size="lg">
          <Link href="/api/graphql-playground">
            <ExternalLink className="size-4" />
            GraphQL Playground
          </Link>
        </Button>
      </div>
    </main>
  )
}

export default HomePage
