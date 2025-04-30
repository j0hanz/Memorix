import { useState } from 'react';
import { Form } from 'react-bootstrap';
import Button from '@/components/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import styles from '@/components/styles/Modal.module.css';
import type { ProfileChangePasswordProps } from '@/types/components';

const ProfileChangePassword: React.FC<ProfileChangePasswordProps> = ({
  onBack,
  onSubmit,
  loading,
  error,
  success,
}) => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword1, setNewPassword1] = useState('');
  const [newPassword2, setNewPassword2] = useState('');
  const allFilled = oldPassword && newPassword1 && newPassword2;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(oldPassword, newPassword1, newPassword2);
  };

  return (
    <>
      <Form onSubmit={handleSubmit} className="mb-3">
        <Form.Group controlId="oldPassword" className="mb-2">
          <Form.Label className="d-none">Current Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter current password"
            className={styles.input}
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            autoComplete="current-password"
          />
        </Form.Group>
        <Form.Group controlId="newPassword1" className="mb-2">
          <Form.Label className="d-none">New Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter new password"
            className={styles.input}
            value={newPassword1}
            onChange={(e) => setNewPassword1(e.target.value)}
            autoComplete="new-password"
          />
        </Form.Group>
        <Form.Group controlId="newPassword2" className="mb-3">
          <Form.Label className="d-none">Confirm New Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm new password"
            className={styles.input}
            value={newPassword2}
            onChange={(e) => setNewPassword2(e.target.value)}
            autoComplete="new-password"
          />
        </Form.Group>
      </Form>
      {error && <div className="text-danger mb-3 text-center">{error}</div>}
      {success && (
        <div className="text-success mb-3 text-center">{success}</div>
      )}
      <div className="d-flex">
        <Button
          className={`${styles.btnRestart} ${styles.modalButton}`}
          type="submit"
          disabled={loading || !allFilled}
          text={loading ? 'Changing...' : 'Update Password'}
          onClick={handleSubmit}
        />
        <Button
          className={`${styles.btnExit} ${styles.modalButton}`}
          onClick={onBack}
          type="button"
          disabled={loading}
          icon={<ArrowBackIcon fontSize="small" />}
          text="Back"
        />
      </div>
    </>
  );
};

export default ProfileChangePassword;
