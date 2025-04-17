import { useState } from 'react';
import { Alert, Row } from 'react-bootstrap';
import Button from '@/components/Button';
import styles from './styles/Modal.module.css';
import { useProfile } from '@/hooks/useProfile';
import TabNavigation from './TabNavigation';
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
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [passwordSuccess, setPasswordSuccess] = useState<string | null>(null);

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
  } = useProfile();

  // Password change handler
  const handlePasswordChange = async (
    oldPassword: string,
    newPassword1: string,
    newPassword2: string,
  ) => {
    setPasswordLoading(true);
    setPasswordError(null);
    setPasswordSuccess(null);

    if (!oldPassword || !newPassword1 || !newPassword2) {
      setPasswordError('Please fill in all fields');
      setPasswordLoading(false);
      return;
    }
    if (newPassword1 !== newPassword2) {
      setPasswordError('New passwords do not match');
      setPasswordLoading(false);
      return;
    }

    try {
      const { axiosReq } = await import('@/services/axios');
      await axiosReq.post('/dj-rest-auth/password/change/', {
        old_password: oldPassword,
        new_password1: newPassword1,
        new_password2: newPassword2,
      });
      setPasswordSuccess('Password changed successfully!');
      setTimeout(() => {
        setShowPasswordTab(false);
        setPasswordSuccess(null);
      }, 1200);
    } catch (err) {
      const errorObj = err as { response?: { data?: Record<string, unknown> } };
      const detail =
        typeof errorObj?.response?.data?.detail === 'string'
          ? errorObj.response.data.detail
          : '';
      const otherErrors = Object.values(errorObj?.response?.data || {})
        .filter((v) => typeof v === 'string')
        .join(' ');
      setPasswordError(detail || otherErrors || 'Failed to change password');
    } finally {
      setPasswordLoading(false);
    }
  };

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
          onSubmit={handlePasswordChange}
          loading={passwordLoading}
          error={passwordError}
          success={passwordSuccess}
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
          onClick={handleUpdateProfile}
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
