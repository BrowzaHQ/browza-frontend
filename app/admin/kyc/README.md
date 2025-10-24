# Admin → KYC Review Queue (Mock)

This feature is intentionally wired to **mock APIs** under `/api/mock/kyc/*` so that
PR previews from forks can deploy on Vercel **without** accessing real services or secrets.

## UX & a11y
- Keyboard: Tab → Enter opens drawer, Esc closes, focus is managed.
- States: loading, empty, error; optimistic approve/reject with undo.
- Bulk actions confirm with reason; individual actions capture reason inline.

## Data
- App Router **Route Handlers** simulate list/approve/reject with in-memory data.
- Persistence is **not** guaranteed across serverless executions; this is demo-only.
- Types and schema live in `types/kyc.ts`. Fetchers in `lib/kyc.ts`.

## Env
- Use `.env.example` as a template. Do not commit real secrets.
- `NEXT_PUBLIC_FEATURE_KYC_MOCK=true` can be read in UI if you want to display a “Mock Mode” badge.

## Hardening
- No absolute URLs, no SDKs, no `process.env` usage in fetchers for this page.
- Keep this feature self-contained for safe external PR previews.
