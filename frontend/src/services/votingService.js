import api from './api';
import { mockStore } from './mockStore';

export const votingService = {
  submitVote: async (votePayload) => {
    // votePayload: { electionId, candidateId, positionId }
    try {
      const response = await api.post('/api/votes', votePayload);
      return response.data;
    } catch {
      return mockStore.submitVote(votePayload.electionId, votePayload.candidateId, votePayload.positionId);
    }
  },

  getVoteStatus: async (electionId) => {
    try {
      const response = await api.get(`/api/votes/status/${electionId}`);
      return response.data;
    } catch {
      const currentUserId = mockStore.currentUser?.id;
      const historyItem = mockStore.voteHistory.find(
        v => v.userId === currentUserId && v.electionId === electionId
      );
      return {
        hasVoted: !!historyItem,
        votedAt: historyItem ? historyItem.votedAt : null,
        receiptHash: historyItem ? historyItem.receiptHash : null
      };
    }
  },

  getVoteHistory: async () => {
    try {
      const response = await api.get('/api/votes/history');
      return response.data;
    } catch {
      const currentUserId = mockStore.currentUser?.id;
      return mockStore.voteHistory.filter(v => v.userId === currentUserId);
    }
  }
};

export default votingService;
