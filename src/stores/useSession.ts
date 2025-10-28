import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Role = "buyer" | "admin" | null;
export type Session = { userId: string; email: string; role: Role } | null;

type S = {
  session: Session;
  setSession: (s: Session) => void;
  clear: () => void;
};

export const useSession = create(
  persist<S>(
    (set) => ({
      session: null,
      setSession: (s) => set({ session: s }),
      clear: () => set({ session: null }),
    }),
    {
      name: "browza-session", // stores in localStorage
      version: 1,
    }
  )
);
