import api from './api';
import { mockStore } from './mockStore';

export const positionService = {
  getAll: async () => {
    try {
      const response = await api.get('/api/positions');
      return response.data;
    } catch {
      return [...mockStore.positions];
    }
  },

  getByElection: async (electionId) => {
    try {
      const response = await api.get(`/api/elections/${electionId}/positions`);
      return response.data;
    } catch {
      return [...mockStore.positions];
    }
  },

  create: async (data) => {
    try {
      const response = await api.post('/api/positions', data);
      return response.data;
    } catch {
      const newPos = {
        id: `pos-${Date.now()}`,
        name: data.name,
        electionType: data.electionType || 'Central',
        description: data.description || ''
      };
      mockStore.positions.push(newPos);
      return newPos;
    }
  },

  update: async (id, data) => {
    try {
      const response = await api.put(`/api/positions/${id}`, data);
      return response.data;
    } catch {
      const idx = mockStore.positions.findIndex(p => p.id === id);
      if (idx === -1) throw new Error('Position not found');
      mockStore.positions[idx] = { ...mockStore.positions[idx], ...data };
      return mockStore.positions[idx];
    }
  },

  delete: async (id) => {
    try {
      const response = await api.delete(`/api/positions/${id}`);
      return response.data;
    } catch {
      mockStore.positions = mockStore.positions.filter(p => p.id !== id);
      return { success: true };
    }
  }
};

export default positionService;
