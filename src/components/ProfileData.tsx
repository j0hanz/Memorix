import { useState } from 'react';
import { Form, Alert, Row, Col, Container, Table } from 'react-bootstrap';
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

// Helper function to format dates
const formatDate = (date?: string) =>
  date ? new Date(date).toLocaleDateString() : 'N/A';

// Helper function to render star ratings
const renderStars = (count: number) =>
  Array.from({ length: count }, (_, i) => (
    <StarOutlinedIcon
      key={i}
      className={styles.scoreIcon}
      style={{ fontSize: '1rem' }}
    />
  ));

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
      <Form onSubmit={handleUpdateProfile}>
        <Container fluid className="p-0">
          <Row className="p-4">
            {activeTab === 'overview' && (
              <>
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
                <h5>Your Game History</h5>
                {loadingScores ? (
                  <div className="text-center p-4">Loading game history...</div>
                ) : scores.length > 0 ? (
                  <div className="table-responsive mt-3">
                    <Table striped hover size="sm">
                      <thead>
                        <tr className="d-flex justify-content-between">
                          <th>Category</th>
                          <th>Rating</th>
                          <th>Moves</th>
                          <th>Time</th>
                          <th>Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {scores.map((score) => (
                          <tr
                            key={score.id}
                            className="d-flex justify-content-between align-items-center"
                          >
                            <td className={styles.scoreTab}>
                              {score.category_name}
                            </td>
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
                            <td className={styles.scoreTab}>
                              {score.completed_at}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
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
        </Container>
      </Form>
    </>
  );
};

export default ProfileData;
