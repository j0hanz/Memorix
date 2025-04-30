import type { LoadingSpinnerProps } from '@/types/components';
import styles from './styles/Spinner.module.css';

// LoadingSpinner component to show a loading spinner with an optional message
interface SpinnerProps extends LoadingSpinnerProps {
  message?: string;
}

const LoadingSpinner = ({ isLoading, message }: SpinnerProps) => (
  <div
    className={`${styles.spinnerContainer} ${!isLoading ? styles.hidden : ''}`}
    role="status"
    aria-live="polite"
  >
    <div className={styles.loader} />
    {message && <div className={styles.spinnerMessage}>{message}</div>}
  </div>
);

export default LoadingSpinner;
