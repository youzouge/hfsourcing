import { createNavigation } from 'next-intl/navigation'

import { routing } from './routing'

// [!code ++] next-intl navigation helpers (locale-aware Link, router, pathname)
export const { Link, redirect, usePathname, useRouter, getPathname } = createNavigation(routing)
