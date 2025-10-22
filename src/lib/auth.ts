// src/lib/auth.ts
let _token: string | null = null;

export const setAuthToken = (t: string | null) => { _token = t; };
export const getAuthToken = () => _token;
export const clearAuth = () => { _token = null; };
export const isAuthed = () => !!_token;
