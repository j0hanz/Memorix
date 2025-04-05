import { useState, ChangeEvent, FormEvent } from 'react';
import { ValidationRules } from '@/types/hooks';

export function useForm<T extends Record<string, string>>(
  initialValues: T,
  validationRules?: ValidationRules,
  onSubmit?: (values: T) => Promise<boolean>,
) {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));

    if (touched[name] && validationRules && validationRules[name]) {
      const error = validationRules[name](value, values);
      setErrors((prev) => ({ ...prev, [name]: error || '' }));
    }
  };

  const handleBlur = (e: ChangeEvent<HTMLInputElement>) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));

    if (validationRules && validationRules[name]) {
      const error = validationRules[name](values[name], values);
      setErrors((prev) => ({ ...prev, [name]: error || '' }));
    }
  };

  const validateForm = (): boolean => {
    if (!validationRules) return true;

    const newErrors: Record<string, string> = {};
    let isValid = true;

    Object.keys(validationRules).forEach((field) => {
      const error = validationRules[field](values[field as keyof T], values);
      if (error) {
        newErrors[field] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormSubmitted(true);

    // Set all fields as touched for validation
    const allTouched = Object.keys(values).reduce(
      (acc, key) => {
        acc[key] = true;
        return acc;
      },
      {} as Record<string, boolean>,
    );
    setTouched(allTouched);

    const isValid = validateForm();
    if (!isValid || !onSubmit) return false;

    setIsSubmitting(true);
    try {
      const result = await onSubmit(values);
      setIsSubmitting(false);
      return result;
    } catch {
      setIsSubmitting(false);
      return false;
    }
  };

  return {
    values,
    errors,
    touched,
    isSubmitting,
    formSubmitted,
    handleChange,
    handleBlur,
    handleSubmit,
    setValues,
    setErrors,
  };
}
