import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import LockResetIcon from '@mui/icons-material/LockReset';
import LogoutIcon from '@mui/icons-material/Logout';
import { useEffect, useState } from 'react';
import { Col } from 'react-bootstrap';

import { Button } from '@/components/Button';
import { Image } from '@/components/Image';
import styles from '@/components/styles/Modal.module.css';
import { useProfile } from '@/hooks/useProvider';

const formatDate = (date?: string) =>
  date ? new Date(date).toLocaleDateString() : 'N/A';

interface ProfileOverviewComponentProps {
  onPasswordClick: () => void;
  onDeleteClick: () => void;
  logout: () => void;
}

export function ProfileOverview({
  onPasswordClick,
  onDeleteClick,
  logout,
}: ProfileOverviewComponentProps) {
  const { user, data: profile, previewImage, handleImageChange } = useProfile();
  const [imageKey, setImageKey] = useState<number>(0);

  // Force re-render of image when profile picture changes
  useEffect(() => {
    setImageKey((prev) => prev + 1);
  }, [profile?.profile_picture_url, previewImage]);

  const imageSrc = previewImage || profile?.profile_picture_url || '';

  return (
    <Col className="d-flex justify-content-between align-items-center my-3">
      <div className={styles.profileImageContainer}>
        <Image
          key={imageKey}
          src={imageSrc}
          alt="Profile"
          className={styles.profileImage}
          fallbackSrc="/img/fallback.webp"
        />
        <Button
          className={`${styles.btnSolo} ${styles.btnMain}`}
          icon={<DriveFolderUploadIcon fontSize="small" />}
          color="secondary"
          text="Upload"
          variant="menu"
          onClick={() => {
            document.getElementById('profilePictureInput')?.click();
          }}
          aria-controls="profilePictureInput"
        />
        <input
          type="file"
          id="profilePictureInput"
          accept="image/*"
          onChange={handleImageChange}
          className={styles.fileInputHidden}
          aria-label="Upload"
        />
      </div>

      {profile ? (
        <>
          <span className={styles.accountInfo}>
            Created: {formatDate(profile.created_at)}
          </span>
          <span className={styles.accountInfo}>
            Updated: {formatDate(profile.updated_at)}
          </span>
          <div className={styles.menuButtons}>
            <div className={styles.profileUsername}>{user?.username}</div>
            <Button
              onClick={logout}
              className={`${styles.btnMain} ${styles.btnLogout}`}
              variant="menu"
              text="Sign Out"
              icon={<LogoutIcon fontSize="small" />}
              color="secondary"
            />
            <Button
              className={styles.btnMain}
              variant="menu"
              text="Change Password"
              onClick={onPasswordClick}
              type="button"
              color="secondary"
              icon={<LockResetIcon fontSize="small" />}
            />
            <Button
              className={`${styles.btnMain} ${styles.btnSolo}`}
              variant="menu"
              text="Delete Account"
              onClick={onDeleteClick}
              type="button"
              icon={<DeleteOutlineIcon fontSize="small" />}
              color="secondary"
            />
          </div>
        </>
      ) : (
        <span className={styles.accountInfo} />
      )}
    </Col>
  );
}
