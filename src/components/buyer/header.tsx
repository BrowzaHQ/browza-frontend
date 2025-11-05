// components/buyer/header.tsx
'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useBuyerStore } from '@/stores/buyer-store';
import { Plus } from 'lucide-react';
import BrowzaLogo from '../icons/BrowzaLogo';
import { BuyerNav } from './nav';

export function BuyerHeader() {
  const { orgName, orgAvatar, comName, userName, walletBalance, gbAvailable } = useBuyerStore();

  return (
    <header className="border-b-[0.8px] border-gray-200 bg-[#F8F9FA]">
      <div className="flex h-[72px] items-center justify-between px-6">
        {/* Left: Org Logo + Name + Subtitle */}
        <div className="flex items-center gap-2">
          <BrowzaLogo />
          <div className="flex flex-col">
            <div className="flex items-center gap-1">
              <h1 className="text-sm font-semibold text-gray-900">Browza</h1>
              <span className="text-sm font-medium text-gray-900">• Buyer</span>
            </div>
            <p className="text-xs text-gray-600">Enterprise Data Platform</p>
          </div>
        </div>

        <div className="hidden xl:block">
          <BuyerNav />
        </div>

        {/* Right: Balance + GB + User + Add Credits */}
        <div className="flex items-center gap-2">
          {/* Wallet Balance Box */}
          <div className="flex gap-2 rounded-md border border-black/20 p-1.5">
            <div className="flex flex-col items-end text-xs">
              <span className="font-semibold text-gray-900">
                ₹ {walletBalance?.toLocaleString('en-IN') ?? '0'}
              </span>
              <span className="text-gray-600">{gbAvailable ?? 0} GB available</span>
            </div>

            {/* Active Status */}
            <div className="flex items-center">
              <Badge variant="outline" className="gap-1 border-green-200 bg-green-50 px-2 py-0.5 text-xs font-medium text-green-700">
                <div className="h-1 w-1 rounded-full bg-green-400" />
                Active
              </Badge>
            </div>
          </div>

          {/* Add Credits Button */}
          <Button size="sm" className="gap-1.5 bg-gray-900 hover:bg-gray-800">
            <Plus className="h-3 w-3" />
            <span className="text-xs">Add Credits</span>
          </Button>

          {/* User Avatar + Name */}
          <div className="flex items-center gap-2 border-l border-gray-200 pl-2">
            <Avatar className="h-7 w-7">
              <AvatarImage src={orgAvatar} alt={userName} />
              <AvatarFallback className="bg-gray-200 text-xs">
                {userName.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="text-xs font-medium text-gray-900">{userName}</span>
              <span className="text-xs font-medium text-gray-500">{comName}</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
