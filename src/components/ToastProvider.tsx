import { useState } from 'react';

import { DELAYS } from '@/constants/constants';
import { ToastContext } from '@/contexts/ToastContext';

import Toast from './Toast';

interface ToastProviderProps {
  children: React.ReactNode;
}

export function ToastProvider({ children }: ToastProviderProps) {
  const [toast, setToast] = useState<{
    message: string;
    show: boolean;
    duration: number;
  }>({
    message: '',
    show: false,
    duration: DELAYS.TOAST_DURATION,
  });

  function showToast(message: string, duration = DELAYS.TOAST_DURATION) {
    setToast({
      message,
      show: true,
      duration,
    });
  }

  function hideToast() {
    setToast((prev) => ({ ...prev, show: false }));
  }

  return (
    <ToastContext.Provider value={{ showToast, hideToast }}>
      {children}
      <Toast
        message={toast.message}
        show={toast.show}
        duration={toast.duration}
        onClose={hideToast}
      />
    </ToastContext.Provider>
  );
}

export default ToastProvider;
