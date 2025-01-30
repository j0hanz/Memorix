import styles from './styles/Spinner.module.css';

interface LoadingSpinnerProps {
  isLoading: boolean;
}

// Display loading spinner based on isLoading prop
const LoadingSpinner = ({ isLoading }: LoadingSpinnerProps) => (
  <div
    className={`${styles.spinnerContainer} ${!isLoading ? styles.hidden : ''}`}
  >
    <div className={styles.loader}></div>
  </div>
);

export default LoadingSpinner;
