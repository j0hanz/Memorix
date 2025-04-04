import { useState } from 'react';
import { Nav } from 'react-bootstrap';
import styles from './styles/Modal.module.css';
import Login from './auth/Login';
import Register from './auth/Register';
import { useSoundEffects } from '@/hooks/useSound';
import { SOUNDS } from '@/constants/constants';
import LoginIcon from '@mui/icons-material/Login';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

// Move NavItem component outside of AuthData
const NavItem = ({
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

// Auth data component for the modal content
export default function AuthData({ onClose }: { onClose: () => void }) {
  const [activeKey, setActiveKey] = useState<string>('login');
  // Remove the unused playSound variable

  const tabs = [
    {
      key: 'login',
      title: 'Login',
      className: styles.navItemLeft,
      icon: <LoginIcon fontSize="small" className="me-1" />,
    },
    {
      key: 'register',
      title: 'Register',
      className: styles.navItemRight,
      icon: <PersonAddIcon fontSize="small" className="me-1" />,
    },
  ];

  return (
    <>
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

      {activeKey === 'login' && <Login onClose={onClose} />}
      {activeKey === 'register' && (
        <Register onSuccess={() => setActiveKey('login')} />
      )}
    </>
  );
}
