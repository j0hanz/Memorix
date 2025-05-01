import { Form } from 'react-bootstrap';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LockResetIcon from '@mui/icons-material/LockReset';
import type { ProfileChangePasswordProps } from '@/types/components';
import { LoadingSpinner } from '@/components/Spinner';
import { ModalFooterButtons } from '@/components/ModalFooterButtons';
import styles from '@/components/styles/Modal.module.css';

const ProfileChangePassword: React.FC<ProfileChangePasswordProps> = ({
  onBack,
  loading,
  error,
  success,
  values,
  errors,
  touched,
  handleChange,
  handleBlur,
  handleSubmit,
}) => {
  const allFilled =
    values.oldPassword && values.newPassword1 && values.newPassword2;

  return (
    <>
      <Form onSubmit={handleSubmit} className="mb-3">
        <Form.Group controlId="oldPassword" className="mb-2">
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
        <Form.Group controlId="newPassword1" className="mb-2">
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
        <Form.Group controlId="newPassword2" className="mb-3">
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
      {error && <div className="text-danger mb-3 text-center">{error}</div>}
      {success && (
        <div className="text-success mb-3 text-center">{success}</div>
      )}
      <ModalFooterButtons
        leftText={loading ? <LoadingSpinner /> : 'Change Password'}
        rightText="Back"
        onLeftClick={undefined}
        onRightClick={onBack}
        leftIcon={loading ? undefined : <LockResetIcon fontSize="small" />}
        rightIcon={<ArrowBackIcon fontSize="small" />}
        leftDisabled={loading || !allFilled}
        rightDisabled={loading}
      />
    </>
  );
};

export default ProfileChangePassword;
