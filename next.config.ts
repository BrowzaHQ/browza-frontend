/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Note: eslint.ignoreDuringBuilds option removed - deprecated in Next.js 16
  // ESLint 9 is now configured via eslint.config.mjs (flat config)
  // To skip ESLint during builds, use: SKIP_ENV_VALIDATION=1 or configure in CI
  images: {
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  env: {
    NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
    NEXT_PUBLIC_VERCEL_ENV: process.env.VERCEL_ENV || 'local',
    NEXT_PUBLIC_COMMIT_SHA: process.env.VERCEL_GIT_COMMIT_SHA || 'local'
  }
};

module.exports = nextConfig;
