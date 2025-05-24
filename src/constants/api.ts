// Axios configuration
export const AXIOS_CONFIG = {
  baseURL: import.meta.env.VITE_API_BASE_URL as string,
  headersPost: {
    'Content-Type': 'application/json',
  },
};

// GitHub API config
export const GITHUB_API = {
  API_URL: import.meta.env.VITE_GITHUB_API_URL as string,
  COMMITS_PER_PAGE: 3,
};

// Auth API endpoints
export const AUTH_ENDPOINTS = {
  login: '/dj-rest-auth/login/',
  register: '/dj-rest-auth/registration/',
  logout: '/dj-rest-auth/logout/',
  refresh: '/dj-rest-auth/token/refresh/',
  verify: '/dj-rest-auth/token/verify/',
  user: '/dj-rest-auth/user/',
  passwordChange: '/dj-rest-auth/password/change/',
} as const;

// Profile API endpoints
export const PROFILE_ENDPOINTS = {
  profiles: '/api/profiles/',
  profileDetail: (id: number) => `/api/profiles/${id.toString()}/`,
} as const;

// Game API endpoints
export const GAME_ENDPOINTS = {
  results: '/api/memorix/results/',
  bestResults: '/api/memorix/results/best/',
  leaderboard: '/api/memorix/leaderboard/',
  categories: '/api/memorix/categories/',
} as const;
