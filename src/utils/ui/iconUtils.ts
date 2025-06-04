import AllInclusiveOutlinedIcon from '@mui/icons-material/AllInclusiveOutlined';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import CrueltyFreeOutlinedIcon from '@mui/icons-material/CrueltyFreeOutlined';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import DirectionsCarOutlinedIcon from '@mui/icons-material/DirectionsCarOutlined';
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';
import FlipOutlinedIcon from '@mui/icons-material/FlipOutlined';
import FormatListBulletedOutlinedIcon from '@mui/icons-material/FormatListBulletedOutlined';
import GitHubIcon from '@mui/icons-material/GitHub';
import HistoryIcon from '@mui/icons-material/History';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import LockResetIcon from '@mui/icons-material/LockReset';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import LooksOneOutlinedIcon from '@mui/icons-material/LooksOneOutlined';
import ParkOutlinedIcon from '@mui/icons-material/ParkOutlined';
import PersonIcon from '@mui/icons-material/Person';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PlayCircleOutlineOutlinedIcon from '@mui/icons-material/PlayCircleOutlineOutlined';
import ReplayCircleFilledOutlinedIcon from '@mui/icons-material/ReplayCircleFilledOutlined';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import RestaurantOutlinedIcon from '@mui/icons-material/RestaurantOutlined';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import StarOutlinedIcon from '@mui/icons-material/StarOutlined';
import TimerOutlinedIcon from '@mui/icons-material/TimerOutlined';
import TrackChangesOutlinedIcon from '@mui/icons-material/TrackChangesOutlined';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import React from 'react';

// Define icon sizes for consistency
export type IconSize = 'small' | 'medium' | 'large';

// Icon configuration interface
export interface IconConfig {
  fontSize?: IconSize;
  className?: string;
  titleAccess?: string;
}

// Centralized icon registry with default configurations
export const ICONS = {
  // Navigation & UI
  ARROW_BACK: ArrowBackIcon,
  ARROW_BACK_IOS: ArrowBackIosNewIcon,
  ARROW_FORWARD_IOS: ArrowForwardIosIcon,
  CLOSE: CloseOutlinedIcon,

  // Game Controls
  PLAY_CIRCLE: PlayCircleOutlineOutlinedIcon,
  REPLAY: ReplayCircleFilledOutlinedIcon,
  EXIT: ExitToAppOutlinedIcon,
  RESTART: RestartAltIcon,

  // Game Stats & Feedback
  TIMER: TimerOutlinedIcon,
  FLIP: FlipOutlinedIcon,
  CHECK: CheckOutlinedIcon,
  STAR: StarOutlinedIcon,
  STAR_BORDER: StarBorderOutlinedIcon,
  INFINITY: AllInclusiveOutlinedIcon,

  // User & Authentication
  PERSON: PersonIcon,
  LOGIN: LoginIcon,
  PERSON_ADD: PersonAddIcon,
  LOGOUT: LogoutIcon,
  LOCK_RESET: LockResetIcon,

  // Categories
  CATEGORY: CategoryOutlinedIcon,
  ANIMALS: CrueltyFreeOutlinedIcon,
  NATURE: ParkOutlinedIcon,
  VEHICLES: DirectionsCarOutlinedIcon,
  FOOD: RestaurantOutlinedIcon,
  NUMBERS: LooksOneOutlinedIcon,

  // Features & Info
  INFO: InfoOutlinedIcon,
  TROPHY: EmojiEventsIcon,
  HISTORY: HistoryIcon,
  TRACK_CHANGES: TrackChangesOutlinedIcon,
  FORMAT_LIST: FormatListBulletedOutlinedIcon,

  // Media & Sound
  VOLUME_OFF: VolumeOffIcon,
  VOLUME_UP: VolumeUpIcon,

  // Actions & File Management
  UPLOAD: DriveFolderUploadIcon,
  DELETE: DeleteOutlineIcon,
  DELETE_FOREVER: DeleteForeverIcon,

  // External & Special
  GITHUB: GitHubIcon,
  CALENDAR: CalendarTodayOutlinedIcon,
  WARNING: WarningAmberIcon,
  PLAY_ARROW: PlayArrowIcon,
} as const;

// Type for icon names
export type IconName = keyof typeof ICONS;

// Utility function to get an icon component with default props
export function getIcon(
  iconName: IconName,
  config: IconConfig = {},
): React.ReactElement {
  const IconComponent = ICONS[iconName];
  const { fontSize = 'small', className = '', titleAccess } = config;

  return React.createElement(IconComponent, {
    fontSize,
    className,
    titleAccess,
  });
}

