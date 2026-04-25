import createMiddleware from 'next-intl/middleware'

import { routing } from './i18n/routing'

// [!code ++] next-intl: Next.js 16 uses `src/proxy.ts` (replaces `middleware.ts`) for the edge handler name
export default createMiddleware(routing)

export const config = {
  matcher: [
    '/',
    '/((?!api|admin|_next|_vercel|media|favicon|.*\\..*).*)',
  ],
}
