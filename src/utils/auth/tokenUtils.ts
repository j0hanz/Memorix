import { jwtDecode } from 'jwt-decode';

import { TOKEN_CONFIGS } from '@/constants/configs';
import type { AuthResponse } from '@/types/services';

interface DecodedToken {
  exp: number;
}

// Token management utility for handling JWT tokens in localStorage
let isRefreshing = false;
const refreshSubscribers: ((token: string) => void)[] = [];

export const tokenManager = {
  getToken: (): string | null => localStorage.getItem(TOKEN_CONFIGS.TOKEN_KEY),

  getRefreshToken: (): string | null =>
    localStorage.getItem(TOKEN_CONFIGS.REFRESH_TOKEN_KEY),

  setToken: (token: string): void => {
    if (!token) return;
    localStorage.setItem(TOKEN_CONFIGS.TOKEN_KEY, token);
  },

  setRefreshToken: (token: string): void => {
    if (!token) return;
    localStorage.setItem(TOKEN_CONFIGS.REFRESH_TOKEN_KEY, token);
  },

  clearTokens: (): void => {
    localStorage.removeItem(TOKEN_CONFIGS.TOKEN_KEY);
    localStorage.removeItem(TOKEN_CONFIGS.REFRESH_TOKEN_KEY);
  },

  // Token validation
  isTokenExpired: (token: string): boolean => {
    if (!token) return true;

    try {
      const { exp } = jwtDecode<DecodedToken>(token);
      const bufferTime = TOKEN_CONFIGS.TOKEN_EXPIRY_BUFFER_SECONDS * 1000;
      return exp * 1000 - bufferTime < Date.now();
    } catch {
      return true;
    }
  },

  // Token parsing from API response
  parseTokensFromResponse: (response: Partial<AuthResponse>) => {
    const accessToken =
      response.access || response.token || response.access_token || null;
    const refreshToken = response.refresh || response.refresh_token || null;
    return { accessToken, refreshToken };
  },

  // Token refresh management
  isRefreshing: () => isRefreshing,

  setRefreshing: (value: boolean) => {
    isRefreshing = value;
  },

  subscribeToRefresh: (callback: (token: string) => void) => {
    refreshSubscribers.push(callback);
  },
  notifyRefreshComplete(token: string) {
    for (const callback of refreshSubscribers) {
      callback(token);
    }
    refreshSubscribers.splice(0, refreshSubscribers.length);
  },
};
