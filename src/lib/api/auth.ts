// src/lib/api/auth.ts (new file)
import apiClient from '@/lib/apiClient';
import { AxiosError } from 'axios';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user?: {
    id: string;
    email: string;
    name?: string;
  };
}

const MOCK_ENABLED = process.env.NEXT_PUBLIC_ENABLE_MOCK === 'true';

export async function loginUser(credentials: LoginCredentials): Promise<LoginResponse> {
  try {
    const response = await apiClient.post<LoginResponse>('/auth/login', credentials);
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    
    // Fallback to mock if API is down AND mock is enabled
    if (MOCK_ENABLED && (axiosError.code === 'ECONNABORTED' || axiosError.message === 'Network Error')) {
      console.warn('⚠️ MOCK MODE: Using fake token (API unavailable)');
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      return {
        token: `MOCK_TOKEN_${Date.now()}_${credentials.email}`,
        user: {
          id: 'mock-user-id',
          email: credentials.email,
          name: 'Mock User',
        },
      };
    }
    
    throw error;
  }
}
