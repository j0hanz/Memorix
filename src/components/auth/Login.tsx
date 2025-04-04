import { Form, Alert } from 'react-bootstrap';
import { useAuth } from '@/hooks/useAuth';
import Button from '@/components/Button';
import styles from '@/components/styles/Modal.module.css';
import LoginIcon from '@mui/icons-material/Login';
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';
import { useForm } from '@/hooks/useForm';

interface LoginProps {
  onClose?: () => void;
}

const Login = ({ onClose }: LoginProps) => {
  const { login, loading, error: authError } = useAuth();

  const validationRules = {
    username: (value: string) =>
      !value.trim() ? 'Username is required' : null,
    password: (value: string) =>
      !value.trim() ? 'Password is required' : null,
  };

  const handleLogin = async (values: {
    username: string;
    password: string;
  }) => {
    const success = await login(values);
    if (success && onClose) {
      onClose();
    }
    return success;
  };

  const {
    values,
    errors,
    touched,
    isSubmitting,
    formSubmitted,
    handleChange,
    handleBlur: handleBlurFocus,
    handleSubmit,
  } = useForm({ username: '', password: '' }, validationRules, handleLogin);

  // Update type to handle Form.Control events
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) =>
    handleBlurFocus(e as React.ChangeEvent<HTMLInputElement>);

  return (
    <div>
      {authError && <Alert variant="danger">{authError}</Alert>}

      <Form noValidate onSubmit={handleSubmit}>
        <Form.Group className="mb-3 p-2" controlId="formUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            name="username"
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Enter username"
            isInvalid={
              !!(touched.username || formSubmitted) && !!errors.username
            }
            required
          />
          <Form.Control.Feedback type="invalid">
            {errors.username}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3 p-2" controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Password"
            isInvalid={
              !!(touched.password || formSubmitted) && !!errors.password
            }
            required
          />
          <Form.Control.Feedback type="invalid">
            {errors.password}
          </Form.Control.Feedback>
        </Form.Group>

        <div className="d-flex mt-4">
          <Button
            className={`${styles.btnRestart} ${styles.modalButton}`}
            disabled={isSubmitting || loading}
            type="submit"
          >
            <LoginIcon className={`${styles.btnIcon} me-1`} />
            {isSubmitting || loading ? 'Logging in...' : 'Login'}
          </Button>
          <Button
            className={`${styles.btnExit} ${styles.modalButton}`}
            onClick={onClose}
            type="button"
            disabled={isSubmitting || loading}
          >
            <ExitToAppOutlinedIcon className={`${styles.btnIcon} me-1`} />
            Cancel
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default Login;
