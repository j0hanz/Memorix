import { Nav } from 'react-bootstrap';
import styles from './styles/Modal.module.css';
import { useSoundEffects } from '@/hooks/useSound';
import { SOUNDS } from '@/constants/constants';
import { TabNavigationProps } from '@/types/components';

// NavItem component for tab rendering
export const NavItem = ({
  eventKey,
  title,
  className,
  isActive,
  icon,
}: {
  eventKey: string;
  title: string;
  className: string;
  isActive: boolean;
  icon?: React.ReactNode;
}) => {
  const { playSound } = useSoundEffects();

  return (
    <Nav.Item
      className={`py-1 d-flex align-items-center ${className} ${isActive ? styles.active : ''}`}
    >
      <Nav.Link
        eventKey={eventKey}
        onClick={() => playSound(SOUNDS.BUTTON)}
        className={styles.navLink}
      >
        {icon}
        {title}
      </Nav.Link>
    </Nav.Item>
  );
};

export default function TabNavigation({
  activeKey,
  tabs,
  onSelect,
}: TabNavigationProps) {
  return (
    <Nav
      variant="tabs"
      activeKey={activeKey}
      onSelect={(selectedKey) => onSelect(selectedKey || '')}
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
  );
}
