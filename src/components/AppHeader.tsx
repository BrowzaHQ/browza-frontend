"use client";
import { useSession } from "@/lib/useSession";

type Props = { variant?: "light" | "dark" };
export default function AppHeader({ variant = "light" }: Props) {
  const { user, logout } = useSession();

  const base = "sticky top-0 z-40 w-full border-b";
  const light  = "bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/70 text-gray-900 border-gray-200";
  const dark   = "bg-[#0B0F19] text-gray-100/90 border-white/10";

  return (
    <header className={`${base} ${variant === "dark" ? dark : light}`}>
      <div className="mx-auto max-w-7xl h-14 px-4 flex items-center justify-between">
        <span className="font-semibold tracking-wide">Browza</span>
        <div className="flex items-center gap-4">
          {!!user && (
            <span className={variant === "dark" ? "text-sm text-gray-300" : "text-sm text-gray-700"}>
              {user.email} · {user.role}
            </span>
          )}
          <button
            onClick={logout}
            className={variant === "dark"
              ? "text-sm text-gray-300 hover:text-white transition"
              : "text-sm text-gray-700 hover:text-gray-900 transition"}
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}
