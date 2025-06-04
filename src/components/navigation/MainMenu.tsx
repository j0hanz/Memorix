import { motion } from 'framer-motion';
import { Suspense } from 'react';

import styles from '@/App.module.css';
import { MenuButton } from '@/components/buttons/MenuButton';
import { Toast } from '@/components/feedback/Toast';
import { ProfileAvatar } from '@/components/profile/ProfileAvatar';
import btnStyles from '@/components/styles/Button.module.css';
import { SoundToggle } from '@/components/ui/SoundToggle';
import { LoadingCardSpinner } from '@/components/ui/Spinner';
import { useMenuHandler } from '@/hooks/ui/useMenu';
import type { MainMenuProps } from '@/types/components';
import { MENU_ICONS } from '@/utils/iconUtils';

export const MainMenu = ({
  startGame,
  openInstructions,
  openLatestUpdates,
  enterAnimation,
  openLeaderboardModal,
  handleAccountClick,
}: MainMenuProps) => {
  const {
    isMuted,
    toggleMute,
    isAuthenticated,
    profile,
    showAuthToast,
    authMessage,
    menuLoading,
    handleProfileAvatarClick,
    handleCloseAuthToast,
  } = useMenuHandler();

  return (
    <div className={styles.menu}>
      <ProfileAvatar
        profilePictureUrl={profile?.profile_picture_url}
        onClick={handleProfileAvatarClick}
      />
      <motion.div
        initial={enterAnimation.initial}
        animate={enterAnimation.animate}
        transition={enterAnimation.transition}
      >
        <div className={styles.gameTitle}>Memorix</div>
      </motion.div>
      <Suspense
        fallback={<LoadingCardSpinner isLoading={true} message="Loading..." />}
      >
        {menuLoading ? (
          <LoadingCardSpinner isLoading={true} message="Loading..." />
        ) : (
          <div className={btnStyles.menuButtons}>
            <MenuButton
              onClick={startGame}
              className={`${btnStyles.btnMain} ${btnStyles.btnStart}`}
              icon={MENU_ICONS.play()}
              text="Start Game"
              color="primary"
            />
            <MenuButton
              onClick={handleAccountClick}
              className={`${btnStyles.btnMain} ${btnStyles.btnMenu}`}
              icon={MENU_ICONS.person()}
              text={isAuthenticated ? 'Profile' : 'Account'}
            />
            <MenuButton
              onClick={openLeaderboardModal}
              className={`${btnStyles.btnMain} ${btnStyles.btnMenu}`}
              icon={MENU_ICONS.trophy()}
              text="Leaderboard"
            />
            <MenuButton
              onClick={openInstructions}
              className={`${btnStyles.btnMain} ${btnStyles.btnMenu}`}
              icon={MENU_ICONS.info()}
              text="Guide"
            />
            <MenuButton
              onClick={openLatestUpdates}
              className={`${btnStyles.btnMain} ${btnStyles.btnEnd}`}
              icon={MENU_ICONS.updates()}
              text="Updates"
            />
            <div className={btnStyles.bottomMenu}>
              <SoundToggle isMuted={isMuted} onToggle={toggleMute} />
            </div>
          </div>
        )}
      </Suspense>

      <Toast
        message={authMessage}
        show={showAuthToast}
        placement="top"
        onClose={handleCloseAuthToast}
      />
    </div>
  );
};
