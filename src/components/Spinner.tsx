import styles from './styles/Spinner.module.css';
import { LoadingSpinnerProps } from '@/types/components';

// Display loading spinner based on isLoading prop
const LoadingSpinner = ({ isLoading }: LoadingSpinnerProps) => (
  <div
    className={`${styles.spinnerContainer} ${!isLoading ? styles.hidden : ''}`}
  >
    <div className={styles.loader} />
  </div>
);

export default LoadingSpinner;
