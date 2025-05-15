import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import HistoryIcon from '@mui/icons-material/History';
import LockResetIcon from '@mui/icons-material/LockReset';
import PersonIcon from '@mui/icons-material/Person';
import { useState } from 'react';
import { Row } from 'react-bootstrap';

import { Button } from '@/components/Button';
import { ModalFooterButtons } from '@/components/ModalFooterButtons';
import { LoadingSpinner } from '@/components/Spinner';
import styles from '@/components/styles/Modal.module.css';
import { TabNavigation } from '@/components/TabNavigation';
import { Toast } from '@/components/Toast';
import { useProfile } from '@/hooks/useProfile';
import type { TabItem } from '@/types/components';

import { ProfileChangePassword } from './ProfileChangePassword';
import { ProfileDeleteAccount } from './ProfileDeleteAccount';
import { ProfileGameHistory } from './ProfileGameHistory';
import { ProfileOverview } from './ProfileOverview';

const ProfileData: React.FC<{ onClose: () => void; logout: () => void }> = ({
  onClose,
  logout,
}) => {
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [showPasswordTab, setShowPasswordTab] = useState(false);
  const [showDeleteTab, setShowDeleteTab] = useState(false);

  const {
    user,
    profile,
    loading,
    error,
    success,
    setError,
    setSuccess,
    profileImage,
    previewImage,
    handleImageChange,
    handleUpdateProfile,
    scores,
    scoresCount,
    scoresPage,
    setScoresPage,
    loadingScores,
    passwordForm,
    handleDeleteAccount,
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
      icon: <PersonIcon fontSize="small" />,
    },
    {
      key: 'history',
      title: 'Game History',
      className: styles.navItemRight,
      icon: <HistoryIcon fontSize="small" />,
    },
  ];

  // Render content based on state
  let content;
  if (activeTab === 'overview' && showPasswordTab) {
    content = (
      <ProfileChangePassword
        onBack={() => {
          setShowPasswordTab(false);
        }}
        loading={loading}
        error={error}
        success={success}
        values={passwordForm.values}
        errors={passwordForm.errors}
        touched={passwordForm.touched}
        handleChange={passwordForm.handleChange}
        handleBlur={passwordForm.handleBlur}
        handleSubmit={(
          e?: React.FormEvent<HTMLFormElement> | React.MouseEvent,
        ) => {
          if (e) {
            void passwordForm.handleSubmit(
              e as React.FormEvent<HTMLFormElement>,
            );
          } else {
            void passwordForm.handleSubmit();
          }
        }}
      />
    );
  } else if (activeTab === 'overview' && showDeleteTab) {
    content = (
      <ProfileDeleteAccount
        loading={loading}
        error={error}
        success={success}
        onDelete={() => {
          void handleDeleteAccount();
        }}
        onBack={() => {
          setShowDeleteTab(false);
        }}
      />
    );
  } else if (activeTab === 'overview') {
    content = (
      <ProfileOverview
        user={user}
        profile={profile}
        previewImage={previewImage}
        handleImageChange={handleImageChange}
        logout={logout}
        extraButton={
          <>
            <Button
              className={`${styles.btnMain} ${styles.btnPassword}`}
              variant="menu"
              text="Change Password"
              onClick={() => {
                setShowPasswordTab(true);
              }}
              type="button"
              color="secondary"
              icon={<LockResetIcon fontSize="small" />}
            />
            <Button
              className={`${styles.btnMain} ${styles.btnDelete}`}
              variant="menu"
              text="Delete Account"
              onClick={() => {
                setShowDeleteTab(true);
              }}
              type="button"
              icon={<DeleteOutlineIcon fontSize="small" />}
              color="secondary"
            />
          </>
        }
      />
    );
  } else if (activeTab === 'history') {
    content = (
      <ProfileGameHistory
        scores={scores}
        loadingScores={loadingScores}
        scoresCount={scoresCount}
        scoresPage={scoresPage}
        setScoresPage={setScoresPage}
      />
    );
  }

  // Determine which footer buttons to show based on current state
  const renderFooterButtons = () => {
    if (activeTab === 'overview' && showPasswordTab) {
      const allFilled =
        passwordForm.values.oldPassword &&
        passwordForm.values.newPassword1 &&
        passwordForm.values.newPassword2;

      return (
        <ModalFooterButtons
          leftText={loading ? <LoadingSpinner /> : 'Save Changes'}
          rightText="Back"
          onLeftClick={() => {
            void passwordForm.handleSubmit();
          }}
          onRightClick={() => {
            setShowPasswordTab(false);
          }}
          leftIcon={
            loading ? undefined : <DriveFolderUploadIcon fontSize="small" />
          }
          rightIcon={<ArrowBackIcon fontSize="small" />}
          leftDisabled={loading || !allFilled}
          rightDisabled={loading}
          leftType="submit"
        />
      );
    }

    if (activeTab === 'overview' && showDeleteTab) {
      return (
        <ModalFooterButtons
          leftText={loading ? <LoadingSpinner /> : 'Delete'}
          rightText="Back"
          onLeftClick={() => {
            void handleDeleteAccount();
          }}
          onRightClick={() => {
            setShowDeleteTab(false);
          }}
          leftIcon={
            loading ? undefined : <DeleteForeverIcon fontSize="small" />
          }
          rightIcon={<ArrowBackIcon fontSize="small" />}
          leftDisabled={loading}
          rightDisabled={loading}
          leftType="button"
        />
      );
    }

    // Default footer buttons for the overview tab
    return (
      <ModalFooterButtons
        leftText={loading ? <LoadingSpinner /> : 'Save Changes'}
        rightText="Close"
        onLeftClick={() => {
          void handleUpdateProfile();
        }}
        onRightClick={onClose}
        leftIcon={
          loading ? undefined : <DriveFolderUploadIcon fontSize="small" />
        }
        leftDisabled={loading || !profileImage || activeTab !== 'overview'}
        rightDisabled={false}
      />
    );
  };

  return (
    <>
      <Toast
        message={error || ''}
        show={!!error && !showPasswordTab && !showDeleteTab}
        placement="top"
        onClose={() => {
          setError(null);
        }}
      />
      <Toast
        message={success || ''}
        show={!!success && !showPasswordTab && !showDeleteTab}
        placement="top"
        onClose={() => {
          setSuccess(null);
        }}
      />
      <TabNavigation
        activeKey={activeTab}
        tabs={tabs}
        onSelect={(key) => {
          setActiveTab(key);
          setShowPasswordTab(false);
          setShowDeleteTab(false);
        }}
      />
      <Row className={styles.modalRow}>{content}</Row>
      {renderFooterButtons()}
    </>
  );
};

export default ProfileData;
