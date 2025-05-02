import { Modal } from 'react-bootstrap';
import OverviewTab from './OverviewTab';
import IconsTab from './IconsTab';
import ScoringTab from './ScoringTab';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import FormatListBulletedOutlinedIcon from '@mui/icons-material/FormatListBulletedOutlined';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import { ModalTabs } from '@/components/ModalTabs';
import type { TabItem, TabContent } from '@/types/components';
import styles from './styles/Modal.module.css';

export default function InstructionsData() {
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
    <Modal.Body className="p-0">
      <ModalTabs
        tabs={tabs}
        tabContents={tabContents}
        defaultActiveKey="overview"
      />
    </Modal.Body>
  );
}
