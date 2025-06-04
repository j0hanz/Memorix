import type { AxiosError, InternalAxiosRequestConfig } from 'axios';

import { AUTH_ENDPOINTS } from '@/constants/api';
import type { AuthResponse } from '@/types/services';
import { axiosReq } from '@/utils/api/axios';
import { tokenManager } from '@/utils/auth/tokenUtils';

const AUTH_PATHS = [
  AUTH_ENDPOINTS.login,
  AUTH_ENDPOINTS.register,
  AUTH_ENDPOINTS.refresh,
];

async function handleTokenRefresh(
  config: InternalAxiosRequestConfig,
): Promise<InternalAxiosRequestConfig> {
  // Check if we are already refreshing
  if (tokenManager.isRefreshing()) {
    return new Promise((resolve) => {
      tokenManager.subscribeToRefresh((token) => {
        config.headers.Authorization = `Bearer ${token}`;
        resolve(config);
      });
    });
  }

  // Start refresh process
  tokenManager.setRefreshing(true);

  try {
    const newToken = await refreshAccessToken();

    if (newToken) {
      tokenManager.notifyRefreshComplete(newToken);
      config.headers.Authorization = `Bearer ${newToken}`;
      return config;
    }
    window.dispatchEvent(
      new CustomEvent('auth:logout', {
        detail: { reason: 'token-refresh-failed' },
      }),
    );
    throw new Error('Session expired');
  } catch (error) {
    window.dispatchEvent(
      new CustomEvent('auth:logout', {
        detail: { reason: 'refresh-error' },
      }),
    );
    throw error instanceof Error ? error : new Error('Refresh error');
  } finally {
    tokenManager.setRefreshing(false);
  }
}

export async function refreshAccessToken(): Promise<string | null> {
  const refresh = tokenManager.getRefreshToken();
  if (!refresh) {
    tokenManager.clearTokens();
    return null;
  }
  try {
    const response = await axiosReq.post(AUTH_ENDPOINTS.refresh, { refresh });
    const { accessToken } = tokenManager.parseTokensFromResponse(
      response.data as Partial<AuthResponse>,
    );

    if (accessToken) {
      tokenManager.setToken(accessToken);
      return accessToken;
    }
  } catch (error) {
    const err = error as AxiosError;
    console.warn(
      err.response?.status === 401
        ? 'Refresh token expired'
        : `Token refresh failed: ${err.message}`,
    );
  }

  tokenManager.clearTokens();
  return null;
}

export function setupAxiosInterceptors(): void {
  axiosReq.interceptors.request.use(async (config) => {
    const url = config.url || '';

    // Skip auth for authentication endpoints
    if (AUTH_PATHS.some((path) => url.includes(path))) {
      return config;
    }

    const token = tokenManager.getToken();
    if (!token) {
      return config;
    }

    // Check if token needs refresh
    if (tokenManager.isTokenExpired(token)) {
      return handleTokenRefresh(config);
    }

    // Set the Authorization header
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  });
}

setupAxiosInterceptors();
