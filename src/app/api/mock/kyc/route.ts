// src/app/api/mock/kyc/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { KycListResponseSchema, KycItem } from '@/types/kyc';

const PAGE_SIZE_DEFAULT = 20;

/**
 * Query params:
 *  - page, pageSize (numbers)
 *  - status ("pending" | "approved" | "rejected")
 *  - q (search by name/email)
 */
const listingSchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce
    .number()
    .int()
    .min(10)
    .max(100)
    .default(PAGE_SIZE_DEFAULT),
  status: z.string().min(1).optional(),
  q: z.string().trim().min(1).optional(),
});

// --- in-memory dataset (demo only)
let DATA: KycItem[] = makeSampleData(360);

export async function GET(req: NextRequest) {
  // simulate latency
  await sleep(250);

  const searchParams = new URL(req.url).searchParams;
  const parsed = listingSchema.safeParse(Object.fromEntries(searchParams.entries()));
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid query' }, { status: 400 });
  }

  const { page, pageSize, status, q } = parsed.data;

  const toTs = (iso: string) => new Date(iso).getTime();

  // newest first
  let items = [...DATA].sort((a, b) => toTs(b.updatedAt) - toTs(a.updatedAt));

  if (status) items = items.filter((i) => i.status === status);
  if (q) {
    const qq = q.toLowerCase();
    items = items.filter(
      (i) =>
        (i as any).name?.toLowerCase?.().includes(qq) || // keep flexible for type compat
        (i as any).email?.toLowerCase?.().includes(qq)
    );
  }

  const total = items.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const start = (page - 1) * pageSize;
  const paged = items.slice(start, start + pageSize);

  const body = {
    items: paged,
    page,
    pageSize,
    total,
    totalPages,
  };

  // Validate response shape (useful during dev)
  const valid = KycListResponseSchema.safeParse(body);
  if (!valid.success) {
    return NextResponse.json({ error: 'Server schema error' }, { status: 500 });
  }

  return NextResponse.json(body);
}

/* ----------------------- utils ----------------------- */

function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

/**
 * Produce mock KYC items. We keep the object shape FLAT to match KycItem
 * and avoid “unknown property” TS errors (e.g., no nested `applicant`, no `notes`).
 */
function makeSampleData(n: number): KycItem[] {
  const statuses = ['pending', 'approved', 'rejected'] as const;
  const names = [
    'Aarav Shah',
    'Divya Mehta',
    'Kabir Nair',
    'Anaya Iyer',
    'Vivaan Gupta',
    'Ira Kulkarni',
    'Ansh Patel',
    'Neyashh Chopra',
    'Aseia Desai',
    'Advait Joshi',
    'Aadhya Khanna',
    'Ishaan Batra',
  ];

  const arr: KycItem[] = [];
  for (let i = 0; i < n; i++) {
    const id = `kyc-${String(i + 1).padStart(4, '0')}`;
    const name = names[i % names.length];
    const email = name.toLowerCase().replace(/\s/g, '.') + '@example.com';
    const status = statuses[i % statuses.length];
    const updatedAt = new Date(Date.now() - i * 3.6e6).toISOString(); // hourly stagger

    // Build a FLAT object. Only include fields commonly used across the app.
    // (If your KycItem type includes more optional fields, you can add them here.)
    const item: KycItem = {
      id,
      status,
      updatedAt,
      // The following are widely used in filters/search UI.
      // They are typed on most KycItem definitions; if yours differ, adjust accordingly.
      // @ts-ignore – keep flexible across slightly different local KycItem definitions
      name,
      // @ts-ignore
      email,
      // If your KycItem supports `reason?`, you can uncomment this:
      // reason: status === 'rejected' ? 'Blurry document' : null,
    };

    arr.push(item);
  }

  return arr;
}
