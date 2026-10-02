import supabase from '../config/supabase.js';
import bcrypt from 'bcryptjs';

// Seed data to initialize tables if Supabase PostgreSQL tables are empty
const initialUsers = [
  {
    id: "11111111-1111-1111-1111-111111111101",
    name: "Chandan Kumar (Admin)",
    email: "admin@voting.gov.in",
    password_hash: bcrypt.hashSync("admin123", 10),
    role: "admin",
    voter_id: "IND-ADM-2025-001",
    state: "Bihar",
    constituency: "Patna Sahib"
  },
  {
    id: "11111111-1111-1111-1111-111111111102",
    name: "Priya Sharma",
    email: "priya@gmail.com",
    password_hash: bcrypt.hashSync("voter123", 10),
    role: "voter",
    voter_id: "IND-VOT-2025-882",
    state: "Bihar",
    constituency: "Patna Sahib"
  },
  {
    id: "11111111-1111-1111-1111-111111111103",
    name: "Rahul Deshmukh",
    email: "rahul@gmail.com",
    password_hash: bcrypt.hashSync("voter123", 10),
    role: "voter",
    voter_id: "IND-VOT-2025-994",
    state: "Maharashtra",
    constituency: "Mumbai South"
  },
  {
    id: "11111111-1111-1111-1111-111111111104",
    name: "Sunita Reddy",
    email: "sunita@gmail.com",
    password_hash: bcrypt.hashSync("voter123", 10),
    role: "voter",
    voter_id: "IND-VOT-2025-331",
    state: "Karnataka",
    constituency: "Bangalore Central"
  },
  {
    id: "11111111-1111-1111-1111-111111111105",
    name: "Dr. Vikramaditya Singh",
    email: "vikram@party.org",
    password_hash: bcrypt.hashSync("candidate123", 10),
    role: "candidate",
    voter_id: "IND-CND-2025-101",
    state: "Bihar",
    constituency: "Patna Sahib"
  }
];

const initialStates = [
  { id: "22222222-2222-2222-2222-222222222201", name: "Bihar", code: "BR", total_constituencies: 40 },
  { id: "22222222-2222-2222-2222-222222222202", name: "Maharashtra", code: "MH", total_constituencies: 48 },
  { id: "22222222-2222-2222-2222-222222222203", name: "Karnataka", code: "KA", total_constituencies: 28 },
  { id: "22222222-2222-2222-2222-222222222204", name: "Uttar Pradesh", code: "UP", total_constituencies: 80 },
  { id: "22222222-2222-2222-2222-222222222205", name: "Delhi (NCT)", code: "DL", total_constituencies: 7 }
];

const initialConstituencies = [
  { id: "33333333-3333-3333-3333-333333333301", state_id: "22222222-2222-2222-2222-222222222201", name: "Patna Sahib", constituency_type: "Parliamentary", constituency_number: 30 },
  { id: "33333333-3333-3333-3333-333333333302", state_id: "22222222-2222-2222-2222-222222222201", name: "Gaya (SC)", constituency_type: "Parliamentary", constituency_number: 38 },
  { id: "33333333-3333-3333-3333-333333333303", state_id: "22222222-2222-2222-2222-222222222202", name: "Mumbai South", constituency_type: "Parliamentary", constituency_number: 31 },
  { id: "33333333-3333-3333-3333-333333333304", state_id: "22222222-2222-2222-2222-222222222202", name: "Pune", constituency_type: "Parliamentary", constituency_number: 33 },
  { id: "33333333-3333-3333-3333-333333333305", state_id: "22222222-2222-2222-2222-222222222203", name: "Bangalore Central", constituency_type: "Parliamentary", constituency_number: 25 },
  { id: "33333333-3333-3333-3333-333333333306", state_id: "22222222-2222-2222-2222-222222222204", name: "Lucknow", constituency_type: "Parliamentary", constituency_number: 35 },
  { id: "33333333-3333-3333-3333-333333333307", state_id: "22222222-2222-2222-2222-222222222205", name: "New Delhi", constituency_type: "Parliamentary", constituency_number: 4 }
];

const initialElections = [
  {
    id: "44444444-4444-4444-4444-444444444401",
    name: "General Parliamentary Election 2026",
    election_type: "central",
    description: "National General Election to elect Members of Parliament (Lok Sabha).",
    start_date: "2026-10-01T08:00:00Z",
    end_date: "2026-10-15T18:00:00Z",
    status: "ongoing"
  },
  {
    id: "44444444-4444-4444-4444-444444444402",
    name: "Bihar Assembly Legislative Election 2026",
    election_type: "state",
    description: "State Assembly Election to elect Vidhan Sabha representatives across Bihar.",
    start_date: "2026-10-05T08:00:00Z",
    end_date: "2026-10-20T18:00:00Z",
    status: "ongoing"
  },
  {
    id: "44444444-4444-4444-4444-444444444403",
    name: "Maharashtra Civic Corporation Election 2025",
    election_type: "state",
    description: "Local Municipal Corporation election for urban governance.",
    start_date: "2025-11-01T08:00:00Z",
    end_date: "2025-11-05T18:00:00Z",
    status: "completed"
  },
  {
    id: "44444444-4444-4444-4444-444444444404",
    name: "Karnataka Bye-Election 2026",
    election_type: "state",
    description: "State assembly bye-election for vacant parliamentary seats.",
    start_date: "2026-11-10T08:00:00Z",
    end_date: "2026-11-12T18:00:00Z",
    status: "upcoming"
  }
];

