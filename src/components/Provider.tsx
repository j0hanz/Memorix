import { type ReactNode, useState } from 'react';

import { DELAYS } from '@/constants/constants';
import { CATEGORIES } from '@/constants/constants';
import { AuthContext } from '@/contexts/AuthContext';
import ErrorContext from '@/contexts/ErrorContext';
import { GameContext } from '@/contexts/GameContext';
import { ModalContext } from '@/contexts/ModalContext';
import { ToastContext } from '@/contexts/ToastContext';
import { useAuthProvider } from '@/hooks/useAuth';
import { useGameReducer } from '@/hooks/useGameReducer';
import type { AppError } from '@/types/api';
import type { AuthProviderProps } from '@/types/auth';
import type { ModalData, ModalType } from '@/types/context';
import type { GameProviderProps } from '@/types/context';
import { createAppError, logError } from '@/utils/errorUtils';

import Toast from './Toast';

// AuthProvider
export const AuthProvider = ({ children }: AuthProviderProps) => {
  const authState = useAuthProvider();
  return (
    <AuthContext.Provider value={authState}>{children}</AuthContext.Provider>
  );
};

// ErrorProvider
export function ErrorProvider({ children }: { children: ReactNode }) {
  const [error, setAppError] = useState<AppError | null>(null);

  const setError = (err: unknown, context?: string) => {
    const appError =
      err instanceof Error
        ? createAppError(err.message, { details: err })
        : createAppError(String(err));
    logError(err, context);
    setAppError(appError);
  };

  const clearError = () => {
    setAppError(null);
  };

  return (
    <ErrorContext.Provider value={{ error, setError, clearError }}>
      {children}
    </ErrorContext.Provider>
  );
}

// ModalProvider
export function ModalProvider({ children }: { children: ReactNode }) {
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const [modalData, setModalData] = useState<ModalData>({});

  const openModal = (type: ModalType, data: ModalData = {}) => {
    setActiveModal(type);
    setModalData(data);
  };

  const closeModal = () => {
    setActiveModal(null);
    setModalData({});
  };

  return (
    <ModalContext.Provider
      value={{
        activeModal,
        modalData,
        openModal,
        closeModal,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}

// ToastProvider
interface ToastProviderProps {
  children: ReactNode;
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

// GameProvider
export const GameProvider = ({
  children,
  onExit,
  selectedCategory = CATEGORIES.ANIMALS,
}: GameProviderProps): React.ReactElement => {
  const {
    state,
    dispatch,
    handleCardSelection,
    resetGameState,
    exitToMainMenu,
  } = useGameReducer(onExit, selectedCategory);

  return (
    <GameContext.Provider
      value={{
        ...state,
        dispatch,
        handleCardSelection,
        resetGameState,
        exitToMainMenu,
        selectedCategory,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
