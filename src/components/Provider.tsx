import { type ReactNode, useState } from 'react';
import useSound from 'use-sound';

import { CATEGORIES, DELAYS, GAME_CONFIG } from '@/constants/constants';
import type { SoundKey } from '@/constants/sounds';
import { SOUND_FILES } from '@/constants/sounds';
import { AuthContext } from '@/contexts/AuthContext';
import ErrorContext from '@/contexts/ErrorContext';
import { GameContext } from '@/contexts/GameContext';
import { ModalContext } from '@/contexts/ModalContext';
import { NavigationContext } from '@/contexts/NavigationContext';
import { SoundContext } from '@/contexts/SoundContext';
import { ToastContext } from '@/contexts/ToastContext';
import { useAppState } from '@/hooks/useAppState';
import { useAuthProvider } from '@/hooks/useAuth';
import { useGameReducer } from '@/hooks/useGameReducer';
import { useModal } from '@/hooks/useModal';
import type { AppError } from '@/types/api';
import type { AuthProviderProps } from '@/types/auth';
import type { ModalData, ModalType } from '@/types/context';
import type { GameProviderProps } from '@/types/context';
import { createAppError, logError } from '@/utils/errorUtils';
import {
  playSoundEffect,
  type SoundMapType,
  useSoundState,
} from '@/utils/soundUtils';

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

// SoundProvider
interface SoundProviderProps {
  children: ReactNode;
}

export function SoundProvider({ children }: SoundProviderProps) {
  const { isMuted, toggleMute, setMuteState } = useSoundState();

  const [playButton] = useSound(SOUND_FILES.button, {
    volume: 1.0,
    soundEnabled: !isMuted,
  });
  const [playClick] = useSound(SOUND_FILES.click, {
    volume: 1.0,
    soundEnabled: !isMuted,
  });
  const [playComplete] = useSound(SOUND_FILES.complete, {
    volume: 1.0,
    soundEnabled: !isMuted,
  });
  const [playCorrect] = useSound(SOUND_FILES.correct, {
    volume: 1.0,
    soundEnabled: !isMuted,
  });
  const [playWrong] = useSound(SOUND_FILES.wrong, {
    volume: 1.0,
    soundEnabled: !isMuted,
  });

  const soundMap: SoundMapType = {
    button: playButton,
    click: playClick,
    complete: playComplete,
    correct: playCorrect,
    wrong: playWrong,
  };

  function playSound(soundKey: SoundKey): void {
    playSoundEffect(soundMap, soundKey, isMuted);
  }

  return (
    <SoundContext.Provider
      value={{
        isMuted,
        playSound,
        toggleMute,
        setMuteState,
      }}
    >
      {children}
    </SoundContext.Provider>
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

// NavigationProvider
export function NavigationProvider({ children }: { children: ReactNode }) {
  const {
    setIsGameActive,
    setSelectedCategory,
    setLoading,
    isGameActive,
    loading,
    selectedCategory,
  } = useAppState();
  const { logout, isAuthenticated } = useAuthProvider();
  const { openModal, closeModal } = useModal();
  const [showLeaderboardModal, setShowLeaderboardModal] = useState(false);

  function showLoadingWithMessage(
    message: string,
    type: string,
    callback?: () => void,
  ) {
    setLoading({ isLoading: true, message, type });
    setTimeout(() => {
      setLoading({ isLoading: false, message: '', type: '' });
      if (callback) callback();
    }, GAME_CONFIG.LOADING_DELAY);
  }

  function handleSelectCategory(category: string) {
    setSelectedCategory(category);
    closeModal();
    showLoadingWithMessage('Starting...', 'start', () => {
      setIsGameActive(true);
    });
  }

  function handleRestart() {
    showLoadingWithMessage('Restarting...', 'restart', () => {
      setIsGameActive(false);
      setTimeout(() => {
        setIsGameActive(true);
      }, 50);
    });
  }

  function handleExit() {
    setIsGameActive(false);
  }

  function handleAppReset() {
    setIsGameActive(false);
    setLoading({ isLoading: false, message: '', type: '' });
  }

  function startGame() {
    openModal('categorySelection');
  }

  function handleAccountClick() {
    if (isAuthenticated) {
      openModal('profile');
    } else {
      openModal('auth');
    }
  }

  function handleLogout() {
    logout();
    closeModal();
    setIsGameActive(false);
    setShowLeaderboardModal(false);
  }

  function openInstructions() {
    openModal('instructions');
  }

  function closeInstructions() {
    closeModal();
  }

  function openLatestUpdates() {
    openModal('latestUpdates');
  }

  function closeLatestUpdates() {
    closeModal();
  }

  function openLeaderboardModal() {
    setShowLeaderboardModal(true);
  }

  function closeLeaderboardModal() {
    setShowLeaderboardModal(false);
  }

  return (
    <NavigationContext.Provider
      value={{
        startGame,
        handleSelectCategory,
        handleRestart,
        handleExit,
        handleAppReset,
        handleAccountClick,
        handleLogout,
        openInstructions,
        closeInstructions,
        openLatestUpdates,
        closeLatestUpdates,
        openLeaderboardModal,
        closeLeaderboardModal,
        selectedCategory,
        showLeaderboardModal,
        isGameActive,
        loading,
      }}
    >
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
