const base = (process.env.NEXT_PUBLIC_API_BASE_URL || '').replace(/\/$/, '');

async function request(path: string, init?: RequestInit) {
  const res = await fetch(`${base}${path}`, { cache: 'no-store', ...init });
  if (!res.ok) throw new Error(`${res.status} ${res.statusText || 'Request failed'}`);
  try { return await res.json(); } catch { return {}; }
}

export const api = {
  get: (path: string, init?: RequestInit) => request(path, { method: 'GET', ...init }),
  post: (path: string, body?: unknown, init?: RequestInit) =>
    request(path, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...(init?.headers || {}) },
      body: body ? JSON.stringify(body) : undefined,
      ...init
    })
};

export default api;
