"use client";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/button";
import { useSession } from "@/stores/useSession";
import { api } from "@/lib/apiClient";

export default function Header() {
  const { session, clear } = useSession();
  const router = useRouter();

  async function logout() {
    try {
      await api("/auth/logout", { method: "POST" });
    } catch {}
    document.cookie = "role=; path=/; max-age=0;"; // clear helper cookie
    clear();
    router.replace("/login");
  }

  return (
    <header className="flex h-14 items-center justify-between border-b border-white/10 bg-[#0B0F19] px-4">
      <div className="text-sm font-semibold tracking-wide text-white">Browza</div>
      <div className="flex items-center gap-3">
        {session?.email && <span className="text-xs text-gray-300">{session.email} · {session.role}</span>}
        <Button variant="ghost" onClick={logout}>Logout</Button>
      </div>
    </header>
  );
}
