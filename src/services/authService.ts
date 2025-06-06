import { AUTH_ENDPOINTS } from '@/constants/api';
import type { User } from '@/types/data';
import type {
  AuthResponse,
  LoginCredentials,
  RegisterData,
} from '@/types/services';

import { get, post } from './apiService';

// This service provides methods to handle user authentication, including login, registration, logout, and token management.
export async function login(
  credentials: LoginCredentials,
): Promise<AuthResponse> {
  return post<AuthResponse>(AUTH_ENDPOINTS.login, credentials, {
    context: 'AuthService',
  });
}

// This function registers a new user with the provided data.
export async function register(data: RegisterData): Promise<AuthResponse> {
  return post<AuthResponse>(AUTH_ENDPOINTS.register, data, {
    context: 'AuthService',
  });
}

// This function logs out the current user by making a POST request to the logout endpoint.
export async function logout(): Promise<void> {
  await post<Record<string, never>>(
    AUTH_ENDPOINTS.logout,
    {},
    {
      context: 'AuthService',
    },
  );
}

// This function refreshes the authentication token using the provided refresh token.
export async function refreshToken(
  refreshToken: string,
): Promise<AuthResponse> {
  return post<AuthResponse>(
    AUTH_ENDPOINTS.refresh,
    { refresh: refreshToken },
    {
      context: 'AuthService',
    },
  );
}

// This function verifies a token by making a POST request to the verify endpoint.
export async function verifyToken(token: string): Promise<void> {
  await post<Record<string, never>>(
    AUTH_ENDPOINTS.verify,
    { token },
    {
      context: 'AuthService',
    },
  );
}

// This function retrieves the current user's data by making a GET request to the user endpoint.
export async function getCurrentUser(): Promise<User> {
  return get<User>(AUTH_ENDPOINTS.user, undefined, {
    context: 'AuthService',
  });
}

// This function changes the user's password by making a POST request to the password change endpoint.
export async function changePassword(data: {
  old_password: string;
  new_password1: string;
  new_password2: string;
}): Promise<void> {
  await post<Record<string, never>>(AUTH_ENDPOINTS.passwordChange, data, {
    context: 'AuthService',
  });
}
