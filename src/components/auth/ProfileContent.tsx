import type { ReactNode } from 'react';

import { ProtectedRoute } from '@/components/ProtectedRoute';
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
      return (
        <ProtectedRoute
          onAuthRequired={() => {
            onBack();
          }}
        >
          <ProfileChangePassword onBack={onBack} />
        </ProtectedRoute>
      );
    }
    if (activeTab === 'overview' && showDeleteTab) {
      return (
        <ProtectedRoute
          onAuthRequired={() => {
            onBack();
          }}
        >
          <ProfileDeleteAccount />
        </ProtectedRoute>
      );
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
      return (
        <ProtectedRoute
          onAuthRequired={() => {
            onBack();
          }}
        >
          <ProfileGameHistory />
        </ProtectedRoute>
      );
    }
    return null;
  };

  return <>{renderContent()}</>;
}
