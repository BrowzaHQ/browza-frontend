"use client";

import { useEffect, useRef } from "react";
import { useSession } from "@/stores/useSession";
import { api } from "@/lib/apiClient";

export default function SessionBootstrap() {
  const booted = useRef(false);
  const session = useSession((s) => s.session);
  const setSession = useSession((s) => s.setSession);

  useEffect(() => {
    if (booted.current) return;
    booted.current = true;

    (async () => {
      try {
        if (session) return; // already persisted
        const me = await api<{ userId: string; email: string; role: "buyer" | "admin" }>("/auth/me");
        // Optional: refresh helper cookie 'role' so middleware keeps working
        document.cookie = `role=${me.role}; path=/; max-age=${60 * 60 * 24 * 7};`;
        setSession(me);
      } catch {
        // unauthenticated: ignore
      }
    })();
  }, [session, setSession]);

  return null;
}
