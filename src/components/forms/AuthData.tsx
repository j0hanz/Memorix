import { Login } from '@/components/forms/Login';
import { Register } from '@/components/forms/Register';
import { ModalTabs } from '@/components/modals/ModalTabs';
import styles from '@/components/styles/Modal.module.css';
import type { TabContent, TabItem } from '@/types/components';
import { AUTH_ICONS } from '@/utils/iconUtils';

export const AuthData = ({ onClose }: { onClose: () => void }) => {
  const tabs: TabItem[] = [
    {
      key: 'login',
      title: 'Login',
      className: styles.navItemLeft,
      icon: AUTH_ICONS.login(),
    },
    {
      key: 'register',
      title: 'Register',
      className: styles.navItemRight,
      icon: AUTH_ICONS.register(),
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
