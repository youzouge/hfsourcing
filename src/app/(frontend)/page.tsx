import {
  ArrowRight,
  BadgeCheck,
  BadgeDollarSign,
  Ban,
  Check,
  CheckCircle2,
  ClipboardCheck,
  Clock,
  FileDown,
  HeartHandshake,
  Package,
  Search,
  Shield,
  ShieldCheck,
  Star,
  Truck,
  TriangleAlert,
  XCircle,
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

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

const freeInsider = {
  title: 'The "China Insider" Friend (100% Free)',
  slogan: 'Your First Real Connection on the Ground.',
  priceLine: 'Free',
  included: [
    {
      title: 'Quick Factory Check',
      body: 'Send me a link or a name; I will tell you if they look like a real factory or a "bedroom" trader in 5 minutes.',
    },
    {
      title: 'Cultural & Business Translator',
      body: 'Confused by a factory\'s "vague" reply? I translate the real meaning behind their Chinese business talk.',
    },
    {
      title: 'General Sourcing Advice',
      body: 'Tips on shipping, local holidays, or market trends. No strings attached.',
    },
  ],
  whyFree:
    "I've spent 10 years in the system, and I'm tired of seeing honest Western buyers getting scammed or frustrated. I want to build a relationship first. If I can save you from a bad deal with a 10-minute chat, I've done my job as a friend. If you need me for an on-site audit later, you know where to find me.",
} as const

const localTeamLine =
  'I am your local team, not their partner.'

const paidModules = [
  {
    id: 'sourcing-verification',
    title: 'Strategic Sourcing & Verification',
    integrator: 'Supplier due diligence + price negotiation on the ground.',
    focus: 'Find the right supplier, get the right price — before you send real money.',
    bullets: [
      {
        title: 'Real-world Verification',
        body: "I don't trust Alibaba photos. I go onsite to verify their actual production capacity and legal DNA.",
      },
      {
        title: 'Price Negotiation',
        body: 'Using local knowledge and native language to cut through middleman markups and secure the best MOQs for you.',
      },
      {
        title: 'Factory vs. Trader',
        body: 'I expose "bedroom" trading companies posing as mega-factories.',
      },
    ],
    price: '$249',
    unit: '/ audit',
    whenToBook: 'Before you lock terms or pay a large deposit to a new vendor.',
    icon: Search,
    isEntry: true,
  },
  {
    id: 'sample-consolidation',
    title: 'Smart Sample Consolidation',
    integrator: 'Inbound sample hub + unboxing + shortlist.',
    focus: 'Save on freight, kill bad samples early.',
    bullets: [
      {
        title: '70% Logistics Saving',
        body: 'Send 5 factory samples to my hub. I combine them into ONE parcel to slash your international freight costs.',
      },
      {
        title: 'Unboxing Reviews',
        body: "High-res video reviews of every sample before they leave China. If it's trash, we kill it early.",
      },
      {
        title: 'Quality Comparison',
        body: 'Side-by-side analysis to help you pick the winning supplier faster.',
      },
    ],
    price: '$99',
    unit: '+ freight · (or per item — ask for a batch quote)',
    whenToBook: 'When you are comparing 2+ suppliers and shipping samples from China is bleeding your margin.',
    icon: Package,
  },
  {
    id: 'professional-qc',
    title: 'Professional Quality Control (QC)',
    integrator: 'Pre-shipment inspection + line monitoring + on-site dispute handling.',
    focus: 'Reject bad goods, reject silent delays — before the 70% balance.',
    bullets: [
      {
        title: 'On-site AQL Inspection',
        body: 'Full check on functionality, packaging, and quantities before you pay the final 70%.',
      },
      {
        title: 'Timeline Monitoring',
        body: "I'm the \"headache\" the factory fears. I monitor production lines so they don't miss your shipping date.",
      },
      {
        title: 'Dispute Resolution',
        body: "If issues are found, I handle the rework negotiation on the factory floor, so you don't have to argue across the ocean.",
      },
    ],
    price: '$299',
    unit: '/ man-day · Greater Bay Area',
    whenToBook: 'Before final payment and before goods leave your supplier — every serious PO should pass this gate.',
    icon: ClipboardCheck,
    isFeatured: true,
  },
  {
    id: 'ecom-fba',
    title: 'E-com Logistics & FBA Prep',
    integrator: 'FBA prep + consolidated export + private label touches.',
    focus: 'Shelf-ready, compliant, and branded — without a second project manager.',
    bullets: [
      {
        title: 'FBA Compliance',
        body: 'Labeling, bagging, and palletizing that meets strict Amazon / Walmart requirements.',
      },
      {
        title: 'Global DDP Shipping',
        body: 'Sea, air, or rail. We handle customs and taxes so your goods arrive shelf-ready.',
      },
      {
        title: 'Private Labeling',
        body: 'Custom inserts, thank-you cards, and branded packaging to build your moat.',
      },
    ],
    price: 'Custom',
    unit: 'quote (volume-based)',
    whenToBook: 'When the PO is done and you need China-side prep + door delivery — tell me volume and channels.',
    icon: Truck,
  },
] satisfies readonly PaidModule[]

const proofCards = [
  {
    name: 'David R.',
    country: 'United States',
    message:
      'Max found a welding defect our supplier never mentioned. The report gave us enough evidence to stop the balance payment.',
    result: '$18,400 shipment protected',
  },
  {
    name: 'Sophie M.',
    country: 'Germany',
    message:
      'The factory kept saying everything was ready. Max went onsite, counted cartons, and showed the order was only 62% finished.',
    result: 'Production delay exposed',
  },
  {
    name: 'Marcus T.',
    country: 'Australia',
    message:
      'Not a checklist inspector. He explained why the defects happened and how to push the supplier into rework.',
    result: 'Rework completed before loading',
  },
] satisfies readonly ProofCard[]

const comparisonItems = [
  {
    icon: XCircle,
    label: 'Big inspection brands',
    text: "Tick-box reports from people who don't understand your product or margin.",
    tone: 'negative' as const,
  },
  {
    icon: TriangleAlert,
    label: '"Free" sourcing agents',
    text: 'Paid under the table by factories. They will not surface defects that hurt their commission.',
    tone: 'negative' as const,
  },
  {
    icon: CheckCircle2,
    label: 'HF Sourcing — Max Huang',
    text: '10 years in supply-chain systems. Paid only by you. I report what risks your money — not what makes the supplier happy.',
    tone: 'positive' as const,
  },
]

const trustPillars = [
  {
    icon: Shield,
    title: 'You pay. I work for you.',
    body: 'No factory commissions. No referral kickbacks. The invoice is between you and HF Sourcing.',
  },
  {
    icon: Ban,
    title: 'Zero conflict of interest',
    body: 'If the supplier offers me a cut, you will know — and I walk away from that relationship.',
  },
  {
    icon: FileDown,
    title: 'Evidence you can use',
    body: 'Photos, line status, and AQL logic you can forward to your CEO, bank, or lawyer.',
  },
  {
    icon: Clock,
    title: 'Fast, flat terms',
    body: 'Published prices. 24-hour reporting on standard inspections so you can decide before the wire.',
  },
] as const

const processSteps = [
  {
    step: '01',
    label: 'Sourcing & verification',
    detail: 'Backstop bad actors · negotiate with leverage',
  },
  {
    step: '02',
    label: 'Sample consolidation',
    detail: 'One hub · unbox · compare before you order big',
  },
  {
    step: '03',
    label: 'QC & line control',
    detail: 'AQL · timelines · on-floor disputes',
  },
  { step: '04', label: 'E-com & FBA', detail: 'Prep · DDP · private label' },
] as const

const reportHref = '/sample-report.pdf'
const bookingHref =
  'mailto:max@hfsourcing.com?subject=Book%20an%20Inspection%20-%20HF%20Sourcing&body=Hi%20Max%2C%0A%0AI%20want%20to%20book%20a%20%24299%20inspection.%0A%0AProduct%3A%0AFactory%20location%3A%0AInspection%20date%3A%0AOrder%20quantity%3A%0A'
const customQuoteHref =
  'mailto:max@hfsourcing.com?subject=Custom%20Quote%20%E2%80%94%20FBA%20%26%20Logistics&body=Hi%20Max%2C%0A%0AI%20need%20a%20quote%20for%3A%0A%0A%2D%20Channel%3A%20Amazon%20%2F%20Walmart%20%2F%20other%0A%2D%20Volume%3A%0A%2D%20SKUs%3A%0A%2D%20Destinations%3A%0A%2D%20Label%20%2F%20insert%20needs%3A%0A'

const streetImage =
  'https://images.unsplash.com/photo-1527004013197-933c4bb611b3?auto=format&fit=crop&w=1600&q=75'

const workshopImage =
  'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=1400&q=75'

const g2Pills = [
  { label: 'Free plan', href: '#entry' },
  { label: 'Verification $249', href: '#entry' },
  { label: 'Samples $99+', href: '#stages-234' },
  { label: 'QC $299', href: '#stages-234' },
  { label: 'FBA & logistics', href: '#stages-234' },
] as const

const heroStats = [
  { value: '10+ yrs', sub: 'Supply-chain systems' },
  { value: '24h', sub: 'Report SLA (standard runs)' },
  { value: '0%', sub: 'Factory-side fees to me' },
  { value: '100%', sub: 'Client-paid = client-first' },
] as const

const reviewMeta = [
  { initials: 'DR', when: 'Mar 2024' },
  { initials: 'SM', when: 'Jan 2025' },
  { initials: 'MT', when: 'Nov 2024' },
] as const

// [!code ++] G2.com-inspired: market-style density, category pills, star reviews, high-elevation cards, coral CTA
function G2StarRow({ className }: { className?: string }) {
  return (
    <div
      aria-label="Rated 5 out of 5"
      className={cn('flex items-center gap-0.5', className)}
      role="img"
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <Star className="size-4 fill-amber-400 text-amber-400" key={i} />
      ))}
    </div>
  )
}

