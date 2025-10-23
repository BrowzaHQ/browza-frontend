// src/lib/apiClient.ts (enhanced version)
import axios, { AxiosError } from 'axios';
import { getAuthToken } from './auth';

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  timeout: 10000,
});

// Request interceptor to attach Authorization header
apiClient.interceptors.request.use(
  (config) => {
    const token = getAuthToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for network error detection
apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.code === 'ECONNABORTED' || error.message === 'Network Error') {
      console.warn(' API unavailable:', error.message);
    }
    return Promise.reject(error);
  }
);

export default apiClient;
