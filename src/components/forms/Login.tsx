import { Form } from 'react-bootstrap';

import { FormField } from '@/components/forms/FormField';
import { ModalFooterButtons } from '@/components/modals/ModalFooterButtons';
import styles from '@/components/modals/styles/Modal.module.css';
import { LoadingSpinner } from '@/components/ui/Spinner';
import { useLogin } from '@/hooks/auth/useLogin';
import type { LoginProps } from '@/types/components';
import { isFormComplete, loginRequiredFields } from '@/utils/forms/validation';
import { AUTH_ICONS, NAVIGATION_ICONS } from '@/utils/ui/iconUtils';

export const Login = ({ onClose }: LoginProps) => {
  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    loading,
  } = useLogin(onClose);

  // Check if the form is complete
  const formComplete = isFormComplete(values, loginRequiredFields);

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
        leftIcon={!loading ? AUTH_ICONS.login() : null}
        rightIcon={NAVIGATION_ICONS.close()}
        leftDisabled={loading || !formComplete}
        rightDisabled={loading}
        leftType="submit"
      />
    </Form>
  );
};
