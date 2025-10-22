const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;

async function getHealth() {
  if (!API_BASE) return { error: 'NEXT_PUBLIC_API_BASE_URL is missing' };
  try {
    const res = await fetch(`${API_BASE}/healthz`, { cache: 'no-store' });
    if (!res.ok) return { error: `HTTP ${res.status} ${res.statusText || ''}`.trim() };
    return res.json();
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : 'Network error';
    return { error: message };
  }
}

export default async function HealthPage() {
  const data = await getHealth();

  return (
    <main className="mx-auto max-w-3xl p-6">
      <h2 className="text-2xl font-semibold mb-3">API Health</h2>
      <pre className="rounded-xl border p-4 bg-white/50 dark:bg-black/20 overflow-auto">
        {JSON.stringify(data, null, 2)}
      </pre>
      <p className="mt-2 text-sm text-gray-600">
        Base: {API_BASE || '(env not set)'} | Route: /healthz
      </p>
    </main>
  );
}
