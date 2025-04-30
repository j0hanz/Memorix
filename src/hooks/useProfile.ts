import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { axiosReq } from '@/services/axios';
import gameService from '@/services/gameService';
import type { ApiError, UserScore } from '@/types/api';

export function useProfile() {
  const { profile, getProfile, user, isAuthenticated } = useAuth();
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
      fetchProfileData();
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
        } catch (err) {
          console.error('Failed to fetch scores:', err);
        } finally {
          setLoadingScores(false);
        }
      }
    };

    fetchScores();
  }, [user, isAuthenticated]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files?.[0];
    if (file) {
      setProfileImage(file);
      const reader = new FileReader();
      reader.onloadend = () => setPreviewImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleUpdateProfile = async (
    e: React.FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    e.preventDefault();
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
      await axiosReq.patch(`/api/profiles/${profile.id}/`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      await getProfile();
      setSuccess('Profile updated successfully!');
      setProfileImage(null);
      setPreviewImage(null);
    } catch (err) {
      console.error('Profile update error:', err);
      const errorObj = err as ApiError;
      if (errorObj.response?.data) {
        const errorMessages = Object.entries(errorObj.response.data)
          .map(
            ([key, value]) =>
              `${key}: ${Array.isArray(value) ? value.join(', ') : value}`,
          )
          .join('; ');
        setError(errorMessages || 'Failed to update profile');
      } else {
        setError('Failed to update profile. Please try again.');
      }
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
    profileImage,
    previewImage,
    handleImageChange,
    handleUpdateProfile,
    scores,
    loadingScores,
  };
}
