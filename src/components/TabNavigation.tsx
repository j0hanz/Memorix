import { Nav } from 'react-bootstrap';

import { useSound } from '@/hooks/useProvider';
import type { TabNavigationProps } from '@/types/components';

import styles from './styles/Modal.module.css';

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
  const { playSound } = useSound();

  const defaultClass = styles.navItem;

  return (
    <Nav.Item
      className={`${className} ${isActive ? styles.active : ''} ${defaultClass}`}
    >
      <Nav.Link
        eventKey={eventKey}
        onClick={() => {
          playSound('button');
        }}
        className={styles.navLink}
      >
        {icon}
        {title}
      </Nav.Link>
    </Nav.Item>
  );
};

export function TabNavigation({
  activeKey,
  tabs,
  onSelect,
}: TabNavigationProps) {
  return (
    <Nav
      variant="tabs"
      activeKey={activeKey}
      onSelect={(selectedKey) => {
        onSelect(selectedKey || '');
      }}
      justify={true}
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
