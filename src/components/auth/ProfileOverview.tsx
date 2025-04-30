import { Col } from 'react-bootstrap';
import Button from '@/components/Button';
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
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
  <>
    <Col className="my-4">
      <div className={styles.profileImageContainer}>
        <img
          src={previewImage || profile?.profile_picture_url}
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
      </div>
    </Col>
    <Col className="d-flex flex-column my-4">
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
            />
            {extraButton}
          </div>
        </>
      ) : (
        <span className={styles.accountInfo} />
      )}
    </Col>
  </>
);

export default ProfileOverview;
