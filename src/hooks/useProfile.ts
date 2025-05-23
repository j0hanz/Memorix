import { useEffect, useState } from 'react';

import { useAuth, useToast } from '@/hooks/useProvider';
import { useServices } from '@/hooks/useServices';
import type { ProfileContextType } from '@/types/context';
import type { ProfileFormValues, UserScore } from '@/types/services';

export function useProfile(): ProfileContextType {
  const { profile, getProfile, user, isAuthenticated, logout } = useAuth();
  const { game, profile: profileService } = useServices();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [scores, setScores] = useState<UserScore[]>([]);
  const [scoresCount, setScoresCount] = useState(0);
  const [scoresPage, setScoresPage] = useState(1);
  const [loadingScores, setLoadingScores] = useState(false);
  const { showToast } = useToast();

  useEffect(() => {
    const fetchProfileData = async () => {
      await getProfile();
    };
    if (user && !profile) {
      void fetchProfileData();
    }
  }, [user, profile, getProfile]);

  useEffect(() => {
    const fetchScores = async () => {
      if (user && isAuthenticated) {
        setLoadingScores(true);
        try {
          const data = await game.getUserScores(scoresPage);
          setScores(data.results);
          setScoresCount(data.count);
        } catch {
          // Silent fail
        } finally {
          setLoadingScores(false);
        }
      }
    };

    void fetchScores();
  }, [user, isAuthenticated, scoresPage, game]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfileImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpdateProfile = async () => {
    if (!profileImage) {
      setError('Please select an image first');
      showToast('Please select an image first');
      return;
    }
    if (!profile?.id) {
      setError('No profile found');
      showToast('No profile found');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await profileService.uploadProfilePicture(profileImage);
      setSuccess('Profile picture updated successfully!');
      showToast('Profile picture updated successfully!');
      setProfileImage(null);
      setPreviewImage(null);
      await getProfile();
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Failed to update profile picture';
      setError(errorMessage);
      showToast(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const changePassword = (values: ProfileFormValues): Promise<boolean> => {
    console.log('Change password called with:', values);
    return Promise.resolve(false);
  };

  const handleDeleteAccount = (): Promise<void> => {
    console.log('Delete account called');
    return Promise.resolve();
  };

  const clearState = () => {
    setError(null);
    setSuccess(null);
    setProfileImage(null);
    setPreviewImage(null);
  };

  return {
    data: profile,
    loading,
    error,
    user,
    profileImage,
    previewImage,
    scores,
    scoresCount,
    scoresPage,
    loadingScores,
    success,
    setError,
    setSuccess,
    handleImageChange,
    handleUpdateProfile,
    setScoresPage,
    changePassword,
    handleDeleteAccount,
    logout,
    clearState,
  };
}
