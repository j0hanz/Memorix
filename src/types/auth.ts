export interface User {
  id: number;
  username: string;
  profile_id?: number;
  profile_picture?: string;
}

export interface Profile {
  id: number;
  owner: number;
  profile_picture?: string;
  profile_picture_url?: string;
  created_at: string;
  updated_at?: string;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface AuthProviderProps {
  children: React.ReactNode;
}

export interface LoginProps {
  onClose?: () => void;
}

export interface RegisterProps {
  onSuccess: () => void;
}

export interface RegisterData {
  username: string;
  password1: string;
  password2: string;
}

export interface AuthResponse {
  access?: string;
  refresh?: string;
  user: User;
  access_token?: string;
  refresh_token?: string;
  token?: string;
}

export interface JwtPayload {
  user_id: number;
  username: string;
  exp: number;
  iat: number;
  jti: string;
  token_type: string;
}

export interface TokenRefreshResponse {
  access: string;
}

export interface VerifyResponse {
  valid: boolean;
  user?: User;
}

export interface AuthContextType {
  user: User | null;
  profile: Profile | null;
  token: string;
  refreshToken: string;
  authError?: string;
  isAuthenticated: boolean;
  login: (credentials: LoginCredentials) => Promise<boolean>;
  register: (data: RegisterData) => Promise<boolean>;
  logout: () => void;
  getProfile: () => Promise<Profile | null>;
  loading: boolean;
  error: string | null;
}