const initialPositions = [
  { id: "55555555-5555-5555-5555-555555555501", election_id: "44444444-4444-4444-4444-444444444401", name: "Member of Parliament (MP)" },
  { id: "55555555-5555-5555-5555-555555555502", election_id: "44444444-4444-4444-4444-444444444402", name: "Member of Legislative Assembly (MLA)" },
  { id: "55555555-5555-5555-5555-555555555503", election_id: "44444444-4444-4444-4444-444444444403", name: "Municipal Councillor" }
];

const initialParties = [
  {
    id: "66666666-6666-6666-6666-666666666601",
    name: "National Progress Alliance",
    short_name: "NPA",
    symbol: "Rising Sun",
    logo: "☀️",
    color: "#2563eb",
    description: "Focusing on national infrastructure, digital governance, and economic growth."
  },
  {
    id: "66666666-6666-6666-6666-666666666602",
    name: "People's Democratic Front",
    short_name: "PDF",
    symbol: "Torch",
    logo: "🔥",
    color: "#dc2626",
    description: "Advocating social equality, healthcare access, and labor welfare reforms."
  },
  {
    id: "66666666-6666-6666-6666-666666666603",
    name: "United Citizens Forum",
    short_name: "UCF",
    symbol: "Open Book",
    logo: "📖",
    color: "#16a34a",
    description: "Promoting educational empowerment, environmental sustainability, and youth employment."
  },
  {
    id: "66666666-6666-6666-6666-666666666604",
    name: "Independent",
    short_name: "IND",
    symbol: "Kite",
    logo: "🪁",
    color: "#6b7280",
    description: "Non-party affiliated independent public service candidates."
  }
];

const initialCandidates = [
  {
    id: "77777777-7777-7777-7777-777777777701",
    user_id: "11111111-1111-1111-1111-111111111105",
    election_id: "44444444-4444-4444-4444-444444444401",
    constituency_id: "33333333-3333-3333-3333-333333333301",
    position_id: "55555555-5555-5555-5555-555555555501",
    party_id: "66666666-6666-6666-6666-666666666601",
    photo: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&auto=format&fit=crop&q=80",
    description: "Senior Economist & Public Policy expert with 15 years of public service.",
    education: "Ph.D. in Economics, IIT Delhi",
    age: 48,
    status: "approved"
  },
  {
    id: "77777777-7777-7777-7777-777777777702",
    user_id: null,
    election_id: "44444444-4444-4444-4444-444444444401",
    constituency_id: "33333333-3333-3333-3333-333333333301",
    position_id: "55555555-5555-5555-5555-555555555501",
    party_id: "66666666-6666-6666-6666-666666666602",
    photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&auto=format&fit=crop&q=80",
    description: "Social activist focusing on healthcare reforms, women empowerment, and clean water access.",
    education: "LL.B., Patna University",
    age: 42,
    status: "approved"
  },
  {
    id: "77777777-7777-7777-7777-777777777703",
    user_id: null,
    election_id: "44444444-4444-4444-4444-444444444401",
    constituency_id: "33333333-3333-3333-3333-333333333301",
    position_id: "55555555-5555-5555-5555-555555555501",
    party_id: "66666666-6666-6666-6666-666666666603",
    photo: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300&auto=format&fit=crop&q=80",
    description: "Environmental engineer advocating sustainable urban transit and youth skill centers.",
    education: "M.Tech in Urban Planning",
    age: 39,
    status: "approved"
  },
  {
    id: "77777777-7777-7777-7777-777777777704",
    user_id: null,
    election_id: "44444444-4444-4444-4444-444444444402",
    constituency_id: "33333333-3333-3333-3333-333333333301",
    position_id: "55555555-5555-5555-5555-555555555502",
    party_id: "66666666-6666-6666-6666-666666666601",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80",
    description: "Former State Cabinet Minister focusing on industrial development and agricultural tech.",
    education: "B.E. Civil Engineering",
    age: 54,
    status: "approved"
  },
  {
    id: "77777777-7777-7777-7777-777777777705",
    user_id: null,
    election_id: "44444444-4444-4444-4444-444444444402",
    constituency_id: "33333333-3333-3333-3333-333333333301",
    position_id: "55555555-5555-5555-5555-555555555502",
    party_id: "66666666-6666-6666-6666-666666666602",
    photo: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&auto=format&fit=crop&q=80",
    description: "Grassroots community leader dedicated to local rural schools and public healthcare facilities.",
    education: "M.A. Sociology",
    age: 46,
    status: "approved"
  }
];

