import { Form, Alert } from 'react-bootstrap';
import { useAuth } from '@/hooks/useAuth';
import Button from '@/components/Button';
import styles from '@/components/styles/Modal.module.css';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';
import { useForm } from '@/hooks/useForm';

interface RegisterProps {
  onSuccess: () => void;
}

const Register = ({ onSuccess }: RegisterProps) => {
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
  const handleRegister = async (values: {
    username: string;
    password1: string;
    password2: string;
  }) => {
    try {
      const success = await register(values);
      if (success) onSuccess();
      return success;
    } catch (error) {
      console.error('Registration error:', error);
      return false;
    }
  };

  const {
    values,
    errors,
    touched,
    isSubmitting,
    formSubmitted,
    handleChange,
    handleBlur,
    handleSubmit,
  } = useForm(
    { username: '', password1: '', password2: '' },
    validationRules,
    handleRegister,
  );

  return (
    <>
      {authError && <Alert variant="danger">{authError}</Alert>}
      <Form noValidate onSubmit={handleSubmit}>
        <Form.Group controlId="formUsername">
          <Form.Label className="d-none">Username</Form.Label>
          <Form.Control
            type="text"
            name="username"
            value={values.username}
            onChange={handleChange}
            onBlur={(e) => handleBlur(e as React.FocusEvent<HTMLInputElement>)}
            placeholder="Choose a username"
            isInvalid={
              !!(touched.username || formSubmitted) && !!errors.username
            }
            required
            className={styles.input}
          />
          <Form.Control.Feedback type="invalid">
            {errors.username}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="my-4" controlId="formPassword">
          <Form.Label className="d-none">Password</Form.Label>
          <Form.Control
            type="password"
            name="password1"
            value={values.password1}
            onChange={handleChange}
            onBlur={(e) => handleBlur(e as React.FocusEvent<HTMLInputElement>)}
            placeholder="Choose a password"
            isInvalid={
              !!(touched.password1 || formSubmitted) && !!errors.password1
            }
            required
            className={styles.input}
          />
          <Form.Control.Feedback type="invalid">
            {errors.password1}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="my-4" controlId="formConfirmPassword">
          <Form.Label className="d-none">Confirm Password</Form.Label>
          <Form.Control
            type="password"
            name="password2"
            value={values.password2}
            onChange={handleChange}
            onBlur={(e) => handleBlur(e as React.FocusEvent<HTMLInputElement>)}
            placeholder="Confirm your password"
            isInvalid={
              !!(touched.password2 || formSubmitted) && !!errors.password2
            }
            required
            className={styles.input}
          />
          <Form.Control.Feedback type="invalid">
            {errors.password2}
          </Form.Control.Feedback>
        </Form.Group>
        <div className="d-flex mt-5">
          <Button
            className={`${styles.btnRestart} ${styles.modalButton}`}
            disabled={isSubmitting || loading}
            type="submit"
          >
            <PersonAddIcon className={`${styles.btnIcon} me-1`} />
            {isSubmitting || loading ? 'Creating Account...' : 'Sign Up'}
          </Button>
          <Button
            className={`${styles.btnExit} ${styles.modalButton}`}
            onClick={onSuccess}
            type="button"
            disabled={isSubmitting || loading}
          >
            <ExitToAppOutlinedIcon className={`${styles.btnIcon} me-1`} />
            Back
          </Button>
        </div>
      </Form>
    </>
  );
};

export default Register;
