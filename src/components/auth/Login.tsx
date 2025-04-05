import { Form, Alert } from 'react-bootstrap';
import Button from '@/components/Button';
import styles from '@/components/styles/Modal.module.css';
import LoginIcon from '@mui/icons-material/Login';
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';
import { useLoginForm } from '@/hooks/useAuthForms';
import FormField from '../FormField';
import { LoginProps } from '@/types/auth';

const Login = ({ onClose }: LoginProps) => {
  const {
    values,
    errors,
    touched,
    isSubmitting,
    formSubmitted,
    handleChange,
    handleBlur,
    handleSubmit,
    loading,
    authError,
  } = useLoginForm(onClose);

  return (
    <>
      {authError && <Alert variant="danger">{authError}</Alert>}
      <Form noValidate onSubmit={handleSubmit}>
        <FormField
          controlId="formUsername"
          name="username"
          type="text"
          label="Username"
          placeholder="Enter username"
          value={values.username}
          onChange={handleChange}
          onBlur={(e) => handleBlur(e as React.FocusEvent<HTMLInputElement>)}
          error={errors.username}
          showError={!!(touched.username || formSubmitted)}
          className={styles.input}
        />

        <div className="my-4">
          <FormField
            controlId="formPassword"
            name="password"
            type="password"
            label="Password"
            placeholder="Password"
            value={values.password}
            onChange={handleChange}
            onBlur={(e) => handleBlur(e as React.FocusEvent<HTMLInputElement>)}
            error={errors.password}
            showError={!!(touched.password || formSubmitted)}
            className={styles.input}
          />
        </div>

        <div className="d-flex">
          <Button
            className={`${styles.btnRestart} ${styles.modalButton}`}
            disabled={isSubmitting || loading}
            type="submit"
          >
            <LoginIcon className={`${styles.btnIcon} me-1`} />
            {isSubmitting || loading ? 'Logging in...' : 'Sign In'}
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
    </>
  );
};

export default Login;
