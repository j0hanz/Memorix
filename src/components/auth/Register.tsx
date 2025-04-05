import { Form, Alert } from 'react-bootstrap';
import Button from '@/components/Button';
import styles from '@/components/styles/Modal.module.css';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';
import { useRegisterForm } from '@/hooks/useAuthForms';
import FormField from '../FormField';
import { RegisterProps } from '@/types/auth';

const Register = ({ onSuccess }: RegisterProps) => {
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
  } = useRegisterForm(onSuccess);

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

        <div className="my-4">
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
        </div>

        <div className="my-4">
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
        </div>

        <div className="d-flex mt-5">
          <Button
            className={`${styles.btnRestart} ${styles.modalButton}`}
            disabled={isSubmitting || loading}
            type="submit"
          >
            <PersonAddIcon className={`${styles.btnIcon} me-1`} />
            {isSubmitting || loading ? 'Creating Account...' : 'Sign Up'}
          </Button>
          <Button
            className={`${styles.btnExit} ${styles.modalButton}`}
            onClick={onSuccess}
            type="button"
            disabled={isSubmitting || loading}
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
