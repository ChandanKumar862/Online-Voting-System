import api from './api';
import { mockStore } from './mockStore';

export const userService = {
  getAll: async () => {
    try {
      const response = await api.get('/api/users');
      return response.data;
    } catch {
      return [...mockStore.users];
    }
  },

  getById: async (id) => {
    try {
      const response = await api.get(`/api/users/${id}`);
      return response.data;
    } catch {
      const found = mockStore.users.find(u => u.id === id);
      if (!found) throw new Error('User not found');
      return found;
    }
  },

  update: async (id, data) => {
    try {
      const response = await api.put(`/api/users/${id}`, data);
      return response.data;
    } catch {
      const idx = mockStore.users.findIndex(u => u.id === id);
      if (idx === -1) throw new Error('User not found');
      mockStore.users[idx] = { ...mockStore.users[idx], ...data };
      if (mockStore.currentUser?.id === id) {
        mockStore.currentUser = mockStore.users[idx];
      }
      return mockStore.users[idx];
    }
  },

  delete: async (id) => {
    try {
      const response = await api.delete(`/api/users/${id}`);
      return response.data;
    } catch {
      mockStore.users = mockStore.users.filter(u => u.id !== id);
      return { success: true };
    }
  }
};

export default userService;
