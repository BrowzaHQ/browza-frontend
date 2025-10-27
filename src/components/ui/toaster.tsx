"use client";
import { useToastStore } from "./use-toast";
import { cn } from "@/lib/cn";

export default function Toaster() {
  const toasts = useToastStore((s) => s.toasts);
  return (
    <div className="fixed right-4 top-4 z-[1000] flex w-80 flex-col gap-2">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={cn(
            "rounded-md border p-3 shadow-sm bg-white text-gray-900",
            t.variant === "destructive" && "border-red-300 bg-red-50 text-red-900"
          )}
        >
          {t.title && <div className="text-sm font-semibold">{t.title}</div>}
          {t.description && <div className="text-sm opacity-80">{t.description}</div>}
        </div>
      ))}
    </div>
  );
}
