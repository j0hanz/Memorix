import HistoryIcon from '@mui/icons-material/History';
import PersonIcon from '@mui/icons-material/Person';

import type { TabItem } from '@/types/components';

export function ProfileTabs(styles: Record<string, string>): TabItem[] {
  return [
    {
      key: 'overview',
      title: 'Overview',
      className: styles.navItemLeft,
      icon: <PersonIcon fontSize="small" />,
    },
    {
      key: 'history',
      title: 'Game History',
      className: styles.navItemRight,
      icon: <HistoryIcon fontSize="small" />,
    },
  ];
}
