import React, { useState } from 'react';
import { Form, Alert, Row, Col, Container } from 'react-bootstrap';
import Button from '@/components/Button';
import styles from './styles/Modal.module.css';
import Image from '@/components/Image';
import { useProfile } from '@/hooks/useProfile';
import SettingsIcon from '@mui/icons-material/Settings';
import ImageIcon from '@mui/icons-material/Image';
import TabNavigation from './TabNavigation';
import { ProfileImageTabProps, ProfileSettingsTabProps } from '@/types/api';
import { TabItem } from '@/types/components';
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';

// Utility function for handling image error
const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
  const target = e.target as HTMLImageElement;
  target.onerror = null;
  target.src =
    'https://res.cloudinary.com/dxly7tpdi/image/upload/nobody_nrbk5n';
};

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
          <Col className="d-flex justify-content-start">
            <div className="position-relative">
              <Image
                src={
                  previewImage ||
                  profile?.profile_picture_url ||
                  'https://res.cloudinary.com/dxly7tpdi/image/upload/nobody_nrbk5n'
                }
                alt="Profile"
                className={styles.profileImage}
                onError={handleImageError}
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
            </div>
          </Col>
          <Col xs="auto" className="d-flex flex-column">
            <div className={styles.profileUsername}>{user.username}</div>
            <span className={styles.accountInfo}>
              {user.id ? `User ID: ${user.id}` : 'Account details unavailable'}
            </span>
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
              >
                {loading ? 'Updating...' : 'Update Profile'}
              </Button>
              <Button
                className={`${styles.btnExit} ${styles.modalButton}`}
                onClick={onClose}
              >
                Close
              </Button>
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
      <p>Account created: {user.id ? `User ID: ${user.id}` : 'N/A'}</p>
      <Row className="mt-4">
        <Col>
          <Button
            className={`${styles.btnExit} ${styles.modalButton}`}
            onClick={onClose}
          >
            Close
          </Button>
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
