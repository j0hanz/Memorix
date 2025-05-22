export interface TokenState {
  isRefreshing: boolean;
  subscribers: ((token: string) => void)[];
}

export interface DecodedToken {
  exp: number;
  [key: string]: unknown;
}
