import { NextResponse } from 'next/server'
import { z } from 'zod'
import { KycItem } from '@/types/kyc'

const store = getStore()

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  await sleep(250)
  const { id } = await params

  const body = await req.json().catch(() => ({}))
  const reason = z.object({ reason: z.string().optional() }).parse(body).reason ?? ''

  const idx = store.DATA.findIndex((i) => i.id === id)
  if (idx === -1) return NextResponse.json({ error: 'Not found' }, { status: 404 })

const updated: KycItem = { ...store.DATA[idx], status: 'approved', reason: reason ?? '' }
  store.DATA[idx] = updated

  return NextResponse.json(updated)
}

// --------------- shared mock state ---------------
function getStore() {
  // @ts-ignore
  if (!globalThis.__KYC_STORE__) {
    // @ts-ignore
    globalThis.__KYC_STORE__ = { DATA: [] as KycItem[] }
  }
  // @ts-ignore
  return globalThis.__KYC_STORE__ as { DATA: KycItem[] }
}
function sleep(ms: number) { return new Promise((r) => setTimeout(r, ms)) }
