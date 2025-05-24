import { type ReactNode } from 'react';

import { CATEGORIES } from '@/constants/game';
import { AuthContext } from '@/contexts/AuthContext';
import { ErrorContext } from '@/contexts/ErrorContext';
import { GameContext } from '@/contexts/GameContext';
import { ModalContext } from '@/contexts/ModalContext';
import { NavigationContext } from '@/contexts/NavigationContext';
import { ProfileContext } from '@/contexts/ProfileContext';
import { SoundContext } from '@/contexts/SoundContext';
import { ToastContext } from '@/contexts/ToastContext';
import { useAuthProvider } from '@/hooks/useAuth';
import { useErrorHandler } from '@/hooks/useError';
import { useGame } from '@/hooks/useGame';
import { useModalHandler } from '@/hooks/useModal';
import { useNavigationHandler } from '@/hooks/useNavigation';
import { useProfile } from '@/hooks/useProfile';
import { useSoundHandler } from '@/hooks/useSound';
import { useToastHandler } from '@/hooks/useToast';
import type { AuthProviderProps, GameProviderProps } from '@/types/components';

import { Toast } from './Toast';

export function ProfileProvider({ children }: { children: ReactNode }) {
  const profileState = useProfile();

  return (
    <ProfileContext.Provider value={profileState}>
      {children}
    </ProfileContext.Provider>
  );
}

// AuthProvider
export const AuthProvider = ({ children }: AuthProviderProps) => {
  const authState = useAuthProvider();
  return (
    <AuthContext.Provider value={authState}>{children}</AuthContext.Provider>
  );
};

// ErrorProvider
export function ErrorProvider({ children }: { children: ReactNode }) {
  const errorState = useErrorHandler();

  return (
    <ErrorContext.Provider value={errorState}>{children}</ErrorContext.Provider>
  );
}

// ModalProvider
export function ModalProvider({ children }: { children: ReactNode }) {
  const modalState = useModalHandler();

  return (
    <ModalContext.Provider value={modalState}>{children}</ModalContext.Provider>
  );
}

// SoundProvider
interface SoundProviderProps {
  children: ReactNode;
}

export function SoundProvider({ children }: SoundProviderProps) {
  const soundState = useSoundHandler();

  return (
    <SoundContext.Provider value={soundState}>{children}</SoundContext.Provider>
  );
}

// ToastProvider
interface ToastProviderProps {
  children: ReactNode;
}

export function ToastProvider({ children }: ToastProviderProps) {
  const { toast, showToast, hideToast } = useToastHandler();

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

// NavigationProvider
export function NavigationProvider({ children }: { children: ReactNode }) {
  const navigationState = useNavigationHandler();

  return (
    <NavigationContext.Provider value={navigationState}>
      {children}
    </NavigationContext.Provider>
  );
}

// GameProvider
export const GameProvider = ({
  children,
  onExit,
  selectedCategory = CATEGORIES.ANIMALS,
}: GameProviderProps): React.ReactElement => {
  const gameState = useGame(onExit, selectedCategory);

  return (
    <GameContext.Provider
      value={{
        ...gameState,
        selectedCategory,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
