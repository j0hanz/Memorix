import type { InternalAxiosRequestConfig } from 'axios';
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
} from '@/utils/tokenUtils';

// Refresh the access token using the refresh token
export const refreshAccessToken = async (): Promise<string | null> => {
  try {
    const refresh = getRefreshToken();
    if (!refresh) {
      console.warn('No refresh token available');
      return null;
    }

    const response = await axiosReq.post('/dj-rest-auth/token/refresh/', {
      refresh,
    });
    const newToken = (response.data as { access: string }).access;

    if (newToken) {
      setToken(newToken);
      return newToken;
    }

    return null;
  } catch (error) {
    console.error('Failed to refresh token:', error);
    clearTokens();
    return null;
  }
};

// Configure Axios request interceptor for authentication
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

      // Handle token expiration
      if (isTokenExpired(token)) {
        if (!getIsRefreshing()) {
          setIsRefreshing(true);
          const newToken = await refreshAccessToken();
          setIsRefreshing(false);

          if (newToken) {
            token = newToken;
            onRefreshed(newToken);
            config.headers = config.headers || {};
            config.headers.Authorization = `Bearer ${newToken}`;
            return config;
          } else {
            // Trigger logout event
            window.dispatchEvent(new Event('auth:logout'));
            return Promise.reject(
              new Error('Authentication expired. Please log in again.'),
            );
          }
        }
        return new Promise<InternalAxiosRequestConfig<unknown>>((resolve) => {
          subscribeTokenRefresh((newToken: string) => {
            config.headers = config.headers || {};
            config.headers.Authorization = `Bearer ${newToken}`;
            resolve(config);
          });
        });
      }
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
