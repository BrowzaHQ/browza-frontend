// stores/buyer-store.ts
import { create } from 'zustand';

interface BuyerStore {
  orgName: string;
  orgAvatar: string;
  userName: string;
  comName: string;
  walletBalance: number;
  gbAvailable: string;
  setWalletBalance: (balance: number) => void;
  setGbAvailable: (gb: string) => void;
}

export const useBuyerStore = create<BuyerStore>((set) => ({
  orgName: 'Browza',
  orgAvatar: '/avatars/user.png',
  userName: 'Rahul Sharma',
  comName:"TechCorp Solutions",
  walletBalance: 2500,
  gbAvailable: '178',
  setWalletBalance: (balance) => set({ walletBalance: balance }),
  setGbAvailable: (gb) => set({ gbAvailable: gb }),
}));
