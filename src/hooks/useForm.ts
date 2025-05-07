import type { ChangeEvent, FormEvent } from 'react';
import { useState } from 'react';
import { useFormStatus } from 'react-dom';

import { useValidate } from '@/hooks/useValidate';
import type { ValidationRules } from '@/types/hooks';

// This hook is used to manage form state and validation.
export function useFormSubmitStatus() {
  const { pending, data } = useFormStatus();

  return {
    isPending: pending,
    formData: data,
  };
}

export function useForm<T extends Record<string, string>>(
  initialValues: T,
  validationRules?: ValidationRules,
  onSubmit?: (values: T) => Promise<boolean>,
) {
  const [values, setValues] = useState<T>(initialValues);
  // Derive validation errors using useValidate
  const errors = useValidate(values, validationRules);
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleBlur = (e: ChangeEvent<HTMLInputElement>) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  const handleSubmit = async (e?: FormEvent<HTMLFormElement>) => {
    if (e) {
      e.preventDefault();
    }
    setFormSubmitted(true);

    // Mark all fields as touched
    const allTouched = Object.keys(values).reduce<Record<string, boolean>>(
      (acc, key) => {
        acc[key] = true;
        return acc;
      },
      {},
    );
    setTouched(allTouched);

    const isValid = !validationRules || Object.keys(errors).length === 0;
    if (!isValid || !onSubmit) return false;

    try {
      const result = await onSubmit(values);
      return result;
    } catch {
      return false;
    }
  };

  const createFormAction = () => {
    return async (formData: FormData) => {
      if (!onSubmit) return false;
      const formValues = Object.fromEntries(formData.entries()) as unknown as T;
      return await onSubmit(formValues);
    };
  };

  return {
    values,
    errors,
    touched,
    formSubmitted,
    handleChange,
    handleBlur,
    handleSubmit,
    setValues,
    createFormAction,
  };
}
