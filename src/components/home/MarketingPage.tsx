import {
  ArrowRight,
  BadgeCheck,
  BadgeDollarSign,
  Check,
  FileDown,
  HeartHandshake,
  Search,
  Shield,
  ShieldCheck,
  Star,
} from 'lucide-react'
import Image from 'next/image'
import { getTranslations } from 'next-intl/server'

import { LanguageSwitcher } from '@/components/home/LanguageSwitcher'
import { Link } from '@/i18n/navigation'
import { comparisonIconByKey, paidModuleIconById, trustPillarIconByKey } from '@/lib/home-module-icons'

import { AskMaxDialog } from '@/components/home/AskMaxDialog'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'

interface PaidModule {
  id: string
  title: string
  integrator: string
  focus: string
  bullets: { title: string; body: string }[]
  price: string
  unit: string
  whenToBook: string
  icon: React.ComponentType<{ className?: string }>
  isFeatured?: boolean
  isEntry?: boolean
}

interface ProofCard {
  name: string
  country: string
  message: string
  result: string
}

type PaidModuleData = Omit<PaidModule, 'icon'>

const reportHref = '/sample-report.pdf'
const bookingHref =
  'mailto:max@hfsourcing.com?subject=Book%20an%20Inspection%20-%20HF%20Sourcing&body=Hi%20Max%2C%0A%0AI%20want%20to%20book%20a%20%24299%20inspection.%0A%0AProduct%3A%0AFactory%20location%3A%0AInspection%20date%3A%0AOrder%20quantity%3A%0A'
const customQuoteHref =
  'mailto:max@hfsourcing.com?subject=Custom%20Quote%20%E2%80%94%20FBA%20%26%20Logistics&body=Hi%20Max%2C%0A%0AI%20need%20a%20quote%20for%3A%0A%0A%2D%20Channel%3A%20Amazon%20%2F%20Walmart%20%2F%20other%0A%2D%20Volume%3A%0A%2D%20SKUs%3A%0A%2D%20Destinations%3A%0A%2D%20Label%20%2F%20insert%20needs%3A%0A'

const streetImage =
  'https://images.unsplash.com/photo-1527004013197-933c4bb611b3?auto=format&fit=crop&w=1600&q=75'

const workshopImage =
  'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=1400&q=75'

// [!code ++] G2.com-inspired: market-style density, category pills, star reviews, high-elevation cards, coral CTA
function G2StarRow({ className, ratedLabel }: { className?: string; ratedLabel: string }) {
  return (
    <div
      aria-label={ratedLabel}
      className={cn('flex items-center gap-0.5', className)}
      role="img"
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <Star className="size-4 fill-amber-400 text-amber-400" key={i} />
      ))}
    </div>
  )
}

type PaidModuleUi = {
  recommendedBadge: string
  coreGateBadge: string
  whenToUse: string
  featuredSub: string
  getQuote: string
}

