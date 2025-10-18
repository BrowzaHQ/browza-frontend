/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Skip ESLint during Vercel builds for now
  eslint: { ignoreDuringBuilds: true },
  env: {
    NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
    NEXT_PUBLIC_VERCEL_ENV: process.env.VERCEL_ENV || 'local',
    NEXT_PUBLIC_COMMIT_SHA: process.env.VERCEL_GIT_COMMIT_SHA || 'local'
  }
};

module.exports = nextConfig;
