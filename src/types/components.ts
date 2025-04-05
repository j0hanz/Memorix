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

export interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  onReset?: () => void;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
}

export interface FormFieldProps {
  controlId: string;
  name: string;
  type: string;
  label: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  error?: string;
  showError: boolean;
  className?: string;
}

export interface ProtectedRouteProps {
  children: ReactNode;
  onAuthRequired: () => void;
}

export interface TabItem {
  key: string;
  title: string;
  className: string;
  icon?: ReactNode;
}

export interface TabNavigationProps {
  activeKey: string;
  tabs: TabItem[];
  onSelect: (key: string) => void;
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
  onError?: (e: React.SyntheticEvent<HTMLImageElement, Event>) => void;
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