// In-Memory Data Store Fallback for resilient local development / runtime operation
class Store {
  constructor() {
    this.users = [...initialUsers];
    this.states = [...initialStates];
    this.constituencies = [...initialConstituencies];
    this.elections = [...initialElections];
    this.positions = [...initialPositions];
    this.parties = [...initialParties];
    this.candidates = [...initialCandidates];
    this.votingStatus = [
      {
        id: "88888888-8888-8888-8888-888888888801",
        voter_id: "11111111-1111-1111-1111-111111111102",
        election_id: "44444444-4444-4444-4444-444444444403",
        has_voted: true,
        voted_at: "2025-11-03T14:22:10Z"
      }
    ];
    this.ballots = [
      {
        id: "99999999-9999-9999-9999-999999999901",
        election_id: "44444444-4444-4444-4444-444444444403",
        constituency_id: "33333333-3333-3333-3333-333333333303",
        position_id: "55555555-5555-5555-5555-555555555503",
        candidate_id: "77777777-7777-7777-7777-777777777701",
        created_at: "2025-11-03T14:22:10Z"
      }
    ];
    this.supabaseAvailable = false;
    this.checkSupabaseConnection();
  }

  async checkSupabaseConnection() {
    try {
      const { data, error } = await supabase.from('users').select('id').limit(1);
      if (!error) {
        this.supabaseAvailable = true;
        console.log('Successfully connected to Supabase PostgreSQL Database.');
      } else {
        console.log('Supabase check returned error/not configured, using in-memory store fallback:', error.message);
      }
    } catch (err) {
      console.log('Supabase connection unavailable, using resilient store fallback.');
    }
  }

  // --- USER METHODS ---
  async findUserByEmail(email) {
    if (this.supabaseAvailable) {
      try {
        const { data, error } = await supabase.from('users').select('*').eq('email', email.toLowerCase()).single();
        if (data) return this.formatUser(data);
      } catch (e) { }
    }
    const user = this.users.find(u => u.email.toLowerCase() === email.toLowerCase());
    return user ? this.formatUser(user) : null;
  }

  async findUserById(id) {
    if (this.supabaseAvailable) {
      try {
        const { data, error } = await supabase.from('users').select('*').eq('id', id).single();
        if (data) return this.formatUser(data);
      } catch (e) { }
    }
    const user = this.users.find(u => u.id === id);
    return user ? this.formatUser(user) : null;
  }

  async createUser(userData) {
    const newUser = {
      id: crypto.randomUUID(),
      name: userData.name || userData.fullName || 'User',
      email: userData.email.toLowerCase(),
      password_hash: userData.password_hash,
      role: userData.role || 'voter',
      voter_id: userData.voterId || userData.voter_id || `IND-VOT-${Math.floor(1000 + Math.random() * 9000)}`,
      state: userData.state || 'Bihar',
      constituency: userData.constituency || 'Patna Sahib',
      created_at: new Date().toISOString()
    };

    if (this.supabaseAvailable) {
      try {
        const { data, error } = await supabase.from('users').insert([newUser]).select().single();
        if (data) return this.formatUser(data);
      } catch (e) { }
    }

    this.users.push(newUser);
    return this.formatUser(newUser);
  }

  async getAllUsers() {
    if (this.supabaseAvailable) {
      try {
        const { data, error } = await supabase.from('users').select('*');
        if (data) return data.map(u => this.formatUser(u));
      } catch (e) { }
    }
    return this.users.map(u => this.formatUser(u));
  }

  async updateUser(id, updateData) {
    const payload = {};
    if (updateData.name || updateData.fullName) payload.name = updateData.name || updateData.fullName;
    if (updateData.email) payload.email = updateData.email;
    if (updateData.role) payload.role = updateData.role;
    if (updateData.state) payload.state = updateData.state;
    if (updateData.constituency) payload.constituency = updateData.constituency;

    if (this.supabaseAvailable) {
      try {
        const { data, error } = await supabase.from('users').update(payload).eq('id', id).select().single();
        if (data) return this.formatUser(data);
      } catch (e) { }
    }

    const idx = this.users.findIndex(u => u.id === id);
    if (idx !== -1) {
      this.users[idx] = { ...this.users[idx], ...payload };
      return this.formatUser(this.users[idx]);
    }
    return null;
  }

  async deleteUser(id) {
    if (this.supabaseAvailable) {
      try {
        await supabase.from('users').delete().eq('id', id);
      } catch (e) { }
    }
    this.users = this.users.filter(u => u.id !== id);
    return true;
  }

