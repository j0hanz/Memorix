import { Row } from 'react-bootstrap';

import { TabNavigation } from '@/components/navigation/TabNavigation';
import { ProfileContent } from '@/components/profile/ProfileContent';
import { ProfileFooter } from '@/components/profile/ProfileFooter';
import { ProfileTabs } from '@/components/profile/ProfileTabs';
import styles from '@/components/styles/Modal.module.css';
import { useProfile, useToast } from '@/hooks/shared/useProvider';

export function ProfileData({
  onClose,
  logout,
}: {
  onClose: () => void;
  logout: () => void;
}) {
  const {
    activeTab,
    showPasswordTab,
    showDeleteTab,
    handleTabChange,
    handlePasswordClick,
    handleDeleteClick,
    handleBackToOverview,
  } = useProfile();
  const { hideToast } = useToast();

  const tabs = ProfileTabs(styles);

  const handleClose = () => {
    // Clear global toast when modal is closed
    hideToast();
    onClose();
  };

  return (
    <>
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
      </Row>{' '}
      <ProfileFooter
        activeTab={activeTab}
        showPasswordTab={showPasswordTab}
        showDeleteTab={showDeleteTab}
        onBack={handleBackToOverview}
        onClose={handleClose}
      />
    </>
  );
}
