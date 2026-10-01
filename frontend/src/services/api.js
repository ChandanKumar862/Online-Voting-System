import axios from 'axios';

// Centralized Axios Configuration for Node.js + Express + Supabase backend
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 5000 // 5 seconds timeout before fallback to mock
});

// Interceptor to attach Authorization JWT token automatically
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('voting_auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor for global error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // If backend isn't running or network fails, log friendly warning
    if (!error.response) {
      console.warn('Backend API unavailable. Application using in-memory demo data store.');
    }
    return Promise.reject(error);
  }
);

export default api;
