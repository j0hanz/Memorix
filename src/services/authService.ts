import type { User } from '@/types/data';
import type {
  AuthResponse,
  LoginCredentials,
  RegisterData,
} from '@/types/services';

import { get, post } from './apiService';

const ENDPOINTS = {
  login: '/dj-rest-auth/login/',
  register: '/dj-rest-auth/registration/',
  logout: '/dj-rest-auth/logout/',
  refresh: '/dj-rest-auth/token/refresh/',
  verify: '/dj-rest-auth/token/verify/',
  user: '/dj-rest-auth/user/',
  passwordChange: '/dj-rest-auth/password/change/',
} as const;

export async function login(
  credentials: LoginCredentials,
): Promise<AuthResponse> {
  return post<AuthResponse>(ENDPOINTS.login, credentials, {
    context: 'AuthService',
    errorMessage: 'Login failed',
  });
}

export async function register(data: RegisterData): Promise<AuthResponse> {
  return post<AuthResponse>(ENDPOINTS.register, data, {
    context: 'AuthService',
    errorMessage: 'Registration failed',
  });
}

export async function logout(): Promise<void> {
  await post<Record<string, never>>(
    ENDPOINTS.logout,
    {},
    {
      context: 'AuthService',
      errorMessage: 'Logout failed',
    },
  );
}

export async function refreshToken(
  refreshToken: string,
): Promise<AuthResponse> {
  return post<AuthResponse>(
    ENDPOINTS.refresh,
    { refresh: refreshToken },
    {
      context: 'AuthService',
      errorMessage: 'Token refresh failed',
    },
  );
}

export async function verifyToken(token: string): Promise<void> {
  await post<Record<string, never>>(
    ENDPOINTS.verify,
    { token },
    {
      context: 'AuthService',
      errorMessage: 'Token verification failed',
    },
  );
}

export async function getCurrentUser(): Promise<User> {
  return get<User>(ENDPOINTS.user, undefined, {
    context: 'AuthService',
    errorMessage: 'Failed to fetch user data',
  });
}

export async function changePassword(data: {
  old_password: string;
  new_password1: string;
  new_password2: string;
}): Promise<void> {
  await post<Record<string, never>>(ENDPOINTS.passwordChange, data, {
    context: 'AuthService',
    errorMessage: 'Password change failed',
  });
}
