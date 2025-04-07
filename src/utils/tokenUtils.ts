import { jwtDecode } from 'jwt-decode';

// State for token refresh process
let isRefreshing = false;
let refreshSubscribers: ((token: string) => void)[] = [];

// Token helpers
export const getToken = (): string | null => localStorage.getItem('token');
export const getRefreshToken = (): string | null =>
  localStorage.getItem('refreshToken');

export const setToken = (token: string): void => {
  localStorage.setItem('token', token);
};

export const isTokenExpired = (token: string): boolean => {
  try {
    const { exp } = jwtDecode<{ exp: number }>(token);
    return exp * 1000 < Date.now();
  } catch (error) {
    console.error('Error decoding token:', error);
    return true;
  }
};

export const clearTokens = (): void => {
  localStorage.removeItem('token');
  localStorage.removeItem('refreshToken');
};

export const subscribeTokenRefresh = (
  callback: (token: string) => void,
): void => {
  refreshSubscribers.push(callback);
};

export const onRefreshed = (token: string): void => {
  refreshSubscribers.forEach((callback) => callback(token));
  refreshSubscribers = [];
};

export const getIsRefreshing = (): boolean => isRefreshing;
export const setIsRefreshing = (value: boolean): void => {
  isRefreshing = value;
};