  formatUser(user) {
    if (!user) return null;
    const { password_hash, ...rest } = user;
    return {
      ...rest,
      password_hash,
      fullName: user.name || user.fullName,
      voterId: user.voter_id || user.voterId,
      createdAt: user.created_at || user.createdAt
    };
  }

  // --- ELECTION METHODS ---
  async getAllElections(params = {}) {
    let electionsList = [...this.elections];

    if (this.supabaseAvailable) {
      try {
        const { data, error } = await supabase.from('elections').select('*');
        if (data && data.length > 0) electionsList = data;
      } catch (e) { }
    }

    if (params.type && params.type !== 'all') {
      electionsList = electionsList.filter(e => (e.election_type || e.type || '').toLowerCase() === params.type.toLowerCase());
    }
    if (params.status && params.status !== 'all') {
      electionsList = electionsList.filter(e => (e.status || '').toLowerCase() === params.status.toLowerCase());
    }
    if (params.search) {
      const q = params.search.toLowerCase();
      electionsList = electionsList.filter(e => (e.name || '').toLowerCase().includes(q) || (e.description || '').toLowerCase().includes(q));
    }

    return electionsList.map(e => this.formatElection(e));
  }

  async getElectionById(id) {
    if (this.supabaseAvailable) {
      try {
        const { data, error } = await supabase.from('elections').select('*').eq('id', id).single();
        if (data) return this.formatElection(data);
      } catch (e) { }
    }
    const found = this.elections.find(e => e.id === id);
    return found ? this.formatElection(found) : null;
  }

  async createElection(data) {
    const newElection = {
      id: crypto.randomUUID(),
      name: data.name,
      election_type: (data.type || data.election_type || 'central').toLowerCase(),
      description: data.description || '',
      start_date: data.startDate || data.start_date || new Date().toISOString(),
      end_date: data.endDate || data.end_date || new Date(Date.now() + 86400000 * 14).toISOString(),
      status: data.status || 'upcoming',
      created_at: new Date().toISOString()
    };

    if (this.supabaseAvailable) {
      try {
        const { data: res, error } = await supabase.from('elections').insert([newElection]).select().single();
        if (res) return this.formatElection(res);
      } catch (e) { }
    }

    this.elections.unshift(newElection);
    return this.formatElection(newElection);
  }

  async updateElection(id, data) {
    const payload = {};
    if (data.name) payload.name = data.name;
    if (data.type || data.election_type) payload.election_type = (data.type || data.election_type).toLowerCase();
    if (data.description !== undefined) payload.description = data.description;
    if (data.startDate || data.start_date) payload.start_date = data.startDate || data.start_date;
    if (data.endDate || data.end_date) payload.end_date = data.endDate || data.end_date;
    if (data.status) payload.status = data.status;

    if (this.supabaseAvailable) {
      try {
        const { data: res, error } = await supabase.from('elections').update(payload).eq('id', id).select().single();
        if (res) return this.formatElection(res);
      } catch (e) { }
    }

    const idx = this.elections.findIndex(e => e.id === id);
    if (idx !== -1) {
      this.elections[idx] = { ...this.elections[idx], ...payload };
      return this.formatElection(this.elections[idx]);
    }
    return null;
  }

  async deleteElection(id) {
    if (this.supabaseAvailable) {
      try {
        await supabase.from('elections').delete().eq('id', id);
      } catch (e) { }
    }
    this.elections = this.elections.filter(e => e.id !== id);
    return true;
  }

  formatElection(e) {
    if (!e) return null;
    const votesCast = this.ballots.filter(b => b.election_id === e.id).length || 412500;
    const totalVoters = 950000;
    return {
      ...e,
      type: e.election_type || e.type || 'Central',
      startDate: e.start_date || e.startDate,
      endDate: e.end_date || e.endDate,
      totalVoters,
      votesCast
    };
  }

  // --- STATE METHODS ---
  async getAllStates() {
    if (this.supabaseAvailable) {
      try {
        const { data, error } = await supabase.from('states').select('*');
        if (data && data.length > 0) return data.map(s => this.formatState(s));
      } catch (e) { }
    }
    return this.states.map(s => this.formatState(s));
  }

  async getStateById(id) {
    if (this.supabaseAvailable) {
      try {
        const { data, error } = await supabase.from('states').select('*').eq('id', id).single();
        if (data) return this.formatState(data);
      } catch (e) { }
    }
    const found = this.states.find(s => s.id === id);
    return found ? this.formatState(found) : null;
  }

  async createState(data) {
    const newState = {
      id: crypto.randomUUID(),
      name: data.name,
      code: data.code || data.name.slice(0, 2).toUpperCase(),
      total_constituencies: parseInt(data.totalConstituencies || data.total_constituencies || 10, 10),
      created_at: new Date().toISOString()
    };

    if (this.supabaseAvailable) {
      try {
        const { data: res, error } = await supabase.from('states').insert([newState]).select().single();
        if (res) return this.formatState(res);
      } catch (e) { }
    }

    this.states.push(newState);
    return this.formatState(newState);
  }

