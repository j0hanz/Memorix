import { jwtDecode } from 'jwt-decode';
import axios from 'axios';

export interface JwtPayload {
  user_id: number;
  username: string;
  exp: number;
  iat: number;
  jti: string;
  token_type: string;
}

/**
 * Decodes a JWT token.
 */
export const decodeToken = (token: string): JwtPayload => {
  return jwtDecode<JwtPayload>(token);
};

/**
 * Checks whether the given token is expired.
 */
export const isTokenExpired = (token: string): boolean => {
  try {
    const payload = decodeToken(token);
    const currentTime = Date.now() / 1000;
    return payload.exp < currentTime;
  } catch (error) {
    console.error('Error decoding token:', error);
    return true;
  }
};

/**
 * Refreshes the access token using the stored refresh token.
 */
export const refreshAccessToken = async (): Promise<string | null> => {
  const baseURL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/';
  const refreshToken = localStorage.getItem('refreshToken');
  if (!refreshToken) return null;

  try {
    const response = await axios.post<{ access: string }>(
      `${baseURL}api/token/refresh/`,
      { refresh: refreshToken },
    );
    const { access } = response.data;
    if (access) {
      localStorage.setItem('token', access);
      return access;
    }
    return null;
  } catch (error) {
    console.error('Token refresh failed:', error);
    return null;
  }
};

export const getToken = (): string | null => {
  return localStorage.getItem('token');
};

/**
 * Clears the stored tokens from localStorage.
 */
export const clearTokens = (): void => {
  localStorage.removeItem('token');
  localStorage.removeItem('refreshToken');
};
