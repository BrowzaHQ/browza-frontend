// app/status/page.tsx
import Link from "next/link";

async function getHealth() {
  const base = process.env.NEXT_PUBLIC_API_BASE_URL ?? "";
  const url = base ? `${base.replace(/\/$/, "")}/healthz` : "";
  if (!url) return { ok: false, status: undefined, detail: "NEXT_PUBLIC_API_BASE_URL not set" };
  try {
    const res = await fetch(url, { cache: "no-store" });
    return { ok: res.ok, status: res.status, detail: await res.text() };
  } catch (e: any) {
    return { ok: false, status: undefined, detail: e?.message ?? "Network error" };
  }
}

export default async function StatusPage() {
  const result = await getHealth();

  return (
    <main className="mx-auto max-w-3xl py-16">
      <h1 className="text-4xl font-bold">Service Status</h1>
      <div className="mt-6 rounded-xl border p-4">
        <div className="text-sm opacity-70">/healthz</div>
        <div className="mt-2 text-xl">
          {result.ok ? "✅ OK" : "❌ Error"}
          {typeof result.status !== "undefined" ? ` (HTTP ${result.status})` : ""}
        </div>
        {!result.ok && (
          <pre className="mt-3 whitespace-pre-wrap text-sm opacity-80">
            {String(result.detail ?? "")}
          </pre>
        )}
      </div>
      <div className="mt-8">
        <Link href="/" className="underline">← Back to Home</Link>
      </div>
    </main>
  );
}

<Link
  href="/status"
  className="inline-block rounded-full px-6 py-3 font-medium bg-blue-600 text-white hover:bg-blue-700 mt-8"
>
  Check Status
</Link>

