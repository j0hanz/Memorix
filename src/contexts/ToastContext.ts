import { createContext } from 'react';

export interface ToastContextType {
  showToast: (message: string, duration?: number) => void;
  hideToast: () => void;
}

export const ToastContext = createContext<ToastContextType>({
  showToast: () => {
    // Default implementation does nothing
  },
  hideToast: () => {
    // Default implementation does nothing
  },
});

export default ToastContext;
