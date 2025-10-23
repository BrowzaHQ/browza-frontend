// src/hooks/useLogin.ts (new file)
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { loginUser, LoginCredentials } from '@/lib/api/auth';
import { setAuthToken } from '@/lib/auth';

export function useLogin() {
  const router = useRouter();

  return useMutation({
    mutationFn: (credentials: LoginCredentials) => loginUser(credentials),
    onSuccess: (data) => {
      // Store token in-memory
      setAuthToken(data.token);
      
      // Show appropriate success message
      const isMock = data.token.startsWith('MOCK_TOKEN_');
      
      if (isMock) {
        toast('⚠️ Login Successful (Mock Mode)', {
          duration: 5000,
          style: {
            background: '#fef3c7',
            color: '#92400e',
            border: '1px solid #fbbf24',
          },
        });
      } else {
        const message = data.user?.name ? `Welcome back, ${data.user.name}!` : 'Login successful!';
        toast.success(message);
      }
      
      // Redirect to protected route
      setTimeout(() => {
        router.push('/status');
      }, 500);
    },
    onError: (error: any) => {
      // Error already handled by global mutation cache
      console.error('Login error:', error);
    },
  });
}
