import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import { useEffect } from 'react';

import styles from '@/components/styles/Modal.module.css';
import type { ErrorDataProps } from '@/types/components';
import { getUserFriendlyMessage, logError } from '@/utils/errorUtils';

export default function ErrorData({ error }: ErrorDataProps) {
  // Get a user-friendly message
  const friendlyMessage = getUserFriendlyMessage(error);
  // Get the raw error message
  const rawMessage = error instanceof Error ? error.message : String(error);

  // Log the error
  useEffect(() => {
    logError(error, 'ErrorBoundary', 'error');
  }, [error]);

  return (
    <>
      <div
        className={`d-flex flex-column align-items-center ${styles.bottomBorder}`}
      >
        <WarningAmberIcon className={styles.errorIcon} />
      </div>
      <div className={styles.errorMessage}>
        <PlayArrowIcon className={styles.errorArrowIcon} fontSize="small" />
        {friendlyMessage}
        {process.env.NODE_ENV === 'development' &&
          rawMessage !== friendlyMessage && (
            <small className={styles.errorDetails}>{rawMessage}</small>
          )}
      </div>
    </>
  );
}
