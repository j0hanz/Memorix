import { useState } from 'react';

import { useForm } from '@/hooks/useForm';
import { useAuth, useError, useToast } from '@/hooks/useProvider';
import { axiosReq } from '@/services/axios';
import type { ApiError } from '@/types/api';
import type { AuthResponse, LoginCredentials, User } from '@/types/auth';
import { formatErrorMessage, logError } from '@/utils/errorUtils';
import { parseTokensFromResponse } from '@/utils/tokenUtils';
import { loginValidationRules } from '@/utils/validation';

export function useLogin(onSuccess?: () => void) {
  const { setAuthTokens, setUser, fetchProfile } = useAuth();
  const { setError } = useError();
  const { showToast } = useToast();
  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  const handleLogin = async (values: LoginCredentials) => {
    setLoading(true);
    setLoginError(null);

    try {
      const response = await axiosReq.post<AuthResponse>(
        '/dj-rest-auth/login/',
        values,
      );

      const { accessToken, refreshToken } = parseTokensFromResponse(
        response.data,
      );

      if (!accessToken) {
        setLoginError('Access token not found in response');
        return false;
      }

      if (refreshToken) {
        setAuthTokens(accessToken, refreshToken);
      } else {
        setAuthTokens(accessToken);
      }

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
      const errorMessage = formatErrorMessage(err as ApiError);
      setLoginError(errorMessage);
      showToast(errorMessage);
      logError(err, 'Login', 'error');
      setError(err, 'Login');
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
    loginError,
  };
}
