import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';
import LoginIcon from '@mui/icons-material/Login';
import { Form } from 'react-bootstrap';

import { FormField } from '@/components/FormField';
import { ModalFooterButtons } from '@/components/ModalFooterButtons';
import { LoadingSpinner } from '@/components/Spinner';
import styles from '@/components/styles/Modal.module.css';
import { useLogin } from '@/hooks/useLogin';
import type { LoginProps } from '@/types/auth';

const Login = ({ onClose }: LoginProps) => {
  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    loading,
  } = useLogin(onClose);

  return (
    <Form
      onSubmit={(e) => {
        void handleSubmit(e);
      }}
    >
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
  );
};

export default Login;
