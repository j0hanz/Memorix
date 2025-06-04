import { ScoringTab } from '@/components/leaderboard/ScoringTab';
import { ModalTabs } from '@/components/modals/ModalTabs';
import { IconsTab } from '@/components/ui/IconsTab';
import { OverviewTab } from '@/components/ui/OverviewTab';
import type { TabContent, TabItem } from '@/types/components';
import { MODAL_ICONS } from '@/utils/ui/iconUtils';

import styles from '../styles/Modal.module.css';

export function InstructionsData() {
  const tabs: TabItem[] = [
    {
      key: 'overview',
      title: 'Guide',
      className: styles.navItemLeft,
      icon: MODAL_ICONS.info(),
    },
    {
      key: 'symbols',
      title: 'Symbols',
      className: styles.navItemCenter,
      icon: MODAL_ICONS.list(),
    },
    {
      key: 'stars',
      title: 'Stars',
      className: styles.navItemRight,
      icon: MODAL_ICONS.starOutline(),
    },
  ];

  const tabContents: TabContent[] = [
    { key: 'overview', content: <OverviewTab /> },
    { key: 'symbols', content: <IconsTab /> },
    { key: 'stars', content: <ScoringTab /> },
  ];

  return (
    <ModalTabs
      tabs={tabs}
      tabContents={tabContents}
      defaultActiveKey="overview"
    />
  );
}
