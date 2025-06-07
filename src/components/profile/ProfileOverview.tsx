import { useEffect, useRef, useState } from 'react';
import { Col } from 'react-bootstrap';

import { Button } from '@/components/buttons/Button';
import btnStyles from '@/components/buttons/styles/Button.module.css';
import styles from '@/components/modals/styles/Modal.module.css';
import { Image } from '@/components/ui/Image';
import { useProfile } from '@/hooks/shared/useProvider';
import { formatDate } from '@/utils/shared/formatUtils';
import { AUTH_ICONS } from '@/utils/ui/iconUtils';

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
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Force re-render of image when profile picture changes
  useEffect(() => {
    setImageKey((prev) => prev + 1);
  }, [profile?.profile_picture_url, previewImage]);

  const imageSrc = previewImage || profile?.profile_picture_url || '';

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

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
          className={`${btnStyles.btnEnd} ${btnStyles.btnProfileMenu}`}
          icon={AUTH_ICONS.upload()}
          color="secondary"
          text="Upload"
          variant="menu"
          onClick={handleUploadClick}
          aria-controls="profilePictureInput"
        />
        <input
          ref={fileInputRef}
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
          <div className={btnStyles.menuButtons}>
            <div className={styles.profileUsername}>{user?.username}</div>
            <Button
              onClick={logout}
              className={`${btnStyles.btnProfileMenu} ${btnStyles.btnStart}`}
              variant="menu"
              text="Sign Out"
              icon={AUTH_ICONS.logout()}
              color="secondary"
            />
            <Button
              className={`${btnStyles.btnProfileMenu} ${btnStyles.btnMenu}`}
              variant="menu"
              text="Change Password"
              onClick={onPasswordClick}
              type="button"
              color="secondary"
              icon={AUTH_ICONS.password()}
            />
            <Button
              className={`${btnStyles.btnProfileMenu} ${btnStyles.btnEnd}`}
              variant="menu"
              text="Delete Account"
              onClick={onDeleteClick}
              type="button"
              icon={AUTH_ICONS.deleteAccount()}
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
