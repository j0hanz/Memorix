// Fix the styles reference
import { useState } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  });
  const [validated, setValidated] = useState(false);
  const { login, loading, error } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      return;
    }

    const success = await login(credentials);
    if (success) {
      navigate('/game');
    }
  };

  return (
    <Container>
      <div>
        <h2>Login to Memorix</h2>

        {error && <Alert variant="danger">{error}</Alert>}

        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              name="username"
              value={credentials.username}
              onChange={handleChange}
              placeholder="Enter username"
              required
            />
            <Form.Control.Feedback type="invalid">
              Username is required
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              placeholder="Password"
              required
            />
            <Form.Control.Feedback type="invalid">
              Password is required
            </Form.Control.Feedback>
          </Form.Group>

          <Button variant="primary" type="submit" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </Button>
        </Form>
      </div>
    </Container>
  );
};

export default Login;
