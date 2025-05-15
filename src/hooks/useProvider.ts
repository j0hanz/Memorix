import { useContext } from 'react';

import { AuthContext } from '@/contexts/AuthContext';
import { ErrorContext } from '@/contexts/ErrorContext';
import { ModalContext } from '@/contexts/ModalContext';
import { NavigationContext } from '@/contexts/NavigationContext';
import { ProfileContext } from '@/contexts/ProfileContext';
import { SoundContext } from '@/contexts/SoundContext';
import { ToastContext } from '@/contexts/ToastContext';

// Profile context hook
export function useProfile() {
  const context = useContext(ProfileContext);
  if (context === undefined) {
    throw new Error('useProfile must be used within a ProfileProvider');
  }
  return context;
}

// Auth context hook
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
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
