import axios from 'axios';

import { AXIOS_CONFIG } from '@/constants/constants';

// Set the base URL for all axios requests
axios.defaults.baseURL = AXIOS_CONFIG.baseURL;

// Set the default content type using the constant
axios.defaults.headers.post = AXIOS_CONFIG.headersPost;

// Allow credentials to be included in requests
axios.defaults.withCredentials = true;

// Create axios instances for request/response handling
export const axiosReq = axios.create({});
export const axiosRes = axios.create({});
