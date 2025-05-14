import { DELAYS } from '@/constants/constants';
import { useToast } from '@/hooks/useToast';
import type { ToastProps } from '@/types/components';

import styles from './styles/Toast.module.css';

export function Toast({
  message,
  show,
  duration = DELAYS.TOAST_DURATION,
  placement = 'top',
  className = '',
  onClose,
}: ToastProps) {
  const { visible } = useToast({
    show,
    duration,
    onClose,
  });

  if (!visible) return null;

  return (
    <div
      className={`${styles.toast} ${styles[placement]} ${className}`}
      role="status"
      aria-live="polite"
    >
      {message}
    </div>
  );
}
