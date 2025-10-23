# Browza Frontend (Next.js)

## Quick Start
- Node 20+, pnpm recommended.
- Install: `pnpm install`
- Dev: `pnpm dev` → http://localhost:3000
- Build: `pnpm build`
- Start: `pnpm start`

## Branching & PRs
- Branch names: `feat/<short>`, `fix/<short>`, `chore/<short>`
- Squash-merge only.

## Folders
- `/src/app` (routes)
- `/src/components` (UI)
- `/src/lib` (utils)
- `/src/styles` (globals.css)

## Architecture Decision Records
We document decisions in `docs/adr/`.

## Architecture Decision Records

- [ADR-0001 — Data fetching & state management](docs/adr/0001-data-fetching-and-state.md)


- **ADR-0001 — Data Fetching & State Mgmt**  
  Server data via **TanStack Query**; local UI state with React; **defer Redux** until a real cross-page global state emerges.  
  See `docs/adr/0001-data-fetching-and-state.md`.

## Architecture Decision Records
We document decisions in `docs/adr/`.

- **ADR-0001 — Data Fetching & State Mgmt**  
  Server data via **TanStack Query**; local UI state with React; **defer Redux** until a real cross-page global state emerges.  
  See `docs/adr/0001-data-fetching-and-state.md`.
