import RestartAltIcon from '@mui/icons-material/RestartAlt';
import type { FallbackProps } from 'react-error-boundary';
import { ErrorBoundary as ReactErrorBoundary } from 'react-error-boundary';

import Button from '@/components/Button';
import ErrorData from '@/components/ErrorData';
import { Modal } from '@/components/Modal';
import type { ErrorBoundaryProps } from '@/types/components';
import { logError } from '@/utils/errorUtils';

const ErrorFallback: React.FC<FallbackProps> = ({
  error,
  resetErrorBoundary,
}) => {
  const errorObj = error instanceof Error ? error : new Error(String(error));
  const footer = (
    <Button
      onClick={resetErrorBoundary}
      text="Restart Application"
      color="secondary"
      className="modalButton"
      icon={<RestartAltIcon fontSize="small" />}
    />
  );

  return (
    <Modal
      show={true}
      onClose={() => {}}
      title="Application Error"
      backdrop="static"
      centered={true}
      className="errorModal"
      footer={footer}
    >
      <ErrorData error={errorObj} />
    </Modal>
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
