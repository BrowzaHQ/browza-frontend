// src/lib/auth.ts
let _token: string | null = null;

export const setAuthToken = (token: string): void => {
  _token = token;
};

export const getAuthToken = (): string | null => {
  return _token;
};

export const clearAuthToken = (): void => {
  _token = null;
};
