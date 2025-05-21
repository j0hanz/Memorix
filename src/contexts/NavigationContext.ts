import { createContext } from 'react';

import type { ModalType } from '@/types/context';

export interface NavigationContextType {
  startGame: () => void;
  handleSelectCategory: (category: string) => void;
  handleRestart: () => void;
  handleExit: () => void;
  handleAppReset: () => void;
  handleAccountClick: () => void;
  handleLogout: () => void;
  openInstructions: () => void;
  closeInstructions: () => void;
  openLatestUpdates: () => void;
  closeLatestUpdates: () => void;
  openLeaderboardModal: () => void;
  closeLeaderboardModal: () => void;
  handleGitHubClick: () => void;
  openModalByType?: (type: ModalType) => void;
  selectedCategory: string;
  isGameActive: boolean;
  loading: {
    isLoading: boolean;
    message?: string;
    type?: string;
  };
}

export const NavigationContext = createContext<NavigationContextType | null>(
  null,
);
