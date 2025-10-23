# ADR-0001 — Data fetching & state management

- **Status:** Accepted — 2025-10-23  
- **Deciders:** Aditya (FE), Ankush (BE)  
- **Context:** We are building Buyer/Admin web apps on Next.js 15. We need a standard way to fetch server data (loading/error/retry/cache), keep UI state simple, and avoid premature global state. We will introduce Redux only when real cross-page global state clearly appears.

## Decision

1. **Server data via TanStack Query (React Query)**  
   - QueryClient at app root; normalized loading/error handling; cache + retries; invalidation on mutations.
2. **Local UI state in React** (`useState`, `useReducer`)  
   - Page/component-local; keep it simple.
3. **Defer Redux Toolkit**  
   - Do not add Redux now. Re-evaluate if/when a true global cross-page state emerges (e.g., complex multi-role auth/session, global notifications).
4. **API client wrapper**  
   - `apiClient` using `fetch` with `NEXT_PUBLIC_API_BASE_URL`, JSON helpers, auth header hook, error normalization, and toast on failures.

## Consequences

- Faster FE iteration, less boilerplate.
- Clear separation of **server data (TanStack Query)** vs **local UI state (React)**.
- Consistent error/loader patterns across pages.
- If a real global state appears later, we can introduce Redux without refactoring the whole app.

## Alternatives Considered

- **SWR:** small and simple, but we prefer TanStack Query’s mutations/invalidation.
- **Vanilla fetch + custom cache:** more code for less capability.
- **Redux Toolkit (RTK/RTK Query):** powerful, but premature for MVP; revisit when justified.

## Implementation Plan (Week 0/1)

1. Add `QueryProvider` and wrap it in root layout.  
2. Add `lib/apiClient.ts` with base URL, JSON helpers, error normalization.  
3. Refactor `/status` page to use `useQuery` and show Loading/OK/Error + Retry.  
4. README updates + Quickstart.  
5. Keep Redux **out** until a cross-page global state appears.

## Related

- Issues: #12 (status page), #14 (infra/api client), #20 (status route PR)
