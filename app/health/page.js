const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;

async function getHealth() {
  if (!API_BASE) return { error: 'NEXT_PUBLIC_API_BASE_URL is missing' };
  try {
    const res = await fetch(`${API_BASE}/healthz`, { cache: 'no-store' });
    if (!res.ok) return { error: `HTTP ${res.status}` };
    return res.json();
  } catch (e) {
    return { error: e.message || 'Network error' };
  }
}

export default async function HealthPage() {
  const data = await getHealth();

  return (
    <main>
      <h2>API Health</h2>
      <pre style={{ background: '#f6f8fa', padding: 12, borderRadius: 8 }}>
        {JSON.stringify(data, null, 2)}
      </pre>
      <p style={{ fontSize: 12, color: '#666' }}>
        Base: {API_BASE || '(env not set)'} | Route: /healthz
      </p>
    </main>
  );
}
