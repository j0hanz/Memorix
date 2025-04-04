import { useState } from 'react';
import { Form, Alert } from 'react-bootstrap';
import { useAuth } from '@/hooks/useAuth';
import Button from '@/components/Button';
import styles from '@/components/styles/Modal.module.css';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';

interface RegisterProps {
  onSuccess: () => void;
}

const Register = ({ onSuccess }: RegisterProps) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [validated, setValidated] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(true);
  const { register, loading, error } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === 'confirmPassword' || name === 'password') {
      setPasswordMatch(
        name === 'password'
          ? value === formData.confirmPassword
          : formData.password === value,
      );
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    if (form.checkValidity() === false || !passwordMatch) {
      e.stopPropagation();
      setValidated(true);
      return;
    }

    try {
      const success = await register({
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });

      if (success) {
        onSuccess(); // Switch back to login view
      }
    } catch (error) {
      console.error('Registration error:', error);
    }
  };

  return (
    <>
      {error && <Alert variant="danger">{error}</Alert>}

      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Form.Group className="mb-3 p-2" controlId="formUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Choose a username"
            required
          />
          <Form.Control.Feedback type="invalid">
            Username is required
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3 p-2" controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
          />
          <Form.Control.Feedback type="invalid">
            Valid email is required
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3 p-2" controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Choose a password"
            required
            minLength={6}
          />
          <Form.Control.Feedback type="invalid">
            Password must be at least 6 characters
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3 p-2" controlId="formConfirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm your password"
            required
            isInvalid={validated && !passwordMatch}
          />
          <Form.Control.Feedback type="invalid">
            {!passwordMatch
              ? "Passwords don't match"
              : 'Password confirmation required'}
          </Form.Control.Feedback>
        </Form.Group>

        <div className="d-flex mt-4">
          <Button
            className={`${styles.btnRestart} ${styles.modalButton}`}
            disabled={loading}
            type="submit"
          >
            <PersonAddIcon className={`${styles.btnIcon} me-1`} />
            {loading ? 'Creating Account...' : 'Sign Up'}
          </Button>
          <Button
            className={`${styles.btnExit} ${styles.modalButton}`}
            onClick={() => onSuccess()}
            type="button"
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
