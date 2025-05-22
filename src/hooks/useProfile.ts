import { useEffect, useState } from 'react';

import { useAuth, useToast } from '@/hooks/useProvider';
import { axiosReq } from '@/services/axios';
import { gameService } from '@/services/gameService';
import type { ProfileContextType } from '@/types/context';
import type { ApiError, ProfileFormValues, UserScore } from '@/types/services';
import { formatErrorMessage } from '@/utils/errorUtils';

export function useProfile(): ProfileContextType {
  const { profile, getProfile, user, isAuthenticated, logout } = useAuth();
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
          const data = await gameService.getUserScores(scoresPage);
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
  }, [user, isAuthenticated, scoresPage]);

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
      setError('Could not update profile: Profile ID not found');
      showToast('Could not update profile: Profile ID not found');
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const formData = new FormData();
      formData.append('profile_picture', profileImage);
      await axiosReq.patch(`/api/profiles/${String(profile.id)}/`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      await getProfile();
      setSuccess('Profile updated successfully!');
      showToast('Profile updated successfully!');
      setProfileImage(null);
      setPreviewImage(null);
    } catch (err) {
      const msg =
        formatErrorMessage(err as ApiError) || 'Failed to update profile';
      setError(msg);
      showToast(msg);
    } finally {
      setLoading(false);
    }
  };

  const changePassword = async (values: ProfileFormValues) => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      await axiosReq.post('/dj-rest-auth/password/change/', {
        old_password: values.oldPassword,
        new_password1: values.newPassword1,
        new_password2: values.newPassword2,
      });
      setSuccess('Password changed successfully!');
      showToast('Password changed successfully!');
      return true;
    } catch (err) {
      const msg = formatErrorMessage(err as ApiError);
      setError(msg);
      showToast(msg);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      await axiosReq.delete('/api/delete-account/');
      setSuccess('Account deleted successfully.');
      showToast('Account deleted successfully.');
      setTimeout(() => {
        logout();
      }, 1200);
    } catch (err) {
      const msg =
        formatErrorMessage(err as ApiError) ||
        'Failed to delete account. Please try again.';
      setError(msg);
      showToast(msg);
    } finally {
      setLoading(false);
    }
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
    success,
    setError,
    setSuccess,
    profileImage,
    previewImage,
    handleImageChange,
    handleUpdateProfile,
    scores,
    scoresCount,
    scoresPage,
    setScoresPage,
    loadingScores,
    changePassword,
    handleDeleteAccount,
    logout,
    clearState,
  };
}
