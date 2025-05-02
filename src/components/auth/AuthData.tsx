import LoginIcon from '@mui/icons-material/Login';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import styles from '@/components/styles/Modal.module.css';
import Login from './Login';
import Register from './Register';
import { ModalTabs } from '@/components/ModalTabs';
import type { TabItem, TabContent } from '@/types/components';

export const AuthData = ({ onClose }: { onClose: () => void }) => {
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
