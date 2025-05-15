import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import HistoryIcon from '@mui/icons-material/History';
import PersonIcon from '@mui/icons-material/Person';
import { useState } from 'react';
import { Row } from 'react-bootstrap';

import { ModalFooterButtons } from '@/components/ModalFooterButtons';
import { LoadingSpinner } from '@/components/Spinner';
import styles from '@/components/styles/Modal.module.css';
import { TabNavigation } from '@/components/TabNavigation';
import { Toast } from '@/components/Toast';
import { useProfile } from '@/hooks/useProvider';
import type { TabItem } from '@/types/components';

import { ProfileChangePassword } from './ProfileChangePassword';
import { ProfileDeleteAccount } from './ProfileDeleteAccount';
import { ProfileGameHistory } from './ProfileGameHistory';
import { ProfileOverview } from './ProfileOverview';

export function ProfileData({
  onClose,
  logout,
}: {
  onClose: () => void;
  logout: () => void;
}) {
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [showPasswordTab, setShowPasswordTab] = useState(false);
  const [showDeleteTab, setShowDeleteTab] = useState(false);

  const {
    loading,
    error,
    success,
    setError,
    setSuccess,
    profileImage,
    handleUpdateProfile,
    handleDeleteAccount,
  } = useProfile();

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
      />
    );
  } else if (activeTab === 'overview' && showDeleteTab) {
    content = <ProfileDeleteAccount />;
  } else if (activeTab === 'overview') {
    content = (
      <ProfileOverview
        onPasswordClick={() => {
          setShowPasswordTab(true);
        }}
        onDeleteClick={() => {
          setShowDeleteTab(true);
        }}
        logout={logout}
      />
    );
  } else if (activeTab === 'history') {
    content = <ProfileGameHistory />;
  }

  // Determine which footer buttons to show based on current state
  const renderFooterButtons = () => {
    if (activeTab === 'overview' && showPasswordTab) {
      return (
        <ModalFooterButtons
          leftText={loading ? <LoadingSpinner /> : 'Save Changes'}
          rightText="Back"
          onLeftClick={undefined}
          onRightClick={() => {
            setShowPasswordTab(false);
          }}
          leftIcon={
            loading ? undefined : <DriveFolderUploadIcon fontSize="small" />
          }
          rightIcon={<ArrowBackIcon fontSize="small" />}
          leftDisabled={loading}
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

    // Default footer buttons
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
}
