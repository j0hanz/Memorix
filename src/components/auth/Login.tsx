import { Form, Alert } from 'react-bootstrap';
import LoginIcon from '@mui/icons-material/Login';
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';
import FormField from '@/components/FormField';
import { useLogin } from '@/hooks/useLogin';
import { LoadingSpinner } from '@/components/Spinner';
import type { LoginProps } from '@/types/auth';
import { ModalFooterButtons } from '@/components/ModalFooterButtons';
import styles from '@/components/styles/Modal.module.css';

const Login = ({ onClose }: LoginProps) => {
  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    loading,
    authError,
  } = useLogin(onClose);

  return (
    <>
      {authError && <Alert variant="danger">{authError}</Alert>}
      <Form onSubmit={handleSubmit}>
        <FormField
          controlId="formUsername"
          name="username"
          type="text"
          label="Username"
          placeholder="Enter username"
          value={values.username}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.username}
          showError={!!errors.username && touched.username}
          className={styles.input}
        />
        <FormField
          controlId="formPassword"
          name="password"
          type="password"
          label="Password"
          placeholder="Password"
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.password}
          showError={!!errors.password && touched.password}
          className={styles.input}
        />
        <ModalFooterButtons
          leftText={loading ? <LoadingSpinner /> : 'Sign In'}
          rightText="Close"
          onLeftClick={undefined}
          onRightClick={() => onClose?.()}
          leftIcon={!loading ? <LoginIcon fontSize="small" /> : null}
          rightIcon={<ExitToAppOutlinedIcon fontSize="small" />}
          leftDisabled={loading}
          rightDisabled={loading}
          leftType="submit"
        />
      </Form>
    </>
  );
};

export default Login;
