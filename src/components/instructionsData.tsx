import { useState } from 'react';
import { Modal, Nav } from 'react-bootstrap';
import styles from './styles/Modal.module.css';
import OverviewTab from './OverviewTab';
import IconsTab from './IconsTab';
import ScoringTab from './ScoringTab';
import { NavItemProps } from '@/types/data';

// Component for each navigation item
const NavItem = ({ eventKey, title, className, isActive }: NavItemProps) => (
  <Nav.Item className={`py-1 ${className} ${isActive ? styles.active : ''}`}>
    <Nav.Link eventKey={eventKey}>{title}</Nav.Link>
  </Nav.Item>
);

// This renders the instructions for the game
export default function InstructionsData() {
  const [activeKey, setActiveKey] = useState<string>('overview');

  return (
    <Modal.Body className="p-0">
      <Nav
        variant="tabs"
        activeKey={activeKey}
        onSelect={(selectedKey) => setActiveKey(selectedKey || '')}
        className="mb-3"
        justify
      >
        <NavItem
          eventKey="overview"
          title="Overview"
          className={styles.navItemLeft}
          isActive={activeKey === 'overview'}
        />
        <NavItem
          eventKey="icons"
          title="Symbols"
          className={styles.navItemCenter}
          isActive={activeKey === 'icons'}
        />
        <NavItem
          eventKey="scoring"
          title="Scoring"
          className={styles.navItemRight}
          isActive={activeKey === 'scoring'}
        />
      </Nav>

      {activeKey === 'overview' && <OverviewTab />}
      {activeKey === 'icons' && <IconsTab />}
      {activeKey === 'scoring' && <ScoringTab />}
    </Modal.Body>
  );
}
