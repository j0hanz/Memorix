import { useState } from 'react';
import { Form, Alert, Row, Col, Container, Table } from 'react-bootstrap';
import Button from '@/components/Button';
import styles from './styles/Modal.module.css';
import { useProfile } from '@/hooks/useProfile';
import TabNavigation from './TabNavigation';
import type {
  ProfileImageTabProps,
  ProfileSettingsTabProps,
} from '@/types/api';
import type { TabItem } from '@/types/components';
import ImageIcon from '@mui/icons-material/Image';
import SettingsIcon from '@mui/icons-material/Settings';
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import StarOutlinedIcon from '@mui/icons-material/StarOutlined';
import FlipOutlinedIcon from '@mui/icons-material/FlipOutlined';
import TimerOutlinedIcon from '@mui/icons-material/TimerOutlined';

// Helper function to format dates
const formatDate = (date?: string) =>
  date ? new Date(date).toLocaleDateString() : 'N/A';

// Profile Image Tab Component
const ProfileImageTab: React.FC<ProfileImageTabProps> = ({
  user,
  profile,
  loading,
  profileImage,
  previewImage,
  handleImageChange,
  handleUpdateProfile,
  onClose,
}) => {
  return (
    <Form onSubmit={handleUpdateProfile}>
      <Container fluid className="p-0">
        <Row className="p-4">
          <Col className="d-flex justify-content-start flex-column">
            <div className={styles.profileImageContainer}>
              <img
                src={previewImage || profile?.profile_picture_url}
                alt="Profile"
                className={styles.profileImage}
                onError={(e) => console.error('Image load error:', e)}
              />
              <Button
                className={styles.btnUpload}
                icon={<DriveFolderUploadIcon fontSize="small" />}
              >
                <input
                  type="file"
                  id="profilePictureInput"
                  accept="image/*"
                  onChange={handleImageChange}
                  className={styles.fileInputHidden}
                />
                <label
                  htmlFor="profilePictureInput"
                  className={styles.clickableLabel}
                >
                  Upload
                </label>
              </Button>
            </div>
          </Col>
          <Col xs="auto" className="d-flex flex-column">
            <div className={styles.profileUsername}>{user.username}</div>
            {profile ? (
              <>
                <span className={styles.accountInfo}>
                  Created: {formatDate(profile.created_at)}
                </span>
                <span className={styles.accountInfo}>
                  Updated: {formatDate(profile.updated_at)}
                </span>
              </>
            ) : (
              <span className={styles.accountInfo}>
                Profile data not available
              </span>
            )}
          </Col>
          <Col className="d-flex flex-column justify-content-center text-center">
            <Form.Group>
              <Form.Label className="d-none">Profile Picture</Form.Label>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <div className="d-flex">
              <Button
                className={`${styles.btnRestart} ${styles.modalButton}`}
                type="submit"
                disabled={loading || !profileImage}
                text={loading ? 'Updating...' : 'Update Profile'}
              />
              <Button
                className={`${styles.btnExit} ${styles.modalButton}`}
                onClick={onClose}
                text="Close"
              />
            </div>
          </Col>
        </Row>
      </Container>
    </Form>
  );
};

// Profile Settings Tab Component
const ProfileSettingsTab: React.FC<ProfileSettingsTabProps> = ({
  user: _user,
  onClose,
  scores = [],
  loadingScores = false,
}) => {
  const renderStars = (count: number) =>
    Array.from({ length: count }, (_, i) => (
      <StarOutlinedIcon
        key={i}
        className={styles.scoreIcon}
        style={{ fontSize: '1rem' }}
      />
    ));

  return (
    <Container className="p-0">
      <h5 className="mt-4">Your Game History</h5>
      {loadingScores ? (
        <div className="text-center p-4">Loading...</div>
      ) : scores.length > 0 ? (
        <div className="table-responsive">
          <Table striped hover size="sm">
            <tbody>
              {scores.map((score) => (
                <tr
                  key={score.id}
                  className="d-flex justify-content-between align-items-center"
                >
                  <td className={styles.scoreTab}>{score.category_name}</td>
                  <td className={styles.scoreTab}>
                    {renderStars(score.stars)}
                  </td>
                  <td className={styles.scoreTab}>
                    <FlipOutlinedIcon />
                    {score.moves}
                  </td>
                  <td className={styles.scoreTab}>
                    <TimerOutlinedIcon />
                    {score.time_seconds}
                  </td>
                  <td className={styles.scoreTab}>{score.completed_at}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      ) : (
        <div className="text-center p-3">
          No game history found. Start playing to see your scores here!
        </div>
      )}
      <Row className="mt-4">
        <Col>
          <Button
            className={`${styles.btnExit} ${styles.modalButton}`}
            onClick={onClose}
            text="Close"
          />
        </Col>
      </Row>
    </Container>
  );
};

// Main ProfileData Component
const ProfileData: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [activeKey, setActiveKey] = useState<string>('image');
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
    scores,
    loadingScores,
  } = useProfile();

  if (!user) return <>Please log in to view your profile</>;

  const tabs: TabItem[] = [
    {
      key: 'image',
      title: 'Profile Image',
      className: styles.navItemLeft,
      icon: <ImageIcon fontSize="small" className="me-1" />,
    },
    {
      key: 'settings',
      title: 'Settings',
      className: styles.navItemRight,
      icon: <SettingsIcon fontSize="small" className="me-1" />,
    },
  ];

  return (
    <>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}
      <TabNavigation
        activeKey={activeKey}
        tabs={tabs}
        onSelect={setActiveKey}
      />
      {activeKey === 'image' && (
        <ProfileImageTab
          user={user}
          profile={profile}
          loading={loading}
          profileImage={profileImage}
          previewImage={previewImage}
          handleImageChange={handleImageChange}
          handleUpdateProfile={handleUpdateProfile}
          onClose={onClose}
          error={error}
          success={success}
        />
      )}
      {activeKey === 'settings' && (
        <ProfileSettingsTab
          user={user}
          onClose={onClose}
          scores={scores}
          loadingScores={loadingScores}
        />
      )}
    </>
  );
};

export default ProfileData;
