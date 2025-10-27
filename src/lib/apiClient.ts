// src/lib/apiClient.ts
import axios from 'axios';

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

export default apiClient; // allows default and named imports

export async function api<T>(path: string, init?: RequestInit): Promise<T> {
  const base = process.env.NEXT_PUBLIC_API_BASE_URL || "";
  const res = await fetch(base + path, {
    credentials: "include",
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers || {}),
    },
  });

  if (res.status === 401) {
    const msg = "UNAUTHENTICATED";
    throw new Error(msg);
  }

  if (!res.ok) {
    let msg = "Request failed";
    try { msg = (await res.json())?.message || msg; } catch {}
    throw new Error(msg);
  }

  // If no json, return empty as any
  try { return (await res.json()) as T; } catch { return {} as T; }
}

