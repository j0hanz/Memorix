import { useState } from 'react';

import { useError } from '@/hooks/useError';
import { useForm } from '@/hooks/useForm';
import { axiosReq } from '@/services/axios';
import type { ApiError } from '@/types/api';
import type { RegisterData } from '@/types/auth';
import { formatErrorMessage, logError } from '@/utils/errorUtils';
import { registerValidationRules } from '@/utils/validation';

export function useRegister(onSuccess: () => void) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { setError: setGlobalError } = useError();

  const handleRegister = async (values: RegisterData) => {
    setLoading(true);
    setError(null);

    try {
      await axiosReq.post('/dj-rest-auth/registration/', values);
      onSuccess();
      return true;
    } catch (err: unknown) {
      const errorMessage = formatErrorMessage(err as ApiError);
      setError(errorMessage);
      logError(err, 'Registration', 'error');
      setGlobalError(err, 'Registration');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const formMethods = useForm(
    { username: '', password1: '', password2: '' },
    registerValidationRules,
    handleRegister,
  );

  return {
    ...formMethods,
    loading,
    authError: error,
  };
}
