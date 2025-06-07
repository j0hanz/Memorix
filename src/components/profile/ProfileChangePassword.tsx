import type { ChangeEvent, FocusEvent } from 'react';
import { useEffect } from 'react';
import { Form } from 'react-bootstrap';

import { FormField } from '@/components/forms/FormField';
import styles from '@/components/modals/styles/Modal.module.css';
import { useForm } from '@/hooks/forms/useForm';
import { useProfile } from '@/hooks/shared/useProvider';
import type { ProfileFormValues } from '@/types/services';
import {
  isFormComplete,
  profilePasswordRequiredFields,
  profilePasswordValidationRules,
} from '@/utils/forms/validation';
import { AUTH_ICONS } from '@/utils/ui/iconUtils';

export function ProfileChangePassword({ onBack }: { onBack: () => void }) {
  const { changePassword, setPasswordFormComplete } = useProfile();

  const { values, errors, touched, handleChange, handleBlur, handleSubmit } =
    useForm<ProfileFormValues>(
      { oldPassword: '', newPassword1: '', newPassword2: '' },
      profilePasswordValidationRules,
      async (formValues) => {
        const result = await changePassword(formValues);
        if (result) {
          setTimeout(() => {
            onBack();
          }, 500);
        }
        return result;
      },
    );

  // Track form completion state
  const formComplete = isFormComplete(values, profilePasswordRequiredFields);

  // Update the form completion state in the context
  useEffect(() => {
    setPasswordFormComplete(formComplete);
  }, [formComplete, setPasswordFormComplete]);

  const handleInputBlur = (e: FocusEvent<HTMLInputElement>) => {
    const typedEvent: ChangeEvent<HTMLInputElement> = {
      ...e,
      target: e.target as HTMLInputElement,
      type: 'blur',
    };

    handleBlur(typedEvent);
  };

  return (
    <Form
      id="password-change-form"
      onSubmit={(e) => {
        void handleSubmit(e);
      }}
      className="mb-1"
    >
      <FormField
        controlId="oldPassword"
        name="oldPassword"
        type="password"
        label="Current Password"
        placeholder="Enter current password"
        value={values.oldPassword}
        onChange={handleChange}
        onBlur={handleInputBlur}
        error={errors.oldPassword}
        showError={!!errors.oldPassword && touched.oldPassword}
        className={styles.input}
        icon={AUTH_ICONS.password()}
      />

      <FormField
        controlId="newPassword1"
        name="newPassword1"
        type="password"
        label="New Password"
        placeholder="Enter new password"
        value={values.newPassword1}
        onChange={handleChange}
        onBlur={handleInputBlur}
        error={errors.newPassword1}
        showError={!!errors.newPassword1 && touched.newPassword1}
        className={styles.input}
        icon={AUTH_ICONS.passwordReset()}
      />

      <FormField
        controlId="newPassword2"
        name="newPassword2"
        type="password"
        label="Confirm New Password"
        placeholder="Confirm new password"
        value={values.newPassword2}
        onChange={handleChange}
        onBlur={handleInputBlur}
        error={errors.newPassword2}
        showError={!!errors.newPassword2 && touched.newPassword2}
        className={styles.input}
        icon={AUTH_ICONS.passwordConfirm()}
      />
    </Form>
  );
}
