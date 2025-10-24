"use client";

import { FormEvent, useState } from "react";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "";

async function loginRequest(email: string, password: string) {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
    cache: "no-store",
  });
  const text = await res.text();
  let data: any;
  try { data = text ? JSON.parse(text) : {}; } catch { data = { raw: text }; }
  if (!res.ok) throw new Error(data?.message || `HTTP ${res.status}`);
  return data;
}

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setMsg("");
    try {
      const r = await loginRequest(email, password);
      setMsg(`✅ Logged in as ${r?.user?.role} (${r?.user?.email})`);
    } catch (err: any) {
      setMsg(`❌ ${err?.message || "Login failed"}`);
    }
  }

  return (
    <main className="mx-auto max-w-xl p-8">
      <h1 className="text-2xl font-semibold mb-4">Sign in</h1>

      {/* Demo quick-fill */}
      <div className="mb-4 flex gap-2">
        <button
          type="button"
          className="rounded border px-3 py-2"
          onClick={() => {
            setEmail("buyer-demo@browza.app");
            setPassword("buyerPlain");
          }}
        >
          Use Buyer demo
        </button>
        <button
          type="button"
          className="rounded border px-3 py-2"
          onClick={() => {
            setEmail("admin-demo@browza.app");
            setPassword("adminPlain");
          }}
        >
          Use Admin demo
        </button>
      </div>

      <form onSubmit={onSubmit} className="space-y-3">
        <input
          type="email"
          className="w-full rounded border p-3"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          className="w-full rounded border p-3"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button className="rounded border px-4 py-2">Sign in</button>
      </form>

      {msg && <p className="mt-4 text-sm">{msg}</p>}

      <p className="mt-6 text-xs text-gray-500">
        API: {API_BASE || "(not set)"}
      </p>
    </main>
  );
}
