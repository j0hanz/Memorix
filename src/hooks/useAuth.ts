import { useContext } from 'react';
import { AuthContext } from '@/contexts/AuthContext';

// Export the useAuth hook
export const useAuth = () => useContext(AuthContext);
