import type { InternalAxiosRequestConfig, AxiosError } from 'axios';
import { axiosReq } from '@/api/axios';
import {
  getToken,
  getRefreshToken,
  setToken,
  isTokenExpired,
  clearTokens,
  onRefreshed,
  subscribeTokenRefresh,
  getIsRefreshing,
  setIsRefreshing,
  parseTokensFromResponse,
} from '@/utils/tokenUtils';

// Improved refresh token function with better error handling
export const refreshAccessToken = async (): Promise<string | null> => {
  try {
    const refresh = getRefreshToken();
    if (!refresh) {
      console.warn('No refresh token available');
      clearTokens(); // Clear any potentially invalid tokens
      return null;
    }

    const response = await axiosReq.post('/dj-rest-auth/token/refresh/', {
      refresh,
    });

    const { accessToken } = parseTokensFromResponse(response.data);

    if (accessToken) {
      setToken(accessToken);
      return accessToken;
    }

    console.warn('Access token not found in refresh response');
    return null;
  } catch (error) {
    const axiosError = error as AxiosError;

    if (axiosError.response?.status === 401) {
      console.error('Refresh token invalid or expired');
    } else {
      console.error('Failed to refresh token:', axiosError.message);
    }

    clearTokens();
    return null;
  }
};

// Configure Axios request interceptor for authentication with improved error handling
const setupAxiosInterceptors = (): void => {
  axiosReq.interceptors.request.use(
    async (config: InternalAxiosRequestConfig) => {
      // Skip auth for authentication endpoints
      const isAuthEndpoint =
        config.url?.includes('/dj-rest-auth/login/') ||
        config.url?.includes('/dj-rest-auth/registration/') ||
        config.url?.includes('/dj-rest-auth/token/refresh/');

      if (isAuthEndpoint) return config;

      let token = getToken();
      if (!token) return config;

      // Handle token expiration with better error recovery
      if (isTokenExpired(token)) {
        if (!getIsRefreshing()) {
          setIsRefreshing(true);
          try {
            const newToken = await refreshAccessToken();
            setIsRefreshing(false);

            if (newToken) {
              token = newToken;
              onRefreshed(newToken);
              config.headers = config.headers || {};
              config.headers.Authorization = `Bearer ${newToken}`;
              return config;
            } else {
              // Trigger logout event with more context
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
            // Handle unexpected errors during refresh
            window.dispatchEvent(
              new CustomEvent('auth:logout', {
                detail: { reason: 'refresh-error' },
              }),
            );
            return Promise.reject(error);
          }
        }

        // Wait for the ongoing refresh to complete
        return new Promise<InternalAxiosRequestConfig<unknown>>((resolve) => {
          subscribeTokenRefresh((newToken: string) => {
            config.headers = config.headers || {};
            config.headers.Authorization = `Bearer ${newToken}`;
            resolve(config);
          });
        });
      }

      // Normal case: Add token to request
      if (config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
    },
    (error) => Promise.reject(error),
  );
};

// Initialize interceptors on import
setupAxiosInterceptors();

export { setupAxiosInterceptors };
