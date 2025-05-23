import type { Profile } from '@/types/data';

import { deleteRequest, get, getList, patch } from './apiService';

const ENDPOINTS = {
  profiles: '/api/profiles/',
  profileDetail: (id: number) => `/api/profiles/${id.toString()}/`,
  currentProfile: '/api/profiles/me/',
} as const;

export async function getProfiles(): Promise<Profile[]> {
  return getList<Profile>(ENDPOINTS.profiles, undefined, {
    context: 'ProfileService',
    errorMessage: 'Failed to fetch profiles',
  });
}

export async function getProfile(id: number): Promise<Profile> {
  return get<Profile>(ENDPOINTS.profileDetail(id), undefined, {
    context: 'ProfileService',
    errorMessage: 'Failed to fetch profile',
  });
}

export async function getCurrentProfile(): Promise<Profile> {
  return get<Profile>(ENDPOINTS.currentProfile, undefined, {
    context: 'ProfileService',
    errorMessage: 'Failed to fetch current profile',
  });
}

export async function updateProfile(
  id: number,
  data: Partial<Profile>,
): Promise<Profile> {
  return patch<Profile>(ENDPOINTS.profileDetail(id), data, {
    context: 'ProfileService',
    errorMessage: 'Failed to update profile',
  });
}

export async function updateCurrentProfile(
  data: Partial<Profile>,
): Promise<Profile> {
  return patch<Profile>(ENDPOINTS.currentProfile, data, {
    context: 'ProfileService',
    errorMessage: 'Failed to update profile',
  });
}

export async function uploadProfilePicture(file: File): Promise<Profile> {
  const formData = new FormData();
  formData.append('profile_picture', file);

  return patch<Profile>(
    ENDPOINTS.currentProfile,
    formData,
    {
      context: 'ProfileService',
      errorMessage: 'Failed to upload profile picture',
    },
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  );
}

export async function deleteProfile(id: number): Promise<void> {
  await deleteRequest<Record<string, never>>(ENDPOINTS.profileDetail(id), {
    context: 'ProfileService',
    errorMessage: 'Failed to delete profile',
  });
}
