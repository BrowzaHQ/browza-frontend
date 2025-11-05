import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
  token: string | null;
  user: {
    id: string;
    email: string;
    name?: string;
  } | null;
  setToken: (token: string) => void;
  setUser: (user: AuthState['user']) => void;
  clearSession: () => void;
  isAuthenticated: () => boolean;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      token: null,
      user: null,

      setToken: (token: string) => set({ token }),

      setUser: (user) => set({ user }),

      clearSession: () => {
        set({ token: null, user: null });
        // Optional: Clear any cookies/localStorage manually if needed
      },

      isAuthenticated: () => {
        return get().token !== null && get().user !== null;
      },
    }),
    {
      name: 'auth-store', // localStorage key
      partialize: (state) => ({
        token: state.token,
        user: state.user,
      }),
    }
  )
);
