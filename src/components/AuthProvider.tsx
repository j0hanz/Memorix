import { ReactNode } from 'react';
import { AuthContext } from '@/contexts/AuthContext';
import { useAuthProvider } from '@/hooks/useAuthProvider';

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const authState = useAuthProvider();

  return (
    <AuthContext.Provider value={authState}>{children}</AuthContext.Provider>
  );
};
