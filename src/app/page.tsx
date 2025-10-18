'use client';

import { useEffect, useState } from 'react';

type Json = Record<string, unknown>;

export default function StatusPage() {
  const [data, setData] = useState<Json | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const base = (process.env.NEXT_PUBLIC_API_BASE_URL || '').replace(/\/$/, '');

  async function load() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${base}/healthz`, { cache: 'no-store' });
      if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
      const json = await res.json().catch(() => ({}));
      setData(json);
    } catch (e: any) {
      setError(e?.message || 'Request failed');
      setData(null);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">API Status</h1>

      <div className="rounded-xl border p-5">
        {loading && <p>Loading…</p>}

        {!loading && error && (
          <div className="space-y-3">
            <p className="text-red-600">Error: {error}</p>
            <button onClick={load} className="rounded-lg border px-3 py-2">
              Retry
            </button>
          </div>
        )}

        {!loading && !error && data && (
          <pre className="text-sm overflow-auto">{JSON.stringify(data, null, 2)}</pre>
        )}
      </div>
    </div>
  );
}
