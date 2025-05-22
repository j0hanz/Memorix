import { jwtDecode } from 'jwt-decode';

import type { AuthResponse } from '@/types/services';
import type { DecodedToken, TokenState } from '@/types/utils';

// Constants
const TOKEN_KEY = 'token';
const REFRESH_TOKEN_KEY = 'refreshToken';
const TOKEN_EXPIRY_BUFFER_SECONDS = 60;

// Token state management
const tokenState: TokenState = {
  isRefreshing: false,
  subscribers: [],
};

// Token storage operations
export const tokenStorage = {
  getToken: (): string | null => localStorage.getItem(TOKEN_KEY),
  getRefreshToken: (): string | null => localStorage.getItem(REFRESH_TOKEN_KEY),

  setToken: (token: string): void => {
    if (!token) {
      console.warn('Attempting to set empty token');
      return;
    }
    localStorage.setItem(TOKEN_KEY, token);
  },

  setRefreshToken: (token: string): void => {
    if (!token) {
      console.warn('Attempting to set empty refresh token');
      return;
    }
    localStorage.setItem(REFRESH_TOKEN_KEY, token);
  },

  clearTokens: (): void => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
  },
};

// Token validation and expiration
export const tokenValidator = {
  isTokenExpired: (token: string): boolean => {
    if (!token) return true;

    try {
      const { exp } = jwtDecode<DecodedToken>(token);
      // Consider token expired a bit earlier to prevent edge cases
      return (exp - TOKEN_EXPIRY_BUFFER_SECONDS) * 1000 < Date.now();
    } catch (error) {
      console.error('Error decoding token:', error);
      return true;
    }
  },
};

// Token parsing from response
export const parseTokensFromResponse = (
  response: Partial<AuthResponse>,
): { accessToken: string | null; refreshToken: string | null } => {
  const accessToken =
    response.access || response.token || response.access_token || null;
  const refreshToken = response.refresh || response.refresh_token || null;

  return { accessToken, refreshToken };
};

// Token refresh state management
export const tokenRefreshManager = {
  getIsRefreshing: (): boolean => tokenState.isRefreshing,

  setIsRefreshing: (value: boolean): void => {
    tokenState.isRefreshing = value;
  },

  subscribeTokenRefresh: (callback: (token: string) => void): void => {
    tokenState.subscribers.push(callback);
  },

  onRefreshed: (token: string): void => {
    tokenState.subscribers.forEach((callback) => {
      callback(token);
    });
    tokenState.subscribers = [];
  },
};
