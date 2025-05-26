import type { LoadingCardSpinnerProps } from '@/types/components';

import styles from '../styles/Spinner.module.css';

export const LoadingCardSpinner = ({
  isLoading,
  message,
}: LoadingCardSpinnerProps) => {
  if (!isLoading) return null;

  return (
    <div className={styles.spinnerContainer} role="status" aria-live="polite">
      <div className={styles.loader} />
      {message && (
        <span className={styles.spinnerMessage} aria-label={message}>
          {message}
        </span>
      )}
    </div>
  );
};

export const LoadingSpinner = () => (
  <div className={styles.spinnerContainer}>
    <div className={styles.loadership_JWZDT} role="status" aria-label="Loading">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} />
      ))}
    </div>
  </div>
);
