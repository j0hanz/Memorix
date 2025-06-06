import styles from '@/components/styles/Toast.module.css';
import { DELAYS } from '@/constants/game';
import { useToastVisibility } from '@/hooks/ui/useToast';
import type { ToastProps } from '@/types/components';

export function Toast({
  message,
  show,
  duration = DELAYS.TOAST_DURATION,
  placement = 'top',
  className = '',
  onClose,
}: ToastProps) {
  const { visible } = useToastVisibility({
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
