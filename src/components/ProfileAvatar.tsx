import styles from '@/App.module.css';
import { Button } from '@/components/Button';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { useModal } from '@/hooks/useProvider';
import type { ProfileAvatarProps } from '@/types/components';

export const ProfileAvatar = ({
  profilePictureUrl,
  onClick,
}: ProfileAvatarProps) => {
  const { openModal } = useModal();

  return profilePictureUrl ? (
    <ProtectedRoute
      onAuthRequired={() => {
        openModal('auth');
      }}
    >
      <Button
        onClick={onClick}
        className={styles.userInfoTopRight}
        aria-label="Open Profile"
        img={profilePictureUrl}
        imgAlt="Profile"
        imgClassName={styles.menuProfileImage}
        color="transparent"
        tooltip="Profile"
        tooltipPlacement="bottom"
      />
    </ProtectedRoute>
  ) : null;
};
