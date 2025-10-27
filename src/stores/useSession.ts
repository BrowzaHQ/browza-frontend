import { create } from "zustand";

export type Role = "buyer" | "admin" | null;
export type Session = { userId: string; email: string; role: Role } | null;

type S = {
  session: Session;
  setSession: (s: Session) => void;
  clear: () => void;
};

export const useSession = create<S>((set) => ({
  session: null,
  setSession: (s) => set({ session: s }),
  clear: () => set({ session: null }),
}));
