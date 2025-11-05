// app/(buyer)/layout.tsx
import { BuyerHeader } from '@/components/buyer/header';
import { BuyerNav } from '@/components/buyer/nav';

export default function BuyerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <BuyerHeader />
      <main className="flex-1">{children}</main>
    </div>
  );
}
