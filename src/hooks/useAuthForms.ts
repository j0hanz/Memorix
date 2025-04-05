import { useAuth } from '@/hooks/useAuth';
import { useForm } from '@/hooks/useForm';
import { LoginCredentials, RegisterData } from '@/types/auth';

// Login form hook
export function useLoginForm(onSuccess?: () => void) {
  const { login, loading, error: authError } = useAuth();

  const validationRules = {
    username: (value: string) =>
      !value.trim() ? 'Username is required' : null,
    password: (value: string) =>
      !value.trim() ? 'Password is required' : null,
  };

  const handleLogin = async (values: LoginCredentials) => {
    const success = await login(values);
    if (success && onSuccess) {
      onSuccess();
    }
    return success;
  };

  const formMethods = useForm(
    { username: '', password: '' },
    validationRules,
    handleLogin,
  );

  return {
    ...formMethods,
    loading,
    authError,
  };
}

// Register form hook
export function useRegisterForm(onSuccess: () => void) {
  const { register, loading, error: authError } = useAuth();

  const validationRules = {
    username: (value: string) =>
      !value.trim() ? 'Username is required' : null,
    password1: (value: string) => {
      if (!value) return 'Password is required';
      if (value.length < 6) return 'Password must be at least 6 characters';
      return null;
    },
    password2: (value: string, formValues?: Record<string, string>) => {
      if (!value) return 'Please confirm your password';
      if (formValues && value !== formValues.password1)
        return "Passwords don't match";
      return null;
    },
  };

  const handleRegister = async (values: RegisterData) => {
    try {
      const success = await register(values);
      if (success) onSuccess();
      return success;
    } catch (error) {
      console.error('Registration error:', error);
      return false;
    }
  };

  const formMethods = useForm(
    { username: '', password1: '', password2: '' },
    validationRules,
    handleRegister,
  );

  return {
    ...formMethods,
    loading,
    authError,
  };
}
