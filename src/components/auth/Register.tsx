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
    email: (value: string) => {
      if (!value.trim()) return 'Email is required';
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return !emailRegex.test(value)
        ? 'Please enter a valid email address'
        : null;
    },
    password: (value: string) => {
      if (!value) return 'Password is required';
      if (value.length < 6) return 'Password must be at least 6 characters';
      return null;
    },
    password_confirmation: (
      value: string,
      formValues?: Record<string, string>,
    ) => {
      if (!value) return 'Please confirm your password';
      if (formValues && value !== formValues.password)
        return "Passwords don't match";
      return null;
    },
  };

  const handleRegister = async (values: {
    username: string;
    email: string;
    password: string;
    password_confirmation: string;
  }) => {
    try {
      const success = await register(values);
      if (success) {
        onSuccess();
      }
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
    { username: '', email: '', password: '', password_confirmation: '' },
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

        <Form.Group className="my-4" controlId="formEmail">
          <Form.Label className="d-none">Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={values.email}
            onChange={handleChange}
            onBlur={(e) => handleBlur(e as React.FocusEvent<HTMLInputElement>)}
            placeholder="Enter your email"
            isInvalid={!!(touched.email || formSubmitted) && !!errors.email}
            required
            className={styles.input}
          />
          <Form.Control.Feedback type="invalid">
            {errors.email}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="my-4" controlId="formPassword">
          <Form.Label className="d-none">Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={values.password}
            onChange={handleChange}
            onBlur={(e) => handleBlur(e as React.FocusEvent<HTMLInputElement>)}
            placeholder="Choose a password"
            isInvalid={
              !!(touched.password || formSubmitted) && !!errors.password
            }
            required
            className={styles.input}
          />
          <Form.Control.Feedback type="invalid">
            {errors.password}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="my-4" controlId="formConfirmPassword">
          <Form.Label className="d-none">Confirm Password</Form.Label>
          <Form.Control
            type="password"
            name="password_confirmation"
            value={values.password_confirmation}
            onChange={handleChange}
            onBlur={(e) => handleBlur(e as React.FocusEvent<HTMLInputElement>)}
            placeholder="Confirm your password"
            isInvalid={
              !!(touched.password_confirmation || formSubmitted) &&
              !!errors.password_confirmation
            }
            required
            className={styles.input}
          />
          <Form.Control.Feedback type="invalid">
            {errors.password_confirmation}
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
