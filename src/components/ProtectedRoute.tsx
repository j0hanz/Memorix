import { useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import LoadingSpinner from '@/components/Spinner';
import { ProtectedRouteProps } from '@/types/components';

const ProtectedRoute = ({ children, onAuthRequired }: ProtectedRouteProps) => {
  const { isAuthenticated, loading } = useAuth();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      onAuthRequired();
    }
  }, [loading, isAuthenticated, onAuthRequired]);

  if (loading) return <LoadingSpinner isLoading />;

  return isAuthenticated ? <>{children}</> : null;
};

export default ProtectedRoute;
