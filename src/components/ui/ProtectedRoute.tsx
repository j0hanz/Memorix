import { LoadingCardSpinner } from '@/components/ui/Spinner';
import { useRoute } from '@/hooks/auth/useRoute';
import type { ProtectedRouteProps } from '@/types/components';

export const ProtectedRoute = ({
  children,
  onAuthRequired,
}: ProtectedRouteProps) => {
  const { shouldShowLoading, shouldShowChildren } = useRoute({
    onAuthRequired,
  });

  if (shouldShowLoading) {
    return <LoadingCardSpinner isLoading={true} />;
  }

  return shouldShowChildren ? children : null;
};
