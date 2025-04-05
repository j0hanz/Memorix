import { useState } from 'react';
import styles from './styles/Modal.module.css';
import Login from './auth/Login';
import Register from './auth/Register';
import LoginIcon from '@mui/icons-material/Login';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import TabNavigation, { TabItem } from './TabNavigation';

// Auth data component for the modal content
export default function AuthData({ onClose }: { onClose: () => void }) {
  const [activeKey, setActiveKey] = useState<string>('login');

  const tabs: TabItem[] = [
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
      <TabNavigation
        activeKey={activeKey}
        tabs={tabs}
        onSelect={setActiveKey}
      />

      {activeKey === 'login' && <Login onClose={onClose} />}
      {activeKey === 'register' && (
        <Register onSuccess={() => setActiveKey('login')} />
      )}
    </>
  );
}
