// app/(buyer)/billing/page.tsx
'use client';

import { useEffect, useMemo, useState } from 'react';
import { useBuyerStore } from '@/stores/buyer-store';
import { Activity, Database, TrendingUp, Wallet } from 'lucide-react';


type Invoice = {
  id: string;
  date: string;
  subtotal: number;
  gst: number;
  total: number;
  status: 'PAID' | 'DUE';
};

export default function BillingPage() {
  const { walletBalance, gbAvailable } = useBuyerStore();
  const [loading, setLoading] = useState(true);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [page, setPage] = useState(1);
  const pageSize = 10;

  // Mock fetch
  useEffect(() => {
    const t = setTimeout(() => {
      // Toggle between 0–10 rows as needed by editing this mock list
      const mock: Invoice[] = [
        { id: 'INV—2024-001', date: '15/1/2024', subtotal: 4237.28, gst: 762.71, total: 5000, status: 'PAID' },
        { id: 'INV—2024-002', date: '16/1/2024', subtotal: 2118.64, gst: 381.36, total: 2500, status: 'PAID' },
        { id: 'INV—2024-003', date: '17/1/2024', subtotal: 3386.00, gst: 614.00, total: 4000, status: 'PAID' },
        { id: 'INV—2024-004', date: '18/1/2024', subtotal: 1525.00, gst: 275.00, total: 1800, status: 'DUE' },
        { id: 'INV—2024-005', date: '19/1/2024', subtotal: 5084.00, gst: 916.00, total: 6000, status: 'PAID' },
        { id: 'INV—2024-006', date: '20/1/2024', subtotal: 6780.00, gst: 1220.00, total: 8000, status: 'PAID' },
        { id: 'INV—2024-007', date: '21/1/2024', subtotal: 2457.50, gst: 442.50, total: 2900, status: 'DUE' },
        { id: 'INV—2024-008', date: '22/1/2024', subtotal: 3396.00, gst: 614.00, total: 4010, status: 'PAID' },
        { id: 'INV—2024-009', date: '23/1/2024', subtotal: 1696.00, gst: 304.00, total: 2000, status: 'PAID' },
        { id: 'INV—2024-010', date: '24/1/2024', subtotal: 4237.00, gst: 763.00, total: 5000, status: 'DUE' },
        { id: 'INV—2024-011', date: '25/1/2024', subtotal: 5084.00, gst: 916.00, total: 6000, status: 'PAID' },
        // add more rows if needed up to 10
      ];
      setInvoices(mock);
      setLoading(false);
    }, 900);
    return () => clearTimeout(t);
  }, []);

  const paged = useMemo(() => {
    const start = (page - 1) * pageSize;
    return invoices.slice(start, start + pageSize);
  }, [invoices, page]);

  const totalPages = Math.max(1, Math.ceil(invoices.length / pageSize));

  return (
    <div className="bg-[#F7F8FA]">
      <div className="mx-auto w-full px-6 xl:w-[1280px] 2xl:w-[1440px] 3xl:w-[1536px] 4xl:w-[1920px]">
        {/* Header row with title + compliance badges */}
        <div className="flex items-center justify-between pt-6 pb-4">
          <div>
            <h1 className="text-[22px] font-semibold text-gray-900">Billing & Credits</h1>
            <p className="mt-1 text-sm text-gray-500">
              Transparent billing with GST compliance and real-time usage tracking
            </p>
          </div>
          <div className="flex items-center gap-3">
            <BadgeChip icon="soc2" label="SOC 2 Type II Certified" />
          </div>
        </div>

        {/* KPI: Account Balance + Allowance */}
        <section className="rounded-xl border border-gray-200 bg-white p-4 sm:p-6 shadow-sm">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex items-center gap-2">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-gray-100">
                <Wallet />
              </span>
              <span className="text-sm font-medium text-gray-800">Account Balance</span>
            </div>

            <button
              disabled
              title="Coming soon"
              className="inline-flex h-9 cursor-not-allowed items-center rounded-md bg-black px-4 text-sm font-medium text-white opacity-90"
            >
              <span className="mr-2 inline-flex h-5 w-5 items-center justify-center rounded bg-white/10">
                <PlusIcon />
              </span>
              Add Credits
            </button>
          </div>

          <div className="mt-4 grid items-center sm:mt-6 sm:grid-cols-3">
  {/* Left: Available balance */}
  <div className="sm:justify-self-start">
    {loading ? (
      <div className="h-7 w-32 animate-pulse rounded bg-gray-200" />
    ) : (
      <div className="text-[26px] font-semibold text-gray-900">
        ₹ {walletBalance.toLocaleString('en-IN')}
      </div>
    )}
    <div className="mt-1 text-xs text-gray-500">Available balance</div>
  </div>

  {/* Middle: Data allowance (centered) */}
<div className="mt-4 sm:mt-0 justify-self-center text-left flex flex-col items-start">
  {loading ? (
    <div className="h-6 w-24 animate-pulse rounded bg-gray-200" />
  ) : (
    <div className="text-[22px] font-bold text-[#0A7FC1]">{gbAvailable} GB</div>
  )}
  <div className="mt-1 text-xs text-gray-500">Data allowance at current rates</div>
</div>

  {/* Right: Spacer to keep middle centered across widths */}
  <div className="hidden sm:block" />
</div>
        </section>

        {/* KPI Row */}
        <section className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4">
          <KpiCard
            loading={loading}
            color="text-green-400"
            title="Active Jobs"
            value="12"
            caption="Running now"
            icon={<Activity />}
            empty={false}
          />
          <KpiCard
            color='text-black'
            loading={loading}
            title="This Month Usage"
            value="₹1,250"
            caption="47 jobs completed"
            icon={<TrendingUp />}
            empty={false}
          />
          <KpiCard
            color='text-black'
            loading={loading}
            title="Data Processed"
            value="23.4 GB"
            caption="97.8% success rate"
            icon={<Database />}
            empty={false}
          />
          <KpiCard
            color='text-[#0A7FC1]'
            loading={loading}
            title="Remaining Credits"
            value={`${gbAvailable} GB`}
            caption="At current rates"
            icon={<Wallet />}
            empty={!gbAvailable}
          />
        </section>

        {/* Usage Reports & Exports (disabled CTAs) */}
        {/* <section className="mt-6 rounded-xl border border-gray-200 bg-white p-4 sm:p-5 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h3 className="text-sm font-semibold text-gray-800">Usage Reports & Exports</h3>
              <p className="mt-1 text-sm text-gray-500">Download monthly usage, invoice summaries, and export CSVs</p>
            </div>
            <div className="flex items-center gap-2">
              <DisabledButton label="Export CSV" />
              <DisabledButton label="Monthly Report PDF" />
              <DisabledButton label="Email Statements" />
            </div>
          </div>
        </section> */}

        {/* GST Invoices */}
        <section className="mt-8">
          <h2 className="text-sm font-semibold text-gray-800">GST Invoices</h2>

          <div className="mt-3 rounded-xl border border-gray-200 bg-white shadow-sm">
            <div className="border-b border-gray-200 p-4 sm:p-5">
              <div className="text-sm font-medium text-gray-800">GST Invoices</div>
              <p className="mt-1 text-sm text-gray-500">
                Compliant invoices for all credit purchases • Auto-generated within minutes
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-gray-50 text-xs uppercase text-gray-500">
                  <tr>
                    <Th>Invoice #</Th>
                    <Th>Date</Th>
                    <Th>Subtotal</Th>
                    <Th>GST (18%)</Th>
                    <Th>Total</Th>
                    <Th>Status</Th>
                    <Th>Download</Th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-sm">
                  {loading
                    ? Array.from({ length: 2 }).map((_, i) => <SkeletonRow key={i} />)
                    : paged.length === 0
                    ? (
                      <tr>
                        <td colSpan={7} className="px-6 py-10 text-center text-sm text-gray-500">
                          No invoices yet. Credits and invoices will appear here after your first purchase.
                        </td>
                      </tr>
                    )
                    : paged.map((inv) => (
                        <tr key={inv.id} className="hover:bg-gray-50/60">
                          <Td><span className="text-gray-800">{inv.id}</span></Td>
                          <Td><span className="text-gray-700">{inv.date}</span></Td>
                          <Td><span className="text-gray-800">₹ {inv.subtotal.toLocaleString('en-IN')}</span></Td>
                          <Td><span className="text-gray-800">₹ {inv.gst.toLocaleString('en-IN')}</span></Td>
                          <Td><span className="font-semibold text-gray-900">₹ {inv.total.toLocaleString('en-IN')}</span></Td>
                          <Td>
                            <StatusPill status={inv.status} />
                          </Td>
                          <Td>
                            <button
                              disabled
                              title="Coming soon"
                              className="inline-flex cursor-not-allowed items-center rounded-md border border-gray-200 px-2.5 py-1 text-xs font-medium text-gray-700 opacity-60"
                            >
                              <DownloadIcon className="mr-1" />
                              PDF
                            </button>
                          </Td>
                        </tr>
                      ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {!loading && invoices.length > 0 && (
              <div className="flex items-center justify-between px-4 py-3 sm:px-6">
                <span className="text-xs text-gray-500">
                  Page {page} of {totalPages}
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page === 1}
                    className="rounded-md border border-gray-200 px-3 py-1 text-xs text-gray-700 disabled:opacity-40"
                    title="Previous"
                  >
                    Prev
                  </button>
                  <button
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    disabled={page === totalPages}
                    className="rounded-md border border-gray-200 px-3 py-1 text-xs text-gray-700 disabled:opacity-40"
                    title="Next"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </div>
        </section>

        <div className="h-10" />
      </div>
    </div>
  );
}

/* ---- atoms ---- */

function BadgeChip({ icon, label }: { icon: 'gst' | 'soc2'; label: string }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-1 text-xs font-medium text-gray-700">
      {icon === 'gst' ? <ShieldCheck /> : <ShieldCheck />}
      {label}
    </span>
  );
}

function DisabledButton({ label }: { label: string }) {
  return (
    <button
      disabled
      title="Coming soon"
      className="inline-flex cursor-not-allowed items-center rounded-md border border-gray-200 bg-gray-50 px-3 py-1.5 text-xs font-medium text-gray-600 opacity-70"
    >
      {label}
    </button>
  );
}

function KpiCard({
  color,
  loading,
  title,
  value,
  caption,
  icon,
  empty,
}: {
   color:string,
  loading: boolean;
  title: string;
  value: string;
  caption: string;
  icon: React.ReactNode;
  empty?: boolean;
}) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:p-5 flex justify-between items-center">
     <div>
      <div className="flex items-center justify-between">
        <div className="text-sm font-medium text-gray-700">{title}</div>
      </div>
      <div className="mt-2 min-h-7">
        {loading ? (
          <div className="h-6 w-24 animate-pulse rounded bg-gray-200" />
        ) : empty ? (
          <span className="text-sm text-gray-400">—</span>
        ) : (
          <span className={`text-lg font-semibold ${color}`}>{value}</span>
        )}
      </div>
      <div className="mt-1 text-xs text-gray-500">{caption}</div>

     </div>
     <div>
       <span className="inline-flex h-8 w-8 items-center justify-center rounded-md 0bg-gray-10 text-gray-500 ml-3">
          {icon}
        </span>
     </div>
    </div>
  );
}

function Th({ children }: { children: React.ReactNode }) {
  return (
    <th className="px-4 py-3 text-[11px] font-medium tracking-wide text-gray-500 first:pl-6 last:pr-6">
      {children}
    </th>
  );
}

function Td({ children }: { children: React.ReactNode }) {
  return (
    <td className="px-4 py-4 first:pl-6 last:pr-6 align-middle">{children}</td>
  );
}

function SkeletonRow() {
  return (
    <tr>
      {Array.from({ length: 7 }).map((_, i) => (
        <Td key={i}>
          <div className="h-4 w-24 animate-pulse rounded bg-gray-200" />
        </Td>
      ))}
    </tr>
  );
}

/* ---- icons (inline, lightweight) ---- */

function PlusIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 16 16" className="text-white">
      <path d="M8 3.333V12.667M3.333 8H12.667" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function WalletIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" className="text-gray-700">
      <path fill="currentColor" d="M21 7H3a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h18a1 1 0 0 0 1-1V8a1 1 0 0 0-1-1m-1 8h-5a2 2 0 0 1 0-4h5zM3 9h12v6H3z" />
    </svg>
  );
}

function SparkIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24">
      <path fill="currentColor" d="M3 13h4l3 5l4-10l3 5h4" />
    </svg>
  );
}

function TrendIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24">
      <path fill="currentColor" d="M3 17h18v2H3zm0-6l5 5l4-4l5 6l4-5v-6l-4 5l-5-6l-4 4l-5-5z" />
    </svg>
  );
}

function DbIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24">
      <path fill="currentColor" d="M12 3C7 3 3 4.79 3 7v10c0 2.21 4 4 9 4s9-1.79 9-4V7c0-2.21-4-4-9-4m0 2c3.87 0 7 .9 7 2s-3.13 2-7 2s-7-.9-7-2s3.13-2 7-2m0 14c-3.87 0-7-.9-7-2v-2c1.65 1.02 4.35 1.67 7 1.67S17.35 16.02 19 15v2c0 1.1-3.13 2-7 2m0-5c-3.87 0-7-.9-7-2V8c1.65 1.02 4.35 1.67 7 1.67S17.35 9.02 19 8v4c0 1.1-3.13 2-7 2" />
    </svg>
  );
}

function CardIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24">
      <path fill="currentColor" d="M20 4H4a2 2 0 0 0-2 2v1h20V6a2 2 0 0 0-2-2M2 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9H2z" />
    </svg>
  );
}

function DownloadIcon({ className = '' }: { className?: string }) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" className={className}>
      <path fill="currentColor" d="M5 20h14v-2H5m14-9h-4V3H9v6H5l7 7z" />
    </svg>
  );
}

function ShieldCheck() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" className="text-gray-700">
      <path fill="currentColor" d="M12 2l7 4v6c0 5-3.4 9.4-7 10c-3.6-.6-7-5-7-10V6l7-4m-1 14l6-6l-1.4-1.4L11 13.2l-2.6-2.6L7 12l4 4z" />
    </svg>
  );
}

function StatusPill({ status }: { status: 'PAID' | 'DUE' }) {
  const isPaid = status === 'PAID';
  return (
    <span
      className={
        isPaid
          ? 'inline-flex items-center rounded-md bg-green-50 px-2.5 py-1 text-xs font-semibold text-green-700 ring-1 ring-inset ring-green-200'
          : 'inline-flex items-center rounded-md bg-yellow-50 px-2.5 py-1 text-xs font-semibold text-yellow-700 ring-1 ring-inset ring-yellow-200'
      }
    >
      {status}
    </span>
  );
}
