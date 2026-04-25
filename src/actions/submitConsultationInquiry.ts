'use server'

import { getPayload } from 'payload'
import { z } from 'zod'

import config from '@payload-config'
import { isNextBuildPhase } from '@/lib/isNextBuildPhase'

const inquirySchema = z.object({
  sourcing: z.string().trim().min(5, 'Please add a bit more detail.').max(4000),
  headache: z.string().trim().min(5, 'Please add a bit more detail.').max(4000),
})

type InquiryFieldErrors = Partial<Record<'sourcing' | 'headache', string>>

export type SubmitConsultationInquiryResult =
  | { ok: true }
  | { ok: false; message: string; fieldErrors?: InquiryFieldErrors }

export async function submitConsultationInquiry(
  input: unknown,
): Promise<SubmitConsultationInquiryResult> {
  if (isNextBuildPhase()) {
    return { ok: false, message: 'Unavailable during build.' }
  }

  const parsed = inquirySchema.safeParse(input)
  if (!parsed.success) {
    const fieldErrors: InquiryFieldErrors = {}
    for (const issue of parsed.error.issues) {
      const key = issue.path[0]
      if (key === 'sourcing' || key === 'headache') {
        fieldErrors[key] = issue.message
      }
    }
    return {
      ok: false,
      message: 'Check the fields below and try again.',
      fieldErrors,
    }
  }

  try {
    const payload = await getPayload({ config })
    await payload.create({
      collection: 'consultation-inquiries',
      data: {
        sourcing: parsed.data.sourcing,
        headache: parsed.data.headache,
        source: 'homepage',
      },
      depth: 0,
    })
    return { ok: true }
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.warn('[submitConsultationInquiry]', error)
    }
    return {
      ok: false,
      message:
        'We could not save your message right now. Please email directly or use WhatsApp.',
    }
  }
}
