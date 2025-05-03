import { useState } from 'react';

import { useAuth } from '@/hooks/useAuth';
import { useForm } from '@/hooks/useForm';
import { axiosReq } from '@/services/axios';
import type { ApiError } from '@/types/api';
import type { AuthResponse, LoginCredentials, User } from '@/types/auth';
import { formatErrorMessage } from '@/utils/errorUtils';
import { parseTokensFromResponse } from '@/utils/tokenUtils';
import { loginValidationRules } from '@/utils/validation';

export function useLogin(onSuccess?: () => void) {
  const { setAuthTokens, setUser, fetchProfile } = useAuth();
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

      const { accessToken, refreshToken } = parseTokensFromResponse(
        response.data,
      );

      if (!accessToken) {
        setError('Access token not found in response');
        return false;
      }

      setAuthTokens(accessToken, refreshToken);

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

      return true;
    } catch (err: unknown) {
      setError(formatErrorMessage(err as ApiError));
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
    authError: error,
  };
}
