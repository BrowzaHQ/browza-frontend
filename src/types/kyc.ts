// src/types/kyc.ts
import { z } from 'zod';

/** Unified status enum used by UI and mock APIs */
export const KycStatusEnum = z.enum(['pending', 'approved', 'rejected']);
export type KycStatus = z.infer<typeof KycStatusEnum>;

/** Common shapes used by mock routes */
export const KycIdSchema = z.object({
  id: z.string().min(1), // accept uuid or any string id the UI uses
});

export const KycApproveSchema = z.object({
  id: z.string().min(1),
  reason: z.string().optional(),
});

export const KycRejectSchema = z.object({
  id: z.string().min(1),
  reason: z.string().min(1).optional(),
});

export const KycDecisionSchema = z.object({
  id: z.string().min(1),
  decision: z.enum(['approve', 'reject']),
  reason: z.string().optional(),
});
export type KycDecision = z.infer<typeof KycDecisionSchema>;

/** Record shape useful for lists/status endpoints */
export type KycRecord = {
  id: string;
  status: KycStatus;
  reason?: string | null;
  updatedAt: string; // ISO timestamp
};

/** Helper for mocks */
export const nowIso = () => new Date().toISOString();
