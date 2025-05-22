import type { AxiosError, InternalAxiosRequestConfig } from 'axios';

import { axiosReq } from '@/services/axios';
import type { AuthResponse } from '@/types/services';
import {
  parseTokensFromResponse,
  tokenRefreshManager,
  tokenStorage,
  tokenValidator,
} from '@/utils/tokenUtils';

const AUTH_PATHS = [
  '/dj-rest-auth/login/',
  '/dj-rest-auth/registration/',
  '/dj-rest-auth/token/refresh/',
];

async function handleRefresh(
  config: InternalAxiosRequestConfig,
): Promise<InternalAxiosRequestConfig> {
  if (!tokenRefreshManager.getIsRefreshing()) {
    tokenRefreshManager.setIsRefreshing(true);
    try {
      const newToken = await refreshAccessToken();
      tokenRefreshManager.setIsRefreshing(false);

      if (newToken) {
        tokenRefreshManager.onRefreshed(newToken);
        config.headers.Authorization = `Bearer ${newToken}`;
        return config;
      }

      window.dispatchEvent(
        new CustomEvent('auth:logout', {
          detail: { reason: 'token-refresh-failed' },
        }),
      );
      throw new Error('Session expired');
    } catch (err) {
      tokenRefreshManager.setIsRefreshing(false);
      window.dispatchEvent(
        new CustomEvent('auth:logout', {
          detail: { reason: 'refresh-error' },
        }),
      );
      throw err instanceof Error ? err : new Error('Refresh error');
    }
  }

  return new Promise((resolve) => {
    tokenRefreshManager.subscribeTokenRefresh((token) => {
      if (config.headers && typeof config.headers.set === 'function') {
        config.headers.set('Authorization', `Bearer ${token}`);
      } else {
        config.headers.Authorization = `Bearer ${token}`;
      }
      resolve(config);
    });
  });
}

export async function refreshAccessToken(): Promise<string | null> {
  const refresh = tokenStorage.getRefreshToken();
  if (!refresh) {
    console.warn('No refresh token');
    tokenStorage.clearTokens();
    return null;
  }

  try {
    const res = await axiosReq.post('/dj-rest-auth/token/refresh/', {
      refresh,
    });
    const { accessToken } = parseTokensFromResponse(
      res.data as Partial<AuthResponse>,
    );
    if (accessToken) {
      tokenStorage.setToken(accessToken);
      return accessToken;
    }
    console.warn('No access token in refresh response');
  } catch (e) {
    const err = e as AxiosError;
    console.error(
      err.response?.status === 401
        ? 'Refresh token invalid'
        : 'Refresh failed:',
      err.message,
    );
  }

  tokenStorage.clearTokens();
  return null;
}

export function setupAxiosInterceptors(): void {
  axiosReq.interceptors.request.use(async (config) => {
    const url = config.url || '';
    if (AUTH_PATHS.some((p) => url.includes(p))) return config;

    const token = tokenStorage.getToken();
    if (!token) return config;

    if (tokenValidator.isTokenExpired(token)) {
      return handleRefresh(config);
    }

    config.headers.Authorization = `Bearer ${token}`;
    return config;
  });
}

setupAxiosInterceptors();
