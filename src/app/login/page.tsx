// src/app/login/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '../../lib/apiClient';
import { setAuthToken } from '../../lib/auth';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    setBusy(true);
    try {
      if (process.env.NEXT_PUBLIC_USE_MOCK_AUTH === 'true') {
        await new Promise(r => setTimeout(r, 400));
        setAuthToken('mock-token');
        router.push('/buyer/dashboard');
        return;
      }
      const json: any = await api.post('/auth/login', { email, password });
      const token = json?.access_token ?? json?.token;
      if (!token) throw new Error('No token in response');
      setAuthToken(token);
      router.push('/buyer/dashboard');
    } catch (e: any) {
      setErr(e?.message || 'Login failed');
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="mx-auto max-w-sm p-6">
      <h1 className="text-2xl font-semibold mb-4">Sign in</h1>
      <form onSubmit={onSubmit} className="space-y-3">
        <input
          className="w-full rounded border p-2"
          type="email" placeholder="Email"
          value={email} onChange={e => setEmail(e.target.value)} required
        />
        <input
          className="w-full rounded border p-2"
          type="password" placeholder="Password" minLength={6}
          value={password} onChange={e => setPassword(e.target.value)} required
        />
        {err && <p className="text-sm text-red-600">{err}</p>}
        <button className="rounded-lg border px-3 py-2 disabled:opacity-50" disabled={busy}>
          {busy ? 'Signing in…' : 'Sign in'}
        </button>
      </form>
    </div>
  );
}
