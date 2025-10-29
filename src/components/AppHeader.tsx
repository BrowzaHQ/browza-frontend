"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Role = "admin" | "buyer";
type User = { email: string; role: Role };

const STORAGE_KEY = "browza-session";
const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "";

/** Try to pull {email, role} from many possible session shapes */
function extractUser(anything: any): User | null {
  if (!anything || typeof anything !== "object") return null;

  // flat shape
  if (typeof anything.email === "string" && typeof anything.role === "string") {
    return { email: anything.email, role: anything.role as Role };
  }
  // common nested shapes
  const nested =
    anything.user ??
    anything.data?.user ??
    anything.session?.user ??
    null;

  if (
    nested &&
    typeof nested.email === "string" &&
    (typeof nested.role === "string" || typeof nested.claims?.role === "string")
  ) {
    return {
      email: nested.email,
      role: (nested.role ?? nested.claims.role) as Role,
    };
  }
  return null;
}

export default function AppHeader() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  // Load from localStorage; if missing, ask the API.
  useEffect(() => {
    const readLocal = () => {
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        const parsed = raw ? JSON.parse(raw) : null;
        const u = extractUser(parsed);
        if (u) setUser(u);
      } catch {
        /* ignore */
      }
    };

    const readFromApi = async () => {
      try {
        const c = new AbortController();
        const t = setTimeout(() => c.abort(), 8000);
        const res = await fetch(`${API_BASE}/auth/me`, {
          credentials: "include",
          signal: c.signal,
        });
        clearTimeout(t);
        if (res.ok) {
          const data = await res.json();
          const u = extractUser(data) ?? extractUser(data?.user) ?? null;
          if (u) {
            setUser(u);
            // normalize local cache for next time
            localStorage.setItem(STORAGE_KEY, JSON.stringify(u));
          }
        }
      } catch {
        /* ignore (unauth or network) */
      }
    };

    readLocal();
    // Only hit /auth/me if we didn’t find an email locally
    if (!user) readFromApi();

    const onStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) readLocal();
    };
    const onFocus = () => readLocal();
    window.addEventListener("storage", onStorage);
    window.addEventListener("focus", onFocus);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("focus", onFocus);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const logout = async () => {
    try {
      const res = await fetch(`${API_BASE}/auth/logout`, {
        method: "POST",
        credentials: "include",
      });
      // ignore status; we clear client state regardless
    } catch {}
    try {
      localStorage.removeItem(STORAGE_KEY);
      document.cookie = "role=; path=/; max-age=0; SameSite=Lax";
    } catch {}
    router.push("/login");
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/70 border-b border-gray-200">
      <div className="mx-auto max-w-7xl h-14 px-4 flex items-center justify-between">
        <span className="font-semibold tracking-wide">Browza</span>

        <div className="flex items-center gap-3">
          {/* Only render the chip when we actually have an email */}
          {user?.email && (
            <span className="text-sm text-gray-700 px-2 py-1 rounded-md bg-gray-100 border border-gray-200">
              {user.email} {user.role ? `· ${user.role}` : ""}
            </span>
          )}

          <button
            type="button"
            onClick={logout}
            className="inline-flex items-center rounded-md border border-transparent px-3 py-1.5 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
            aria-label="Logout"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}
