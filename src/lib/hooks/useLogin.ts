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
      setAuthToken(data.token);
      
      const isMock = data.token.startsWith('MOCK_TOKEN_');
      if (isMock) {
        toast('⚠️ Login Successful (Mock Mode)', {
          duration: 5000,
          style: { background: '#fef3c7', color: '#92400e' },
        });
      } else {
        toast.success(data.user?.name ? `Welcome back, ${data.user.name}!` : 'Login successful!');
      }
      
      setTimeout(() => router.push('/status'), 500);
    },
  });
}
