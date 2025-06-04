import { Row } from 'react-bootstrap';

import { Toast } from '@/components/feedback/Toast';
import { TabNavigation } from '@/components/navigation/TabNavigation';
import { ProfileContent } from '@/components/profile/ProfileContent';
import { ProfileFooter } from '@/components/profile/ProfileFooter';
import { ProfileTabs } from '@/components/profile/ProfileTabs';
import styles from '@/components/styles/Modal.module.css';
import { useProfile } from '@/hooks/shared/useProvider';

export function ProfileData({
  onClose,
  logout,
}: {
  onClose: () => void;
  logout: () => void;
}) {
  const {
    error,
    success,
    setError,
    setSuccess,
    activeTab,
    showPasswordTab,
    showDeleteTab,
    handleTabChange,
    handlePasswordClick,
    handleDeleteClick,
    handleBackToOverview,
  } = useProfile();

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
