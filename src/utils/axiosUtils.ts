import type { AxiosError, InternalAxiosRequestConfig } from 'axios';

import { axiosReq } from '@/services/axios';
import {
  clearTokens,
  getIsRefreshing,
  getRefreshToken,
  getToken,
  isTokenExpired,
  onRefreshed,
  parseTokensFromResponse,
  setIsRefreshing,
  setToken,
  subscribeTokenRefresh,
} from '@/utils/tokenUtils';

// Function to refresh the access token using the refresh token.
export const refreshAccessToken = async (): Promise<string | null> => {
  const refresh = getRefreshToken();
  // Check if refresh token is available
  if (!refresh) {
    console.warn('No refresh token found. Cannot refresh access token.');
    clearTokens();
    return null;
  }
  try {
    const response = await axiosReq.post('/dj-rest-auth/token/refresh/', {
      refresh,
    });
    // Check if the response contains a new access token
    const { accessToken } = parseTokensFromResponse(response.data);

    if (accessToken) {
      setToken(accessToken);
      return accessToken;
    } else {
      console.warn('No access token found in the response.');
      clearTokens();
      return null;
    }
  } catch (error) {
    const axiosError = error as AxiosError;
    if (axiosError.response?.status === 401) {
      console.error('Unauthorized: Refresh token may be invalid or expired.');
    } else {
      console.error('Failed to refresh access token:', axiosError.message);
    }
    clearTokens();
    return null;
  }
};

// Handles the case when the access token is expired.
async function handleExpiredToken(
  config: InternalAxiosRequestConfig,
): Promise<InternalAxiosRequestConfig> {
  if (!getIsRefreshing()) {
    // If no refresh is in progress, initiate one.
    setIsRefreshing(true);
    try {
      const newToken = await refreshAccessToken();
      setIsRefreshing(false);
      if (newToken) {
        // If token refresh is successful, update the request with the new token.
        onRefreshed(newToken);
        config.headers = config.headers || {};
        config.headers.Authorization = `Bearer ${newToken}`;
        return config;
      } else {
        // If token refresh fails, clear tokens and notify the user.
        window.dispatchEvent(
          new CustomEvent('auth:logout', {
            detail: { reason: 'token-refresh-failed' },
          }),
        );
        return Promise.reject(
          new Error('Authentication expired. Please log in again.'),
        );
      }
    } catch (error) {
      setIsRefreshing(false);
      window.dispatchEvent(
        new CustomEvent('auth:logout', { detail: { reason: 'refresh-error' } }),
      );
      return Promise.reject(error);
    }
  } else {
    // If a refresh is already in progress, wait for it to finish.
    return new Promise<InternalAxiosRequestConfig>((resolve) => {
      subscribeTokenRefresh((newToken: string) => {
        config.headers = config.headers || {};
        config.headers.Authorization = `Bearer ${newToken}`;
        resolve(config);
      });
    });
  }
}

const setupAxiosInterceptors = (): void => {
  // Add a request interceptor to attach the token to requests.
  axiosReq.interceptors.request.use(
    async (config: InternalAxiosRequestConfig) => {
      // Check if the request is for an authentication endpoint.
      const isAuthEndpoint =
        config.url?.includes('/dj-rest-auth/login/') ||
        config.url?.includes('/dj-rest-auth/registration/') ||
        config.url?.includes('/dj-rest-auth/token/refresh/');
      if (isAuthEndpoint) {
        return config;
      }
      const token = getToken();
      if (!token) {
        // No token available, proceed without it.
        return config;
      }
      if (isTokenExpired(token)) {
        // Token is expired, attempt to refresh it.
        return handleExpiredToken(config);
      }
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    },
  );
};

setupAxiosInterceptors();

export { setupAxiosInterceptors };
