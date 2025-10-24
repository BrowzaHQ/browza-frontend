import { z } from 'zod';

export const KycStatusEnum = z.enum(['pending', 'approved', 'rejected']);
export const KycDocTypeEnum = z.enum(['PAN', 'AADHAAR', 'PASSPORT']);

export const KycDocSchema = z.object({
  type: z.string(),
  url: z.string().url(),
});

export const KycItemSchema = z.object({
  id: z.string(),
  applicant: z.string(),
  email: z.string().email(),
  docType: KycDocTypeEnum,
  submittedAt: z.string(),
  status: KycStatusEnum,
  docs: z.array(KycDocSchema).default([]),
  notes: z.string().optional().default(''),
});

export type KycItem = z.infer<typeof KycItemSchema>;

export const KycListResponseSchema = z.object({
  items: z.array(KycItemSchema),
  page: z.number().int().min(1),
  pageSize: z.number().int().min(1),
  total: z.number().int().min(0),
  totalPages: z.number().int().min(1),
});

export type KycListResponse = z.infer<typeof KycListResponseSchema>;
