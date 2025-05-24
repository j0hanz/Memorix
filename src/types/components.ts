import type { TargetAndTransition, Transition } from 'framer-motion';
import type { ReactNode } from 'react';
import type { ButtonProps } from 'react-bootstrap';

import type { CardData, PairedCard } from '@/types/data';
import type { UserScore } from '@/types/services';

export interface BaseComponentProps {
  children?: ReactNode;
}

export interface BaseModalProps {
  show: boolean;
  onClose: () => void;
}

export interface GameActionModalProps extends BaseModalProps {
  onReset?: () => void;
  onExit?: () => void;
}

export interface BaseFormState {
  loading?: boolean;
  error?: string | null;
  success?: string | null;
}

export interface ModalProps {
  show: boolean;
  onClose: () => void;
  title?: ReactNode;
  children: ReactNode;
  footer?: ReactNode;
  className?: string;
  bodyClassName?: string;
  headerClassName?: string;
  footerClassName?: string;
  backdrop?: 'static' | boolean;
  centered?: boolean;
  size?: 'sm' | 'lg' | 'xl';
  showCloseButton?: boolean;
}

export interface FormHandlers {
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  handleSubmit?: (
    e?: React.FormEvent<HTMLFormElement> | React.MouseEvent,
  ) => void | Promise<void>;
}

