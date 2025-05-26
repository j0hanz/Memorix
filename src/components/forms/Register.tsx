import { Form } from 'react-bootstrap';

import { FormField } from '@/components/forms/FormField';
import { ModalFooterButtons } from '@/components/modals/ModalFooterButtons';
import styles from '@/components/styles/Modal.module.css';
import { LoadingSpinner } from '@/components/ui/Spinner';
import { useRegister } from '@/hooks/useRegister';
import type { RegisterProps } from '@/types/components';
import { AUTH_ICONS, NAVIGATION_ICONS } from '@/utils/iconUtils';
import { isFormComplete, registerRequiredFields } from '@/utils/validation';

export const Register = ({ onSuccess, onClose }: RegisterProps) => {
  const {
    values,
    errors,
    touched,
    formSubmitted,
    handleChange,
    handleBlur,
    handleSubmit,
    loading,
  } = useRegister(onSuccess);

  // Check if the form is complete
  const formComplete = isFormComplete(values, registerRequiredFields);

  return (
    <Form
      noValidate={true}
      onSubmit={(e) => {
        void handleSubmit(e);
      }}
    >
      <FormField
        controlId="formUsername"
        name="username"
        type="text"
        label="Username"
        placeholder="Choose a username"
        value={values.username}
        onChange={handleChange}
        onBlur={(e) => {
          handleBlur(e);
        }}
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
        onBlur={(e) => {
          handleBlur(e);
        }}
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
        onBlur={(e) => {
          handleBlur(e);
        }}
        error={errors.password2}
        showError={!!(touched.password2 || formSubmitted)}
        className={styles.input}
      />
      <ModalFooterButtons
        leftText={loading ? <LoadingSpinner /> : 'Sign Up'}
        rightText="Close"
        onLeftClick={undefined}
        onRightClick={onClose}
        leftIcon={loading ? null : AUTH_ICONS.register()}
        rightIcon={NAVIGATION_ICONS.close()}
        leftDisabled={loading || !formComplete}
        rightDisabled={loading}
        leftType="submit"
      />
    </Form>
  );
};
