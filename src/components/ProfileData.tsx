import React, { useState } from 'react';
import { Form, Alert, Row, Col, Container } from 'react-bootstrap';
import Button from '@/components/Button';
import styles from './styles/Modal.module.css';
import { useProfile } from '@/hooks/useProfile';
import SettingsIcon from '@mui/icons-material/Settings';
import ImageIcon from '@mui/icons-material/Image';
import TabNavigation from './TabNavigation';
import { ProfileImageTabProps, ProfileSettingsTabProps } from '@/types/api';
import { TabItem } from '@/types/components';
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';

// Profile Image Tab Component
const ProfileImageTab: React.FC<ProfileImageTabProps> = ({
  user,
  profile,
  loading,
  profileImage,
  previewImage,
  handleImageChange,
  handleUpdateProfile,
  onClose,
}) => {
  return (
    <Form onSubmit={handleUpdateProfile}>
      <Container fluid className="p-0">
        <Row className="p-4">
          <Col className="d-flex justify-content-start flex-column">
            <img
              src={previewImage || profile?.profile_picture_url || ''}
              alt="Profile"
              className={styles.profileImage}
              onError={(e) => console.error('Image load error:', e)}
            />
            <Button
              className={styles.btnUpload}
              icon={<DriveFolderUploadIcon fontSize="small" />}
            >
              <input
                type="file"
                id="profilePictureInput"
                accept="image/*"
                onChange={handleImageChange}
                className={styles.fileInputHidden}
              />
              <label
                htmlFor="profilePictureInput"
                className={styles.clickableLabel}
              >
                Upload
              </label>
            </Button>
          </Col>
          <Col xs="auto" className="d-flex flex-column">
            <div className={styles.profileUsername}>{user.username}</div>
            {profile ? (
              <>
                <span className={styles.accountInfo}>
                  Created:{' '}
                  {profile.created_at
                    ? new Date(profile.created_at).toLocaleDateString()
                    : 'N/A'}
                </span>
                <span className={styles.accountInfo}>
                  Updated:{' '}
                  {profile.updated_at
                    ? new Date(profile.updated_at).toLocaleDateString()
                    : 'N/A'}
                </span>
              </>
            ) : (
              <span className={styles.accountInfo}>
                Profile data not available
              </span>
            )}
          </Col>
          <Col className="d-flex flex-column justify-content-center text-center">
            <Form.Group>
              <Form.Label className="d-none">Profile Picture</Form.Label>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <div className="d-flex">
              <Button
                className={`${styles.btnRestart} ${styles.modalButton}`}
                type="submit"
                disabled={loading || !profileImage}
                text={loading ? 'Updating...' : 'Update Profile'}
              />

              <Button
                className={`${styles.btnExit} ${styles.modalButton}`}
                onClick={onClose}
                text="Close"
              />
            </div>
          </Col>
        </Row>
      </Container>
    </Form>
  );
};

// Profile Settings Tab Component
const ProfileSettingsTab: React.FC<ProfileSettingsTabProps> = ({
  user,
  onClose,
}) => {
  return (
    <Container className="p-0">
      <h5>Account Settings</h5>
      <p>Username: {user.username}</p>
      <p>
        Account created:{' '}
        {user.profile_id ? `User ID: ${user.profile_id}` : 'N/A'}
      </p>
      <Row className="mt-4">
        <Col>
          <Button
            className={`${styles.btnExit} ${styles.modalButton}`}
            onClick={onClose}
            text="Close"
          />
        </Col>
      </Row>
    </Container>
  );
};

// Main ProfileData component
const ProfileData: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [activeKey, setActiveKey] = useState<string>('image');
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
  } = useProfile();

  if (!user) {
    return <p>Please log in to view your profile</p>;
  }

  const tabs: TabItem[] = [
    {
      key: 'image',
      title: 'Profile Image',
      className: styles.navItemLeft,
      icon: <ImageIcon fontSize="small" className="me-1" />,
    },
    {
      key: 'settings',
      title: 'Settings',
      className: styles.navItemRight,
      icon: <SettingsIcon fontSize="small" className="me-1" />,
    },
  ];

  return (
    <>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}

      <TabNavigation
        activeKey={activeKey}
        tabs={tabs}
        onSelect={setActiveKey}
      />

      {activeKey === 'image' && (
        <ProfileImageTab
          user={user}
          profile={profile}
          loading={loading}
          profileImage={profileImage}
          previewImage={previewImage}
          handleImageChange={handleImageChange}
          handleUpdateProfile={handleUpdateProfile}
          onClose={onClose}
          error={error}
          success={success}
        />
      )}
      {activeKey === 'settings' && (
        <ProfileSettingsTab user={user} onClose={onClose} />
      )}
    </>
  );
};

export default ProfileData;
