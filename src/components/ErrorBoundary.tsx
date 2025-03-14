import React from 'react';
import { ErrorBoundary as ReactErrorBoundary, FallbackProps } from 'react-error-boundary';
import Button from './Button';

interface Props {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  onReset?: () => void;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
}

const ErrorFallback: React.FC<FallbackProps> = ({ error, resetErrorBoundary }) => (
  <div role="alert">
    <h2>Something went wrong.</h2>
    <pre style={{ color: 'red' }}>{error.message}</pre>
    <Button onClick={resetErrorBoundary}>Restart Game</Button>
  </div>
);

const ErrorBoundary: React.FC<Props> = ({ children, fallback, onReset, onError }) => {
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
