import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { KycItemSchema, KycStatusEnum, KycListResponseSchema, KycItem } from '@/types/kyc';

const PAGE_SIZE_DEFAULT = 10;

const listQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce.number().int().min(1).max(100).default(PAGE_SIZE_DEFAULT),
status: KycStatusEnum.optional(),
  q: z.string().trim().min(1).optional(),
});

// ---- In-memory dataset (demo only) ----
let DATA: KycItem[] = makeSampleData(36);

export async function GET(req: NextRequest) {
  await sleep(250); // simulate latency

  const { searchParams } = new URL(req.url);
  const parsed = listQuerySchema.safeParse(Object.fromEntries(searchParams.entries()));
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid query' }, { status: 400 });
  }
  const { page, pageSize, status, q } = parsed.data;

  const toTs = (iso: string) => new Date(iso).getTime();
    let items = [...DATA].sort((a, b) => toTs(b.updatedAt) - toTs(a.updatedAt));
  );

  if (status) items = items.filter((i) => i.status === status);
  if (q) {
    const qq = q.toLowerCase();
    items = items.filter(
      (i) => i.applicant.toLowerCase().includes(qq) || i.email.toLowerCase().includes(qq),
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

  const valid = KycListResponseSchema.safeParse(body);
  if (!valid.success) {
    // Should never happen; helps catch schema drift during dev
    return NextResponse.json({ error: 'Server schema error' }, { status: 500 });
  }
  return NextResponse.json(body);
}

// ----------------- utils -----------------
function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

function makeSampleData(n: number): KycItem[] {
  const statuses = ['pending', 'approved', 'rejected'] as const;
  const docTypes = ['PAN', 'AADHAAR', 'PASSPORT'] as const;
  const names = [
    'Aarav Shah','Diya Mehta','Kabir Nair','Anaya Iyer','Vivaan Gupta','Ira Kulkarni','Ansh Patel',
    'Reyansh Rao','Siya Desai','Advait Joshi','Aadhya Khanna','Ishaan Batra'
  ];
  const arr: KycItem[] = [];
  for (let i = 0; i < n; i++) {
    const id = `kyc_${String(i + 1).padStart(3, '0')}`;
    const applicant = names[i % names.length];
    const email = `${applicant.toLowerCase().replace(/\s+/g, '.')}@example.com`;
    const status = statuses[i % statuses.length];
    const docType = docTypes[i % docTypes.length];
    const submittedAt = new Date(Date.now() - i * 36e5).toISOString(); // hourly stagger
    arr.push({
      id,
      applicant,
      email,
      docType,
      submittedAt,
      status,
      docs: [{ type: 'front', url: '/placeholder/doc-front.png' }],
      notes: status === 'rejected' ? 'Blurry document' : '',
    });
  }
  return arr;
}
