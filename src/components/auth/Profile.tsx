import { useState, useEffect } from 'react';
import { Card, Form, Alert } from 'react-bootstrap';
import { useAuth } from '@/hooks/useAuth';
import Button from '@/components/Button';
import styles from '@/components/styles/Modal.module.css';
import { axiosReq } from '@/api/axios';

// Interface for API error responses
interface ApiError {
  response?: {
    data?: Record<string, string | string[]>;
    status?: number;
  };
  message?: string;
}

const Profile = () => {
  const { profile, getProfile, user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  useEffect(() => {
    // Load profile on component mount
    getProfile();
  }, [getProfile]);

  // Handle profile image change
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setProfileImage(file);

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Update profile picture
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
      // Create form data
      const formData = new FormData();
      formData.append('profile_picture', profileImage);

      // Update profile
      if (profile?.id) {
        await axiosReq.patch(`/api/profiles/${profile.id}/`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        // Refresh profile
        await getProfile();
        setSuccess('Profile updated successfully!');
        setProfileImage(null);
        setPreviewImage(null);
      } else {
        setError('Could not update profile: Profile ID not found');
      }
    } catch (err) {
      // Removed explicit type annotation
      console.error('Profile update error:', err);
      const error = err as ApiError;
      if (error.response?.data) {
        // Format error messages from the API
        const errorMessages = Object.entries(error.response.data)
          .map(([key, value]) => {
            const errorValue = Array.isArray(value) ? value.join(', ') : value;
            return `${key}: ${errorValue}`;
          })
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

        <h4>{user?.username}&apos;s Profile</h4>
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
