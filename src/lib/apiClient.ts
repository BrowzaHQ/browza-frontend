import { getAuthToken } from './auth';

const base = (process.env.NEXT_PUBLIC_API_BASE_URL || '').replace(/\/$/, '');

async function request(path: string, init?: RequestInit) {
  const headers: Record<string, string> = { ...(init?.headers as any) };
  const token = getAuthToken?.();
  if (token) headers.Authorization = `Bearer ${token}`;
  const res = await fetch(`${base}${path}`, { cache: 'no-store', ...init, headers });
  if (!res.ok) throw new Error(`${res.status} ${res.statusText || 'Request failed'}`);
  try { return await res.json(); } catch { return {}; }
}

export const api = {
  get: (p: string, i?: RequestInit) => request(p, { method: 'GET', ...i }),
  post: (p: string, body?: unknown, i?: RequestInit) =>
    request(p, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...(i?.headers || {}) },
      body: body ? JSON.stringify(body) : undefined,
      ...i
    })
};

export default api;