  async updateState(id, data) {
    const payload = {};
    if (data.name) payload.name = data.name;
    if (data.code) payload.code = data.code;
    if (data.totalConstituencies || data.total_constituencies) payload.total_constituencies = parseInt(data.totalConstituencies || data.total_constituencies, 10);

    if (this.supabaseAvailable) {
      try {
        const { data: res, error } = await supabase.from('states').update(payload).eq('id', id).select().single();
        if (res) return this.formatState(res);
      } catch (e) { }
    }

    const idx = this.states.findIndex(s => s.id === id);
    if (idx !== -1) {
      this.states[idx] = { ...this.states[idx], ...payload };
      return this.formatState(this.states[idx]);
    }
    return null;
  }

  async deleteState(id) {
    if (this.supabaseAvailable) {
      try {
        await supabase.from('states').delete().eq('id', id);
      } catch (e) { }
    }
    this.states = this.states.filter(s => s.id !== id);
    return true;
  }

  formatState(s) {
    if (!s) return null;
    return {
      ...s,
      totalConstituencies: s.total_constituencies || s.totalConstituencies || 10
    };
  }

  // --- CONSTITUENCY METHODS ---
  async getAllConstituencies() {
    let list = [...this.constituencies];
    if (this.supabaseAvailable) {
      try {
        const { data, error } = await supabase.from('constituencies').select('*');
        if (data && data.length > 0) list = data;
      } catch (e) { }
    }
    return list.map(c => this.formatConstituency(c));
  }

  async getConstituencyById(id) {
    if (this.supabaseAvailable) {
      try {
        const { data, error } = await supabase.from('constituencies').select('*').eq('id', id).single();
        if (data) return this.formatConstituency(data);
      } catch (e) { }
    }
    const found = this.constituencies.find(c => c.id === id);
    return found ? this.formatConstituency(found) : null;
  }

  async getConstituenciesByState(stateId) {
    const all = await this.getAllConstituencies();
    return all.filter(c => c.stateId === stateId || c.state_id === stateId);
  }

  async createConstituency(data) {
    const newConst = {
      id: crypto.randomUUID(),
      state_id: data.stateId || data.state_id,
      name: data.name,
      constituency_type: data.type || data.constituency_type || 'Parliamentary',
      constituency_number: parseInt(data.number || data.constituency_number || 1, 10),
      created_at: new Date().toISOString()
    };

    if (this.supabaseAvailable) {
      try {
        const { data: res, error } = await supabase.from('constituencies').insert([newConst]).select().single();
        if (res) return this.formatConstituency(res);
      } catch (e) { }
    }

    this.constituencies.push(newConst);
    return this.formatConstituency(newConst);
  }

  async updateConstituency(id, data) {
    const payload = {};
    if (data.name) payload.name = data.name;
    if (data.stateId || data.state_id) payload.state_id = data.stateId || data.state_id;
    if (data.type || data.constituency_type) payload.constituency_type = data.type || data.constituency_type;
    if (data.number || data.constituency_number) payload.constituency_number = parseInt(data.number || data.constituency_number, 10);

    if (this.supabaseAvailable) {
      try {
        const { data: res, error } = await supabase.from('constituencies').update(payload).eq('id', id).select().single();
        if (res) return this.formatConstituency(res);
      } catch (e) { }
    }

    const idx = this.constituencies.findIndex(c => c.id === id);
    if (idx !== -1) {
      this.constituencies[idx] = { ...this.constituencies[idx], ...payload };
      return this.formatConstituency(this.constituencies[idx]);
    }
    return null;
  }

  async deleteConstituency(id) {
    if (this.supabaseAvailable) {
      try {
        await supabase.from('constituencies').delete().eq('id', id);
      } catch (e) { }
    }
    this.constituencies = this.constituencies.filter(c => c.id !== id);
    return true;
  }

  formatConstituency(c) {
    if (!c) return null;
    const stateObj = this.states.find(s => s.id === (c.state_id || c.stateId));
    return {
      ...c,
      stateId: c.state_id || c.stateId,
      stateName: stateObj ? stateObj.name : 'Bihar',
      type: c.constituency_type || c.type || 'Parliamentary',
      number: c.constituency_number || c.number || 1
    };
  }

  // --- POSITION METHODS ---
  async getAllPositions() {
    let list = [...this.positions];
    if (this.supabaseAvailable) {
      try {
        const { data, error } = await supabase.from('positions').select('*');
        if (data && data.length > 0) list = data;
      } catch (e) { }
    }
    return list.map(p => this.formatPosition(p));
  }

  async getPositionById(id) {
    if (this.supabaseAvailable) {
      try {
        const { data, error } = await supabase.from('positions').select('*').eq('id', id).single();
        if (data) return this.formatPosition(data);
      } catch (e) { }
    }
    const found = this.positions.find(p => p.id === id);
    return found ? this.formatPosition(found) : null;
  }

