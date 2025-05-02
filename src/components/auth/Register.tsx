import { Form, Alert } from 'react-bootstrap';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';
import FormField from '@/components/FormField';
import { useRegister } from '@/hooks/useRegister';
import { LoadingSpinner } from '@/components/Spinner';
import type { RegisterProps } from '@/types/auth';
import { ModalFooterButtons } from '@/components/ModalFooterButtons';
import styles from '@/components/styles/Modal.module.css';

const Register = ({ onSuccess, onClose }: RegisterProps) => {
  const {
    values,
    errors,
    touched,
    formSubmitted,
    handleChange,
    handleBlur,
    handleSubmit,
    loading,
    authError,
  } = useRegister(onSuccess);

  return (
    <>
      {authError && <Alert variant="danger">{authError}</Alert>}
      <Form noValidate onSubmit={handleSubmit}>
        <FormField
          controlId="formUsername"
          name="username"
          type="text"
          label="Username"
          placeholder="Choose a username"
          value={values.username}
          onChange={handleChange}
          onBlur={(e) => handleBlur(e as React.FocusEvent<HTMLInputElement>)}
          error={errors.username}
          showError={!!(touched.username || formSubmitted)}
          className={styles.input}
        />
        <FormField
          controlId="formPassword"
          name="password1"
          type="password"
          label="Password"
          placeholder="Choose a password"
          value={values.password1}
          onChange={handleChange}
          onBlur={(e) => handleBlur(e as React.FocusEvent<HTMLInputElement>)}
          error={errors.password1}
          showError={!!(touched.password1 || formSubmitted)}
          className={styles.input}
        />
        <FormField
          controlId="formConfirmPassword"
          name="password2"
          type="password"
          label="Confirm Password"
          placeholder="Confirm your password"
          value={values.password2}
          onChange={handleChange}
          onBlur={(e) => handleBlur(e as React.FocusEvent<HTMLInputElement>)}
          error={errors.password2}
          showError={!!(touched.password2 || formSubmitted)}
          className={styles.input}
        />
        <ModalFooterButtons
          leftText={loading ? <LoadingSpinner /> : 'Sign Up'}
          rightText="Close"
          onLeftClick={undefined}
          onRightClick={onClose}
          leftIcon={
            loading ? null : <PersonAddIcon className={styles.modalIcon} />
          }
          rightIcon={<ExitToAppOutlinedIcon className={styles.modalIcon} />}
          leftDisabled={loading}
          rightDisabled={loading}
          leftType="submit"
        />
      </Form>
    </>
  );
};

export default Register;
