import { useEffect } from 'react';

import styles from '@/components/modals/styles/Modal.module.css';
import type { ErrorDataProps } from '@/types/components';
import { getUserFriendlyMessage, logError } from '@/utils/shared/errorUtils';
import { AUTH_ICONS, MODAL_ICONS } from '@/utils/ui/iconUtils';

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
        {AUTH_ICONS.warningLarge(styles.errorIcon)}
      </div>
      <div className={styles.errorMessage}>
        {MODAL_ICONS.play(styles.errorArrowIcon)}
        {friendlyMessage}
        {process.env.NODE_ENV === 'development' &&
          rawMessage !== friendlyMessage && (
            <small className={styles.errorDetails}>{rawMessage}</small>
          )}
      </div>
    </>
  );
}
