import { useEffect, useState } from 'react';

import { DELAYS } from '@/constants/constants';
import type { ToastProps } from '@/types/components';

import styles from './styles/Toast.module.css';

export function Toast({
  message,
  show,
  duration = DELAYS.TOAST_DURATION,
  placement = 'bottom',
  className = '',
  onClose,
}: ToastProps) {
  const [visible, setVisible] = useState(show);

  useEffect(() => {
    setVisible(show);
    if (show && duration > 0) {
      const timer = setTimeout(() => {
        setVisible(false);
        onClose?.();
      }, duration);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [show, duration, onClose]);

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

export default Toast;
