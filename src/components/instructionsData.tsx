import { useState } from 'react';
import { Modal, Nav } from 'react-bootstrap';
import styles from './styles/Modal.module.css';
import OverviewTab from './OverviewTab';
import IconsTab from './IconsTab';
import ScoringTab from './ScoringTab';
import { useSoundEffects } from '@/hooks/useSound';
import { SOUNDS } from '@/constants/constants';
import { NavItemProps } from '@/types/data';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import FormatListBulletedOutlinedIcon from '@mui/icons-material/FormatListBulletedOutlined';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';

const NavItem = ({
  eventKey,
  title,
  className,
  isActive,
  icon,
}: NavItemProps) => {
  // NavItem component to render each tab item with sound effect
  const { playSound } = useSoundEffects();
  const handleClick = () => {
    playSound(SOUNDS.BUTTON);
  };

  return (
    <Nav.Item
      className={`py-1 d-flex align-items-center  ${className} ${isActive ? styles.active : ''}`}
    >
      <Nav.Link
        eventKey={eventKey}
        onClick={handleClick}
        className={styles.navLink}
      >
        {icon}
        {title}
      </Nav.Link>
    </Nav.Item>
  );
};

export default function InstructionsData() {
  // State to manage the active tab
  const [activeKey, setActiveKey] = useState<string>('overview');

  const tabs = [
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
      <Nav
        variant="tabs"
        activeKey={activeKey}
        onSelect={(selectedKey) => setActiveKey(selectedKey || '')}
        className="mb-3"
        justify
      >
        {tabs.map((tab) => (
          <NavItem
            key={tab.key}
            eventKey={tab.key}
            title={tab.title}
            className={tab.className}
            isActive={activeKey === tab.key}
            icon={tab.icon}
          />
        ))}
      </Nav>

      {activeKey === 'overview' && <OverviewTab />}
      {activeKey === 'symbols' && <IconsTab />}
      {activeKey === 'stars' && <ScoringTab />}
    </Modal.Body>
  );
}
