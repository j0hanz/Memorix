import { useState } from 'react';
import { Row } from 'react-bootstrap';
import PersonIcon from '@mui/icons-material/Person';
import HistoryIcon from '@mui/icons-material/History';
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import Button from '@/components/Button';
import TabNavigation from '@/components/TabNavigation';
import { useProfile } from '@/hooks/useProfile';
import ProfileOverview from './ProfileOverview';
import ProfileGameHistory from './ProfileGameHistory';
import ProfileChangePassword from './ProfileChangePassword';
import type { TabItem } from '@/types/components';
import Toast from '@/components/Toast';
import { ModalFooterButtons } from '@/components/ModalFooterButtons';
import { LoadingSpinner } from '@/components/Spinner';
import styles from '@/components/styles/Modal.module.css';

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
    setError,
    setSuccess,
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
              color="secondary"
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
      <ModalFooterButtons
        leftText={loading ? <LoadingSpinner /> : 'Save Changes'}
        rightText="Close"
        onLeftClick={() => {
          handleUpdateProfile({
            preventDefault: () => {
              /* no-op for linter */
            },
          } as React.FormEvent<HTMLFormElement>);
        }}
        onRightClick={onClose}
        leftIcon={
          loading ? undefined : (
            <DriveFolderUploadIcon className={styles.modalIcon} />
          )
        }
        leftDisabled={loading || !profileImage}
        rightDisabled={false}
      />
    );
  };

  return (
    <>
      <Toast
        message={error || ''}
        show={!!error && !showPasswordTab}
        placement="top"
        onClose={() => setError(null)}
      />
      <Toast
        message={success || ''}
        show={!!success && !showPasswordTab}
        placement="top"
        onClose={() => setSuccess(null)}
      />
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
