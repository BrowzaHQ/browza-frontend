'use client';
export default function PreviewBanner() {
  if (process.env.NEXT_PUBLIC_VERCEL_ENV === 'production') return null;
  const env = process.env.NEXT_PUBLIC_VERCEL_ENV || 'local';
  const sha = (process.env.NEXT_PUBLIC_COMMIT_SHA || 'local').slice(0,7);
  const api = process.env.NEXT_PUBLIC_API_BASE_URL || 'not-set';
  return (
    <div style={{
      fontSize: 12, padding: '6px 10px', background: '#111',
      color: '#fff', position: 'sticky', top: 0, zIndex: 50
    }}>
      <strong>Preview</strong> • env: {env} • sha: {sha} • API: {api}
    </div>
  );
}
