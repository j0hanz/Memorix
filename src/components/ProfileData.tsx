import { useState } from 'react';
import { Form, Alert, Row, Col, Container } from 'react-bootstrap';
import Button from '@/components/Button';
import styles from './styles/Modal.module.css';
import { useProfile } from '@/hooks/useProfile';
import TabNavigation from './TabNavigation';
import type { TabItem } from '@/types/components';
import PersonIcon from '@mui/icons-material/Person';
import HistoryIcon from '@mui/icons-material/History';
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import StarOutlinedIcon from '@mui/icons-material/StarOutlined';
import FlipOutlinedIcon from '@mui/icons-material/FlipOutlined';
import TimerOutlinedIcon from '@mui/icons-material/TimerOutlined';
import PetsIcon from '@mui/icons-material/Pets'; // For Animals
import PublicIcon from '@mui/icons-material/Public'; // For Astronomy
import PatternIcon from '@mui/icons-material/Wallpaper'; // For Patterns
import RestaurantIcon from '@mui/icons-material/Restaurant'; // For Sushi

// Helper function to format dates
const formatDate = (date?: string) =>
  date ? new Date(date).toLocaleDateString() : 'N/A';

// Helper function to render star ratings
const renderStars = (count: number) =>
  Array.from({ length: count }, (_, i) => (
    <StarOutlinedIcon key={i} className={styles.scoreIconStar} />
  ));

// Helper function to map category names to icons
const getscoreIcon = (categoryName: string) => {
  const categoryMap: Record<string, React.ReactElement> = {
    Animals: <PetsIcon fontSize="small" />,
    Astronomy: <PublicIcon fontSize="small" />,
    Patterns: <PatternIcon fontSize="small" />,
    Sushi: <RestaurantIcon fontSize="small" />,
  };

  return categoryMap[categoryName] || <span>{categoryName}</span>;
};

// Component for displaying user profile data
const ProfileData: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  // State to manage the active tab and profile data
  const [activeTab, setActiveTab] = useState<string>('overview');
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
  if (!user) {
    return (
      <div className="p-4 text-center">Please log in to view your profile</div>
    );
  }

  // Tab items for navigation
  const tabs: TabItem[] = [
    {
      key: 'overview',
      title: 'Overview',
      className: styles.navItemLeft,
      icon: <PersonIcon fontSize="small" className="me-1" />,
    },
    {
      key: 'history',
      title: 'Game History',
      className: styles.navItemRight,
      icon: <HistoryIcon fontSize="small" className="me-1" />,
    },
  ];

  return (
    <>
      {error && (
        <Alert variant="danger" className="mb-0 rounded-0">
          {error}
        </Alert>
      )}
      {success && (
        <Alert variant="success" className="mb-0 rounded-0">
          {success}
        </Alert>
      )}
      <TabNavigation
        activeKey={activeTab}
        tabs={tabs}
        onSelect={setActiveTab}
      />
      <Container>
        <Form onSubmit={handleUpdateProfile}>
          <Row className="py-4">
            {activeTab === 'overview' && (
              <>
                <Col>
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
                <Col className="d-flex flex-column">
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
                    <span className={styles.accountInfo} />
                  )}
                </Col>
              </>
            )}
            {activeTab === 'history' && (
              <>
                {loadingScores ? (
                  <div className="text-center p-4">Loading game history...</div>
                ) : scores.length > 0 ? (
                  <div className="mt-3">
                    {scores.map((score) => (
                      <Row key={score.id} className={styles.scoreRow}>
                        <Col
                          xs={1}
                          className="d-flex justify-content-start align-items-center"
                        >
                          {getscoreIcon(score.category_name)}
                        </Col>
                        <Col className="d-flex justify-content-center align-items-center">
                          {renderStars(score.stars)}
                        </Col>
                        <Col
                          xs={2}
                          className="d-flex justify-content-end align-items-center"
                        >
                          {score.moves}
                          <FlipOutlinedIcon className="ms-1" fontSize="small" />
                        </Col>
                        <Col
                          xs={3}
                          className="d-flex justify-content-end align-items-center"
                        >
                          {score.time_seconds}
                          <TimerOutlinedIcon
                            className="ms-1"
                            fontSize="small"
                          />
                        </Col>
                        <Col
                          xs={2}
                          className="d-flex justify-content-end align-items-center"
                        >
                          {score.completed_at}
                        </Col>
                      </Row>
                    ))}
                  </div>
                ) : (
                  <div className="text-center p-3 mt-3">
                    No game history found. Start playing to see your scores
                    here!
                  </div>
                )}
              </>
            )}
          </Row>
          <Row className="mt-4">
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
        </Form>
      </Container>
    </>
  );
};

export default ProfileData;
