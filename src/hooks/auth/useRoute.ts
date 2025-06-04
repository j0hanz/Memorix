import { useEffect } from 'react';

import { useAuth } from '@/hooks/shared/useProvider';

export interface UseRouteOptions {
  onAuthRequired: () => void;
}

export function useRoute({ onAuthRequired }: UseRouteOptions) {
  const { isAuthenticated, loading } = useAuth();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      onAuthRequired();
    }
  }, [loading, isAuthenticated, onAuthRequired]);

  return {
    isAuthenticated,
    loading,
    shouldShowChildren: isAuthenticated,
    shouldShowLoading: loading,
  };
}
