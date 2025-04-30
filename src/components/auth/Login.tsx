import { Form, Alert } from 'react-bootstrap';
import LoginIcon from '@mui/icons-material/Login';
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';
import Button from '@/components/Button';
import FormField from '@/components/FormField';
import { useLogin } from '@/hooks/useLogin';
import type { LoginProps } from '@/types/auth';
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
        <div className="d-flex">
          <Button
            className={`${styles.btnRestart} ${styles.modalButton}`}
            disabled={loading}
            type="submit"
            icon={<LoginIcon fontSize="small" className={styles.btnIcon} />}
            text={loading ? 'Loading...' : 'Sign In'}
          />
          <Button
            className={`${styles.btnExit} ${styles.modalButton}`}
            onClick={onClose}
            type="button"
            disabled={loading}
            icon={
              <ExitToAppOutlinedIcon
                fontSize="small"
                className={styles.btnIcon}
              />
            }
            text="Cancel"
          />
        </div>
      </Form>
    </>
  );
};

export default Login;
