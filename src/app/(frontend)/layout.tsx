import type { Metadata } from 'next'
import '../globals.css'

export const metadata: Metadata = {
  title: {
    default: 'HF Sourcing | Independent China Factory Audit & Inspection',
    template: '%s | HFsourcing',
  },
  // [!code modify] Public metadata now matches the B2B sourcing service positioning.
  description:
    'Independent factory audits, AQL inspections, and crisis negotiation in China. Flat rates, zero factory kickbacks, and a free first-line sanity check for serious buyers.',
}

interface FrontendLayoutProps {
  children: React.ReactNode
}

const FrontendLayout = ({ children }: FrontendLayoutProps) => (
  <html
    lang="en"
    // [!code modify] Avoid Turbopack runtime Google font resolution issue.
    className="h-full antialiased"
    suppressHydrationWarning
  >
    <body className="min-h-full flex flex-col bg-background text-foreground">
      {children}
    </body>
  </html>
)

export default FrontendLayout
