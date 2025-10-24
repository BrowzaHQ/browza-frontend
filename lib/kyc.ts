import { KycListResponseSchema, KycItemSchema, KycItem, KycListResponse, KycStatusEnum } from '@/types/kyc';

export type ListParams = {
  page?: number;
  pageSize?: number;
  status?: 'pending' | 'approved' | 'rejected';
  q?: string;
};

export const kycKeys = {
  all: ['kyc'] as const,
  list: (p: ListParams) => ['kyc', p] as const,
  item: (id: string) => ['kyc', { id }] as const,
};

export async function listKyc(params: ListParams = {}): Promise<KycListResponse> {
  const sp = new URLSearchParams();
  if (params.page) sp.set('page', String(params.page));
  if (params.pageSize) sp.set('pageSize', String(params.pageSize));
  if (params.status) sp.set('status', params.status);
  if (params.q) sp.set('q', params.q);
  const url = `/api/mock/kyc${sp.toString() ? `?${sp.toString()}` : ''}`;

  const res = await fetch(url, { method: 'GET' });
  if (!res.ok) throw new Error(`List failed: ${res.status}`);
  const json = await res.json();
  return KycListResponseSchema.parse(json);
}

export async function approveKyc(id: string, reason?: string): Promise<KycItem> {
  const res = await fetch(`/api/mock/kyc/${id}/approve`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ reason }),
  });
  if (!res.ok) throw new Error(`Approve failed: ${res.status}`);
  return KycItemSchema.parse(await res.json());
}

export async function rejectKyc(id: string, reason: string): Promise<KycItem> {
  const res = await fetch(`/api/mock/kyc/${id}/reject`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ reason }),
  });
  if (!res.ok) throw new Error(`Reject failed: ${res.status}`);
  return KycItemSchema.parse(await res.json());
}
