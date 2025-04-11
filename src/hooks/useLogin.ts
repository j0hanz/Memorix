import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useForm } from '@/hooks/useForm';
import { axiosReq } from '@/api/axios';
import { parseTokensFromResponse } from '@/utils/tokenUtils';
import type { LoginCredentials, AuthResponse, User } from '@/types/auth';
import type { ApiError } from '@/types/api';
import { loginValidationRules } from '@/utils/validation';
import { formatErrorMessage } from '@/utils/errorUtils';

export function useLogin(onSuccess?: () => void) {
  const { setAuthTokens, setUser, fetchProfile, error: authError } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (values: LoginCredentials) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axiosReq.post<AuthResponse>(
        '/dj-rest-auth/login/',
        values,
      );

      // Use the enhanced token parser
      const { accessToken, refreshToken } = parseTokensFromResponse(
        response.data,
      );

      if (!accessToken) {
        setError('Access token not found in response');
        return false;
      }

      setAuthTokens(accessToken, refreshToken || undefined);

      if (response.data.user) {
        setUser(response.data.user);
      } else {
        try {
          const userResponse = await axiosReq.get('/dj-rest-auth/user/');
          setUser(userResponse.data as User);
        } catch (userError) {
          console.error('Failed to fetch user data after login:', userError);
          setError('Login successful but could not fetch user data');
          return false;
        }
      }

      await fetchProfile();

      if (onSuccess) {
        onSuccess();
      }

      return true;
    } catch (err: unknown) {
      console.error('Login failed:', err);
      const errorObj = err as ApiError;
      setError(formatErrorMessage(errorObj));
      return false;
    } finally {
      setLoading(false);
    }
  };

  const formMethods = useForm(
    { username: '', password: '' },
    loginValidationRules,
    handleLogin,
  );

  return {
    ...formMethods,
    loading,
    authError: error || authError,
  };
}
