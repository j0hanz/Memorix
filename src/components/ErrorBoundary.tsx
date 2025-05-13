import { useEffect } from 'react';
import type { FallbackProps } from 'react-error-boundary';
import { ErrorBoundary as ReactErrorBoundary } from 'react-error-boundary';

import type { ErrorBoundaryProps } from '@/types/components';
import { getUserFriendlyMessage, logError } from '@/utils/errorUtils';

import Button from './Button';

const ErrorFallback: React.FC<FallbackProps> = ({
  error,
  resetErrorBoundary,
}) => {
  // Get a user-friendly message
  const friendlyMessage = getUserFriendlyMessage(error);

  // Log the error
  useEffect(() => {
    logError(error, 'ErrorBoundary', 'error');
  }, [error]);

  return (
    <div role="alert">
      <h2>Something went wrong</h2>
      {friendlyMessage}
      {process.env.NODE_ENV === 'development' &&
        (error instanceof Error ? error.message : String(error))}
      <Button
        onClick={resetErrorBoundary}
        text="Restart Game"
        color="secondary"
      />
    </div>
  );
};

const ErrorBoundary: React.FC<ErrorBoundaryProps> = ({
  children,
  fallback,
  onReset,
  onError,
}) => {
  const handleError = (error: Error, info: React.ErrorInfo) => {
    logError(error, 'ErrorBoundary', 'critical');
    if (onError) {
      onError(error, info);
    }
  };

  if (fallback) {
    return (
      <ReactErrorBoundary
        fallback={fallback}
        onReset={onReset}
        onError={handleError}
      >
        {children}
      </ReactErrorBoundary>
    );
  }

  return (
    <ReactErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={onReset}
      onError={handleError}
    >
      {children}
    </ReactErrorBoundary>
  );
};

export default ErrorBoundary;
