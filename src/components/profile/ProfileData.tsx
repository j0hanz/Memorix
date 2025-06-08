import { Row } from 'react-bootstrap';

import styles from '@/components/modals/styles/Modal.module.css';
import { TabNavigation } from '@/components/navigation/TabNavigation';
import { ProfileContent } from '@/components/profile/ProfileContent';
import { ProfileFooter } from '@/components/profile/ProfileFooter';
import { ProfileTabs } from '@/components/profile/ProfileTabs';
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
    showClearScoresTab,
    handleTabChange,
    handlePasswordClick,
    handleDeleteClick,
    handleClearScoresClick,
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
          showClearScoresTab={showClearScoresTab}
          onPasswordClick={handlePasswordClick}
          onDeleteClick={handleDeleteClick}
          onClearScoresClick={handleClearScoresClick}
          onBack={handleBackToOverview}
          logout={logout}
        />
      </Row>
      <ProfileFooter
        activeTab={activeTab}
        showPasswordTab={showPasswordTab}
        showDeleteTab={showDeleteTab}
        showClearScoresTab={showClearScoresTab}
        onBack={handleBackToOverview}
        onClose={handleClose}
      />
    </>
  );
}
