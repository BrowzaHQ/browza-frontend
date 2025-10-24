'use client';

import { useState } from 'react';

type LoginResponse = { token?: string };

/**
 * Minimal login hook:
 * - Calls POST /auth/login on your API
 * - Stores token in localStorage
 * - Falls back to a mock token when NEXT_PUBLIC_ENABLE_MOCK === 'true'
 */
export function useLogin() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (email: string, password: string): Promise<string> => {
    setLoading(true);
    setError(null);

    try {
      const base = process.env.NEXT_PUBLIC_API_BASE_URL;
      if (!base) throw new Error('Missing NEXT_PUBLIC_API_BASE_URL');

      const res = await fetch(`${base}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json: LoginResponse = await res.json();

      const token = json?.token ?? '';
      if (token && typeof window !== 'undefined') {
        localStorage.setItem('auth_token', token);
      }
      return token;
    } catch (e: any) {
      // Optional mock fallback for offline/dev
      if (process.env.NEXT_PUBLIC_ENABLE_MOCK === 'true') {
        const token = 'mock-token';
        if (typeof window !== 'undefined') {
          localStorage.setItem('auth_token', token);
        }
        return token;
      }
      const msg = e?.message ?? 'Login failed';
      setError(msg);
      throw e;
    } finally {
      setLoading(false);
    }
  };

  return { login, loading, error };
}
