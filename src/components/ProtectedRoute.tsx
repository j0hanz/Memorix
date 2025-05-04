import { useEffect } from 'react';

import { LoadingCardSpinner } from '@/components/Spinner';
import { useAuth } from '@/hooks/useAuth';
import type { ProtectedRouteProps } from '@/types/components';

const ProtectedRoute = ({ children, onAuthRequired }: ProtectedRouteProps) => {
  const { isAuthenticated, loading } = useAuth();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      onAuthRequired();
    }
  }, [loading, isAuthenticated, onAuthRequired]);

  if (loading) return <LoadingCardSpinner isLoading={true} />;

  return isAuthenticated ? { children } : null;
};

export default ProtectedRoute;
