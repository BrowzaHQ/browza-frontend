# Browza — Vercel Preview Playbook (₹0)

## Goal
Dev previews run on each engineer's **personal Vercel (Hobby)**. Production stays with Aditya later.

## Setup (one-time for a new engineer)
1) Make a **private personal copy** of `browza-frontend`:
   - If org allows: Fork (keep Private), else create a new Private repo and push code.
2) Create Vercel account (Hobby) → **Add New → Project → Import (GitHub)** → pick your repo.
3) Framework: Next.js (auto). Root: `./`. Leave build defaults.
4) **Env vars** (Vercel → Project → Settings → Environment Variables):
   - Add:
     - `NEXT_PUBLIC_API_BASE_URL` = *(staging API URL Aditya shares)*
     - `NEXT_PUBLIC_APP_ENV` = `preview`
     - (optional) `NEXT_PUBLIC_APP_VERSION` = your version string
5) Click **Deploy** → share the **.vercel.app** link.

## On every PR to BrowzaHQ
- Paste your **Vercel preview URL** in the PR body (required).
- Add a ≤2-min **Loom** if UI changes.
- The app shows a small **Preview banner** at the top (env/sha/API) to confirm your build.
- Visit **/api/healthz** on your preview to verify deploy.

## Rules
- Only use `NEXT_PUBLIC_*` envs in previews. **No secrets** in personal Vercel.
- Keep your repo **private**.
- If a preview breaks, redeploy from Vercel or re-push.

## Troubleshooting (quick)
- **Build fails**: Check Vercel build logs: missing `NEXT_PUBLIC_API_BASE_URL` is the most common.
- **Preview blank**: Verify `app/` or `pages/` exists and `next build` passes locally.
- **Auth errors**: Confirm API base URL points to the correct staging backend.
