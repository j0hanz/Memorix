import LoginIcon from '@mui/icons-material/Login';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

import { ModalTabs } from '@/components/ModalTabs';
import styles from '@/components/styles/Modal.module.css';
import type { TabContent, TabItem } from '@/types/components';

import Login from './Login';
import Register from './Register';

export const AuthData = ({ onClose }: { onClose: () => void }) => {
  const tabs: TabItem[] = [
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

  const tabContents: TabContent[] = [
    {
      key: 'login',
      content: <Login onClose={onClose} />,
    },
    {
      key: 'register',
      content: <Register onSuccess={onClose} onClose={onClose} />,
    },
  ];

  return (
    <ModalTabs tabs={tabs} tabContents={tabContents} defaultActiveKey="login" />
  );
};

export default AuthData;
