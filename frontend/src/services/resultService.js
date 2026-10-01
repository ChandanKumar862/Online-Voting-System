import api from './api';
import { mockStore } from './mockStore';

export const resultService = {
  getElectionResults: async (electionId) => {
    try {
      const response = await api.get(`/api/results/${electionId}`);
      return response.data;
    } catch {
      const election = mockStore.elections.find(e => e.id === electionId) || mockStore.elections[0];
      const candidates = mockStore.candidates.filter(c => c.electionId === election.id);
      
      const totalVotes = candidates.reduce((sum, c) => sum + (c.voteCount || 0), 0) || election.votesCast || 1;
      
      const results = candidates.map(c => {
        const votes = c.voteCount || 0;
        const percentage = ((votes / totalVotes) * 100).toFixed(1);
        return {
          candidateId: c.id,
          candidateName: c.name,
          partyName: c.partyName,
          partyLogo: c.partyLogo,
          symbol: c.symbol,
          photo: c.photo,
          constituencyName: c.constituencyName,
          positionName: c.positionName,
          voteCount: votes,
          percentage: parseFloat(percentage)
        };
      }).sort((a, b) => b.voteCount - a.voteCount);

      return {
        electionId: election.id,
        electionName: election.name,
        electionType: election.type,
        status: election.status,
        totalVoters: election.totalVoters,
        votesCast: election.votesCast,
        turnoutPercentage: ((election.votesCast / election.totalVoters) * 100).toFixed(1),
        winner: results[0] || null,
        results
      };
    }
  },

  getWinner: async (electionId) => {
    try {
      const response = await api.get(`/api/results/${electionId}/winner`);
      return response.data;
    } catch {
      const fullRes = await resultService.getElectionResults(electionId);
      return fullRes.winner;
    }
  }
};

export default resultService;
