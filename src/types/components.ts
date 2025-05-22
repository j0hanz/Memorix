import type { TargetAndTransition, Transition } from 'framer-motion';
import type { ReactNode } from 'react';
import type { ButtonProps } from 'react-bootstrap';

import type { CardData, PairedCard } from '@/types/data';
import type { UserScore } from '@/types/services';

export interface AuthProviderProps {
  children: ReactNode;
}
export interface LoginProps {
  onClose?: () => void;
}
export interface RegisterProps {
  onSuccess: () => void;
  onClose: () => void;
}
export interface AuthModalProps {
  show: boolean;
  onClose: () => void;
}

export interface ProfileAvatarProps {
  profilePictureUrl?: string;
  onClick: () => void;
}
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
    e?: React.FormEvent<HTMLFormElement> | React.MouseEvent,
  ) => void | Promise<void>;
}
export interface ProfileOverviewProps {
  user: { username: string };
  profile: {
    profile_picture_url?: string;
    created_at?: string;
    updated_at?: string;
  } | null;
  previewImage: string | null;
  handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  logout: () => void;
}
export interface ProfileDeleteAccountProps {
  loading?: boolean;
  error?: string | null;
  success?: string | null;
  onDelete?: () => void;
  onBack?: () => void;
}
export interface ProfileModalProps {
  show: boolean;
  onClose: () => void;
  logout: () => void;
}

export interface MainMenuProps {
  startGame: () => void;
  openInstructions: () => void;
  openLatestUpdates: () => void;
  enterAnimation: EnterAnimation;
  openAuthModal: () => void;
  openLeaderboardModal: () => void;
  handleAccountClick: () => void;
}
export interface GameProps {
  onRestart: () => void;
}

export interface GameCardProps {
  card: CardData;
  index: number;
  clickHandler?: (index: number) => void;
}

export interface CardProps {
  className?: string;
  onClick?: () => void;
  children: React.ReactNode;
  role?: string;
  ariaLabel?: string;
  ariaSelected?: boolean;
  ariaHidden?: boolean;
  disabled?: boolean;
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

export interface SoundToggleProps {
  isMuted: boolean;
  onToggle: () => void;
}

export interface StatsBarProps {
  moves: number;
  timerActive: boolean;
  feedback: string;
  onReset: () => void;
  onExit: () => void;
}

export interface ScoreboardModalProps {
  show: boolean;
  onClose: () => void;
  onReset: () => void;
  onExit: () => void;
  title?: string;
  children?: ReactNode;
  moves: number;
  completedTime: number;
  categoryCode: string;
}
export interface ScoreboardDataProps {
  onReset: () => void;
  onExit: () => void;
  moves: number;
  completedTime: number;
  categoryCode: string;
  children?: ReactNode;
}
export interface LeaderboardProps {
  categoryId?: number;
}
export interface LeaderboardModalProps {
  show: boolean;
  onClose: () => void;
}
export interface ScoreFeedbackProps {
  isAuthenticated: boolean;
  scoreSaved: boolean;
  saveError: string | null;
}
export interface ScoreRowProps {
  score: UserScore;
  highlight?: boolean;
}
export interface ProfileGameHistoryProps {
  scores: UserScore[];
  loadingScores: boolean;
}
export interface UseGameHistoryProps {
  scores: UserScore[];
  loadingScores: boolean;
  scoresCount: number;
  scoresPage: number;
  setScoresPage: (page: number) => void;
}

export interface GameOptions {
  value: string;
  label: string;
}
export interface GameCategoryProps {
  id: string;
  label?: string;
  options: GameOptions[];
  value: string;
  onChange: (v: string) => void;
  loading?: boolean;
  showAllOption?: boolean;
  hideLabel?: boolean;
}
export interface CategoryIconProps {
  categoryName: string;
  placement?: 'top' | 'bottom' | 'left' | 'right';
  className?: string;
}
export interface CategoryDataProps {
  onSelectCategory: (category: string) => void;
}
export interface CategoryProps {
  show: boolean;
  onClose: () => void;
  onSelectCategory: (category: string) => void;
}

export interface TimerProps {
  timerActive: boolean;
}
export interface MovesProps {
  moves: number;
}
export interface FeedbackProps {
  message: string | null;
}
export interface ScoreProps {
  moves: number;
  completedTime: string;
}

export interface PaginationProps {
  page: number;
  totalPages: number;
  onPrev: () => void;
  onNext: () => void;
}

export interface MenuButtonProps {
  onClick: () => void;
  icon: ReactNode;
  text: string;
  className?: string;
  color?: 'primary' | 'secondary';
  variant?: 'menu' | 'centered';
}
export interface CustomButtonProps extends ButtonProps {
  icon?: ReactNode;
  text?: ReactNode;
  className?: string;
  color?: 'primary' | 'secondary' | 'transparent';
  img?: string;
  imgAlt?: string;
  imgClassName?: string;
  category?: string;
}

export interface ProtectedRouteProps {
  children: ReactNode;
  onAuthRequired: () => void;
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
  onError?: (e: React.SyntheticEvent<HTMLImageElement>) => void;
  loading?: 'lazy' | 'eager';
  fallbackSrc?: string;
}

export interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
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

export interface ToastProps {
  message: string;
  show: boolean;
  duration?: number;
  placement?: 'top' | 'bottom';
  className?: string;
  onClose?: () => void;
}
export interface TooltipProps {
  children: ReactNode;
  content: ReactNode;
  placement?: 'top' | 'bottom' | 'left' | 'right';
  delay?: number;
  className?: string;
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
export interface ModalTabsProps {
  tabs: TabItem[];
  tabContents: TabContent[];
  defaultActiveKey?: string;
}
export interface TabContent {
  key: string;
  content: ReactNode;
}

export interface StarRatingProps {
  count: number;
  max?: number;
  className?: string;
}

export interface GameInstructionsProps {
  show: boolean;
  onClose: () => void;
}

export interface LoadingCardSpinnerProps {
  isLoading: boolean;
  message?: string;
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
