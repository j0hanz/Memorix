import type { ReactNode } from 'react';

import { ProfileChangePassword } from '@/components/profile/ProfileChangePassword';
import { ProfileDeleteAccount } from '@/components/profile/ProfileDeleteAccount';
import { ProfileGameHistory } from '@/components/profile/ProfileGameHistory';
import { ProfileOverview } from '@/components/profile/ProfileOverview';
import { ProtectedRoute } from '@/components/ui/ProtectedRoute';
import type { ProfileContentProps } from '@/types/components';

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
