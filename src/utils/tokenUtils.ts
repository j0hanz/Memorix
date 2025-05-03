import { jwtDecode } from 'jwt-decode';

import type { AuthResponse } from '@/types/auth';

// State for token refresh process
let isRefreshing = false;
let refreshSubscribers: ((token: string) => void)[] = [];

// Constants
const TOKEN_KEY = 'token';
const REFRESH_TOKEN_KEY = 'refreshToken';
const TOKEN_EXPIRY_BUFFER = 60;

// Token access with better error handling
export const getToken = (): string | null => localStorage.getItem(TOKEN_KEY);
export const getRefreshToken = (): string | null =>
  localStorage.getItem(REFRESH_TOKEN_KEY);

export const setToken = (token: string): void => {
  if (!token) {
    console.warn('Attempting to set empty token');
    return;
  }
  localStorage.setItem(TOKEN_KEY, token);
};

export const setRefreshToken = (token: string): void => {
  if (!token) {
    console.warn('Attempting to set empty refresh token');
    return;
  }
  localStorage.setItem(REFRESH_TOKEN_KEY, token);
};

export const isTokenExpired = (token: string): boolean => {
  if (!token) return true;

  try {
    const { exp } = jwtDecode<{ exp: number }>(token);
    // Consider token expired a bit earlier to prevent edge cases
    return (exp - TOKEN_EXPIRY_BUFFER) * 1000 < Date.now();
  } catch (error) {
    console.error('Error decoding token:', error);
    return true;
  }
};

export const clearTokens = (): void => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
};

export const parseTokensFromResponse = (
  response: Partial<AuthResponse>,
): { accessToken: string | null; refreshToken: string | null } => {
  // Remove unnecessary optional chaining, as response is always defined
  const accessToken =
    response.access || response.token || response.access_token || null;

  const refreshToken = response.refresh || response.refresh_token || null;

  return { accessToken, refreshToken };
};

export const subscribeTokenRefresh = (
  callback: (token: string) => void,
): void => {
  refreshSubscribers.push(callback);
};

export const onRefreshed = (token: string): void => {
  refreshSubscribers.forEach((callback) => {
    callback(token);
  });
  refreshSubscribers = [];
};

export const getIsRefreshing = (): boolean => isRefreshing;
export const setIsRefreshing = (value: boolean): void => {
  isRefreshing = value;
};
