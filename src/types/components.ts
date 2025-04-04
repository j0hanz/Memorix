import { ReactNode } from 'react';
import { ButtonProps } from 'react-bootstrap';
import { TargetAndTransition, Transition } from 'framer-motion';
import { PairedCard } from './card';

export interface CustomButtonProps extends ButtonProps {
  icon?: ReactNode;
  text?: string;
  className?: string;
}

export interface CardsProps {
  cards: PairedCard[];
  handleCardSelection: (index: number) => void;
  matchedPairs?: number;
  moves: number;
  onReset: () => void;
  onExit: () => void;
  timerActive: boolean;
  feedback: string;
}

export interface ImageProps {
  src: string;
  alt: string;
  width?: string | number;
  height?: string | number;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
  onLoad?: () => void;
  onError?: () => void;
  loading?: 'lazy' | 'eager';
  fallbackSrc?: string;
}

export interface LoadingSpinnerProps {
  isLoading: boolean;
}

export interface ProfileModalProps {
  show: boolean;
  onClose: () => void;
}

export interface ScoreboardModalProps {
  show: boolean;
  onClose: () => void;
  onReset: () => void;
  onExit: () => void;
  title?: string;
  children?: ReactNode;
  moves: number;
  completedTime: string;
}

export interface GameInstructionsProps {
  show: boolean;
  onClose: () => void;
}

export interface CategoryDataProps {
  onSelectCategory: (category: string) => void;
}

export interface CategoryProps {
  show: boolean;
  onClose: () => void;
  onSelectCategory: (category: string) => void;
}

export interface AuthModalProps {
  show: boolean;
  onClose: () => void;
}

export interface LatestUpdatesProps {
  show: boolean;
  onClose: () => void;
}

export interface EnterAnimation {
  initial: TargetAndTransition;
  animate: TargetAndTransition;
  transition: Transition;
}

export interface MainMenuProps {
  startGame: () => void;
  openInstructions: () => void;
  openLatestUpdates: () => void;
  enterAnimation: EnterAnimation;
  openAuthModal: () => void;
}

export interface GameProps {
  onRestart: () => void;
}

export interface FeedbackProps {
  message: string | null;
}

export interface ScoreProps {
  moves: number;
  completedTime: string;
}

export interface MovesProps {
  moves: number;
}

export interface TimerProps {
  timerActive: boolean;
}
