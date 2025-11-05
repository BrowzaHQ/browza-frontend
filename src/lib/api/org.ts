import { OrgProfileFormData } from '@/lib/validators/org';

// API Response Type (what the backend returns)
export interface OrgResponse {
  success: boolean;
  data?: {
    name: string;
    gstin: string;
    address1: string;
    address2?: string;
    city: string;
    state: string; // Plain string from API
    pin: string;
    phone?: string;
    website?: string;
    createdAt: string;
    updatedAt: string;
  };
  error?: {
    code: string;
    message: string;
    field?: string;
  };
}

export async function getOrg(token: string): Promise<OrgResponse> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/org`, {
    headers: { 
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    cache: 'no-store'
  });
  
  if (res.status === 401) {
    throw new Error('UNAUTHORIZED');
  }
  
  return res.json();
}

export async function updateOrg(
  token: string, 
  data: Partial<OrgProfileFormData>
): Promise<OrgResponse> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/org`, {
    method: 'PUT',
    headers: { 
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
  
  if (res.status === 401) {
    throw new Error('UNAUTHORIZED');
  }
  
  return res.json();
}
