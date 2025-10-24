Admin | KYC Review Queue (App Router)

What & Why

Implement /admin/kyc table, filters, pagination, row drawer, bulk actions.

Mock API for list + approve/reject; optimistic updates; resilient states.

How

File structure summary

Data flow (TanStack Query keys, invalidation)

a11y decisions (focus order, roles, labels)

Error/empty/loading handling

Any tradeoffs

Demo

Loom link

Checklists

 Types strict; no any

 Keyboard + screen reader pass

 Empty/error states shown

 README added

 Self-QA against Definition of Done

FAQ

Can I add more libs? Keep it lean. OK: shadcn/ui, lucide-react, zod, TanStack Query. Avoid heavy tables unless necessary.

Testing? Nice-to-have: a couple of RTL tests (drawer opens, approve flow calls handler). Not blocking for this starter.

What if preview fails? We have auto deployment enabled for vercel. Still if faield, Share the PR link; I’ll nudge Vercel. 

To get things done faster, what's app on - 7020209699
