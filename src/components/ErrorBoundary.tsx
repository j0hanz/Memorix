import type { FallbackProps } from 'react-error-boundary';
import { ErrorBoundary as ReactErrorBoundary } from 'react-error-boundary';

import type { ErrorBoundaryProps } from '@/types/components';

import Button from './Button';

const ErrorFallback: React.FC<FallbackProps> = ({
  error,
  resetErrorBoundary,
}) => (
  <div role="alert">
    <h2>Something went wrong.</h2>
    <pre style={{ color: 'red' }}>{error.message as string}</pre>
    <Button
      onClick={resetErrorBoundary}
      text="Restart Game"
      color="secondary"
    />
  </div>
);

const ErrorBoundary: React.FC<ErrorBoundaryProps> = ({
  children,
  fallback,
  onReset,
  onError,
}) => {
  if (fallback) {
    return (
      <ReactErrorBoundary
        fallback={<>{fallback}</>}
        onReset={onReset}
        onError={onError}
      >
        {children}
      </ReactErrorBoundary>
    );
  }

  return (
    <ReactErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={onReset}
      onError={onError}
    >
      {children}
    </ReactErrorBoundary>
  );
};

export default ErrorBoundary;
