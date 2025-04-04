import { useState } from 'react';
import { Modal, Nav } from 'react-bootstrap';
import styles from '../styles/Modal.module.css';
import Button from '../Button';
import Login from './Login';
import Register from './Register';
import { useSoundEffects } from '@/hooks/useSound';
import { SOUNDS } from '@/constants/constants';
import LoginIcon from '@mui/icons-material/Login';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

interface AuthModalProps {
  show: boolean;
  onClose: () => void;
}

interface NavItemProps {
  eventKey: string;
  title: string;
  className: string;
  isActive: boolean;
  icon?: React.ReactNode;
}

const NavItem = ({
  eventKey,
  title,
  className,
  isActive,
  icon,
}: NavItemProps) => {
  const { playSound } = useSoundEffects();
  const handleClick = () => {
    playSound(SOUNDS.BUTTON);
  };

  return (
    <Nav.Item
      className={`py-1 d-flex align-items-center ${className} ${isActive ? styles.active : ''}`}
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

export default function AuthModal({ show, onClose }: AuthModalProps) {
  const [activeKey, setActiveKey] = useState<string>('login');

  const tabs = [
    {
      key: 'login',
      title: 'Login',
      className: styles.navItemLeft,
      icon: <LoginIcon fontSize="small" />,
    },
    {
      key: 'register',
      title: 'Register',
      className: styles.navItemRight,
      icon: <PersonAddIcon fontSize="small" />,
    },
  ];

  return (
    <Modal
      show={show}
      onHide={onClose}
      centered
      className={`${styles.modal} ${styles.authModal}`}
      backdrop="static"
    >
      <Modal.Header className="border-0 d-flex justify-content-center">
        <Modal.Title>Memorix Account</Modal.Title>
      </Modal.Header>
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

        <div className="p-3">
          {activeKey === 'login' && <Login onClose={onClose} />}
          {activeKey === 'register' && (
            <Register onSuccess={() => setActiveKey('login')} />
          )}
        </div>
      </Modal.Body>
      <Modal.Footer className="border-0 mt-2">
        <Button className={styles.btnClose} onClick={onClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
