import { useEffect } from 'react';

import { LoadingCardSpinner } from '@/components/Spinner';
import { useAuth } from '@/hooks/useProvider';
import type { ProtectedRouteProps } from '@/types/components';

export const ProtectedRoute = ({
  children,
  onAuthRequired,
}: ProtectedRouteProps) => {
  const { isAuthenticated, loading } = useAuth();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      onAuthRequired();
    }
  }, [loading, isAuthenticated, onAuthRequired]);

  if (loading) return <LoadingCardSpinner isLoading={true} />;

  return isAuthenticated ? children : null;
};
