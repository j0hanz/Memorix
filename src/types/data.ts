import type { ReactNode } from 'react';

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

export interface IconExplanationProps {
  icon: React.ReactNode;
  description: string;
}

export interface ScoreboardProps {
  moves: number;
  completedTime: string;
}

export interface CardDef {
  pairId: number;
  img: string;
  status: string;
  name: string;
}

export interface PairedCard extends CardDef {
  id: number;
}

export interface CardData {
  img: string;
  name: string;
  status: string;
}

export interface ModalData {
  categoryCode?: string;
  moves?: number;
  completedTime?: number;
  onReset?: () => void;
  onExit?: () => void;
  onSelectCategory?: (category: string) => void;
  logout?: () => void;
  children?: ReactNode;
}
