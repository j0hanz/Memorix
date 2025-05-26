import type { TabItem } from '@/types/components';
import { AUTH_ICONS } from '@/utils/iconUtils';

export function ProfileTabs(styles: Record<string, string>): TabItem[] {
  return [
    {
      key: 'overview',
      title: 'Overview',
      className: styles.navItemLeft,
      icon: AUTH_ICONS.person(),
    },
    {
      key: 'history',
      title: 'Game History',
      className: styles.navItemRight,
      icon: AUTH_ICONS.history(),
    },
  ];
}
