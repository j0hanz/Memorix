import { useEffect, useState } from 'react';

import type { ValidationRules } from '@/types/hooks';

// Hook to derive validation errors based on current form values and validation rules
export function useValidate(
  values: Record<string, string>,
  validationRules?: ValidationRules,
): Record<string, string> {
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (!validationRules) {
      setErrors({});
      return;
    }

    const newErrors: Record<string, string> = {};
    for (const [field, validateFn] of Object.entries(validationRules)) {
      const error = validateFn(values[field], values);
      if (error) {
        newErrors[field] = error;
      }
    }
    setErrors(newErrors);
  }, [values, validationRules]);

  return errors;
}
