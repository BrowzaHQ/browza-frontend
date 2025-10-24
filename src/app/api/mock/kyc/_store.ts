import { KycItem } from '@/types/kyc';

// Naive module-level store; demo only.
function makeStore() {
  // @ts-ignore
  if (!globalThis.__KYC_STORE__) {
    // Seed once
    // @ts-ignore
    globalThis.__KYC_STORE__ = { DATA: [] as KycItem[], SEEDED: false };
  }
  // @ts-ignore
  const store = globalThis.__KYC_STORE__ as { DATA: KycItem[]; SEEDED: boolean };
  return store;
}

export const kycStore = makeStore();
