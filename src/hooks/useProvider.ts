import { useContext } from 'react';

import { AuthContext } from '@/contexts/AuthContext';
import ErrorContext from '@/contexts/ErrorContext';
import { ModalContext } from '@/contexts/ModalContext';
import { ToastContext } from '@/contexts/ToastContext';

// Auth context hook
export function useAuth() {
  const context = useContext(AuthContext);
  return context;
}

// Error context hook
export function useError() {
  const context = useContext(ErrorContext);
  if (context === undefined) {
    throw new Error('useError must be used within an ErrorProvider');
  }
  return context;
}

// Modal context hook
export function useModal() {
  return useContext(ModalContext);
}

// Toast context hook
export function useToast() {
  return useContext(ToastContext);
}
