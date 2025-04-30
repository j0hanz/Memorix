import type { LoadingCardSpinnerProps } from '@/types/components';
import styles from './styles/Spinner.module.css';

// This component is used to show a loading spinner with an optional message.
interface SpinnerProps extends LoadingCardSpinnerProps {
  message?: string;
}

const LoadingCardSpinner = ({ isLoading, message }: SpinnerProps) => (
  <div
    className={`${styles.spinnerContainer} ${!isLoading ? styles.hidden : ''}`}
    role="status"
    aria-live="polite"
  >
    <div className={styles.loader} />
    {message && <div className={styles.spinnerMessage}>{message}</div>}
  </div>
);

const LoadingSpinner = () => (
  <div className={styles.loadership_JWZDT} role="status" aria-label="Loading">
    <div />
    <div />
    <div />
    <div />
  </div>
);

export { LoadingCardSpinner, LoadingSpinner };
