import api from './api';
import { mockStore } from './mockStore';

export const candidateService = {
  getAll: async (params = {}) => {
    try {
      const response = await api.get('/api/candidates', { params });
      return response.data;
    } catch {
      let data = [...mockStore.candidates];
      if (params.electionId) {
        data = data.filter(c => c.electionId === params.electionId);
      }
      if (params.partyId) {
        data = data.filter(c => c.partyId === params.partyId);
      }
      if (params.stateId) {
        data = data.filter(c => c.stateId === params.stateId);
      }
      if (params.constituencyId) {
        data = data.filter(c => c.constituencyId === params.constituencyId);
      }
      if (params.search) {
        const q = params.search.toLowerCase();
        data = data.filter(c => c.name.toLowerCase().includes(q) || c.partyName.toLowerCase().includes(q));
      }
      return data;
    }
  },

  getById: async (id) => {
    try {
      const response = await api.get(`/api/candidates/${id}`);
      return response.data;
    } catch {
      const found = mockStore.candidates.find(c => c.id === id);
      if (!found) throw new Error('Candidate not found');
      return found;
    }
  },

  getByElection: async (electionId) => {
    try {
      const response = await api.get(`/api/candidates/election/${electionId}`);
      return response.data;
    } catch {
      return mockStore.candidates.filter(c => c.electionId === electionId);
    }
  },

  getByConstituency: async (constituencyId) => {
    try {
      const response = await api.get(`/api/candidates/constituency/${constituencyId}`);
      return response.data;
    } catch {
      return mockStore.candidates.filter(c => c.constituencyId === constituencyId);
    }
  },

  create: async (data) => {
    try {
      const response = await api.post('/api/candidates', data);
      return response.data;
    } catch {
      const party = mockStore.parties.find(p => p.id === data.partyId);
      const election = mockStore.elections.find(e => e.id === data.electionId);
      const newCand = {
        id: `cand-${Date.now()}`,
        name: data.name,
        electionId: data.electionId,
        electionName: election ? election.name : 'General Election',
        partyId: data.partyId,
        partyName: party ? party.name : 'Independent',
        partyShort: party ? party.shortName : 'IND',
        partyLogo: party ? party.logo : '🪁',
        symbol: party ? party.symbol : 'Kite',
        positionId: data.positionId || 'pos-1',
        positionName: data.positionName || 'Member of Parliament (MP)',
        stateId: data.stateId || 'st-1',
        stateName: data.stateName || 'Bihar',
        constituencyId: data.constituencyId || 'cs-1',
        constituencyName: data.constituencyName || 'Patna Sahib',
        photo: data.photo || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80',
        description: data.description || 'Public service candidate',
        education: data.education || 'Graduate',
        age: parseInt(data.age || 40, 10),
        status: 'approved',
        voteCount: 0
      };
      mockStore.candidates.unshift(newCand);
      return newCand;
    }
  },

  update: async (id, data) => {
    try {
      const response = await api.put(`/api/candidates/${id}`, data);
      return response.data;
    } catch {
      const idx = mockStore.candidates.findIndex(c => c.id === id);
      if (idx === -1) throw new Error('Candidate not found');
      mockStore.candidates[idx] = { ...mockStore.candidates[idx], ...data };
      return mockStore.candidates[idx];
    }
  },

  delete: async (id) => {
    try {
      const response = await api.delete(`/api/candidates/${id}`);
      return response.data;
    } catch {
      mockStore.candidates = mockStore.candidates.filter(c => c.id !== id);
      return { success: true };
    }
  }
};

export default candidateService;
