import { useState, useEffect } from 'react';
import { Card, Form, Alert } from 'react-bootstrap';
import { useAuth } from '@/hooks/useAuth';
import Button from '@/components/Button';
import styles from '@/components/styles/Modal.module.css';
import { axiosReq } from '@/api/axios';
import { ApiError } from '@/types/api';

const Profile = () => {
  const { profile, getProfile, user } = useAuth();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  useEffect(() => {
    getProfile();
  }, [getProfile]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
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
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const formData = new FormData();
      formData.append('profile_picture', profileImage);
      if (profile?.id) {
        await axiosReq.patch(`/api/profiles/${profile.id}/`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        await getProfile();
        setSuccess('Profile updated successfully!');
        setProfileImage(null);
        setPreviewImage(null);
      } else {
        setError('Could not update profile: Profile ID not found');
      }
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
    <Card className="p-4">
      <Card.Header>
        <h3>Your Profile</h3>
      </Card.Header>
      <Card.Body>
        {error && <Alert variant="danger">{error}</Alert>}
        {success && <Alert variant="success">{success}</Alert>}
        <div className="mb-4 text-center">
          <img
            src={
              previewImage ||
              profile?.profile_picture ||
              'https://res.cloudinary.com/memorix/image/upload/v1/nobody_nrbk5n'
            }
            alt="Profile"
            className="rounded-circle"
            style={{ width: '150px', height: '150px', objectFit: 'cover' }}
          />
        </div>
        <h4>{user.username}&apos;s Profile</h4>
        {profile && (
          <p>
            Member since: {new Date(profile.created_at).toLocaleDateString()}
          </p>
        )}
        <Form onSubmit={handleUpdateProfile}>
          <Form.Group className="mb-3">
            <Form.Label>Profile Picture</Form.Label>
            <Form.Control
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
            <Form.Text className="text-muted">
              Select a new profile picture to update
            </Form.Text>
          </Form.Group>
          <Button
            className={styles.btnRestart}
            type="submit"
            disabled={loading || !profileImage}
          >
            {loading ? 'Updating...' : 'Update Profile'}
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default Profile;
