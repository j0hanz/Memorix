import { User } from '@/contexts/AuthProvider';

export interface VerifyResponse {
  valid: boolean;
  user?: User;
}
