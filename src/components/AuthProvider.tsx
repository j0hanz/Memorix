import { AuthContext } from '@/contexts/AuthContext';
import { useAuthProvider } from '@/hooks/useAuth';
import type { AuthProviderProps } from '@/types/auth';

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const authState = useAuthProvider();

  return (
    <AuthContext.Provider value={authState}>{children}</AuthContext.Provider>
  );
};
