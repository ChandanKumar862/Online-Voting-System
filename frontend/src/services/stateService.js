import api from './api';
import { mockStore } from './mockStore';

export const stateService = {
  getAll: async () => {
    try {
      const response = await api.get('/api/states');
      return response.data;
    } catch {
      return [...mockStore.states];
    }
  },

  getById: async (id) => {
    try {
      const response = await api.get(`/api/states/${id}`);
      return response.data;
    } catch {
      const found = mockStore.states.find(s => s.id === id);
      if (!found) throw new Error('State not found');
      return found;
    }
  },

  create: async (stateData) => {
    try {
      const response = await api.post('/api/states', stateData);
      return response.data;
    } catch {
      const newState = {
        id: `st-${Date.now()}`,
        name: stateData.name,
        code: stateData.code || stateData.name.slice(0, 2).toUpperCase(),
        totalConstituencies: parseInt(stateData.totalConstituencies || 10, 10)
      };
      mockStore.states.push(newState);
      return newState;
    }
  },

  update: async (id, stateData) => {
    try {
      const response = await api.put(`/api/states/${id}`, stateData);
      return response.data;
    } catch {
      const index = mockStore.states.findIndex(s => s.id === id);
      if (index === -1) throw new Error('State not found');
      mockStore.states[index] = { ...mockStore.states[index], ...stateData };
      return mockStore.states[index];
    }
  },

  delete: async (id) => {
    try {
      const response = await api.delete(`/api/states/${id}`);
      return response.data;
    } catch {
      mockStore.states = mockStore.states.filter(s => s.id !== id);
      return { success: true };
    }
  }
};

export default stateService;
