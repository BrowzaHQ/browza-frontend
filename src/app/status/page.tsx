'use client';

import { useEffect, useState } from 'react';
import api from '../../lib/apiClient';
import toast from 'react-hot-toast';

type Json = Record<string, unknown>;

export default function StatusPage() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<Json | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    setError(null);
    try {
      const json = await api.get('/healthz');
      setData(json);
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : 'Network error';
      setError(msg);
      setData(null);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { void load(); }, []);

  return (
    <div className="mx-auto max-w-2xl p-6">
      <h1 className="text-2xl font-semibold">Status</h1>
      <div className="mt-4 rounded-xl border p-4 space-y-3">
        {loading && <p>Loading…</p>}
        {!loading && error && (
          <>
            <p className="text-red-600">Error: {error}</p>
            <button onClick={load} className="rounded-lg border px-3 py-2">Retry</button>
          </>
        )}
        {!loading && !error && data && (
          <pre className="text-sm overflow-auto">{JSON.stringify(data, null, 2)}</pre>
        )}
      </div>
    </div>
  );
}
