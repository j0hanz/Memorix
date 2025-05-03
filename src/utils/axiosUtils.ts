import type { AxiosError, InternalAxiosRequestConfig } from 'axios';

import { axiosReq } from '@/services/axios';
import type { AuthResponse } from '@/types/auth';
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
  if (!refresh) {
    console.warn('No refresh token found. Cannot refresh access token.');
    clearTokens();
    return null;
  }
  try {
    const response = await axiosReq.post('/dj-rest-auth/token/refresh/', {
      refresh,
    });
    // Extract access token from the response
    const { accessToken } = await parseTokensFromResponse(
      response.data as Partial<AuthResponse>,
    );

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
    if (axiosError.response && axiosError.response.status === 401) {
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
    setIsRefreshing(true);
    try {
      const newToken = await refreshAccessToken();
      setIsRefreshing(false);
      if (newToken) {
        onRefreshed(newToken);
        config.headers = config.headers || {};
        config.headers.Authorization = `Bearer ${newToken}`;
        return config;
      } else {
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
      return Promise.reject(
        error instanceof Error ? error : new Error('Token refresh error'),
      );
    }
  } else {
    return await new Promise<InternalAxiosRequestConfig>((resolve) => {
      subscribeTokenRefresh((newToken: string) => {
        config.headers = config.headers || {};
        config.headers.Authorization = `Bearer ${newToken}`;
        resolve(config);
      });
    });
  }
}

const setupAxiosInterceptors = (): void => {
  axiosReq.interceptors.request.use(
    async (config: InternalAxiosRequestConfig) => {
      const isAuthEndpoint =
        config.url?.includes('/dj-rest-auth/login/') ||
        config.url?.includes('/dj-rest-auth/registration/') ||
        config.url?.includes('/dj-rest-auth/token/refresh/');
      if (isAuthEndpoint) {
        return config;
      }
      const token = getToken();
      if (!token) {
        return config;
      }
      if (isTokenExpired(token)) {
        return await handleExpiredToken(config);
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
