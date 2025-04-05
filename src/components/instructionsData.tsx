import { useState } from 'react';
import { Modal } from 'react-bootstrap';
import styles from './styles/Modal.module.css';
import OverviewTab from './OverviewTab';
import IconsTab from './IconsTab';
import ScoringTab from './ScoringTab';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import FormatListBulletedOutlinedIcon from '@mui/icons-material/FormatListBulletedOutlined';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import TabNavigation from './TabNavigation';
import { TabItem } from '@/types/components';

export default function InstructionsData() {
  // State to manage the active tab
  const [activeKey, setActiveKey] = useState<string>('overview');

  const tabs: TabItem[] = [
    // Array of tab objects to define the tabs in the modal
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

  return (
    <Modal.Body className="p-0">
      <TabNavigation
        activeKey={activeKey}
        tabs={tabs}
        onSelect={setActiveKey}
      />

      {activeKey === 'overview' && <OverviewTab />}
      {activeKey === 'symbols' && <IconsTab />}
      {activeKey === 'stars' && <ScoringTab />}
    </Modal.Body>
  );
}
