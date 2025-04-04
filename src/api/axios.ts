import axios from 'axios';

// Set the base URL for all axios requests
axios.defaults.baseURL = 'http://127.0.0.1:8000';

// Set the default content type
axios.defaults.headers.post['Content-Type'] = 'application/json';

// Allow credentials to be included in requests
axios.defaults.withCredentials = true;

// Create axios instances for request/response handling
export const axiosReq = axios.create({});
export const axiosRes = axios.create({});
