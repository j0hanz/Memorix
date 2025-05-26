import type { AxiosRequestConfig } from 'axios';

import type { ApiRequestOptions, FileUploadOptions } from '@/types/services';

import { patch, post } from './apiService';

// This function uploads a file to the specified endpoint using a multipart/form-data request.
export async function uploadFile<T>(
  endpoint: string,
  file: File,
  options: FileUploadOptions = {},
): Promise<T> {
  const {
    method = 'POST',
    fieldName = 'file',
    additionalData = {},
    context = 'UploadService',
    errorMessage = 'Failed to upload file',
  } = options;

  const formData = new FormData();
  formData.append(fieldName, file);

  // Add any additional form data
  Object.entries(additionalData).forEach(([key, value]) => {
    formData.append(key, value);
  });

  const config: AxiosRequestConfig = {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  };

  const requestOptions: ApiRequestOptions = {
    context,
    errorMessage,
  };

  if (method === 'PATCH') {
    return patch<T>(endpoint, formData, requestOptions, config);
  }

  return post<T>(endpoint, formData, requestOptions, config);
}

// This function uploads a profile picture for a user profile using a PATCH request.
export async function uploadProfilePicture<T = unknown>(
  endpoint: string,
  file: File,
): Promise<T> {
  return uploadFile<T>(endpoint, file, {
    method: 'PATCH',
    fieldName: 'profile_picture',
    context: 'ProfileService',
    errorMessage: 'Failed to upload profile picture',
  });
}