// Pre-configured icon sets for common use cases
export const GAME_ICONS = {
  restart: () => getIcon('REPLAY', { fontSize: 'small' }),
  exit: () => getIcon('EXIT', { fontSize: 'small' }),
  timer: () => getIcon('TIMER', { fontSize: 'small' }),
  moves: () => getIcon('FLIP', { fontSize: 'small' }),
  correct: () => getIcon('CHECK', { fontSize: 'small' }),
  wrong: () => getIcon('CLOSE', { fontSize: 'small' }),
  star: () => getIcon('STAR', { fontSize: 'small' }),
  play: () => getIcon('PLAY_CIRCLE'),
};

export const AUTH_ICONS = {
  login: () => getIcon('LOGIN', { fontSize: 'small' }),
  register: () => getIcon('PERSON_ADD', { fontSize: 'small' }),
  logout: () => getIcon('LOGOUT', { fontSize: 'small' }),
  person: () => getIcon('PERSON'),
  history: () => getIcon('HISTORY', { fontSize: 'small' }),
  password: () => getIcon('LOCK_RESET', { fontSize: 'small' }),
  delete: () => getIcon('DELETE_FOREVER', { fontSize: 'small' }),
  deleteAccount: () => getIcon('DELETE', { fontSize: 'small' }),
  upload: () => getIcon('UPLOAD', { fontSize: 'small' }),
  back: () => getIcon('ARROW_BACK', { fontSize: 'small' }),
  warning: (config?: IconConfig) =>
    getIcon('WARNING', { fontSize: 'large', ...config }),
  warningLarge: (className?: string) =>
    getIcon('WARNING', { fontSize: 'large', className }),
};

export const MENU_ICONS = {
  play: () => getIcon('PLAY_CIRCLE'),
  info: () => getIcon('INFO'),
  trophy: () => getIcon('TROPHY'),
  person: () => getIcon('PERSON'),
  updates: () => getIcon('TRACK_CHANGES'),
  github: () => getIcon('GITHUB', { fontSize: 'small' }),
  calendar: () => getIcon('CALENDAR', { fontSize: 'small' }),
};

export const MODAL_ICONS = {
  restart: () => getIcon('REPLAY', { fontSize: 'small' }),
  exit: () => getIcon('EXIT', { fontSize: 'small' }),
  timer: () => getIcon('TIMER', { fontSize: 'small' }),
  moves: () => getIcon('FLIP', { fontSize: 'small' }),
  wrong: (className?: string) =>
    getIcon('CLOSE', { fontSize: 'small', className }),
  correct: (className?: string) =>
    getIcon('CHECK', { fontSize: 'small', className }),
  star: (className?: string) =>
    getIcon('STAR', { fontSize: 'small', className }),
  play: (className?: string) =>
    getIcon('PLAY_ARROW', { fontSize: 'small', className }),
  info: () => getIcon('INFO', { fontSize: 'small' }),
  list: () => getIcon('FORMAT_LIST', { fontSize: 'small' }),
  starOutline: () => getIcon('STAR_BORDER', { fontSize: 'small' }),
  infinite: () => getIcon('INFINITY', { fontSize: 'small' }),
};

export const NAVIGATION_ICONS = {
  close: () => getIcon('CLOSE', { fontSize: 'small' }),
  previous: () => getIcon('ARROW_BACK_IOS', { fontSize: 'small' }),
  next: () => getIcon('ARROW_FORWARD_IOS', { fontSize: 'small' }),
  exit: () => getIcon('EXIT', { fontSize: 'small' }),
};

// Category icons for backward compatibility
export const CATEGORY_ICONS: Record<string, () => React.ReactElement> = {
  Animals: () => getIcon('ANIMALS', { fontSize: 'small' }),
  Nature: () => getIcon('NATURE', { fontSize: 'small' }),
  Vehicles: () => getIcon('VEHICLES', { fontSize: 'small' }),
  Food: () => getIcon('FOOD', { fontSize: 'small' }),
  Shapes: () => getIcon('CATEGORY', { fontSize: 'small' }),
  Numbers: () => getIcon('NUMBERS', { fontSize: 'small' }),
};

// Get category icon by name (for backward compatibility)
export function getCategoryIcon(categoryName: string): React.ReactElement {
  if (categoryName in CATEGORY_ICONS) {
    return CATEGORY_ICONS[categoryName]();
  }
  return React.createElement('span', null, categoryName);
}
