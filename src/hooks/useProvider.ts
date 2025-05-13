import { useContext } from 'react';

import { AuthContext } from '@/contexts/AuthContext';
import ErrorContext from '@/contexts/ErrorContext';
import { ModalContext } from '@/contexts/ModalContext';
import { NavigationContext } from '@/contexts/NavigationContext';
import { SoundContext } from '@/contexts/SoundContext';
import { ToastContext } from '@/contexts/ToastContext';

// Auth context hook
export function useAuth() {
  const context = useContext(AuthContext);
  return context;
}

export function useNavigation() {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
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

// Sound context hook
export function useSound() {
  return useContext(SoundContext);
}

// Toast context hook
export function useToast() {
  return useContext(ToastContext);
}
