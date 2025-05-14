import FormatListBulletedOutlinedIcon from '@mui/icons-material/FormatListBulletedOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';

import { ModalTabs } from '@/components/ModalTabs';
import type { TabContent, TabItem } from '@/types/components';

import { IconsTab } from './IconsTab';
import { OverviewTab } from './OverviewTab';
import { ScoringTab } from './ScoringTab';
import styles from './styles/Modal.module.css';

export function InstructionsData() {
  const tabs: TabItem[] = [
    {
      key: 'overview',
      title: 'Guide',
      className: styles.navItemLeft,
      icon: <InfoOutlinedIcon fontSize="small" />,
    },
    {
      key: 'symbols',
      title: 'Symbols',
      className: styles.navItemCenter,
      icon: <FormatListBulletedOutlinedIcon fontSize="small" />,
    },
    {
      key: 'stars',
      title: 'Stars',
      className: styles.navItemRight,
      icon: <StarBorderOutlinedIcon fontSize="small" />,
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
