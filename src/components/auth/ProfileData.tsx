import { useState } from 'react';
import { Alert, Row } from 'react-bootstrap';
import Button from '@/components/Button';
import styles from '@/components/styles/Modal.module.css';
import { useProfile } from '@/hooks/useProfile';
import TabNavigation from '@/components/TabNavigation';
import type { TabItem } from '@/types/components';
import PersonIcon from '@mui/icons-material/Person';
import HistoryIcon from '@mui/icons-material/History';
import ProfileOverview from './ProfileOverview';
import ProfileGameHistory from './ProfileGameHistory';
import ProfileChangePassword from './ProfileChangePassword';

const ProfileData: React.FC<{ onClose: () => void; logout: () => void }> = ({
  onClose,
  logout,
}) => {
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [showPasswordTab, setShowPasswordTab] = useState(false);

  const {
    user,
    profile,
    loading,
    error,
    success,
    profileImage,
    previewImage,
    handleImageChange,
    handleUpdateProfile,
    scores,
    loadingScores,
    passwordForm,
  } = useProfile();

  if (!user) {
    return (
      <div className="p-4 text-center">Please log in to view your profile</div>
    );
  }

  const tabs: TabItem[] = [
    {
      key: 'overview',
      title: 'Overview',
      className: styles.navItemLeft,
      icon: <PersonIcon fontSize="small" className="me-1" />,
    },
    {
      key: 'history',
      title: 'Game History',
      className: styles.navItemRight,
      icon: <HistoryIcon fontSize="small" className="me-1" />,
    },
  ];

  // Render content based on active tab
  const renderContent = () => {
    if (activeTab === 'overview' && showPasswordTab) {
      return (
        <ProfileChangePassword
          onBack={() => setShowPasswordTab(false)}
          loading={loading}
          error={error}
          success={success}
          values={passwordForm.values}
          errors={passwordForm.errors}
          touched={passwordForm.touched}
          handleChange={passwordForm.handleChange}
          handleBlur={passwordForm.handleBlur}
          handleSubmit={(e) => {
            if (e) {
              passwordForm.handleSubmit(e as React.FormEvent<HTMLFormElement>);
            } else {
              passwordForm.handleSubmit({
                preventDefault: () => {
                  /* no-op for linter */
                },
              } as React.FormEvent<HTMLFormElement>);
            }
          }}
        />
      );
    } else if (activeTab === 'overview') {
      return (
        <ProfileOverview
          user={user}
          profile={profile}
          previewImage={previewImage}
          handleImageChange={handleImageChange}
          logout={logout}
          extraButton={
            <Button
              className={`${styles.btnMain} ${styles.btnPassword}`}
              variant="menu"
              text="Change Password"
              onClick={() => setShowPasswordTab(true)}
              type="button"
            />
          }
        />
      );
    } else if (activeTab === 'history') {
      return (
        <ProfileGameHistory scores={scores} loadingScores={loadingScores} />
      );
    }

    return null;
  };

  // Render footer buttons based on active tab
  const renderFooterButtons = () => {
    if (activeTab === 'overview' && showPasswordTab) {
      return null;
    }

    return (
      <div className="d-flex">
        <Button
          className={`${styles.btnRestart} ${styles.modalButton}`}
          type="submit"
          disabled={loading || !profileImage}
          text={loading ? 'Updating...' : 'Update Profile'}
          onClick={() => {
            handleUpdateProfile({
              preventDefault: () => {
                /* no-op for linter */
              },
            } as React.FormEvent<HTMLFormElement>);
          }}
        />
        <Button
          className={`${styles.btnExit} ${styles.modalButton}`}
          onClick={onClose}
          text="Close"
        />
      </div>
    );
  };

  return (
    <>
      {error && !showPasswordTab && (
        <Alert variant="danger" className="mb-0 rounded-0">
          {error}
        </Alert>
      )}
      {success && !showPasswordTab && (
        <Alert variant="success" className="mb-0 rounded-0">
          {success}
        </Alert>
      )}
      <TabNavigation
        activeKey={activeTab}
        tabs={tabs}
        onSelect={(key) => {
          setActiveTab(key);
          setShowPasswordTab(false);
        }}
      />
      <Row>{renderContent()}</Row>
      {renderFooterButtons()}
    </>
  );
};

export default ProfileData;
