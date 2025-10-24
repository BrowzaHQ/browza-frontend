'use client';

import { useState } from 'react';
import { setToken } from '@/lib/auth';
import { api } from '@/lib/apiClient';

const USE_MOCK = process.env.NEXT_PUBLIC_ENABLE_MOCK === 'true';

export function useLogin() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function login(email: string, password: string) {
    setLoading(true);
    setError(null);
    try {
      let token = 'mock-token';
      if (!USE_MOCK) {
        const res = await api<{ accessToken: string }>('/auth/login', {
          method: 'POST',
          json: { email, password },
        });
        token = res.accessToken;
      } else {
        // small delay so the UI shows loading
        await new Promise((r) => setTimeout(r, 300));
      }
      setToken(token);
      return token;
    } catch (e: any) {
      setError(e?.message ?? 'Login failed');
      throw e;
    } finally {
      setLoading(false);
    }
  }

  return { login, loading, error };
}
