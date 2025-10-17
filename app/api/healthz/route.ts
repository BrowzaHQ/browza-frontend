import { NextResponse } from 'next/server';
export async function GET() {
  return NextResponse.json({
    ok: true,
    env: process.env.NEXT_PUBLIC_VERCEL_ENV || 'local',
    sha: (process.env.NEXT_PUBLIC_COMMIT_SHA || 'local').slice(0,7)
  });
}
