import api from './api';
import { mockStore } from './mockStore';

export const constituencyService = {
  getAll: async () => {
    try {
      const response = await api.get('/api/constituencies');
      return response.data;
    } catch {
      return [...mockStore.constituencies];
    }
  },

  getById: async (id) => {
    try {
      const response = await api.get(`/api/constituencies/${id}`);
      return response.data;
    } catch {
      const found = mockStore.constituencies.find(c => c.id === id);
      if (!found) throw new Error('Constituency not found');
      return found;
    }
  },

  getByState: async (stateId) => {
    try {
      const response = await api.get(`/api/states/${stateId}/constituencies`);
      return response.data;
    } catch {
      return mockStore.constituencies.filter(c => c.stateId === stateId);
    }
  },

  create: async (data) => {
    try {
      const response = await api.post('/api/constituencies', data);
      return response.data;
    } catch {
      const stateObj = mockStore.states.find(s => s.id === data.stateId);
      const newConstituency = {
        id: `cs-${Date.now()}`,
        name: data.name,
        stateId: data.stateId,
        stateName: stateObj ? stateObj.name : 'Unknown',
        type: data.type || 'Parliamentary',
        number: parseInt(data.number || 1, 10)
      };
      mockStore.constituencies.push(newConstituency);
      return newConstituency;
    }
  },

  update: async (id, data) => {
    try {
      const response = await api.put(`/api/constituencies/${id}`, data);
      return response.data;
    } catch {
      const idx = mockStore.constituencies.findIndex(c => c.id === id);
      if (idx === -1) throw new Error('Constituency not found');
      mockStore.constituencies[idx] = { ...mockStore.constituencies[idx], ...data };
      return mockStore.constituencies[idx];
    }
  },

  delete: async (id) => {
    try {
      const response = await api.delete(`/api/constituencies/${id}`);
      return response.data;
    } catch {
      mockStore.constituencies = mockStore.constituencies.filter(c => c.id !== id);
      return { success: true };
    }
  }
};

export default constituencyService;
