import styles from '@/App.module.css';
import Button from '@/components/Button';
import type { ProfileAvatarProps } from '@/types/components';

export const ProfileAvatar = ({
  profilePictureUrl,
  onClick,
}: ProfileAvatarProps) =>
  profilePictureUrl ? (
    <Button
      onClick={onClick}
      className={styles.userInfoTopRight}
      aria-label="Open Profile"
      img={profilePictureUrl}
      imgAlt="Profile"
      imgClassName={styles.menuProfileImage}
    />
  ) : null;