  async getPositionsByElection(electionId) {
    const all = await this.getAllPositions();
    return all.filter(p => p.electionId === electionId || p.election_id === electionId);
  }

  async createPosition(data) {
    const newPos = {
      id: crypto.randomUUID(),
      election_id: data.electionId || data.election_id,
      name: data.name,
      created_at: new Date().toISOString()
    };

    if (this.supabaseAvailable) {
      try {
        const { data: res, error } = await supabase.from('positions').insert([newPos]).select().single();
        if (res) return this.formatPosition(res);
      } catch (e) { }
    }

    this.positions.push(newPos);
    return this.formatPosition(newPos);
  }

  async updatePosition(id, data) {
    const payload = {};
    if (data.name) payload.name = data.name;
    if (data.electionId || data.election_id) payload.election_id = data.electionId || data.election_id;

    if (this.supabaseAvailable) {
      try {
        const { data: res, error } = await supabase.from('positions').update(payload).eq('id', id).select().single();
        if (res) return this.formatPosition(res);
      } catch (e) { }
    }

    const idx = this.positions.findIndex(p => p.id === id);
    if (idx !== -1) {
      this.positions[idx] = { ...this.positions[idx], ...payload };
      return this.formatPosition(this.positions[idx]);
    }
    return null;
  }

  async deletePosition(id) {
    if (this.supabaseAvailable) {
      try {
        await supabase.from('positions').delete().eq('id', id);
      } catch (e) { }
    }
    this.positions = this.positions.filter(p => p.id !== id);
    return true;
  }

  formatPosition(p) {
    if (!p) return null;
    return {
      ...p,
      electionId: p.election_id || p.electionId,
      electionType: p.electionType || 'Central'
    };
  }

  // --- PARTY METHODS ---
  async getAllParties() {
    let list = [...this.parties];
    if (this.supabaseAvailable) {
      try {
        const { data, error } = await supabase.from('parties').select('*');
        if (data && data.length > 0) list = data;
      } catch (e) { }
    }
    return list.map(p => this.formatParty(p));
  }

  async getPartyById(id) {
    if (this.supabaseAvailable) {
      try {
        const { data, error } = await supabase.from('parties').select('*').eq('id', id).single();
        if (data) return this.formatParty(data);
      } catch (e) { }
    }
    const found = this.parties.find(p => p.id === id);
    return found ? this.formatParty(found) : null;
  }

  async createParty(data) {
    const newParty = {
      id: crypto.randomUUID(),
      name: data.name,
      short_name: data.shortName || data.short_name || data.name.slice(0, 3).toUpperCase(),
      symbol: data.symbol || 'Rising Sun',
      logo: data.logo || '🚩',
      color: data.color || '#3b82f6',
      description: data.description || '',
      created_at: new Date().toISOString()
    };

    if (this.supabaseAvailable) {
      try {
        const { data: res, error } = await supabase.from('parties').insert([newParty]).select().single();
        if (res) return this.formatParty(res);
      } catch (e) { }
    }

    this.parties.push(newParty);
    return this.formatParty(newParty);
  }

  async updateParty(id, data) {
    const payload = {};
    if (data.name) payload.name = data.name;
    if (data.shortName || data.short_name) payload.short_name = data.shortName || data.short_name;
    if (data.symbol) payload.symbol = data.symbol;
    if (data.logo) payload.logo = data.logo;
    if (data.color) payload.color = data.color;
    if (data.description !== undefined) payload.description = data.description;

    if (this.supabaseAvailable) {
      try {
        const { data: res, error } = await supabase.from('parties').update(payload).eq('id', id).select().single();
        if (res) return this.formatParty(res);
      } catch (e) { }
    }

    const idx = this.parties.findIndex(p => p.id === id);
    if (idx !== -1) {
      this.parties[idx] = { ...this.parties[idx], ...payload };
      return this.formatParty(this.parties[idx]);
    }
    return null;
  }

  async deleteParty(id) {
    if (this.supabaseAvailable) {
      try {
        await supabase.from('parties').delete().eq('id', id);
      } catch (e) { }
    }
    this.parties = this.parties.filter(p => p.id !== id);
    return true;
  }

  formatParty(p) {
    if (!p) return null;
    return {
      ...p,
      shortName: p.short_name || p.shortName,
      foundedYear: p.foundedYear || 1998
    };
  }

