import { useState } from 'react';
import { Row } from 'react-bootstrap';

import styles from '@/components/styles/Modal.module.css';
import { TabNavigation } from '@/components/TabNavigation';
import { Toast } from '@/components/Toast';
import { useProfile } from '@/hooks/useProvider';

import { ProfileContent } from './ProfileContent';
import { ProfileFooter } from './ProfileFooter';
import { ProfileTabs } from './ProfileTabs';

export function ProfileData({
  onClose,
  logout,
}: {
  onClose: () => void;
  logout: () => void;
}) {
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [showPasswordTab, setShowPasswordTab] = useState(false);
  const [showDeleteTab, setShowDeleteTab] = useState(false);

  const { error, success, setError, setSuccess } = useProfile();

  const handleTabChange = (key: string) => {
    setActiveTab(key);
    setShowPasswordTab(false);
    setShowDeleteTab(false);
  };

  const handlePasswordClick = () => {
    setShowPasswordTab(true);
  };

  const handleDeleteClick = () => {
    setShowDeleteTab(true);
  };

  const handleBackToOverview = () => {
    setShowPasswordTab(false);
    setShowDeleteTab(false);
  };

  const tabs = ProfileTabs(styles);

  return (
    <>
      <Toast
        message={error || ''}
        show={!!error && !showPasswordTab && !showDeleteTab}
        placement="top"
        onClose={() => {
          setError(null);
        }}
      />
      <Toast
        message={success || ''}
        show={!!success && !showPasswordTab && !showDeleteTab}
        placement="top"
        onClose={() => {
          setSuccess(null);
        }}
      />

      <TabNavigation
        activeKey={activeTab}
        tabs={tabs}
        onSelect={handleTabChange}
      />

      <Row className={styles.modalRow}>
        <ProfileContent
          activeTab={activeTab}
          showPasswordTab={showPasswordTab}
          showDeleteTab={showDeleteTab}
          onPasswordClick={handlePasswordClick}
          onDeleteClick={handleDeleteClick}
          onBack={handleBackToOverview}
          logout={logout}
        />
      </Row>

      <ProfileFooter
        activeTab={activeTab}
        showPasswordTab={showPasswordTab}
        showDeleteTab={showDeleteTab}
        onBack={handleBackToOverview}
        onClose={onClose}
      />
    </>
  );
}
