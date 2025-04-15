import { Form, Alert } from 'react-bootstrap';
import Button from '@/components/Button';
import styles from '@/components/styles/Modal.module.css';
import LoginIcon from '@mui/icons-material/Login';
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';
import { useLogin } from '@/hooks/useLogin';
import FormField from '@/components/FormField';
import type { LoginProps } from '@/types/auth';

const Login = ({ onClose }: LoginProps) => {
  const { state, formAction, isPending, authError } = useLogin(onClose);

  return (
    <>
      {authError && <Alert variant="danger">{authError}</Alert>}
      <Form action={formAction}>
        <FormField
          controlId="formUsername"
          name="username"
          type="text"
          label="Username"
          placeholder="Enter username"
          defaultValue={state.values.username}
          error={state.fieldErrors?.username}
          showError={!!state.fieldErrors?.username}
          className={styles.input}
        />
        <FormField
          controlId="formPassword"
          name="password"
          type="password"
          label="Password"
          placeholder="Password"
          defaultValue={state.values.password}
          error={state.fieldErrors?.password}
          showError={!!state.fieldErrors?.password}
          className={styles.input}
        />
        <div className="d-flex">
          <Button
            className={`${styles.btnRestart} ${styles.modalButton}`}
            disabled={isPending}
            type="submit"
            icon={<LoginIcon fontSize="small" className={styles.btnIcon} />}
            text={isPending ? 'Loading...' : 'Sign In'}
          />
          <Button
            className={`${styles.btnExit} ${styles.modalButton}`}
            onClick={onClose}
            type="button"
            disabled={isPending}
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
