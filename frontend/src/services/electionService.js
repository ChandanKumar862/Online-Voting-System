import api from './api';
import { mockStore } from './mockStore';

export const electionService = {
  getAll: async (params = {}) => {
    try {
      const response = await api.get('/api/elections', { params });
      return response.data;
    } catch {
      let data = [...mockStore.elections];
      if (params.type && params.type !== 'all') {
        data = data.filter(e => e.type.toLowerCase() === params.type.toLowerCase());
      }
      if (params.status && params.status !== 'all') {
        data = data.filter(e => e.status.toLowerCase() === params.status.toLowerCase());
      }
      if (params.search) {
        const q = params.search.toLowerCase();
        data = data.filter(e => e.name.toLowerCase().includes(q) || e.description.toLowerCase().includes(q));
      }
      return data;
    }
  },

  getById: async (id) => {
    try {
      const response = await api.get(`/api/elections/${id}`);
      return response.data;
    } catch {
      const found = mockStore.elections.find(e => e.id === id);
      if (!found) throw new Error('Election not found');
      return found;
    }
  },

  create: async (electionData) => {
    try {
      const response = await api.post('/api/elections', electionData);
      return response.data;
    } catch {
      const newElection = {
        id: `el-${Date.now()}`,
        ...electionData,
        status: electionData.status || 'upcoming',
        totalVoters: 100000,
        votesCast: 0
      };
      mockStore.elections.unshift(newElection);
      return newElection;
    }
  },

  update: async (id, electionData) => {
    try {
      const response = await api.put(`/api/elections/${id}`, electionData);
      return response.data;
    } catch {
      const index = mockStore.elections.findIndex(e => e.id === id);
      if (index === -1) throw new Error('Election not found');
      mockStore.elections[index] = { ...mockStore.elections[index], ...electionData };
      return mockStore.elections[index];
    }
  },

  delete: async (id) => {
    try {
      const response = await api.delete(`/api/elections/${id}`);
      return response.data;
    } catch {
      mockStore.elections = mockStore.elections.filter(e => e.id !== id);
      return { success: true, message: 'Election deleted' };
    }
  }
};

export default electionService;
