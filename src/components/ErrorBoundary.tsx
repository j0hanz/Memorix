import RestartAltIcon from '@mui/icons-material/RestartAlt';
import { Modal } from 'react-bootstrap';
import type { FallbackProps } from 'react-error-boundary';
import { ErrorBoundary as ReactErrorBoundary } from 'react-error-boundary';

import Button from '@/components/Button';
import ErrorData from '@/components/ErrorData';
import type { ErrorBoundaryProps } from '@/types/components';
import { logError } from '@/utils/errorUtils';

import styles from './styles/Modal.module.css';

const ErrorFallback: React.FC<FallbackProps> = ({
  error,
  resetErrorBoundary,
}) => {
  const errorObj = error instanceof Error ? error : new Error(String(error));
  return (
    <Modal
      show={true}
      backdrop="static"
      centered={true}
      animation={false}
      className={`${styles.modal} ${styles.errorModal}`}
    >
      <Modal.Header className="border-0 d-flex justify-content-center">
        <Modal.Title>Application Error</Modal.Title>
      </Modal.Header>
      <Modal.Body className="p-0">
        <ErrorData error={errorObj} />
      </Modal.Body>
      <Modal.Footer className="border-0">
        <Button
          onClick={resetErrorBoundary}
          text="Restart Application"
          color="secondary"
          className={`${styles.closeButtonSolo} ${styles.modalButton}`}
          icon={<RestartAltIcon fontSize="small" />}
        />
      </Modal.Footer>
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
