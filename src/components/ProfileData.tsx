import { useState, useEffect } from 'react';
import { Form, Alert } from 'react-bootstrap';
import { useAuth } from '@/hooks/useAuth';
import Button from '@/components/Button';
import styles from './styles/Modal.module.css';
import { axiosReq } from '@/api/axios';
import { ApiError } from '@/types/api';
import Image from '@/components/Image';

const ProfileData = ({ onClose }: { onClose: () => void }) => {
  const { profile, getProfile, user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  useEffect(() => {
    getProfile();
  }, [getProfile]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfileImage(file);
      const reader = new FileReader();
      reader.onloadend = () => setPreviewImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profileImage) {
      setError('Please select an image first');
      return;
    }
    if (!profile?.id) {
      setError('Could not update profile: Profile ID not found');
      return;
    }
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const formData = new FormData();
      formData.append('profile_picture', profileImage);
      await axiosReq.patch(`/api/profiles/${profile.id}/`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      await getProfile();
      setSuccess('Profile updated successfully!');
      setProfileImage(null);
      setPreviewImage(null);
    } catch (err) {
      console.error('Profile update error:', err);
      const errorObj = err as ApiError;
      if (errorObj.response?.data) {
        const errorMessages = Object.entries(errorObj.response.data)
          .map(
            ([key, value]) =>
              `${key}: ${Array.isArray(value) ? value.join(', ') : value}`,
          )
          .join('; ');
        setError(errorMessages || 'Failed to update profile');
      } else {
        setError('Failed to update profile. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

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
