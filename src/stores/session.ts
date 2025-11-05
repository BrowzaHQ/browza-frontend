// src/stores/session.ts
import { create } from "zustand";

export type Role = "buyer" | "admin";

export type Session = {
  email: string;
  role?: Role;
  token?: string;
};

type SessionState = {
  session: Session | null;
  setSession: (s: Session | null) => void;
  clearSession: () => void;
};

export const useSession = create<SessionState>((set) => ({
  session: null,
  setSession: (s) => set({ session: s }),
  clearSession: () => set({ session: null }),
}));
