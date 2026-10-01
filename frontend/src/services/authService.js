import api from './api';
import { mockStore } from './mockStore';

export const authService = {
  login: async (credentials) => {
    try {
      const response = await api.post('/api/auth/login', credentials);
      return response.data;
    } catch {
      // Mock fallback
      return mockStore.login(credentials.email, credentials.password);
    }
  },

  register: async (userData) => {
    try {
      const response = await api.post('/api/auth/register', userData);
      return response.data;
    } catch {
      // Mock fallback
      return mockStore.register(userData);
    }
  },

  logout: async () => {
    try {
      await api.post('/api/auth/logout');
    } catch {
      // Ignore network failure on logout
    }
    localStorage.removeItem('voting_auth_token');
    localStorage.removeItem('voting_user');
  },

  getCurrentUser: async () => {
    try {
      const response = await api.get('/api/auth/me');
      return response.data;
    } catch {
      const stored = localStorage.getItem('voting_user');
      return stored ? JSON.parse(stored) : mockStore.currentUser;
    }
  }
};

export default authService;
