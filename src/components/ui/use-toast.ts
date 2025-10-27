import { create } from "zustand";

type Toast = { id: string; title?: string; description?: string; variant?: "default"|"destructive" };
type Store = {
  toasts: Toast[];
  push: (t: Omit<Toast, "id">) => void;
  dismiss: (id: string) => void;
};

export const useToastStore = create<Store>((set) => ({
  toasts: [],
  push: (t) =>
    set((s) => {
      const id = String(Date.now() + Math.random());
      setTimeout(() => {
        set((s2) => ({ toasts: s2.toasts.filter((x) => x.id !== id) }));
      }, 3500);
      return { toasts: [...s.toasts, { id, ...t }] };
    }),
  dismiss: (id) => set((s) => ({ toasts: s.toasts.filter((x) => x.id !== id) })),
}));

export function useToast() {
  const push = useToastStore((s) => s.push);
  return {
    toast: (t: Omit<Toast, "id">) => push(t),
  };
}
