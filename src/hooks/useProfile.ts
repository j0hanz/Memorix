import { useEffect, useState } from 'react';

import { useAuth } from '@/hooks/useAuth';
import { useForm } from '@/hooks/useForm';
import { axiosReq } from '@/services/axios';
import { gameService } from '@/services/gameService';
import type { ApiError, UserScore } from '@/types/api';
import { formatErrorMessage } from '@/utils/errorUtils';
import { profilePasswordValidationRules } from '@/utils/validation';

export function useProfile() {
  const { profile, getProfile, user, isAuthenticated, logout } = useAuth();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [scores, setScores] = useState<UserScore[]>([]);
  const [loadingScores, setLoadingScores] = useState<boolean>(false);

  useEffect(() => {
    const fetchProfileData = async () => {
      await getProfile();
    };
    if (user && !profile) {
      void fetchProfileData();
    }
  }, [user, profile, getProfile]);

  // Fetch user scores
  useEffect(() => {
    const fetchScores = async () => {
      if (user && isAuthenticated) {
        setLoadingScores(true);
        try {
          const data = await gameService.getUserScores();
          setScores(data);
        } catch {
          // Ignore errors when fetching scores
        } finally {
          setLoadingScores(false);
        }
      }
    };

    void fetchScores();
  }, [user, isAuthenticated]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
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

  const handleUpdateProfile = async (
    e?: React.FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    if (e) {
      e.preventDefault();
    }
    if (!profileImage) {
      setError('Please select an image first');
      return;
    }
    if (!profile?.id) {
      setError('Could not update profile: Profile ID not found');
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
      setProfileImage(null);
      setPreviewImage(null);
    } catch (err) {
      setError(
        formatErrorMessage(err as ApiError) || 'Failed to update profile',
      );
    } finally {
      setLoading(false);
    }
  };

  // Password change form
  const passwordForm = useForm(
    { oldPassword: '', newPassword1: '', newPassword2: '' },
    profilePasswordValidationRules,
    async (values) => {
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
        return true;
      } catch (err) {
        setError(formatErrorMessage(err as ApiError));
        return false;
      } finally {
        setLoading(false);
      }
    },
  );

  // Delete account handler
  const handleDeleteAccount = async (): Promise<void> => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      await axiosReq.delete('/api/delete-account/');
      setSuccess('Account deleted successfully.');
      setTimeout(() => {
        logout();
      }, 1200);
    } catch (err) {
      setError(
        formatErrorMessage(err as ApiError) ||
          'Failed to delete account. Please try again.',
      );
    } finally {
      setLoading(false);
    }
  };

  return {
    user,
    profile,
    loading,
    error,
    success,
    setError,
    setSuccess,
    profileImage,
    previewImage,
    handleImageChange,
    handleUpdateProfile,
    scores,
    loadingScores,
    passwordForm,
    handleDeleteAccount,
  };
}
