import type { LoadingCardSpinnerProps } from '@/types/components';

import styles from './styles/Spinner.module.css';

const LoadingCardSpinner = ({
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

const LoadingSpinner = () => (
  <div className={styles.loadership_JWZDT} role="status" aria-label="Loading">
    {Array.from({ length: 5 }).map((_, i) => (
      <div key={i} />
    ))}
  </div>
);

export { LoadingCardSpinner, LoadingSpinner };
