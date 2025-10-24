// src/lib/auth.ts
const TOKEN_KEY = "browza_token";

/** SSR-safe getters/setters for auth token in localStorage */
export const getAuthToken = (): string | null => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(TOKEN_KEY);
};

export const setToken = (token: string) => setAuthToken(token);

export const setAuthToken = (token: string) => {
  if (typeof window === "undefined") return;
  localStorage.setItem(TOKEN_KEY, token);
};

export const clearAuthToken = () => {
  if (typeof window === "undefined") return;
  localStorage.removeItem(TOKEN_KEY);
};

/** Convenience header builder */
export type AuthHeaders = { Authorization?: string };
export const authHeader = (): AuthHeaders => {
  const t = getAuthToken();
  return t ? { Authorization: `Bearer ${t}` } : {};
};
