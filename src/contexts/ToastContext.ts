import { createContext } from 'react';

import type { ToastContextType } from '@/types/context';

export const ToastContext = createContext<ToastContextType>({
  showToast: () => {
    // Default implementation does nothing
  },
  hideToast: () => {
    // Default implementation does nothing
  },
});
