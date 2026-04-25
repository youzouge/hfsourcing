import type { LucideIcon } from 'lucide-react'
import {
  CheckCircle2,
  ClipboardCheck,
  Package,
  Search,
  Shield,
  Ban,
  FileDown,
  Clock,
  Truck,
  TriangleAlert,
  XCircle,
} from 'lucide-react'

export const paidModuleIconById: Record<string, LucideIcon> = {
  'sourcing-verification': Search,
  'sample-consolidation': Package,
  'professional-qc': ClipboardCheck,
  'ecom-fba': Truck,
}

export const trustPillarIconByKey: Record<string, LucideIcon> = {
  shield: Shield,
  ban: Ban,
  fileDown: FileDown,
  clock: Clock,
}

export const comparisonIconByKey: Record<string, LucideIcon> = {
  xCircle: XCircle,
  triangleAlert: TriangleAlert,
  checkCircle2: CheckCircle2,
}
