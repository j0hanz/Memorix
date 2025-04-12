import { useActionState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { axiosReq } from '@/services/axios';
import { parseTokensFromResponse } from '@/utils/tokenUtils';
import type {
  LoginCredentials,
  AuthResponse,
  User,
  LoginState,
} from '@/types/auth';
import type { ApiError } from '@/types/api';

export function useLogin(onSuccess?: () => void) {
  const { setAuthTokens, setUser, fetchProfile, error: authError } = useAuth();

  // Initial state for the login form
  const initialState: LoginState = {
    error: null,
    fieldErrors: {},
    values: { username: '', password: '' },
    success: false,
  };

  // Define the login action handler with proper types
  const loginAction = async (
    _state: LoginState,
    formData: FormData,
  ): Promise<LoginState> => {
    try {
      const values: LoginCredentials = {
        username: formData.get('username') as string,
        password: formData.get('password') as string,
      };

      const response = await axiosReq.post<AuthResponse>(
        '/dj-rest-auth/login/',
        values,
      );

      const { accessToken, refreshToken } = parseTokensFromResponse(
        response.data,
      );

      if (!accessToken) {
        return {
          error: 'Access token not found in response',
          fieldErrors: {},
          values,
          success: false,
        };
      }

      setAuthTokens(accessToken, refreshToken || undefined);

      if (response.data.user) {
        setUser(response.data.user);
      } else {
        const userResponse = await axiosReq.get('/dj-rest-auth/user/');
        setUser(userResponse.data as User);
      }

      await fetchProfile();

      if (onSuccess) {
        onSuccess();
      }

      return {
        error: null,
        fieldErrors: {},
        values: { username: '', password: '' },
        success: true,
      };
    } catch (err: unknown) {
      const errorObj = err as ApiError;
      return {
        error: errorObj.response?.data?.detail || 'Login failed',
        fieldErrors: Object.fromEntries(
          Object.entries(errorObj.response?.data || {}).filter(
            ([, value]) => value !== undefined,
          ),
        ) as Record<string, string | string[]>,
        values: {
          username: formData.get('username') as string,
          password: '',
        },
        success: false,
      };
    }
  };

  // Use the useActionState hook with proper type arguments
  const [state, formAction, isPending] = useActionState<LoginState, FormData>(
    loginAction,
    initialState,
  );

  return {
    state,
    formAction,
    isPending,
    authError: state.error || authError,
  };
}
