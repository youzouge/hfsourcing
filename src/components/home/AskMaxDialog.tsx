'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import Link from 'next/link'
import { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { submitConsultationInquiry } from '@/app/(frontend)/actions/submitConsultationInquiry'
import { Button, type ButtonProps } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'

const formSchema = z.object({
  sourcing: z.string().min(5).max(4000),
  headache: z.string().min(5).max(4000),
})

type FormValues = z.infer<typeof formSchema>

const reportHref = '/sample-report.pdf'
const defaultEmail = 'max@hfsourcing.com'
const defaultWhatsAppHref = 'https://wa.me/8610000000000' // [!code ++] Set NEXT_PUBLIC_WHATSAPP_URL in .env to your number.

const whatsappHref = process.env.NEXT_PUBLIC_WHATSAPP_URL?.trim() || defaultWhatsAppHref

type AskMaxDialogProps = {
  className?: string
  size?: ButtonProps['size']
  variant?: ButtonProps['variant']
  children: React.ReactNode
}

const AskMaxDialog = ({ className, size, variant, children }: AskMaxDialogProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [isPending, startTransition] = useTransition()

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { sourcing: '', headache: '' },
  })

  const onSubmit = (values: FormValues) => {
    startTransition(async () => {
      const result = await submitConsultationInquiry(values)
      if (result.ok) {
        setIsSuccess(true)
        reset()
        return
      }
      if (result.fieldErrors?.sourcing) {
        setError('sourcing', { message: result.fieldErrors.sourcing })
      }
      if (result.fieldErrors?.headache) {
        setError('headache', { message: result.fieldErrors.headache })
      }
      if (result.message) {
        setError('root', { message: result.message })
      }
    })
  }

  const openChange = (open: boolean) => {
    setIsOpen(open)
    if (!open) {
      setIsSuccess(false)
      reset()
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={openChange}>
      <DialogTrigger asChild>
        <Button type="button" className={cn(className)} size={size} variant={variant}>
          {children}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        {isSuccess ? (
          <div className="space-y-4 pt-2">
            <DialogHeader>
              <DialogTitle>Thank you. I have your context.</DialogTitle>
              <DialogDescription>
                By the way, I just finished a similar case study last week. Here is the sample
                report. You might find it useful for your future quality control.
              </DialogDescription>
            </DialogHeader>
            <Button
              asChild
              className="h-10 w-full rounded-md bg-foreground text-background hover:bg-foreground/90"
            >
              <Link href={reportHref} download>
                Download sample report (PDF)
              </Link>
            </Button>
            <p className="text-sm text-muted-foreground">
              Prefer a human channel?{' '}
              <a
                className="font-medium text-foreground underline-offset-4 hover:underline"
                href={`mailto:${defaultEmail}`}
              >
                Email
              </a>
              {' · '}
              <a
                className="font-medium text-foreground underline-offset-4 hover:underline"
                href={whatsappHref}
                rel="noreferrer"
                target="_blank"
              >
                WhatsApp
              </a>
            </p>
          </div>
        ) : (
          <form className="space-y-4 pt-1" onSubmit={handleSubmit(onSubmit)} noValidate>
            <DialogHeader>
              <DialogTitle>Before we jump on a call</DialogTitle>
              <DialogDescription>
                Two short answers help me see whether you are a serious buyer, and how I can help
                in the first reply.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-2">
              <Label htmlFor="sourcing">What are you sourcing?</Label>
              <Textarea
                id="sourcing"
                className="min-h-[80px] resize-y"
                autoComplete="off"
                placeholder="e.g. stainless steel cutlery, MOQ 2,000 sets — or paste a factory link or name"
                {...register('sourcing')}
                aria-invalid={Boolean(errors.sourcing)}
              />
              {errors.sourcing ? (
                <p className="text-sm text-destructive">{errors.sourcing.message}</p>
              ) : null}
            </div>
            <div className="space-y-2">
              <Label htmlFor="headache">What is your biggest headache right now?</Label>
              <Textarea
                id="headache"
                className="min-h-[100px] resize-y"
                placeholder="Factory ghosting, wrong samples, AQL fail last shipment…"
                {...register('headache')}
                aria-invalid={Boolean(errors.headache)}
              />
              {errors.headache ? (
                <p className="text-sm text-destructive">{errors.headache.message}</p>
              ) : null}
            </div>
            {errors.root ? (
              <p className="text-sm text-destructive" role="alert">
                {errors.root.message}
              </p>
            ) : null}
            <Button
              className="h-10 w-full rounded-md bg-foreground text-background hover:bg-foreground/90"
              disabled={isPending}
              type="submit"
            >
              {isPending ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Sending
                </>
              ) : (
                'Send to Max'
              )}
            </Button>
            <p className="text-center text-xs text-muted-foreground">
              You can also reach out without the form:{' '}
              <a className="underline-offset-2 hover:underline" href={`mailto:${defaultEmail}`}>
                {defaultEmail}
              </a>
            </p>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}

export { AskMaxDialog }
