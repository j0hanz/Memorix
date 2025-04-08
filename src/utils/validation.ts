import type { ValidationRules } from '@/types/form';

export const required =
  (fieldName = 'Field') =>
  (value: string): string | null =>
    !value.trim() ? `${fieldName} is required` : null;

export const minLength =
  (length: number, fieldName = 'Field') =>
  (value: string): string | null =>
    value && value.length < length
      ? `${fieldName} must be at least ${length} characters`
      : null;

export const matches =
  (matchField: string, fieldName = 'Field') =>
  (value: string, formValues?: Record<string, string>): string | null => {
    if (!formValues) return null;
    return value !== formValues[matchField]
      ? `${fieldName}s don't match`
      : null;
  };

export const compose =
  (
    ...validators: ((
      value: string,
      formValues?: Record<string, string>,
    ) => string | null)[]
  ) =>
  (value: string, formValues?: Record<string, string>): string | null => {
    for (const validator of validators) {
      const error = validator(value, formValues);
      if (error) return error;
    }
    return null;
  };

export const loginValidationRules: ValidationRules = {
  username: required('Username'),
  password: required('Password'),
};

export const registerValidationRules: ValidationRules = {
  username: required('Username'),
  password1: compose(required('Password'), minLength(6, 'Password')),
  password2: compose(
    required('Password confirmation'),
    matches('password1', 'Password'),
  ),
};
