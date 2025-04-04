import axios from 'axios';
import {
  getToken,
  clearTokens,
  isTokenExpired,
  refreshAccessToken,
} from '@/utils/jwt';

const baseURL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/';

export const axiosReq = axios.create({
  baseURL,
  headers: { 'Content-Type': 'application/json' },
  timeout: 10000,
});

axiosReq.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (!token) return config;

    config.headers = config.headers || {};

    // Refresh token if it's about to expire (within 30 seconds)
    if (isTokenExpired(token)) {
      refreshAccessToken()
        .then((newToken) => {
          if (newToken) {
            config.headers = config.headers || {};
            config.headers.Authorization = `Bearer ${newToken}`;
          }
        })
        .catch((error) => {
          console.error('Error refreshing token:', error);
        });
    } else {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

axiosReq.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (
      !originalRequest ||
      !error.response ||
      error.response.status !== 401 ||
      originalRequest._retry
    ) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;
    const newToken = await refreshAccessToken();

    if (newToken) {
      originalRequest.headers = originalRequest.headers || {};
      originalRequest.headers.Authorization = `Bearer ${newToken}`;
      return axiosReq(originalRequest);
    } else {
      clearTokens();
      window.dispatchEvent(new CustomEvent('auth:logout'));
      return Promise.reject(error);
    }
  },
);
