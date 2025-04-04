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
    confirmPassword: (value: string, formValues?: Record<string, string>) => {
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
    confirmPassword: string;
  }) => {
    try {
      const { password, email, username } = values;
      const success = await register({ username, email, password });

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
    { username: '', email: '', password: '', confirmPassword: '' },
    validationRules,
    handleRegister,
  );

  return (
    <>
      {authError && <Alert variant="danger">{authError}</Alert>}

      <Form noValidate onSubmit={handleSubmit}>
        <Form.Group className="mb-3 p-2" controlId="formUsername">
          <Form.Label>Username</Form.Label>
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
          />
          <Form.Control.Feedback type="invalid">
            {errors.username}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3 p-2" controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={values.email}
            onChange={handleChange}
            onBlur={(e) => handleBlur(e as React.FocusEvent<HTMLInputElement>)}
            placeholder="Enter your email"
            isInvalid={!!(touched.email || formSubmitted) && !!errors.email}
            required
          />
          <Form.Control.Feedback type="invalid">
            {errors.email}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3 p-2" controlId="formPassword">
          <Form.Label>Password</Form.Label>
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
          />
          <Form.Control.Feedback type="invalid">
            {errors.password}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3 p-2" controlId="formConfirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            name="confirmPassword"
            value={values.confirmPassword}
            onChange={handleChange}
            onBlur={(e) => handleBlur(e as React.FocusEvent<HTMLInputElement>)}
            placeholder="Confirm your password"
            isInvalid={
              !!(touched.confirmPassword || formSubmitted) &&
              !!errors.confirmPassword
            }
            required
          />
          <Form.Control.Feedback type="invalid">
            {errors.confirmPassword}
          </Form.Control.Feedback>
        </Form.Group>

        <div className="d-flex mt-4">
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
