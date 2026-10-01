import api from './api';
import { mockStore } from './mockStore';

export const partyService = {
  getAll: async () => {
    try {
      const response = await api.get('/api/parties');
      return response.data;
    } catch {
      return [...mockStore.parties];
    }
  },

  getById: async (id) => {
    try {
      const response = await api.get(`/api/parties/${id}`);
      return response.data;
    } catch {
      const found = mockStore.parties.find(p => p.id === id);
      if (!found) throw new Error('Party not found');
      return found;
    }
  },

  create: async (data) => {
    try {
      const response = await api.post('/api/parties', data);
      return response.data;
    } catch {
      const newParty = {
        id: `pty-${Date.now()}`,
        name: data.name,
        shortName: data.shortName || data.name.slice(0, 3).toUpperCase(),
        symbol: data.symbol || 'Lotus',
        logo: data.logo || '🚩',
        color: data.color || '#3b82f6',
        foundedYear: data.foundedYear || 2024,
        description: data.description || ''
      };
      mockStore.parties.push(newParty);
      return newParty;
    }
  },

  update: async (id, data) => {
    try {
      const response = await api.put(`/api/parties/${id}`, data);
      return response.data;
    } catch {
      const idx = mockStore.parties.findIndex(p => p.id === id);
      if (idx === -1) throw new Error('Party not found');
      mockStore.parties[idx] = { ...mockStore.parties[idx], ...data };
      return mockStore.parties[idx];
    }
  },

  delete: async (id) => {
    try {
      const response = await api.delete(`/api/parties/${id}`);
      return response.data;
    } catch {
      mockStore.parties = mockStore.parties.filter(p => p.id !== id);
      return { success: true };
    }
  }
};

export default partyService;
