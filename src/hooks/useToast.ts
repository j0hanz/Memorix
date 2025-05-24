import { useEffect, useState } from 'react';

import { DELAYS } from '@/constants/game';
import type { ToastHandlerReturn, ToastVisibilityProps } from '@/types/hooks';

// For individual toast components (existing functionality)
export function useToastVisibility({
  show,
  duration = 0,
  onClose,
}: ToastVisibilityProps) {
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

  return { visible };
}

// Toast state handler for provider
export function useToastHandler(): ToastHandlerReturn {
  const [toast, setToast] = useState<{
    message: string;
    show: boolean;
    duration: number;
  }>({
    message: '',
    show: false,
    duration: DELAYS.TOAST_DURATION,
  });

  const showToast = (message: string, duration = DELAYS.TOAST_DURATION) => {
    setToast({
      message,
      show: true,
      duration,
    });
  };

  const hideToast = () => {
    setToast((prev) => ({ ...prev, show: false }));
  };

  return {
    toast,
    showToast,
    hideToast,
  };
}
