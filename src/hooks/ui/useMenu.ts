import { useEffect, useState } from 'react';

import { DELAYS } from '@/constants/game';
import { useAuth, useModal, useSound } from '@/hooks/shared/useProvider';

// Menu state handler
export function useMenuHandler() {
  const { isMuted, toggleMute } = useSound();
  const { isAuthenticated, user, profile, getProfile } = useAuth();
  const { openModal } = useModal();

  const [menuLoading, setMenuLoading] = useState(true);

  useEffect(() => {
    if (isAuthenticated && user && !profile) {
      void getProfile();
    }
  }, [isAuthenticated, user, profile, getProfile]);

  useEffect(() => {
    setMenuLoading(true);
    const timer = setTimeout(() => {
      setMenuLoading(false);
    }, DELAYS.SPINNER_DURATION);
    return () => {
      clearTimeout(timer);
    };
  }, [isAuthenticated, user, profile]);

  const handleProfileAvatarClick = () => {
    openModal('profile');
  };

  return {
    isMuted,
    toggleMute,
    isAuthenticated,
    profile,
    menuLoading,
    handleProfileAvatarClick,
  };
}
