// src/lib/api/auth.ts
import { apiClient } from '@/lib/apiClient';   // <-- named import
import type { AxiosError } from 'axios';

export type LoginCredentials = {
  email: string;
  password: string;
};

export async function loginRequest(creds: LoginCredentials): Promise<{ token: string }> {
  try {
    const { data } = await apiClient.post('/auth/login', creds);
    return data as { token: string };
  } catch (err) {
    const e = err as AxiosError;
    const status = e.response?.status ?? 500;
    throw new Error(`HTTP ${status}: ${e.message || 'Login failed'}`);
  }
}
