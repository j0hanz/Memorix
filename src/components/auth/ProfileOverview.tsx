import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import LogoutIcon from '@mui/icons-material/Logout';
import { Col } from 'react-bootstrap';

import Button from '@/components/Button';
import styles from '@/components/styles/Modal.module.css';
import type { ProfileOverviewProps } from '@/types/components';

const formatDate = (date?: string) =>
  date ? new Date(date).toLocaleDateString() : 'N/A';

export const ProfileOverview: React.FC<
  ProfileOverviewProps & { logout: () => void; extraButton?: React.ReactNode }
> = ({
  user,
  profile,
  previewImage,
  handleImageChange,
  logout,
  extraButton,
}) => (
  <Col className="d-flex justify-content-around align-items-center my-3">
    <div className={styles.profileImageContainer}>
      <img
        src={previewImage || profile?.profile_picture_url}
        alt="Profile"
        className={styles.profileImage}
        onError={(e) => {
          console.error('Image load error:', e);
        }}
      />
      <Button
        className={`${styles.btnUpload} ${styles.btnMain}`}
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
          {user.username}
          <Button
            onClick={logout}
            className={`${styles.btnMain} ${styles.btnLogout}`}
            variant="menu"
            text="Sign Out"
            icon={<LogoutIcon fontSize="small" />}
            color="secondary"
          />
          {extraButton}
        </div>
      </>
    ) : (
      <span className={styles.accountInfo} />
    )}
  </Col>
);