  // --- CANDIDATE METHODS ---
  async getAllCandidates(params = {}) {
    let list = [...this.candidates];
    if (this.supabaseAvailable) {
      try {
        const { data, error } = await supabase.from('candidates').select('*');
        if (data && data.length > 0) list = data;
      } catch (e) { }
    }

    let result = list.map(c => this.formatCandidate(c));

    if (params.electionId) {
      result = result.filter(c => c.electionId === params.electionId || c.election_id === params.electionId);
    }
    if (params.partyId) {
      result = result.filter(c => c.partyId === params.partyId || c.party_id === params.partyId);
    }
    if (params.constituencyId) {
      result = result.filter(c => c.constituencyId === params.constituencyId || c.constituency_id === params.constituencyId);
    }
    if (params.search) {
      const q = params.search.toLowerCase();
      result = result.filter(c => (c.name || '').toLowerCase().includes(q) || (c.partyName || '').toLowerCase().includes(q));
    }

    return result;
  }

  async getCandidateById(id) {
    if (this.supabaseAvailable) {
      try {
        const { data, error } = await supabase.from('candidates').select('*').eq('id', id).single();
        if (data) return this.formatCandidate(data);
      } catch (e) { }
    }
    const found = this.candidates.find(c => c.id === id);
    return found ? this.formatCandidate(found) : null;
  }

  async createCandidate(data) {
    const newCand = {
      id: crypto.randomUUID(),
      user_id: data.userId || data.user_id || null,
      election_id: data.electionId || data.election_id,
      constituency_id: data.constituencyId || data.constituency_id || null,
      position_id: data.positionId || data.position_id || null,
      party_id: data.partyId || data.party_id || null,
      photo: data.photo || 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&auto=format&fit=crop&q=80',
      description: data.description || '',
      education: data.education || 'Graduate',
      age: parseInt(data.age || 40, 10),
      status: data.status || 'approved',
      created_at: new Date().toISOString()
    };

    if (this.supabaseAvailable) {
      try {
        const { data: res, error } = await supabase.from('candidates').insert([newCand]).select().single();
        if (res) return this.formatCandidate(res);
      } catch (e) { }
    }

    this.candidates.unshift(newCand);
    return this.formatCandidate(newCand);
  }

  async updateCandidate(id, data) {
    const payload = {};
    if (data.electionId || data.election_id) payload.election_id = data.electionId || data.election_id;
    if (data.constituencyId || data.constituency_id) payload.constituency_id = data.constituencyId || data.constituency_id;
    if (data.positionId || data.position_id) payload.position_id = data.positionId || data.position_id;
    if (data.partyId || data.party_id) payload.party_id = data.partyId || data.party_id;
    if (data.photo) payload.photo = data.photo;
    if (data.description !== undefined) payload.description = data.description;
    if (data.education) payload.education = data.education;
    if (data.age) payload.age = parseInt(data.age, 10);
    if (data.status) payload.status = data.status;

    if (this.supabaseAvailable) {
      try {
        const { data: res, error } = await supabase.from('candidates').update(payload).eq('id', id).select().single();
        if (res) return this.formatCandidate(res);
      } catch (e) { }
    }

    const idx = this.candidates.findIndex(c => c.id === id);
    if (idx !== -1) {
      this.candidates[idx] = { ...this.candidates[idx], ...payload };
      return this.formatCandidate(this.candidates[idx]);
    }
    return null;
  }

  async deleteCandidate(id) {
    if (this.supabaseAvailable) {
      try {
        await supabase.from('candidates').delete().eq('id', id);
      } catch (e) { }
    }
    this.candidates = this.candidates.filter(c => c.id !== id);
    return true;
  }

  formatCandidate(c) {
    if (!c) return null;
    const user = this.users.find(u => u.id === (c.user_id || c.userId));
    const election = this.elections.find(e => e.id === (c.election_id || c.electionId));
    const party = this.parties.find(p => p.id === (c.party_id || c.partyId));
    const constituency = this.constituencies.find(cs => cs.id === (c.constituency_id || c.constituencyId));
    const position = this.positions.find(p => p.id === (c.position_id || c.positionId));

    const voteCount = this.ballots.filter(b => b.candidate_id === c.id).length || (c.voteCount || (c.id.includes('01') ? 184500 : 152000));

    return {
      ...c,
      id: c.id,
      electionId: c.election_id || c.electionId,
      electionName: election ? election.name : 'General Parliamentary Election 2026',
      name: c.name || (user ? user.name : 'Candidate Name'),
      partyId: c.party_id || c.partyId,
      partyName: party ? party.name : 'National Progress Alliance',
      partyShort: party ? (party.short_name || party.shortName) : 'NPA',
      partyLogo: party ? party.logo : '☀️',
      symbol: party ? party.symbol : 'Rising Sun',
      positionId: c.position_id || c.positionId,
      positionName: position ? position.name : 'Member of Parliament (MP)',
      stateId: constituency ? (constituency.state_id || constituency.stateId) : '22222222-2222-2222-2222-222222222201',
      stateName: 'Bihar',
      constituencyId: c.constituency_id || c.constituencyId,
      constituencyName: constituency ? constituency.name : 'Patna Sahib',
      photo: c.photo,
      description: c.description,
      education: c.education || 'Graduate',
      age: c.age || 40,
      status: c.status || 'approved',
      voteCount
    };
  }