export interface InteractiveProps {
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

export interface SoundProviderProps {
  children: ReactNode;
}

export interface AuthProviderProps extends BaseComponentProps {
  children: ReactNode;
}

export interface GameProviderProps extends BaseComponentProps {
  children: ReactNode;
  onExit: () => void;
  selectedCategory?: string;
}

export interface ToastProviderProps {
  children: ReactNode;
}

export interface LoginProps {
  onClose?: () => void;
}

export interface RegisterProps {
  onSuccess: () => void;
  onClose: () => void;
}

export type AuthModalProps = BaseModalProps;
export interface ProfileAvatarProps extends InteractiveProps {
  profilePictureUrl?: string;
  onClick: () => void;
}

export interface ProfileModalProps extends BaseModalProps {
  logout: () => void;
}

export interface ProfileDataProps {
  onClose: () => void;
  logout: () => void;
}

export interface ProfileContentProps {
  activeTab: string;
  showPasswordTab: boolean;
  showDeleteTab: boolean;
  onPasswordClick: () => void;
  onDeleteClick: () => void;
  onBack: () => void;
  logout: () => void;
}

export interface ProfileFooterProps {
  activeTab: string;
  showPasswordTab: boolean;
  showDeleteTab: boolean;
  onBack: () => void;
  onClose: () => void;
}

export interface ProfileChangePasswordProps
  extends BaseFormState,
    FormHandlers {
  onBack: () => void;
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
}

export interface ProfileOverviewProps {
  onPasswordClick: () => void;
  onDeleteClick: () => void;
  logout: () => void;
}

export interface ProfileDeleteAccountProps extends BaseFormState {
  onDelete?: () => void;
  onBack?: () => void;
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

export interface MainMenuProps {
  startGame: () => void;
  openInstructions: () => void;
  openLatestUpdates: () => void;
  enterAnimation: EnterAnimation;
  openAuthModal: () => void;
  openLeaderboardModal: () => void;
  handleAccountClick: () => void;
}

export interface MenuButtonProps extends InteractiveProps {
  icon: ReactNode;
  text: string;
  color?: 'primary' | 'secondary';
  variant?: 'menu' | 'centered';
}

export interface ModalFooterButtonsProps {
  leftText?: ReactNode;
  rightText: ReactNode;
  onLeftClick?: () => void;
  onRightClick: () => void;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  leftDisabled?: boolean;
  rightDisabled?: boolean;
  leftType?: 'button' | 'submit' | 'reset';
  rightType?: 'button' | 'submit' | 'reset';
}

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps {
  id?: string;
  name?: string;
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  required?: boolean;
  label?: string;
  hideLabel?: boolean;
  ariaLabel?: string;
}

export interface GameProps {
  onRestart: () => void;
}

export interface GameOptions {
  value: string;
  label: string;
  id?: number;
}

export interface GameComponentProps {
  moves: number;
  timerActive: boolean;
  feedback: string;
}

export interface GameControlProps {
  onReset: () => void;
  onExit: () => void;
}

export interface GameCardProps {
  card: CardData;
  index: number;
  clickHandler?: (index: number) => void;
}

export interface CardProps extends InteractiveProps {
  children: React.ReactNode;
  role?: string;
  ariaLabel?: string;
  ariaSelected?: boolean;
  ariaHidden?: boolean;
}

export interface CardsProps extends GameComponentProps, GameControlProps {
  cards: PairedCard[];
  handleCardSelection: (index: number) => void;
  matchedPairs?: number;
}

export interface StatsBarProps extends GameComponentProps, GameControlProps {}

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

export interface ScoreboardProps {
  moves: number;
  completedTime: string;
}

export interface StarRatingProps {
  count: number;
  max?: number;
  className?: string;
}

export interface ScoreboardModalProps extends GameActionModalProps {
  title?: string;
  children?: ReactNode;
  moves: number;
  completedTime: number;
  categoryCode: string;
}

export interface ScoreboardDataProps extends GameControlProps {
  moves: number;
  completedTime: number;
  categoryCode: string;
  children?: ReactNode;
}

export interface LeaderboardProps {
  categoryId?: number;
}

export type LeaderboardModalProps = BaseModalProps;

export interface ScoreFeedbackProps {
  isAuthenticated: boolean;
  scoreSaved: boolean;
  saveError: string | null;
}

export interface ScoreRowProps {
  score: UserScore;
  highlight?: boolean;
}

export interface ScoringCriteriaRowProps {
  stars: number;
  moves: number | React.ReactNode;
  time: string | React.ReactNode;
}

export interface CategoryProps extends BaseModalProps {
  onSelectCategory: (category: string) => void;
}

export interface CategoryDataProps {
  onSelectCategory: (category: string) => void;
}

export interface CategoryIconProps {
  categoryName: string;
  placement?: 'top' | 'bottom' | 'left' | 'right';
  className?: string;
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

export type GameInstructionsProps = BaseModalProps;

export type LatestUpdatesProps = BaseModalProps;

export interface IconExplanationProps {
  icon: ReactNode;
  description: string;
}

export interface CustomButtonProps
  extends Omit<InteractiveProps, 'onClick'>,
    ButtonProps {
  onClick?: React.MouseEventHandler<HTMLElement>;
  icon?: ReactNode;
  text?: ReactNode;
  color?: 'primary' | 'secondary' | 'transparent';
  img?: string;
  imgAlt?: string;
  imgClassName?: string;
  category?: string;
}

export interface SoundToggleProps {
  isMuted: boolean;
  onToggle: () => void;
}

export interface PaginationProps {
  page: number;
  totalPages: number;
  onPrev: () => void;
  onNext: () => void;
}

export interface ImageProps extends InteractiveProps {
  src: string;
  alt: string;
  width?: string | number;
  height?: string | number;
  style?: React.CSSProperties;
  onLoad?: () => void;
  onError?: (e: React.SyntheticEvent<HTMLImageElement>) => void;
  loading?: 'lazy' | 'eager';
  fallbackSrc?: string;
}

export interface LoadingCardSpinnerProps {
  isLoading: boolean;
  message?: string;
}

export interface ToastProps {
  message: string;
  show: boolean;
  duration?: number;
  placement?: 'top' | 'bottom';
  className?: string;
  onClose?: () => void;
}

export interface TooltipProps extends BaseComponentProps {
  content: ReactNode;
  placement?: 'top' | 'bottom' | 'left' | 'right';
  delay?: number;
  className?: string;
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

export interface ErrorDataProps {
  error: Error;
}

export interface ErrorBoundaryProps extends BaseComponentProps {
  children: ReactNode;
  fallback?: ReactNode;
  onReset?: () => void;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
}

export interface ProtectedRouteProps extends BaseComponentProps {
  children: ReactNode;
  onAuthRequired: () => void;
}

export interface EnterAnimation {
  initial: TargetAndTransition;
  animate: TargetAndTransition;
  transition: Transition;
}
