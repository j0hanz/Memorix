import { useState } from 'react';
import { axiosReq } from '@/api/axios';
import { useForm } from '@/hooks/useForm';
import type { RegisterData } from '@/types/auth';
import type { ApiError } from '@/types/api';
import { registerValidationRules } from '@/utils/validation';
import { formatErrorMessage } from '@/utils/errorUtils';

export function useRegister(onSuccess: () => void) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleRegister = async (values: RegisterData) => {
    setLoading(true);
    setError(null);

    try {
      await axiosReq.post('/dj-rest-auth/registration/', values);
      onSuccess();
      return true;
    } catch (err: unknown) {
      console.error('Registration failed:', err);
      const errorObj = err as ApiError;
      setError(formatErrorMessage(errorObj));
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