// [!code ++] Reusable paid module cards (4 modules) — not used for the free plan card.
function PaidModuleCard({ module: m }: { module: PaidModule }) {
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
            Recommended first paid step
          </span>
        ) : null}
        {m.isFeatured ? (
          <span className="w-fit rounded-full bg-slate-900 px-2.5 py-1 text-[11px] font-extrabold uppercase tracking-wide text-white">
            Core gate — QC
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
            <G2StarRow />
            <p className="text-xs font-semibold text-slate-500">Where most importers start paying for peace of mind</p>
          </div>
        ) : null}
      </CardHeader>
      <CardContent className="flex flex-1 flex-col gap-3">
        <div className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm">
          <p className="text-xs font-extrabold text-slate-500">When to use it</p>
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
            <a href={customQuoteHref}>Get a custom quote</a>
          </Button>
        ) : null}
      </CardContent>
    </Card>
  )
}

const HomePage = () => {
  const entryMod = paidModules.find((m) => m.isEntry)
  const stage234 = paidModules.filter((m) => !m.isEntry)
  if (!entryMod) {
    return null
  }
  return (
  <main className="min-h-screen bg-[#f6f7f8] text-[#1a1a2e] antialiased">
    <div className="border-b border-slate-200/90 bg-gradient-to-r from-violet-600/90 to-[#ff3d3d] py-2 text-center text-xs font-semibold text-white sm:text-sm">
      Buyer-side only · Flat-rate inspection · 24h reporting · No factory kickbacks
    </div>

    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 shadow-[0_1px_0_rgba(0,0,0,0.04)] backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link className="group flex items-center gap-2.5" href="/">
          <span className="grid size-10 place-content-center rounded-full bg-gradient-to-br from-violet-600 to-[#ff3d3d] text-sm font-extrabold text-white shadow-md">
            HF
          </span>
          <div className="flex flex-col leading-tight sm:flex-row sm:items-baseline sm:gap-2">
            <span className="text-base font-extrabold tracking-tight text-slate-900">HF Sourcing</span>
            <span className="text-xs font-medium text-slate-500 sm:text-sm">On-site in Greater Bay, China</span>
          </div>
        </Link>
        <nav className="flex items-center gap-1 sm:gap-2">
          <a className="hidden text-sm font-semibold text-slate-600 hover:text-violet-700 lg:inline" href="#roadmap">
            Roadmap
          </a>
          <a className="hidden text-sm font-semibold text-slate-600 hover:text-violet-700 lg:inline" href="#integrity">
            Trust
          </a>
          <a className="text-sm font-semibold text-slate-600 hover:text-violet-700" href="#services">
            Services
          </a>
          <a className="text-sm font-semibold text-slate-600 hover:text-violet-700" href="#proof">
            Reviews
          </a>
          <Button
            asChild
            className="hidden h-9 border-slate-300 sm:inline-flex"
            size="sm"
            variant="outline"
          >
            <a href={reportHref}>Sample report</a>
          </Button>
          <Button
            asChild
            className="h-9 bg-[#ff3d3d] px-4 text-sm font-bold text-white shadow-sm hover:bg-[#e63535]"
            size="sm"
          >
            <a href={bookingHref}>Book from $299</a>
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
              Sourcing · Samples · AQL QC · FBA / DDP
            </div>
            <h1 className="text-balance text-4xl font-extrabold leading-[1.12] tracking-tight text-slate-900 sm:text-5xl lg:text-[2.75rem]">
              Find, verify, and ship from China without guessing who paid your inspector.
            </h1>
            <p className="text-lg font-medium leading-relaxed text-slate-600 sm:text-xl">
              From sourcing &amp; verification to sample hub, AQL on the line, and FBA / DDP out —
              one local team, flat or quoted prices, 24-hour reporting, and zero factory-side income
              to me. Compare the stack, not a generic inspection PDF.
            </p>
            <div className="flex flex-col gap-3 sm:max-w-xl">
              <div className="flex items-center gap-2 rounded-2xl border-2 border-slate-200 bg-white px-4 py-3.5 pl-3 shadow-md">
                <Search className="size-5 shrink-0 text-slate-400" aria-hidden />
                <p className="text-sm text-slate-500">
                  <span className="text-slate-400">I need </span>
                  a factory audit in Shenzhen before I wire 30% deposit — can you be there this week?
                </p>
              </div>
              <p className="text-center text-xs font-medium text-slate-500 sm:text-left">
                That is a real first message. Free triage → paid onsite when you are ready.
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
                  Get sample report
                </Link>
              </Button>
              <Button
                asChild
                className="h-12 rounded-full border-2 border-slate-200 bg-white px-8 text-base font-bold text-slate-900 shadow-sm hover:bg-slate-50"
                size="lg"
                variant="outline"
              >
                <Link href={bookingHref}>
                  Book QC from $299
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
                  alt="Factory floor — on-site evidence for your report"
                  className="object-cover"
                  fill
                  priority
                  src={workshopImage}
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 via-transparent to-slate-900/10" />
                <div className="absolute right-3 top-3 max-w-[220px] rounded-2xl border border-white/20 bg-white/95 p-3 shadow-xl backdrop-blur sm:right-4 sm:top-4 sm:max-w-[240px] sm:p-4">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-bold text-slate-500">Buyer satisfaction</span>
                    <G2StarRow />
                  </div>
                  <p className="mt-1.5 text-2xl font-extrabold text-slate-900 sm:text-3xl">4.9 / 5</p>
                  <p className="text-xs font-medium text-slate-500">From direct buyer feedback (sample)</p>
                </div>
                <div className="absolute bottom-0 left-0 right-0 border-t border-white/10 bg-slate-950/85 p-4 backdrop-blur-md">
                  <p className="text-xs font-bold uppercase tracking-wider text-violet-300">On the floor</p>
                  <p className="text-sm font-semibold text-white">Real photos, AQL logic, fail/pass you can show your bank.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <div className="border-b border-slate-200 bg-white py-3">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-2 px-4 sm:px-6">
        <span className="text-xs font-bold uppercase tracking-wide text-slate-500">Jump to</span>
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
              The full China stack — compare like a G2 grid
            </h2>
            <p className="mt-2 max-w-2xl text-base font-medium text-slate-600">
              No hidden &quot;factory marketing fees&quot; — what you see is what funds the work. Start with
              a free line in, then add paid modules as your PO and risk grow.
            </p>
          </div>
          <p className="shrink-0 text-sm font-bold text-slate-500">Updated pricing · USD · + freight or custom where noted</p>
        </div>

        <div className="mt-12" id="entry">
          <h3 className="text-sm font-extrabold uppercase tracking-widest text-slate-500">The entry — free + verification</h3>
          <p className="mt-2 max-w-3xl text-base font-medium text-slate-700">
            Most buyers start with a 10-minute sanity check, then go onsite before real money moves.
            <span className="ml-1 font-extrabold text-slate-900">&ldquo;{localTeamLine}&rdquo;</span>
          </p>
          <div className="mt-6 grid grid-cols-1 items-stretch gap-6 lg:grid-cols-2">
            <Card className="flex flex-col overflow-hidden border-2 border-dashed border-violet-300 bg-gradient-to-b from-white to-violet-50/40 shadow-[0_4px_24px_rgba(0,0,0,0.06)]">
              <div className="h-1.5 w-full bg-gradient-to-r from-violet-500 to-fuchsia-500" />
              <CardHeader>
                <div className="inline-flex w-fit items-center gap-1.5 rounded-full bg-violet-100 px-2.5 py-1 text-xs font-extrabold text-violet-800">
                  <HeartHandshake className="size-3.5" aria-hidden />
                  Start here — free
                </div>
                <div className="pt-2">
                  <CardTitle className="text-lg font-extrabold sm:text-xl">{freeInsider.title}</CardTitle>
                  <p className="mt-1 text-sm font-medium text-slate-600">{freeInsider.slogan}</p>
                </div>
                <p className="pt-2 text-3xl font-black text-violet-700">{freeInsider.priceLine}</p>
                <G2StarRow className="pt-1" />
                <p className="text-xs font-semibold text-slate-500">Satisfaction — we earn the next step</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-xs font-extrabold uppercase tracking-wider text-slate-500">What&apos;s included</p>
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
                <p className="text-xs font-extrabold uppercase tracking-wider text-slate-500">Why it&apos;s free</p>
                <p className="text-sm font-medium leading-relaxed text-slate-600">{freeInsider.whyFree}</p>
              </CardContent>
              <CardFooter className="mt-auto flex flex-col gap-2">
                <AskMaxDialog
                  className="h-11 w-full rounded-full bg-slate-900 text-sm font-bold text-white shadow-md hover:bg-slate-800"
                  size="default"
                  variant="default"
                >
                  Ask Max — form / WhatsApp / email
                </AskMaxDialog>
              </CardFooter>
            </Card>

            <PaidModuleCard module={entryMod} />
          </div>
        </div>

        <div className="mt-16" id="roadmap">
          <h3 className="text-sm font-extrabold uppercase tracking-widest text-slate-500">The roadmap</h3>
          <p className="mt-2 max-w-3xl text-base font-medium text-slate-600">
            Sourcing &rarr; samples &rarr; QC on the line &rarr; logistics &amp; FBA. Four modules, one
            relationship —&nbsp;
            <span className="font-bold text-slate-900">your team on the ground, not the factory&apos;s.</span>
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
          <h3 className="text-sm font-extrabold uppercase tracking-widest text-slate-500">Then: samples, QC &amp; e-com / FBA</h3>
          <p className="mt-2 max-w-3xl text-base font-medium text-slate-700">
            When you are past the first supplier list, the real work is consolidation, in-line control,
            and getting shelf-ready without a second project manager. Again:&nbsp;
            <span className="font-extrabold text-slate-900">{localTeamLine}</span>
          </p>
          <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">
            {stage234.map((m) => (
              <PaidModuleCard key={m.id} module={m} />
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
            Trust &amp; integrity
          </span>
          <h2 className="mt-3 text-3xl font-extrabold text-slate-900 sm:text-4xl">Why the incentive line matters</h2>
          <p className="mt-3 text-base font-medium text-slate-600">
            B2B marketplaces are built on transparent reviews. Your QC is no different: who funds the
            person in the WeChat group?
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
        <h2 className="text-center text-3xl font-extrabold text-slate-900 sm:text-4xl">Same service — who gets paid twice?</h2>
        <p className="mx-auto mt-2 max-w-2xl text-center font-medium text-slate-600">
          G2 differentiates by crowd truth. I differentiate by economics: one payer, one loyalty.
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
              alt="Your own photo: coffee, city street, Dongguan or Shenzhen"
              className="object-cover"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              src={streetImage}
            />
          </div>
        </div>
        <div className="space-y-4">
          <h2 className="text-2xl font-extrabold text-slate-900 sm:text-3xl">People, not a logo, buy trust.</h2>
          <p className="text-base font-medium leading-relaxed text-slate-600 sm:text-lg">
            Replace the stock image with a clear photo of you. On G2, people filter by product — here they
            choose who will walk into a factory and tell them the hard truth.
          </p>
        </div>
      </div>
    </section>

    <section className="bg-white" id="proof">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">Reviews from buyers</h2>
          <p className="mt-2 font-medium text-slate-600">
            Structured like a marketplace review — with outcomes you can measure.
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
                  Verified
                </span>
              </div>
              <G2StarRow className="mt-3" />
              <p className="mt-3 flex-1 text-sm font-medium leading-relaxed text-slate-700">
                &ldquo;{message}&rdquo;
              </p>
              <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-3 text-xs">
                <p className="flex items-center gap-1.5 font-extrabold text-violet-800">
                  <BadgeDollarSign className="size-3.5" aria-hidden />
                  {result}
                </p>
                <span className="font-bold text-slate-400">WhatsApp / email</span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 overflow-hidden rounded-3xl bg-gradient-to-r from-violet-600 via-fuchsia-600 to-[#ff3d3d] p-px shadow-xl">
          <div className="rounded-[1.4rem] bg-white px-6 py-10 text-center sm:px-10">
            <G2StarRow className="mx-auto" />
            <h2 className="mt-3 text-2xl font-extrabold text-slate-900 sm:text-3xl">See a full report before you book</h2>
            <p className="mt-2 font-medium text-slate-600">Photo evidence, AQL, defect list — the same document you can forward internally.</p>
            <Button
              asChild
              className="mt-6 h-12 rounded-full bg-[#ff3d3d] px-10 text-base font-extrabold text-white shadow-lg hover:bg-[#e63535]"
              size="lg"
            >
              <Link href={reportHref}>
                <FileDown className="size-4" />
                Download sample report (PDF)
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>

    <footer className="border-t border-slate-200 bg-slate-900 text-slate-300">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 sm:py-14 lg:grid-cols-4">
        <div>
          <p className="text-lg font-extrabold text-white">HF Sourcing</p>
          <p className="mt-2 text-sm font-medium leading-relaxed">
            Verification, sample hub, line QC, and FBA / export prep in South China. No factory funding — compare with
            confidence.
          </p>
        </div>
        <div>
          <p className="text-xs font-extrabold uppercase tracking-wider text-slate-500">Services</p>
          <ul className="mt-3 space-y-2 text-sm font-semibold">
            <li>
              <a className="hover:text-white" href="#entry">Free plan</a>
            </li>
            <li>
              <a className="hover:text-white" href="#entry">Sourcing &amp; verification $249</a>
            </li>
            <li>
              <a className="hover:text-white" href="#stages-234">Samples from $99 + freight</a>
            </li>
            <li>
              <a className="hover:text-white" href="#stages-234">QC from $299 / day</a>
            </li>
            <li>
              <a className="hover:text-white" href="#stages-234">FBA &amp; logistics (quote)</a>
            </li>
          </ul>
        </div>
        <div>
          <p className="text-xs font-extrabold uppercase tracking-wider text-slate-500">Trust</p>
          <ul className="mt-3 space-y-2 text-sm font-semibold">
            <li>
              <a className="hover:text-white" href="#integrity">Integrity &amp; incentives</a>
            </li>
            <li>
              <a className="hover:text-white" href="#proof">Reviews</a>
            </li>
            <li>
              <a className="hover:text-white" href={reportHref}>Sample report</a>
            </li>
          </ul>
        </div>
        <div>
          <p className="text-xs font-extrabold uppercase tracking-wider text-slate-500">Contact</p>
          <a className="mt-3 block text-sm font-extrabold text-white hover:underline" href="mailto:max@hfsourcing.com">
            max@hfsourcing.com
          </a>
          <p className="mt-2 text-xs font-medium text-slate-500">Greater Bay Area, China</p>
        </div>
      </div>
      <div className="border-t border-slate-800 py-4 text-center text-xs font-medium text-slate-500">
        © {new Date().getFullYear()} HF Sourcing. Inspired by market-style B2B clarity (e.g. G2). Not affiliated with G2, Inc.
      </div>
    </footer>
  </main>
  )
}

export default HomePage
