// src/providers/QueryProvider.tsx (new file)
"use client";

import { QueryClient, QueryClientProvider, MutationCache } from '@tanstack/react-query';
import { ReactNode, useState } from 'react';
import toast from 'react-hot-toast';

export function QueryProvider({ children }: { children: ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        mutationCache: new MutationCache({
          onError: (error: any) => {
            // Global error handling for all mutations
            const message = error.response?.data?.message || error.message || 'An error occurred';
            toast.error(message);
          },
        }),
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
            retry: 1,
            refetchOnWindowFocus: false,
          },
        },
      })
  );

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
