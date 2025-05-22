import type { ReactNode } from 'react';

import type { ProfileContentProps } from '@/types/components';

import { ProfileChangePassword } from './ProfileChangePassword';
import { ProfileDeleteAccount } from './ProfileDeleteAccount';
import { ProfileGameHistory } from './ProfileGameHistory';
import { ProfileOverview } from './ProfileOverview';

export function ProfileContent({
  activeTab,
  showPasswordTab,
  showDeleteTab,
  onPasswordClick,
  onDeleteClick,
  onBack,
  logout,
}: ProfileContentProps) {
  const renderContent = (): ReactNode => {
    if (activeTab === 'overview' && showPasswordTab) {
      return <ProfileChangePassword onBack={onBack} />;
    }
    if (activeTab === 'overview' && showDeleteTab) {
      return <ProfileDeleteAccount />;
    }
    if (activeTab === 'overview') {
      return (
        <ProfileOverview
          onPasswordClick={onPasswordClick}
          onDeleteClick={onDeleteClick}
          logout={logout}
        />
      );
    }
    if (activeTab === 'history') {
      return <ProfileGameHistory />;
    }
    return null;
  };

  return <>{renderContent()}</>;
}
