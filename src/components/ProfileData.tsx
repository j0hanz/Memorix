import { Form, Alert } from 'react-bootstrap';
import Button from '@/components/Button';
import styles from './styles/Modal.module.css';
import Image from '@/components/Image';
import { useProfile } from '@/hooks/useProfile';

const ProfileData = ({ onClose }: { onClose: () => void }) => {
  const {
    user,
    profile,
    loading,
    error,
    success,
    profileImage,
    previewImage,
    handleImageChange,
    handleUpdateProfile,
  } = useProfile();

  if (!user) {
    return <p>Please log in to view your profile</p>;
  }

  return (
    <>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}

      <div>
        <Image
          src={
            previewImage ||
            profile?.profile_picture_url ||
            'https://res.cloudinary.com/dxly7tpdi/image/upload/nobody_nrbk5n'
          }
          alt="Profile"
          className={styles.profileImage}
          onError={(e) => {
            if (!e) return;
            const target = e.target as HTMLImageElement;
            target.onerror = null;
            target.src =
              'https://res.cloudinary.com/dxly7tpdi/image/upload/nobody_nrbk5n';
          }}
        />
        <div className="my-3">{user.username}</div>
      </div>

      <Form onSubmit={handleUpdateProfile}>
        <Form.Group className="mb-3">
          <Form.Label className="d-none">Profile Picture</Form.Label>
          <Form.Control
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
          <Form.Text className="text-muted">
            Select a new profile picture to update
          </Form.Text>
        </Form.Group>

        <div className="d-flex">
          <Button
            className={`${styles.btnRestart} ${styles.modalButton}`}
            type="submit"
            disabled={loading || !profileImage}
          >
            {loading ? 'Updating...' : 'Update Profile'}
          </Button>
          <Button
            className={`${styles.btnExit} ${styles.modalButton}`}
            onClick={onClose}
          >
            Close
          </Button>
        </div>
      </Form>
    </>
  );
};

export default ProfileData;
