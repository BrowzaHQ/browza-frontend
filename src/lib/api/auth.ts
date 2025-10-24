// src/lib/api/auth.ts

export type LoginCredentials = {
  email: string;
  password: string;
};

export async function loginRequest(
  creds: LoginCredentials
): Promise<{ token: string }> {
  const base = process.env.NEXT_PUBLIC_API_BASE_URL;
  if (!base) {
    throw new Error('Missing NEXT_PUBLIC_API_BASE_URL');
  }

  const res = await fetch(`${base.replace(/\/$/, '')}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(creds),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`HTTP ${res.status}${text ? `: ${text}` : ''}`);
  }

  // BE may return {token} or {accessToken}; normalize to {token}
  const json = (await res.json()) as { token?: string; accessToken?: string };
  const token = json.token ?? json.accessToken ?? '';
  if (!token) throw new Error('Login response missing token');

  return { token };
}
