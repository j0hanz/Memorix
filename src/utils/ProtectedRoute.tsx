import { ReactNode, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import LoadingSpinner from '@/components/Spinner';

interface ProtectedRouteProps {
  children: ReactNode;
  onAuthRequired: () => void;
}

const ProtectedRoute = ({ children, onAuthRequired }: ProtectedRouteProps) => {
  const { isAuthenticated, loading } = useAuth();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      onAuthRequired();
    }
  }, [loading, isAuthenticated, onAuthRequired]);

  if (loading) {
    return <LoadingSpinner isLoading={true} />;
  }

  return isAuthenticated ? <>{children}</> : null;
};

export default ProtectedRoute;
