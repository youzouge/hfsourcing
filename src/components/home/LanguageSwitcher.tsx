'use client'

import { useLocale, useTranslations } from 'next-intl'
import { useTransition } from 'react'

import { usePathname, useRouter } from '@/i18n/navigation'
import { routing } from '@/i18n/routing'
import { localeNativeLabel } from '@/lib/locale-labels'
import { cn } from '@/lib/utils'

export function LanguageSwitcher({ className }: { className?: string }) {
  const t = useTranslations('Language')
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()
  const [isLocalePending, startLocaleTransition] = useTransition()

  return (
    <label className={cn('flex min-w-0 items-center gap-1.5', className)}>
      <span className="sr-only">{t('label')}</span>
      <select
        className="h-8 max-w-[11rem] cursor-pointer appearance-none rounded-md border border-slate-200 bg-white pl-2 pr-7 text-xs font-semibold text-slate-800 shadow-sm focus-visible:ring-2 focus-visible:ring-violet-500/40 focus-visible:outline-none sm:text-sm"
        disabled={isLocalePending}
        value={locale}
        onChange={(e) => {
          const nextLocale = e.target.value
          if (nextLocale === locale) {
            return
          }
          startLocaleTransition(() => {
            router.replace(pathname, { locale: nextLocale })
          })
        }}
        aria-label={t('label')}
      >
        {routing.locales.map((code) => (
          <option key={code} value={code}>
            {localeNativeLabel[code]}
          </option>
        ))}
      </select>
    </label>
  )
}
