import axios from 'axios';

// Use environment variables for the API URL
const baseURL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/';

export const axiosReq = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosReq.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
