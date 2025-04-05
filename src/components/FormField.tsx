import { Form } from 'react-bootstrap';
import { FormFieldProps } from '@/types/components';

const FormField = ({
  controlId,
  name,
  type,
  label,
  placeholder,
  value,
  onChange,
  onBlur,
  error,
  showError,
  className,
}: FormFieldProps) => {
  return (
    <Form.Group controlId={controlId}>
      <Form.Label className="d-none">{label}</Form.Label>
      <Form.Control
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        isInvalid={showError && !!error}
        required
        className={className}
      />
      <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
    </Form.Group>
  );
};

export default FormField;
