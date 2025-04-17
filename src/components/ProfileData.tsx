import { useState } from 'react';
import { Form, Alert, Row, Col } from 'react-bootstrap';
import Button from '@/components/Button';
import styles from './styles/Modal.module.css';
import { useProfile } from '@/hooks/useProfile';
import TabNavigation from './TabNavigation';
import type { TabItem } from '@/types/components';
import PersonIcon from '@mui/icons-material/Person';
import HistoryIcon from '@mui/icons-material/History';
import LockResetIcon from '@mui/icons-material/LockReset';
import ProfileOverview from './ProfileOverview';
import ProfileGameHistory from './ProfileGameHistory';

// Password change form component
function ChangePasswordForm({
  onBack,
  onSubmit,
  loading,
  error,
  success,
}: {
  onBack: () => void;
  onSubmit: (e: React.FormEvent) => void;
  loading: boolean;
  error?: string | null;
  success?: string | null;
}) {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword1, setNewPassword1] = useState('');
  const [newPassword2, setNewPassword2] = useState('');
  const allFilled = oldPassword && newPassword1 && newPassword2;

  return (
    <>
      {error && (
        <Alert variant="danger" className="mb-0 rounded-0">
          {error}
        </Alert>
      )}
      {success && (
        <Alert variant="success" className="mb-0 rounded-0">
          {success}
        </Alert>
      )}
      <Form onSubmit={(e) => onSubmit(e)}>
        <Form.Group controlId="oldPassword">
          <Form.Label className="d-none">Current Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter current password"
            className={styles.input}
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            autoComplete="current-password"
          />
        </Form.Group>
        <Form.Group controlId="newPassword1">
          <Form.Label className="d-none">New Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter new password"
            className={styles.input}
            value={newPassword1}
            onChange={(e) => setNewPassword1(e.target.value)}
            autoComplete="new-password"
          />
        </Form.Group>
        <Form.Group controlId="newPassword2">
          <Form.Label className="d-none">Confirm New Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm new password"
            className={styles.input}
            value={newPassword2}
            onChange={(e) => setNewPassword2(e.target.value)}
            autoComplete="new-password"
          />
        </Form.Group>
        <div className="d-flex">
          <Button
            className={`${styles.btnRestart} ${styles.modalButton}`}
            type="submit"
            disabled={loading || !allFilled}
            icon={<LockResetIcon fontSize="small" />}
            text={loading ? 'Changing...' : 'Update Password'}
          />
          <Button
            className={`${styles.btnExit} ${styles.modalButton}`}
            onClick={onBack}
            type="button"
            disabled={loading}
            text="Back"
          />
        </div>
      </Form>
    </>
  );
}

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
  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordLoading(true);
    setPasswordError(null);
    setPasswordSuccess(null);

    // @ts-ignore - HTMLFormElement.elements is not strongly typed for namedItem access
    const form = e.target as HTMLFormElement;
    const oldPassword = (
      form.elements.namedItem('oldPassword') as HTMLInputElement
    )?.value;
    const newPassword1 = (
      form.elements.namedItem('newPassword1') as HTMLInputElement
    )?.value;
    const newPassword2 = (
      form.elements.namedItem('newPassword2') as HTMLInputElement
    )?.value;

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
      // Use your API endpoint for password change
      // You may want to move this to a hook for reuse
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
      // Only join string values, fallback to default error if empty
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

  return (
    <>
      {error && (
        <Alert variant="danger" className="mb-0 rounded-0">
          {error}
        </Alert>
      )}
      {success && (
        <Alert variant="success" className="mb-0 rounded-0">
          {success}
        </Alert>
      )}
      <TabNavigation
        activeKey={activeTab}
        tabs={tabs}
        onSelect={setActiveTab}
      />
      <Row className="py-4">
        {activeTab === 'overview' &&
          (!showPasswordTab ? (
            <ProfileOverview
              user={user}
              profile={profile}
              previewImage={previewImage}
              handleImageChange={handleImageChange}
              logout={logout}
              extraButton={
                <Button
                  className={`${styles.btnMain} ${styles.btnMenu}`}
                  variant="menu"
                  icon={<LockResetIcon />}
                  text="Change Password"
                  onClick={() => setShowPasswordTab(true)}
                  type="button"
                />
              }
            />
          ) : (
            <Col>
              <ChangePasswordForm
                onBack={() => setShowPasswordTab(false)}
                onSubmit={handlePasswordChange}
                loading={passwordLoading}
                error={passwordError}
                success={passwordSuccess}
              />
            </Col>
          ))}
        {activeTab === 'history' && (
          <ProfileGameHistory scores={scores} loadingScores={loadingScores} />
        )}
      </Row>
      {/* Always show bottom buttons */}
      {!showPasswordTab && (
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
      )}
    </>
  );
};

export default ProfileData;
