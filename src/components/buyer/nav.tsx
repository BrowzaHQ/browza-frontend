'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const navItems = [
  { label: 'Billing', href: '/billing' },
  { label: 'Create Job', href: '/create-job' },
  { label: 'Jobs', href: '/jobs' },
  { label: 'Logs', href: '/logs' },
  { label: 'Account', href: '/account' },
];

export function BuyerNav() {
  const pathname = usePathname();

  return (
    <nav className="h-[36px] border-2 rounded-xl border-gray-200 max-w-[672px] w-full  bg-gray-200">
      <div className="flex h-full  items-center justify-between gap-2 px-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex h-[29px] items-center rounded-xl px-6 text-sm font-medium transition-all',
                isActive
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-900 hover:bg-white/50 hover:text-gray-900'
              )}
            >
              {item.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