// [!code ++] Reusable paid module cards (4 modules) — not used for the free plan card.
function PaidModuleCard({
  module: m,
  localTeamLine,
  ui,
  starsRatedLabel,
}: {
  module: PaidModule
  localTeamLine: string
  ui: PaidModuleUi
  starsRatedLabel: string
}) {
  const Icon = m.icon
  return (
    <Card
      className={cn(
        'flex flex-col overflow-hidden border bg-white transition-shadow hover:shadow-lg',
        m.isFeatured
          ? 'border-2 border-[#ff3d3d] shadow-[0_8px_40px_rgba(255,61,61,0.12)] ring-1 ring-red-200/50'
          : 'border-slate-200/90 shadow-md',
      )}
    >
      <div
        className={cn(
          'h-1.5 w-full',
          m.isFeatured ? 'bg-gradient-to-r from-[#ff3d3d] to-orange-400' : 'bg-slate-200',
        )}
      />
      <CardHeader>
        {m.isEntry ? (
          <span className="w-fit rounded-full bg-violet-100 px-2.5 py-1 text-[11px] font-extrabold uppercase tracking-wide text-violet-900">
            {ui.recommendedBadge}
          </span>
        ) : null}
        {m.isFeatured ? (
          <span className="w-fit rounded-full bg-slate-900 px-2.5 py-1 text-[11px] font-extrabold uppercase tracking-wide text-white">
            {ui.coreGateBadge}
          </span>
        ) : null}
        <div className="pt-1">
          <div
            className={cn(
              'mb-2 flex size-12 items-center justify-center rounded-2xl shadow-inner',
              m.isFeatured
                ? 'bg-gradient-to-br from-[#ff3d3d] to-orange-500 text-white'
                : 'bg-slate-100 text-slate-800',
            )}
          >
            <Icon className="size-6" aria-hidden />
          </div>
          <p className="text-xs font-extrabold uppercase tracking-wide text-violet-800">{m.integrator}</p>
          <CardTitle className="mt-0.5 text-lg font-extrabold sm:text-xl">{m.title}</CardTitle>
          <p className="mt-1 text-sm font-medium text-slate-600">{m.focus}</p>
        </div>
        <div className="pt-1">
          <span className="text-3xl font-black text-slate-900">{m.price}</span>
          <span className="ml-1 text-sm font-medium text-slate-500">{m.unit}</span>
        </div>
        {m.isFeatured ? (
          <div>
            <G2StarRow ratedLabel={starsRatedLabel} />
            <p className="text-xs font-semibold text-slate-500">{ui.featuredSub}</p>
          </div>
        ) : null}
      </CardHeader>
      <CardContent className="flex flex-1 flex-col gap-3">
        <div className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm">
          <p className="text-xs font-extrabold text-slate-500">{ui.whenToUse}</p>
          <p className="font-bold text-slate-900">{m.whenToBook}</p>
        </div>
        <ul className="space-y-3 text-sm font-medium leading-relaxed text-slate-700">
          {m.bullets.map((b) => (
            <li className="flex gap-2" key={b.title}>
              <Check className="mt-0.5 size-4 shrink-0 text-violet-600" aria-hidden />
              <span>
                <span className="font-extrabold text-slate-900">{b.title}.</span> {b.body}
              </span>
            </li>
          ))}
        </ul>
        <p className="mt-1 border-t border-slate-100 pt-3 text-sm font-semibold italic text-slate-800">
          &ldquo;{localTeamLine}&rdquo;
        </p>
        {m.id === 'ecom-fba' ? (
          <Button asChild className="h-10 w-full rounded-full font-extrabold" variant="outline">
            <a href={customQuoteHref}>{ui.getQuote}</a>
          </Button>
        ) : null}
      </CardContent>
    </Card>
  )
}

