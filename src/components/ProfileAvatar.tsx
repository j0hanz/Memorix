import styles from '@/App.module.css';
import type { ProfileAvatarProps } from '@/types/components';

export const ProfileAvatar = ({
  profilePictureUrl,
  onClick,
}: ProfileAvatarProps) =>
  profilePictureUrl ? (
    <div className={styles.userInfoTopRight}>
      <img
        src={profilePictureUrl}
        alt="Profile"
        className={styles.menuProfileImage}
        onClick={onClick}
      />
    </div>
  ) : null;
