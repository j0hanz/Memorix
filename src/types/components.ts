import type { ReactNode } from 'react';
import type { ButtonProps } from 'react-bootstrap';
import type { TargetAndTransition, Transition } from 'framer-motion';
import type { PairedCard } from './card';

export interface ProfileChangePasswordProps {
  onBack: () => void;
  loading: boolean;
  error?: string | null;
  success?: string | null;
  values: {
    oldPassword: string;
    newPassword1: string;
    newPassword2: string;
  };
  errors: {
    oldPassword?: string;
    newPassword1?: string;
    newPassword2?: string;
    [key: string]: string | undefined;
  };
  touched: {
    oldPassword?: boolean;
    newPassword1?: boolean;
    newPassword2?: boolean;
    [key: string]: boolean | undefined;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  handleSubmit?: (
    e?:
      | React.FormEvent<HTMLFormElement>
      | React.MouseEvent<Element, MouseEvent>
      | undefined,
  ) => void | Promise<void>;
}

export interface ProfileOverviewProps {
  user: {
    username: string;
  };
  profile: {
    profile_picture_url?: string;
    created_at?: string;
    updated_at?: string;
  } | null;
  previewImage: string | null;
  handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  logout: () => void;
}

export interface LeaderboardProps {
  categoryId?: number;
}

export interface LeaderboardModalProps {
  show: boolean;
  onClose: () => void;
}

export interface Score {
  id: string | number;
  category_name: string;
  stars: number;
  moves: number;
  time_seconds: number;
  completed_at: string;
}

export interface ProfileGameHistoryProps {
  scores: Score[];
  loadingScores: boolean;
}

export interface CustomButtonProps extends ButtonProps {
  icon?: ReactNode;
  text?: React.ReactNode;
  className?: string;
  color?: 'primary' | 'secondary';
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
  placeholder?: string;
  defaultValue?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  error?: string | string[];
  showError?: boolean;
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

export interface StarRatingProps {
  count: number;
  max?: number;
  className?: string;
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

export interface ModalProps {
  show: boolean;
  onClose: () => void;
  title?: string | ReactNode;
  children: ReactNode;
  footerContent?: ReactNode;
  modalClassName?: string;
  hasCloseButton?: boolean;
  backdrop?: 'static' | boolean;
  closeButtonText?: string;
  bodyClassName?: string;
}

export interface LoadingCardSpinnerProps {
  isLoading: boolean;
  message?: string;
}

export interface ProfileModalProps {
  show: boolean;
  onClose: () => void;
  logout: () => void;
}

export interface ScoreboardModalProps {
  show: boolean;
  onClose: () => void;
  onReset: () => void;
  onExit: () => void;
  title?: string;
  children?: React.ReactNode;
  moves: number;
  completedTime: number;
  categoryCode: string;
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

export interface ScoreboardDataProps {
  onReset: () => void;
  onExit: () => void;
  moves: number;
  completedTime: number;
  categoryCode: string;
  children?: React.ReactNode;
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
  openLeaderboardModal: () => void;
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