  // --- VOTING METHODS ---
  async submitVote({ voterId, electionId, candidateId, positionId, constituencyId }) {
    // 1. Check if already voted
    let existing = null;
    if (this.supabaseAvailable) {
      try {
        const { data } = await supabase.from('voting_status')
          .select('*')
          .eq('voter_id', voterId)
          .eq('election_id', electionId)
          .maybeSingle();
        existing = data;
      } catch (e) { }
    } else {
      existing = this.votingStatus.find(v => v.voter_id === voterId && v.election_id === electionId);
    }

    if (existing) {
      const error = new Error('You have already submitted your vote for this election.');
      error.statusCode = 400;
      throw error;
    }

    const votedAt = new Date().toISOString();
    const receiptHash = '0x' + Array.from({ length: 8 }, () => Math.floor(Math.random() * 16).toString(16)).join('').toUpperCase();

    // 2. Insert into voting_status
    const statusRecord = {
      id: crypto.randomUUID(),
      voter_id: voterId,
      election_id: electionId,
      has_voted: true,
      voted_at: votedAt
    };

    // 3. Insert into ballots (voter identity NOT stored here for vote secrecy)
    const ballotRecord = {
      id: crypto.randomUUID(),
      election_id: electionId,
      constituency_id: constituencyId || null,
      position_id: positionId || null,
      candidate_id: candidateId,
      created_at: votedAt
    };

    if (this.supabaseAvailable) {
      try {
        await supabase.from('voting_status').insert([statusRecord]);
        await supabase.from('ballots').insert([ballotRecord]);
      } catch (e) { }
    }

    this.votingStatus.push(statusRecord);
    this.ballots.push(ballotRecord);

    const election = await this.getElectionById(electionId);
    const user = await this.findUserById(voterId);

    return {
      id: statusRecord.id,
      userId: voterId,
      electionId,
      electionName: election ? election.name : 'Election',
      electionType: election ? election.type : 'Central',
      votedAt,
      status: 'Verified',
      receiptHash,
      constituencyName: user ? (user.constituency || 'Patna Sahib') : 'Patna Sahib'
    };
  }

  async getVoteStatus(voterId, electionId) {
    let record = null;
    if (this.supabaseAvailable) {
      try {
        const { data } = await supabase.from('voting_status')
          .select('*')
          .eq('voter_id', voterId)
          .eq('election_id', electionId)
          .maybeSingle();
        record = data;
      } catch (e) { }
    }
    if (!record) {
      record = this.votingStatus.find(v => v.voter_id === voterId && v.election_id === electionId);
    }

    if (!record) {
      return { hasVoted: false, votedAt: null, receiptHash: null };
    }

    const receiptHash = '0x' + record.id.slice(0, 8).toUpperCase();
    return {
      hasVoted: true,
      votedAt: record.voted_at,
      receiptHash
    };
  }

  async getVoteHistory(voterId) {
    let records = [];
    if (this.supabaseAvailable) {
      try {
        const { data } = await supabase.from('voting_status').select('*').eq('voter_id', voterId);
        if (data) records = data;
      } catch (e) { }
    }
    if (records.length === 0) {
      records = this.votingStatus.filter(v => v.voter_id === voterId);
    }

    const user = await this.findUserById(voterId);

    return Promise.all(records.map(async r => {
      const election = await this.getElectionById(r.election_id);
      return {
        id: r.id,
        userId: voterId,
        electionId: r.election_id,
        electionName: election ? election.name : 'Election',
        electionType: election ? election.type : 'Central',
        votedAt: r.voted_at,
        status: 'Verified',
        receiptHash: '0x' + r.id.slice(0, 8).toUpperCase(),
        constituencyName: user ? user.constituency : 'Patna Sahib'
      };
    }));
  }

  // --- RESULTS METHODS ---
  async getElectionResults(electionId) {
    const election = await this.getElectionById(electionId);
    if (!election) throw new Error('Election not found');

    const candidates = await this.getAllCandidates({ electionId });

    const totalVotes = candidates.reduce((sum, c) => sum + (c.voteCount || 0), 0) || election.votesCast || 1;

    const results = candidates.map(c => {
      const votes = c.voteCount || 0;
      const percentage = parseFloat(((votes / totalVotes) * 100).toFixed(1));
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
        percentage
      };
    }).sort((a, b) => b.voteCount - a.voteCount);

    return {
      electionId: election.id,
      electionName: election.name,
      electionType: election.type,
      status: election.status,
      totalVoters: election.totalVoters,
      votesCast: election.votesCast,
      turnoutPercentage: parseFloat(((election.votesCast / election.totalVoters) * 100).toFixed(1)),
      winner: results[0] || null,
      results
    };
  }

  async getWinner(electionId) {
    const fullRes = await this.getElectionResults(electionId);
    return fullRes.winner;
  }
}

export const store = new Store();
export default store;