export async function MarketingPage() {
  const t = await getTranslations('Home')
  const tNav = await getTranslations('Nav')
  const tFooter = await getTranslations('Footer')

  const localTeamLine = t('localTeamLine')
  const starsRatedLabel = t('g2.starsRated')

  const paidModulesData = t.raw('paidModules') as PaidModuleData[]
  const paidModules: PaidModule[] = paidModulesData.flatMap((row) => {
    const icon = paidModuleIconById[row.id]
    if (!icon) {
      return []
    }
    return [{ ...row, icon }]
  })
  const entryMod = paidModules.find((m) => m.isEntry)
  const stage234 = paidModules.filter((m) => !m.isEntry)

  const proofCards = t.raw('proofCards') as ProofCard[]
  const reviewMeta = t.raw('reviewMeta') as { initials: string; when: string }[]

  const comparisonRaw = t.raw('comparisonItems') as {
    iconKey: string
    label: string
    text: string
    tone: 'negative' | 'positive'
  }[]
  const comparisonItems = comparisonRaw.map((row) => {
    const Icon = comparisonIconByKey[row.iconKey] ?? comparisonIconByKey.xCircle
    return { ...row, icon: Icon }
  })

  const trustRaw = t.raw('trustPillars') as { iconKey: string; title: string; body: string }[]
  const trustPillars = trustRaw.map((row) => {
    const Icon = trustPillarIconByKey[row.iconKey] ?? Shield
    return { icon: Icon, title: row.title, body: row.body }
  })

  const processSteps = t.raw('processSteps') as { step: string; label: string; detail: string }[]
  const g2Pills = t.raw('g2Pills') as { label: string; href: string }[]
  const heroStats = t.raw('heroStats') as { value: string; sub: string }[]
  const freeInsider = t.raw('freeInsider') as {
    title: string
    slogan: string
    priceLine: string
    included: { title: string; body: string }[]
    whyFree: string
  }

  const paidUi = {
    recommendedBadge: t('paidModuleUi.recommendedBadge'),
    coreGateBadge: t('paidModuleUi.coreGateBadge'),
    whenToUse: t('paidModuleUi.whenToUse'),
    featuredSub: t('paidModuleUi.featuredSub'),
    getQuote: t('paidModuleUi.getQuote'),
  } satisfies PaidModuleUi

  if (!entryMod) {
    return null
  }
  return (
  <main className="min-h-screen bg-[#f6f7f8] text-[#1a1a2e] antialiased">
    <div className="border-b border-slate-200/90 bg-gradient-to-r from-violet-600/90 to-[#ff3d3d] py-2 text-center text-xs font-semibold text-white sm:text-sm">
      {t('announcement')}
    </div>

    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 shadow-[0_1px_0_rgba(0,0,0,0.04)] backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link className="group flex items-center gap-2.5" href="/">
          <span className="grid size-10 place-content-center rounded-full bg-gradient-to-br from-violet-600 to-[#ff3d3d] text-sm font-extrabold text-white shadow-md">
            HF
          </span>
          <div className="flex flex-col leading-tight sm:flex-row sm:items-baseline sm:gap-2">
            <span className="text-base font-extrabold tracking-tight text-slate-900">{tNav('brand')}</span>
            <span className="text-xs font-medium text-slate-500 sm:text-sm">{tNav('tagline')}</span>
          </div>
        </Link>
        <nav className="flex items-center gap-1 sm:gap-2">
          <a className="hidden text-sm font-semibold text-slate-600 hover:text-violet-700 lg:inline" href="#roadmap">
            {tNav('roadmap')}
          </a>
          <a className="hidden text-sm font-semibold text-slate-600 hover:text-violet-700 lg:inline" href="#integrity">
            {tNav('trust')}
          </a>
          <a className="text-sm font-semibold text-slate-600 hover:text-violet-700" href="#services">
            {tNav('services')}
          </a>
          <a className="text-sm font-semibold text-slate-600 hover:text-violet-700" href="#proof">
            {tNav('reviews')}
          </a>
          <LanguageSwitcher />
          <Button
            asChild
            className="hidden h-9 border-slate-300 sm:inline-flex"
            size="sm"
            variant="outline"
          >
            <a href={reportHref}>{tNav('sampleReport')}</a>
          </Button>
          <Button
            asChild
            className="h-9 bg-[#ff3d3d] px-4 text-sm font-bold text-white shadow-sm hover:bg-[#e63535]"
            size="sm"
          >
            <a href={bookingHref}>{tNav('bookFrom299')}</a>
          </Button>
        </nav>
      </div>
    </header>

    <section className="relative overflow-hidden border-b border-slate-200/80 bg-gradient-to-b from-violet-50/90 via-white to-orange-50/30">
      <div className="pointer-events-none absolute -left-32 top-0 size-[380px] rounded-full bg-fuchsia-400/20 blur-3xl" aria-hidden />
      <div className="pointer-events-none absolute -right-20 bottom-0 size-[400px] rounded-full bg-orange-300/25 blur-3xl" aria-hidden />
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:py-20">
        <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="space-y-6 lg:col-span-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-violet-200 bg-white/90 px-3 py-1.5 text-sm font-semibold text-violet-800 shadow-sm">
              <BadgeCheck className="size-4" aria-hidden />
              {t('hero.badge')}
            </div>
            <h1 className="text-balance text-4xl font-extrabold leading-[1.12] tracking-tight text-slate-900 sm:text-5xl lg:text-[2.75rem]">
              {t('hero.title')}
            </h1>
            <p className="text-lg font-medium leading-relaxed text-slate-600 sm:text-xl">
              {t('hero.subtitle')}
            </p>
            <div className="flex flex-col gap-3 sm:max-w-xl">
              <div className="flex items-center gap-2 rounded-2xl border-2 border-slate-200 bg-white px-4 py-3.5 pl-3 shadow-md">
                <Search className="size-5 shrink-0 text-slate-400" aria-hidden />
                <p className="text-sm text-slate-500">
                  <span className="text-slate-400">{t('hero.searchPrefix')} </span>
                  {t('hero.searchExample')}
                </p>
              </div>
              <p className="text-center text-xs font-medium text-slate-500 sm:text-left">
                {t('hero.searchNote')}
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button
                asChild
                className="h-12 rounded-full bg-[#ff3d3d] px-8 text-base font-bold text-white shadow-lg shadow-red-500/25 hover:bg-[#e63535]"
                size="lg"
              >
                <Link href={reportHref}>
                  <FileDown className="size-4" />
                  {t('hero.ctaSample')}
                </Link>
              </Button>
              <Button
                asChild
                className="h-12 rounded-full border-2 border-slate-200 bg-white px-8 text-base font-bold text-slate-900 shadow-sm hover:bg-slate-50"
                size="lg"
                variant="outline"
              >
                <Link href={bookingHref}>
                  {t('hero.ctaBook')}
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-2 pt-2 sm:grid-cols-4 sm:gap-3">
              {heroStats.map((s) => (
                <div
                  className="rounded-xl border border-slate-200/80 bg-white/90 px-3 py-3 text-center shadow-sm sm:text-left"
                  key={s.sub}
                >
                  <p className="text-lg font-extrabold tabular-nums text-slate-900">{s.value}</p>
                  <p className="text-[11px] font-medium leading-tight text-slate-500">{s.sub}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="relative lg:col-span-6">
            <div className="absolute -inset-3 rounded-3xl bg-gradient-to-tr from-violet-400/30 via-fuchsia-300/20 to-orange-200/30 blur-2xl" aria-hidden />
            <div className="relative overflow-hidden rounded-3xl border border-white bg-white p-1 shadow-[0_20px_60px_-15px_rgba(15,23,42,0.2)]">
              <div className="relative aspect-[4/3] w-full min-h-[280px] overflow-hidden rounded-2xl bg-slate-200 sm:min-h-[360px]">
                <Image
                  alt={t('hero.imageAlt')}
                  className="object-cover"
                  fill
                  priority
                  src={workshopImage}
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 via-transparent to-slate-900/10" />
                <div className="absolute right-3 top-3 max-w-[220px] rounded-2xl border border-white/20 bg-white/95 p-3 shadow-xl backdrop-blur sm:right-4 sm:top-4 sm:max-w-[240px] sm:p-4">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-bold text-slate-500">{t('hero.heroPanelBuyer')}</span>
                    <G2StarRow ratedLabel={starsRatedLabel} />
                  </div>
                  <p className="mt-1.5 text-2xl font-extrabold text-slate-900 sm:text-3xl">{t('hero.rating')}</p>
                  <p className="text-xs font-medium text-slate-500">{t('hero.ratingSub')}</p>
                </div>
                <div className="absolute bottom-0 left-0 right-0 border-t border-white/10 bg-slate-950/85 p-4 backdrop-blur-md">
                  <p className="text-xs font-bold uppercase tracking-wider text-violet-300">{t('hero.onTheFloor')}</p>
                  <p className="text-sm font-semibold text-white">{t('hero.onTheFloorSub')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <div className="border-b border-slate-200 bg-white py-3">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-2 px-4 sm:px-6">
        <span className="text-xs font-bold uppercase tracking-wide text-slate-500">{t('g2.jumpTo')}</span>
        {g2Pills.map((p) => (
          <a
            className="rounded-full border border-slate-200 bg-[#f6f7f8] px-3 py-1.5 text-xs font-bold text-slate-700 shadow-sm transition hover:border-violet-300 hover:bg-white hover:text-violet-800"
            href={p.href}
            key={p.label}
          >
            {p.label}
          </a>
        ))}
      </div>
    </div>

    <section className="border-b border-slate-200 bg-[#f6f7f8]" id="services">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
        <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
          <div>
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              {t('services.title')}
            </h2>
            <p className="mt-2 max-w-2xl text-base font-medium text-slate-600">
              {t('services.lead')}
            </p>
          </div>
          <p className="shrink-0 text-sm font-bold text-slate-500">{t('services.pricingNote')}</p>
        </div>

        <div className="mt-12" id="entry">
          <h3 className="text-sm font-extrabold uppercase tracking-widest text-slate-500">
            {t('services.entry.heading')}
          </h3>
          <p className="mt-2 max-w-3xl text-base font-medium text-slate-700">
            {t('services.entry.lead')}{' '}
            <span className="ml-1 font-extrabold text-slate-900">&ldquo;{localTeamLine}&rdquo;</span>
          </p>
          <div className="mt-6 grid grid-cols-1 items-stretch gap-6 lg:grid-cols-2">
            <Card className="flex flex-col overflow-hidden border-2 border-dashed border-violet-300 bg-gradient-to-b from-white to-violet-50/40 shadow-[0_4px_24px_rgba(0,0,0,0.06)]">
              <div className="h-1.5 w-full bg-gradient-to-r from-violet-500 to-fuchsia-500" />
              <CardHeader>
                <div className="inline-flex w-fit items-center gap-1.5 rounded-full bg-violet-100 px-2.5 py-1 text-xs font-extrabold text-violet-800">
                  <HeartHandshake className="size-3.5" aria-hidden />
                  {t('freeCard.badge')}
                </div>
                <div className="pt-2">
                  <CardTitle className="text-lg font-extrabold sm:text-xl">{freeInsider.title}</CardTitle>
                  <p className="mt-1 text-sm font-medium text-slate-600">{freeInsider.slogan}</p>
                </div>
                <p className="pt-2 text-3xl font-black text-violet-700">{freeInsider.priceLine}</p>
                <G2StarRow className="pt-1" ratedLabel={starsRatedLabel} />
                <p className="text-xs font-semibold text-slate-500">{t('freeCard.satisfaction')}</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-xs font-extrabold uppercase tracking-wider text-slate-500">{t('freeCard.includedHeading')}</p>
                <ul className="space-y-2.5 text-sm font-medium leading-relaxed text-slate-700">
                  {freeInsider.included.map((item) => (
                    <li className="flex gap-2" key={item.title}>
                      <Check className="mt-0.5 size-4 shrink-0 text-violet-600" aria-hidden />
                      <span>
                        <span className="text-slate-900">{item.title}.</span> {item.body}
                      </span>
                    </li>
                  ))}
                </ul>
                <Separator />
                <p className="text-xs font-extrabold uppercase tracking-wider text-slate-500">{t('freeCard.whyFreeHeading')}</p>
                <p className="text-sm font-medium leading-relaxed text-slate-600">{freeInsider.whyFree}</p>
              </CardContent>
              <CardFooter className="mt-auto flex flex-col gap-2">
                <AskMaxDialog
                  className="h-11 w-full rounded-full bg-slate-900 text-sm font-bold text-white shadow-md hover:bg-slate-800"
                  size="default"
                  variant="default"
                >
                  {t('askMaxCta')}
                </AskMaxDialog>
              </CardFooter>
            </Card>

            <PaidModuleCard
              localTeamLine={localTeamLine}
              module={entryMod}
              starsRatedLabel={starsRatedLabel}
              ui={paidUi}
            />
          </div>
        </div>

        <div className="mt-16" id="roadmap">
          <h3 className="text-sm font-extrabold uppercase tracking-widest text-slate-500">
            {t('services.roadmap.heading')}
          </h3>
          <p className="mt-2 max-w-3xl text-base font-medium text-slate-600">
            {t('services.roadmap.lead')}
          </p>
          <ol className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((s) => (
              <li key={s.step}>
                <div className="group flex h-full min-h-full flex-col justify-between gap-2 rounded-2xl border border-slate-200 bg-gradient-to-b from-white to-slate-50/90 p-4 shadow-sm transition hover:border-violet-200 hover:shadow-md">
                  <span className="grid size-10 w-fit place-content-center rounded-xl bg-gradient-to-br from-violet-600 to-fuchsia-600 text-xs font-black text-white shadow-md">
                    {s.step}
                  </span>
                  <div>
                    <p className="font-extrabold text-slate-900">{s.label}</p>
                    <p className="text-sm text-slate-600">{s.detail}</p>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div className="mt-16" id="stages-234">
          <h3 className="text-sm font-extrabold uppercase tracking-widest text-slate-500">
            {t('services.stages.heading')}
          </h3>
          <p className="mt-2 max-w-3xl text-base font-medium text-slate-700">
            {t('services.stages.lead')}{' '}
            <span className="font-extrabold text-slate-900">{localTeamLine}</span>
          </p>
          <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">
            {stage234.map((m) => (
              <PaidModuleCard
                key={m.id}
                localTeamLine={localTeamLine}
                module={m}
                starsRatedLabel={starsRatedLabel}
                ui={paidUi}
              />
            ))}
          </div>
        </div>
      </div>
    </section>

    <section className="border-b border-slate-200 bg-white" id="integrity">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center justify-center gap-2 rounded-full border border-violet-200 bg-violet-50 px-3 py-1 text-xs font-extrabold uppercase tracking-wider text-violet-800">
            <ShieldCheck className="size-4" aria-hidden />
            {t('integrity.badge')}
          </span>
          <h2 className="mt-3 text-3xl font-extrabold text-slate-900 sm:text-4xl">{t('integrity.title')}</h2>
          <p className="mt-3 text-base font-medium text-slate-600">
            {t('integrity.lead')}
          </p>
        </div>
        <ul className="mt-10 grid gap-4 sm:grid-cols-2">
          {trustPillars.map((p) => {
            const Icon = p.icon
            return (
              <li
                className="flex gap-4 rounded-2xl border border-slate-200 bg-gradient-to-b from-white to-slate-50/80 p-5 shadow-sm"
                key={p.title}
              >
                <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-100 to-fuchsia-100 text-violet-800 shadow-inner">
                  <Icon className="size-6" aria-hidden />
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-slate-900">{p.title}</h3>
                  <p className="mt-1 text-sm font-medium leading-relaxed text-slate-600">{p.body}</p>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </section>

    <section className="border-b border-slate-200 bg-[#f6f7f8]">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
        <h2 className="text-center text-3xl font-extrabold text-slate-900 sm:text-4xl">{t('compareStrip.title')}</h2>
        <p className="mx-auto mt-2 max-w-2xl text-center font-medium text-slate-600">
          {t('compareStrip.lead')}
        </p>
        <ul className="mt-8 grid max-w-4xl gap-3 lg:mx-auto">
          {comparisonItems.map(({ icon: Icon, label, text, tone }) => (
            <li
              className={cn(
                'flex gap-4 rounded-2xl border p-4 shadow-sm',
                tone === 'positive' ? 'border-violet-200 bg-white' : 'border-slate-200 bg-white',
              )}
              key={label}
            >
              <div
                className={cn(
                  'mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-xl',
                  tone === 'positive' ? 'bg-violet-600 text-white' : 'bg-slate-200 text-slate-600',
                )}
              >
                <Icon className="size-4" aria-hidden />
              </div>
              <div>
                <h3 className="text-sm font-extrabold text-slate-900">{label}</h3>
                <p className="mt-1 text-sm font-medium text-slate-600">{text}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>

    <section className="border-b border-slate-200 bg-white">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-2">
        <div className="relative">
          <div className="absolute -inset-1 rounded-3xl bg-gradient-to-tr from-violet-200/60 to-orange-200/50 blur-lg" aria-hidden />
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border-4 border-white shadow-xl">
            <Image
              alt={t('people.imageAlt')}
              className="object-cover"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              src={streetImage}
            />
          </div>
        </div>
        <div className="space-y-4">
          <h2 className="text-2xl font-extrabold text-slate-900 sm:text-3xl">{t('people.title')}</h2>
          <p className="text-base font-medium leading-relaxed text-slate-600 sm:text-lg">
            {t('people.body')}
          </p>
        </div>
      </div>
    </section>

    <section className="bg-white" id="proof">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">{t('proof.title')}</h2>
          <p className="mt-2 font-medium text-slate-600">
            {t('proof.lead')}
          </p>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {proofCards.map(({ name, country, message, result }, i) => (
            <div
              className="flex flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-md transition hover:border-violet-200 hover:shadow-lg"
              key={name}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-3">
                  <div className="grid size-11 shrink-0 place-content-center rounded-full bg-gradient-to-br from-slate-200 to-slate-100 text-sm font-extrabold text-slate-700">
                    {reviewMeta[i]?.initials}
                  </div>
                  <div>
                    <p className="text-sm font-extrabold text-slate-900">{name}</p>
                    <p className="text-xs font-medium text-slate-500">{country}</p>
                    <p className="text-[11px] text-slate-400">{reviewMeta[i]?.when}</p>
                  </div>
                </div>
                <span className="shrink-0 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wide text-emerald-800">
                  {t('proof.verified')}
                </span>
              </div>
                <G2StarRow className="mt-3" ratedLabel={starsRatedLabel} />
              <p className="mt-3 flex-1 text-sm font-medium leading-relaxed text-slate-700">
                &ldquo;{message}&rdquo;
              </p>
              <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-3 text-xs">
                <p className="flex items-center gap-1.5 font-extrabold text-violet-800">
                  <BadgeDollarSign className="size-3.5" aria-hidden />
                  {result}
                </p>
                <span className="font-bold text-slate-400">{t('proof.channel')}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 overflow-hidden rounded-3xl bg-gradient-to-r from-violet-600 via-fuchsia-600 to-[#ff3d3d] p-px shadow-xl">
          <div className="rounded-[1.4rem] bg-white px-6 py-10 text-center sm:px-10">
            <G2StarRow className="mx-auto" ratedLabel={starsRatedLabel} />
            <h2 className="mt-3 text-2xl font-extrabold text-slate-900 sm:text-3xl">{t('reportCta.title')}</h2>
            <p className="mt-2 font-medium text-slate-600">{t('reportCta.lead')}</p>
            <Button
              asChild
              className="mt-6 h-12 rounded-full bg-[#ff3d3d] px-10 text-base font-extrabold text-white shadow-lg hover:bg-[#e63535]"
              size="lg"
            >
              <Link href={reportHref}>
                <FileDown className="size-4" />
                {t('reportCta.button')}
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>

    <footer className="border-t border-slate-200 bg-slate-900 text-slate-300">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 sm:py-14 lg:grid-cols-4">
        <div>
          <p className="text-lg font-extrabold text-white">{tNav('brand')}</p>
          <p className="mt-2 text-sm font-medium leading-relaxed">
            {tFooter('about')}
          </p>
        </div>
        <div>
          <p className="text-xs font-extrabold uppercase tracking-wider text-slate-500">{tFooter('servicesTitle')}</p>
          <ul className="mt-3 space-y-2 text-sm font-semibold">
            <li>
              <a className="hover:text-white" href="#entry">{tFooter('links.freePlan')}</a>
            </li>
            <li>
              <a className="hover:text-white" href="#entry">{tFooter('links.verification249')}</a>
            </li>
            <li>
              <a className="hover:text-white" href="#stages-234">{tFooter('links.samples')}</a>
            </li>
            <li>
              <a className="hover:text-white" href="#stages-234">{tFooter('links.qc')}</a>
            </li>
            <li>
              <a className="hover:text-white" href="#stages-234">{tFooter('links.fba')}</a>
            </li>
          </ul>
        </div>
        <div>
          <p className="text-xs font-extrabold uppercase tracking-wider text-slate-500">{tFooter('trustTitle')}</p>
          <ul className="mt-3 space-y-2 text-sm font-semibold">
            <li>
              <a className="hover:text-white" href="#integrity">{tFooter('links.integrity')}</a>
            </li>
            <li>
              <a className="hover:text-white" href="#proof">{tFooter('links.reviews')}</a>
            </li>
            <li>
              <a className="hover:text-white" href={reportHref}>{tFooter('links.sampleReport')}</a>
            </li>
          </ul>
        </div>
        <div>
          <p className="text-xs font-extrabold uppercase tracking-wider text-slate-500">{tFooter('contactTitle')}</p>
          <a className="mt-3 block text-sm font-extrabold text-white hover:underline" href="mailto:max@hfsourcing.com">
            max@hfsourcing.com
          </a>
          <p className="mt-2 text-xs font-medium text-slate-500">{tFooter('region')}</p>
        </div>
      </div>
      <div className="border-t border-slate-800 py-4 text-center text-xs font-medium text-slate-500">
        © {new Date().getFullYear()} {tNav('brand')}. {tFooter('copyright')}
      </div>
    </footer>
  </main>
  )
}
