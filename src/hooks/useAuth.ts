import { useContext } from 'react';
import { AuthContext } from '@/contexts/AuthProvider';

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  const { user, isAuthenticated, login, logout, register, loading, error } =
    context;

  // Derived states or helper methods
  const isLoggedIn = !!user && isAuthenticated;

  const isAdmin = user?.role === 'admin';

  return {
    user,
    isAuthenticated,
    isLoggedIn,
    isAdmin,
    login,
    logout,
    register,
    loading,
    error,
  };
};
