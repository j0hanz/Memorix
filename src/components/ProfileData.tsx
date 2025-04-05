import React, { useState } from 'react';
import { Form, Alert } from 'react-bootstrap';
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
      <div className="d-flex flex-column">
        <div className="row">
          <div className="col d-flex justify-content-start">
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
              <div className={styles.usernameOverlay}>{user.username}</div>
            </div>
          </div>
          <div className="col d-flex flex-column justify-content-end">
            <Form.Group>
              <Form.Label className="d-none">Profile Picture</Form.Label>
              <div className="d-flex align-items-center">
                <input
                  type="file"
                  id="profilePictureInput"
                  accept="image/*"
                  onChange={handleImageChange}
                  className={styles.fileInputHidden}
                />
                <div className={styles.btnImage}>
                  <label
                    htmlFor="profilePictureInput"
                    className={styles.clickableLabel}
                  >
                    <DriveFolderUploadIcon className={styles.btnImageIcon} />
                  </label>
                </div>
                <span>Upload image</span>
              </div>
              <Form.Text className="text-muted">
                Select a new profile picture to update
              </Form.Text>
            </Form.Group>
          </div>
        </div>
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
      </div>
    </Form>
  );
};

// Profile Settings Tab Component
const ProfileSettingsTab: React.FC<ProfileSettingsTabProps> = ({
  user,
  onClose,
}) => {
  return (
    <div>
      <h5>Account Settings</h5>
      <p>Username: {user.username}</p>
      <p>Account created: {user.id ? `User ID: ${user.id}` : 'N/A'}</p>
      <div className="d-flex mt-4">
        <Button
          className={`${styles.btnExit} ${styles.modalButton}`}
          onClick={onClose}
        >
          Close
        </Button>
      </div>
    </div>
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
