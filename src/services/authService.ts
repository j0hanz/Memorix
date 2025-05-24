import { AUTH_ENDPOINTS } from '@/constants/api';
import type { User } from '@/types/data';
import type {
  AuthResponse,
  LoginCredentials,
  RegisterData,
} from '@/types/services';

import { get, post } from './apiService';

export async function login(
  credentials: LoginCredentials,
): Promise<AuthResponse> {
  return post<AuthResponse>(AUTH_ENDPOINTS.login, credentials, {
    context: 'AuthService',
    errorMessage: 'Login failed',
  });
}

export async function register(data: RegisterData): Promise<AuthResponse> {
  return post<AuthResponse>(AUTH_ENDPOINTS.register, data, {
    context: 'AuthService',
    errorMessage: 'Registration failed',
  });
}

export async function logout(): Promise<void> {
  await post<Record<string, never>>(
    AUTH_ENDPOINTS.logout,
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
    AUTH_ENDPOINTS.refresh,
    { refresh: refreshToken },
    {
      context: 'AuthService',
      errorMessage: 'Token refresh failed',
    },
  );
}

export async function verifyToken(token: string): Promise<void> {
  await post<Record<string, never>>(
    AUTH_ENDPOINTS.verify,
    { token },
    {
      context: 'AuthService',
      errorMessage: 'Token verification failed',
    },
  );
}

export async function getCurrentUser(): Promise<User> {
  return get<User>(AUTH_ENDPOINTS.user, undefined, {
    context: 'AuthService',
    errorMessage: 'Failed to fetch user data',
  });
}

export async function changePassword(data: {
  old_password: string;
  new_password1: string;
  new_password2: string;
}): Promise<void> {
  await post<Record<string, never>>(AUTH_ENDPOINTS.passwordChange, data, {
    context: 'AuthService',
    errorMessage: 'Password change failed',
  });
}
