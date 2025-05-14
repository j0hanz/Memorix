import { Form } from 'react-bootstrap';

import styles from '@/components/styles/Modal.module.css';
import type { ProfileChangePasswordProps } from '@/types/components';

export const ProfileChangePassword: React.FC<ProfileChangePasswordProps> = ({
  error,
  success,
  values,
  errors,
  touched,
  handleChange,
  handleBlur,
  handleSubmit,
}) => {
  return (
    <>
      <Form
        onSubmit={(e) => {
          void (handleSubmit && handleSubmit(e));
        }}
        className="mb-1"
      >
        <Form.Group controlId="oldPassword" className="mb-1">
          <Form.Label className="d-none">Current Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter current password"
            className={styles.input}
            name="oldPassword"
            value={values.oldPassword}
            onChange={handleChange}
            onBlur={handleBlur}
            autoComplete="current-password"
            isInvalid={!!errors.oldPassword && touched.oldPassword}
          />
          <Form.Control.Feedback type="invalid">
            {errors.oldPassword}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="newPassword1" className="mb-1">
          <Form.Label className="d-none">New Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter new password"
            className={styles.input}
            name="newPassword1"
            value={values.newPassword1}
            onChange={handleChange}
            onBlur={handleBlur}
            autoComplete="new-password"
            isInvalid={!!errors.newPassword1 && touched.newPassword1}
          />
          <Form.Control.Feedback type="invalid">
            {errors.newPassword1}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="newPassword2" className="mb-1">
          <Form.Label className="d-none">Confirm New Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm new password"
            className={styles.input}
            name="newPassword2"
            value={values.newPassword2}
            onChange={handleChange}
            onBlur={handleBlur}
            autoComplete="new-password"
            isInvalid={!!errors.newPassword2 && touched.newPassword2}
          />
          <Form.Control.Feedback type="invalid">
            {errors.newPassword2}
          </Form.Control.Feedback>
        </Form.Group>
      </Form>
      {error && <div className="text-danger mb-1 text-center">{error}</div>}
      {success && (
        <div className="text-success mb-1 text-center">{success}</div>
      )}
    </>
  );
};
