import { jwtDecode } from 'jwt-decode';
import { axiosReq } from '@/api/axios';
import { InternalAxiosRequestConfig } from 'axios';

// State for token refresh process
let isRefreshing = false;
let refreshSubscribers: ((token: string) => void)[] = [];

// Token helpers
const getToken = (): string | null => localStorage.getItem('token');
const getRefreshToken = (): string | null =>
  localStorage.getItem('refreshToken');

export const isTokenExpired = (token: string): boolean => {
  try {
    const { exp } = jwtDecode<{ exp: number }>(token);
    return exp * 1000 < Date.now();
  } catch (error) {
    console.error('Error decoding token:', error);
    return true;
  }
};

const clearTokens = (): void => {
  localStorage.removeItem('token');
  localStorage.removeItem('refreshToken');
};

const subscribeTokenRefresh = (callback: (token: string) => void): void => {
  refreshSubscribers.push(callback);
};

const onRefreshed = (token: string): void => {
  refreshSubscribers.forEach((callback) => callback(token));
  refreshSubscribers = [];
};

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
      localStorage.setItem('token', newToken);
      return newToken;
    }

    return null;
  } catch (error) {
    console.error('Failed to refresh token:', error);
    clearTokens();
    return null;
  }
};

// Axios request interceptor to handle authentication
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
      if (!isRefreshing) {
        isRefreshing = true;
        const newToken = await refreshAccessToken();
        isRefreshing = false;

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
