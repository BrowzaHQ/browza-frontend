// app/(buyer)/billing/page.tsx
import { lazy, Suspense } from 'react';

const BillingContent = lazy(() => import('@/components/buyer/billing-content'));

export default function BillingPage() {
  return (
    <Suspense fallback={<div className="p-6">Loading...</div>}>
      <BillingContent />
    </Suspense>
  );
}
