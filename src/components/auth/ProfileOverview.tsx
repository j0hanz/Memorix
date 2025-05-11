import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import LogoutIcon from '@mui/icons-material/Logout';
import { Col } from 'react-bootstrap';

import Button from '@/components/Button';
import styles from '@/components/styles/Modal.module.css';
import type { ProfileOverviewProps } from '@/types/components';

const formatDate = (date?: string) =>
  date ? new Date(date).toLocaleDateString() : 'N/A';

const ProfileOverview: React.FC<
  ProfileOverviewProps & { logout: () => void; extraButton?: React.ReactNode }
> = ({
  user,
  profile,
  previewImage,
  handleImageChange,
  logout,
  extraButton,
}) => (
  <div className="d-flex flex-row align-items-center p-3">
    <div className={styles.profileImageContainer}>
      <Col className="d-flex flex-column justify-content-center">
        <div>
          <img
            src={previewImage || profile?.profile_picture_url}
            alt="Profile"
            className={styles.profileImage}
            onError={(e) => {
              console.error('Image load error:', e);
            }}
          />
          <Button
            className={styles.btnUpload}
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
      </Col>
    </div>
    <Col className="d-flex flex-column">
      <div className={styles.profileUsername}>{user.username}</div>
      {profile ? (
        <>
          <span className={styles.accountInfo}>
            Created: {formatDate(profile.created_at)}
          </span>
          <span className={styles.accountInfo}>
            Updated: {formatDate(profile.updated_at)}
          </span>
          <div className={styles.menuButtons}>
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
  </div>
);

export default ProfileOverview;
