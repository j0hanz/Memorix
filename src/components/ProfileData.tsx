import { useState } from 'react';
import { Form, Alert, Row, Col } from 'react-bootstrap';
import Button from '@/components/Button';
import styles from './styles/Modal.module.css';
import { useProfile } from '@/hooks/useProfile';
import TabNavigation from './TabNavigation';
import type { TabItem } from '@/types/components';
import PersonIcon from '@mui/icons-material/Person';
import HistoryIcon from '@mui/icons-material/History';
import ProfileOverview from './ProfileOverview';
import ProfileGameHistory from './ProfileGameHistory';

const ProfileData: React.FC<{ onClose: () => void }> = ({ onClose }) => {
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
        <Row className="py-4">
          {activeTab === 'overview' && (
            <ProfileOverview
              user={user}
              profile={profile}
              previewImage={previewImage}
              handleImageChange={handleImageChange}
            />
          )}
          {activeTab === 'history' && (
            <ProfileGameHistory scores={scores} loadingScores={loadingScores} />
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
    </>
  );
};

export default ProfileData;
