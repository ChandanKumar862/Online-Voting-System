import {
  initialUsers,
  initialStates,
  initialConstituencies,
  initialPositions,
  initialParties,
  initialElections,
  initialCandidates,
  initialVoteHistory,
  initialStats
} from '../data/mockData';

// Mutable in-memory state store for demo environment
class MockStore {
  constructor() {
    this.users = [...initialUsers];
    this.states = [...initialStates];
    this.constituencies = [...initialConstituencies];
    this.positions = [...initialPositions];
    this.parties = [...initialParties];
    this.elections = [...initialElections];
    this.candidates = [...initialCandidates];
    this.voteHistory = [...initialVoteHistory];
    this.stats = { ...initialStats };
    this.currentUser = this.users[1]; // Default voter (Priya Sharma)
  }

  // Auth methods
  login(email, password) {
    const user = this.users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (!user) {
      throw new Error('Invalid email or password');
    }
    this.currentUser = user;
    return {
      user,
      token: `demo-token-${user.id}-${Date.now()}`
    };
  }

  register(userData) {
    const existing = this.users.find(u => u.email.toLowerCase() === userData.email.toLowerCase());
    if (existing) {
      throw new Error('An account with this email already exists');
    }
    const newUser = {
      id: `u-${Date.now()}`,
      fullName: userData.fullName,
      email: userData.email,
      role: 'voter', // Mandatory default
      status: 'active',
      createdAt: new Date().toISOString(),
      voterId: `IND-VOT-${Math.floor(1000 + Math.random() * 9000)}`,
      state: userData.state || 'Bihar',
      constituency: userData.constituency || 'Patna Sahib'
    };
    this.users.push(newUser);
    this.currentUser = newUser;
    return {
      user: newUser,
      token: `demo-token-${newUser.id}-${Date.now()}`
    };
  }

  switchDemoUser(role) {
    let user = this.users.find(u => u.role === role);
    if (!user) {
      if (role === 'admin') user = this.users[0];
      else if (role === 'voter') user = this.users[1];
      else if (role === 'candidate') user = this.users[4];
    }
    this.currentUser = user;
    return user;
  }

  // Vote submit method
  submitVote(electionId, candidateId, positionId) {
    const election = this.elections.find(e => e.id === electionId);
    if (!election) throw new Error('Election not found');

    const candidate = this.candidates.find(c => c.id === candidateId);

    // Check if already voted
    const existing = this.voteHistory.find(
      v => v.userId === this.currentUser.id && v.electionId === electionId
    );
    if (existing) {
      throw new Error('You have already submitted your vote for this election.');
    }

    // Increment vote count for candidate & election
    if (candidate) {
      candidate.voteCount = (candidate.voteCount || 0) + 1;
    }
    election.votesCast = (election.votesCast || 0) + 1;
    this.stats.totalVotesCast += 1;

    const receiptHash = '0x' + Array.from({ length: 8 }, () => Math.floor(Math.random() * 16).toString(16)).join('').toUpperCase();

    const newVote = {
      id: `vt-${Date.now()}`,
      userId: this.currentUser.id,
      electionId,
      electionName: election.name,
      electionType: election.type,
      votedAt: new Date().toISOString(),
      status: 'Verified',
      receiptHash,
      constituencyName: this.currentUser.constituency || 'Patna Sahib'
    };

    this.voteHistory.unshift(newVote);
    return newVote;
  }
}

export const mockStore = new MockStore();
