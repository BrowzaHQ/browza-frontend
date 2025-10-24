// src/types/kyc.ts
import { z } from "zod";

/** Status enum shared by UI and mock API */
export const KycStatusEnum = z.enum(["pending", "approved", "rejected"]);
export type KycStatus = z.infer<typeof KycStatusEnum>;

/** Common ID payload */
export const KycIdSchema = z.object({
  id: z.string().min(1),
});

/** Item shape used in lists and detail */
export const KycItemSchema = z.object({
  id: z.string().min(1),
  status: KycStatusEnum,
  reason: z.string().nullish(),
  updatedAt: z.string(), // ISO timestamp
});
export type KycItem = z.infer<typeof KycItemSchema>;

/** Paginated list response */
export const KycListResponseSchema = z.object({
  items: z.array(KycItemSchema),
  page: z.number().int().nonnegative().default(1),
  pageSize: z.number().int().positive().default(20),
  total: z.number().int().nonnegative().default(0),
});
export type KycListResponse = z.infer<typeof KycListResponseSchema>;

/** Approve / Reject inputs */
export const KycApproveSchema = z.object({
  id: z.string().min(1),
  reason: z.string().optional(),
});
export const KycRejectSchema = z.object({
  id: z.string().min(1),
  reason: z.string().min(1).optional(),
});

/** Generic decision helper */
export const KycDecisionSchema = z.object({
  id: z.string().min(1),
  decision: z.enum(["approve", "reject"]),
  reason: z.string().optional(),
});
export type KycDecision = z.infer<typeof KycDecisionSchema>;

/** Small util used in mocks */
export const nowIso = () => new Date().toISOString();
