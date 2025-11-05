import { z } from 'zod';

export const INDIAN_STATES = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar',
  'Chhattisgarh', 'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh',
  'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh',
  'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland',
  'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
  'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand',
  'West Bengal', 'Jammu & Kashmir', 'Delhi', 'Puducherry',
  'Chandigarh', 'Ladakh', 'Lakshadweep', 'Andaman and Nicobar Islands',
  'Dadra and Nagar Haveli and Daman and Diu'
] as const;

export const orgProfileSchema = z.object({
  name: z.string()
    .min(2, 'Legal Entity Name must be at least 2 characters')
    .max(120, 'Legal Entity Name cannot exceed 120 characters'),
  
  gstin: z.string()
    .length(15, 'GSTIN must be exactly 15 characters')
    .regex(
      /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/,
      'Invalid GSTIN format'
    )
    .transform(val => val.toUpperCase()),
  
  address1: z.string().min(1, 'Registered Address is required'),
  address2: z.string().optional(),
  
  city: z.string().min(1, 'City is required'),
  
  state: z.enum(INDIAN_STATES).describe('State selection'),
  
  pin: z.string()
    .regex(/^[1-9][0-9]{5}$/, 'PIN must be 6 digits starting with 1-9'),
  
  phone: z.string()
    .regex(/^\+?[0-9\- ]{8,15}$/, 'Invalid phone format')
    .optional()
    .or(z.literal('')),
  
  website: z.string()
    .refine(
      val => !val || val.startsWith('https://'),
      'Website must start with https://'
    )
    .optional()
    .or(z.literal(''))
});

export type OrgProfileFormData = z.infer<typeof orgProfileSchema>;
