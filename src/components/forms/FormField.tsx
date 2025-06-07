import { Form } from 'react-bootstrap';

import styles from '@/components/forms/styles/FormField.module.css';
import type { FormFieldProps } from '@/types/components';

export const FormField = ({
  controlId,
  name,
  type,
  label,
  placeholder,
  defaultValue,
  value,
  onChange,
  onBlur,
  error,
  showError,
  className,
  icon,
}: FormFieldProps) => {
  // Determine if the field is controlled or uncontrolled
  const isControlled = value !== undefined && onChange !== undefined;
  // If the error is an array, join it into a string
  const errorMessage = Array.isArray(error) ? error.join(', ') : error;

  // If an icon is provided, use a specific className for the input
  const inputClassName = icon ? (className || '').trim() : className;

  return (
    <Form.Group controlId={controlId}>
      <Form.Label className="d-none">{label}</Form.Label>
      <div className={styles.inputGroup}>
        <Form.Control
          type={type}
          name={name}
          {...(isControlled ? { value, onChange, onBlur } : { defaultValue })}
          placeholder={placeholder}
          isInvalid={showError && !!error}
          required={true}
          className={inputClassName}
        />
        {icon && <div className={styles.iconContainer}>{icon}</div>}
      </div>
      <Form.Control.Feedback type="invalid">
        {errorMessage}
      </Form.Control.Feedback>
    </Form.Group>
  );
};
