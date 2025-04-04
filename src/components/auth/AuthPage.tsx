import { useState } from 'react';
import Login from './Login';
import Register from './Register';
import { Container, Row, Col } from 'react-bootstrap';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6} lg={5}>
          <div className="p-4 bg-dark rounded shadow">
            {isLogin ? (
              <>
                <Login />
                <div className="text-center mt-3">
                  Don&apos;t have an account?{' '}
                  <span
                    onClick={toggleAuthMode}
                    className="text-primary"
                    style={{ cursor: 'pointer' }}
                  >
                    Sign up
                  </span>
                </div>
              </>
            ) : (
              <>
                <Register onSuccess={() => setIsLogin(true)} />
                <div className="text-center mt-3">
                  Already have an account?{' '}
                  <span
                    onClick={toggleAuthMode}
                    className="text-primary"
                    style={{ cursor: 'pointer' }}
                  >
                    Log in
                  </span>
                </div>
              </>
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default AuthPage;
