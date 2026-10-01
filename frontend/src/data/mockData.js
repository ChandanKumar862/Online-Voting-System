// Mock Data for Online Voting System
// Designed to mirror Node.js + Express + Supabase schema structure

export const initialUsers = [
  {
    id: "u-101",
    fullName: "Chandan Kumar (Admin)",
    email: "admin@voting.gov.in",
    role: "admin",
    status: "active",
    createdAt: "2025-01-10T10:00:00Z",
    voterId: "IND-ADM-2025-001",
    state: "Bihar",
    constituency: "Patna Sahib"
  },
  {
    id: "u-102",
    fullName: "Priya Sharma",
    email: "priya@gmail.com",
    role: "voter",
    status: "active",
    createdAt: "2025-02-14T11:30:00Z",
    voterId: "IND-VOT-2025-882",
    state: "Bihar",
    constituency: "Patna Sahib"
  },
  {
    id: "u-103",
    fullName: "Rahul Deshmukh",
    email: "rahul@gmail.com",
    role: "voter",
    status: "active",
    createdAt: "2025-03-01T09:15:00Z",
    voterId: "IND-VOT-2025-994",
    state: "Maharashtra",
    constituency: "Mumbai South"
  },
  {
    id: "u-104",
    fullName: "Sunita Reddy",
    email: "sunita@gmail.com",
    role: "voter",
    status: "active",
    createdAt: "2025-03-12T14:20:00Z",
    voterId: "IND-VOT-2025-331",
    state: "Karnataka",
    constituency: "Bangalore Central"
  },
  {
    id: "u-105",
    fullName: "Dr. Vikramaditya Singh",
    email: "vikram@party.org",
    role: "candidate",
    status: "active",
    createdAt: "2025-01-20T08:00:00Z",
    voterId: "IND-CND-2025-101",
    state: "Bihar",
    constituency: "Patna Sahib"
  }
];

export const initialStates = [
  { id: "st-1", name: "Bihar", code: "BR", totalConstituencies: 40 },
  { id: "st-2", name: "Maharashtra", code: "MH", totalConstituencies: 48 },
  { id: "st-3", name: "Karnataka", code: "KA", totalConstituencies: 28 },
  { id: "st-4", name: "Uttar Pradesh", code: "UP", totalConstituencies: 80 },
  { id: "st-5", name: "Delhi (NCT)", code: "DL", totalConstituencies: 7 }
];

export const initialConstituencies = [
  { id: "cs-1", name: "Patna Sahib", stateId: "st-1", stateName: "Bihar", type: "Parliamentary", number: 30 },
  { id: "cs-2", name: "Gaya (SC)", stateId: "st-1", stateName: "Bihar", type: "Parliamentary", number: 38 },
  { id: "cs-3", name: "Mumbai South", stateId: "st-2", stateName: "Maharashtra", type: "Parliamentary", number: 31 },
  { id: "cs-4", name: "Pune", stateId: "st-2", stateName: "Maharashtra", type: "Parliamentary", number: 33 },
  { id: "cs-5", name: "Bangalore Central", stateId: "st-3", stateName: "Karnataka", type: "Parliamentary", number: 25 },
  { id: "cs-6", name: "Lucknow", stateId: "st-4", stateName: "Uttar Pradesh", type: "Parliamentary", number: 35 },
  { id: "cs-7", name: "New Delhi", stateId: "st-5", stateName: "Delhi (NCT)", type: "Parliamentary", number: 4 }
];

export const initialPositions = [
  { id: "pos-1", name: "Member of Parliament (MP)", electionType: "Central", description: "Lok Sabha representative for parliamentary constituency" },
  { id: "pos-2", name: "Member of Legislative Assembly (MLA)", electionType: "State", description: "State Vidhan Sabha representative" },
  { id: "pos-3", name: "Municipal Councillor", electionType: "State", description: "Local civic body representative" }
];

export const initialParties = [
  {
    id: "pty-1",
    name: "National Progress Alliance",
    shortName: "NPA",
    symbol: "Rising Sun",
    logo: "☀️",
    color: "#2563eb",
    foundedYear: 1998,
    description: "Focusing on national infrastructure, digital governance, and economic growth."
  },
  {
    id: "pty-2",
    name: "People's Democratic Front",
    shortName: "PDF",
    symbol: "Torch",
    logo: "🔥",
    color: "#dc2626",
    foundedYear: 2005,
    description: "Advocating social equality, healthcare access, and labor welfare reforms."
  },
  {
    id: "pty-3",
    name: "United Citizens Forum",
    shortName: "UCF",
    symbol: "Open Book",
    logo: "📖",
    color: "#16a34a",
    foundedYear: 2012,
    description: "Promoting educational empowerment, environmental sustainability, and youth employment."
  },
  {
    id: "pty-4",
    name: "Independent",
    shortName: "IND",
    symbol: "Kite",
    logo: "🪁",
    color: "#6b7280",
    foundedYear: 2020,
    description: "Non-party affiliated independent public service candidates."
  }
];

export const initialElections = [
  {
    id: "el-101",
    name: "General Parliamentary Election 2026",
    type: "Central",
    description: "National General Election to elect Members of Parliament (Lok Sabha).",
    startDate: "2026-10-01T08:00:00Z",
    endDate: "2026-10-15T18:00:00Z",
    status: "ongoing", // upcoming | ongoing | completed
    stateId: null,
    stateName: "All India",
    constituencyId: null,
    totalVoters: 950000,
    votesCast: 412500,
    isEligibleDefault: true
  },
  {
    id: "el-102",
    name: "Bihar Assembly Legislative Election 2026",
    type: "State",
    description: "State Assembly Election to elect Vidhan Sabha representatives across Bihar.",
    startDate: "2026-10-05T08:00:00Z",
    endDate: "2026-10-20T18:00:00Z",
    status: "ongoing",
    stateId: "st-1",
    stateName: "Bihar",
    constituencyId: "cs-1",
    totalVoters: 180000,
    votesCast: 89400,
    isEligibleDefault: true
  },
  {
    id: "el-103",
    name: "Maharashtra Civic Corporation Election 2025",
    type: "State",
    description: "Local Municipal Corporation election for urban governance.",
    startDate: "2025-11-01T08:00:00Z",
    endDate: "2025-11-05T18:00:00Z",
    status: "completed",
    stateId: "st-2",
    stateName: "Maharashtra",
    constituencyId: "cs-3",
    totalVoters: 210000,
    votesCast: 168000,
    isEligibleDefault: false
  },
  {
    id: "el-104",
    name: "Karnataka Bye-Election 2026",
    type: "State",
    description: "State assembly bye-election for vacant parliamentary seats.",
    startDate: "2026-11-10T08:00:00Z",
    endDate: "2026-11-12T18:00:00Z",
    status: "upcoming",
    stateId: "st-3",
    stateName: "Karnataka",
    constituencyId: "cs-5",
    totalVoters: 145000,
    votesCast: 0,
    isEligibleDefault: true
  }
];

export const initialCandidates = [
  {
    id: "cand-1",
    electionId: "el-101",
    electionName: "General Parliamentary Election 2026",
    name: "Dr. Vikramaditya Singh",
    partyId: "pty-1",
    partyName: "National Progress Alliance",
    partyShort: "NPA",
    partyLogo: "☀️",
    symbol: "Rising Sun",
    positionId: "pos-1",
    positionName: "Member of Parliament (MP)",
    stateId: "st-1",
    stateName: "Bihar",
    constituencyId: "cs-1",
    constituencyName: "Patna Sahib",
    photo: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&auto=format&fit=crop&q=80",
    description: "Senior Economist & Public Policy expert with 15 years of public service.",
    education: "Ph.D. in Economics, IIT Delhi",
    age: 48,
    status: "approved",
    voteCount: 184500
  },
  {
    id: "cand-2",
    electionId: "el-101",
    electionName: "General Parliamentary Election 2026",
    name: "Ananya Roy",
    partyId: "pty-2",
    partyName: "People's Democratic Front",
    partyShort: "PDF",
    partyLogo: "🔥",
    symbol: "Torch",
    positionId: "pos-1",
    positionName: "Member of Parliament (MP)",
    stateId: "st-1",
    stateName: "Bihar",
    constituencyId: "cs-1",
    constituencyName: "Patna Sahib",
    photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&auto=format&fit=crop&q=80",
    description: "Social activist focusing on healthcare reforms, women empowerment, and clean water access.",
    education: "LL.B., Patna University",
    age: 42,
    status: "approved",
    voteCount: 152000
  },
  {
    id: "cand-3",
    electionId: "el-101",
    electionName: "General Parliamentary Election 2026",
    name: "Rajeshwar Patil",
    partyId: "pty-3",
    partyName: "United Citizens Forum",
    partyShort: "UCF",
    partyLogo: "📖",
    symbol: "Open Book",
    positionId: "pos-1",
    positionName: "Member of Parliament (MP)",
    stateId: "st-1",
    stateName: "Bihar",
    constituencyId: "cs-1",
    constituencyName: "Patna Sahib",
    photo: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300&auto=format&fit=crop&q=80",
    description: "Environmental engineer advocating sustainable urban transit and youth skill centers.",
    education: "M.Tech in Urban Planning",
    age: 39,
    status: "approved",
    voteCount: 76000
  },
  {
    id: "cand-4",
    electionId: "el-102",
    electionName: "Bihar Assembly Legislative Election 2026",
    name: "Sunil Kumar Verma",
    partyId: "pty-1",
    partyName: "National Progress Alliance",
    partyShort: "NPA",
    partyLogo: "☀️",
    symbol: "Rising Sun",
    positionId: "pos-2",
    positionName: "Member of Legislative Assembly (MLA)",
    stateId: "st-1",
    stateName: "Bihar",
    constituencyId: "cs-1",
    constituencyName: "Patna Sahib",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80",
    description: "Former State Cabinet Minister focusing on industrial development and agricultural tech.",
    education: "B.E. Civil Engineering",
    age: 54,
    status: "approved",
    voteCount: 48900
  },
  {
    id: "cand-5",
    electionId: "el-102",
    electionName: "Bihar Assembly Legislative Election 2026",
    name: "Meera Devi",
    partyId: "pty-2",
    partyName: "People's Democratic Front",
    partyShort: "PDF",
    partyLogo: "🔥",
    symbol: "Torch",
    positionId: "pos-2",
    positionName: "Member of Legislative Assembly (MLA)",
    stateId: "st-1",
    stateName: "Bihar",
    constituencyId: "cs-1",
    constituencyName: "Patna Sahib",
    photo: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&auto=format&fit=crop&q=80",
    description: "Grassroots community leader dedicated to local rural schools and public healthcare facilities.",
    education: "M.A. Sociology",
    age: 46,
    status: "approved",
    voteCount: 40500
  },
  {
    id: "cand-6",
    electionId: "el-103",
    electionName: "Maharashtra Civic Corporation Election 2025",
    name: "Siddharth Kulkarni",
    partyId: "pty-1",
    partyName: "National Progress Alliance",
    partyShort: "NPA",
    partyLogo: "☀️",
    symbol: "Rising Sun",
    positionId: "pos-3",
    positionName: "Municipal Councillor",
    stateId: "st-2",
    stateName: "Maharashtra",
    constituencyId: "cs-3",
    constituencyName: "Mumbai South",
    photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&auto=format&fit=crop&q=80",
    description: "Civic activist committed to modern waste management and traffic congestion relief.",
    education: "B.Com, Mumbai University",
    age: 41,
    status: "approved",
    voteCount: 98000
  },
  {
    id: "cand-7",
    electionId: "el-103",
    electionName: "Maharashtra Civic Corporation Election 2025",
    name: "Pooja Sawant",
    partyId: "pty-3",
    partyName: "United Citizens Forum",
    partyShort: "UCF",
    partyLogo: "📖",
    symbol: "Open Book",
    positionId: "pos-3",
    positionName: "Municipal Councillor",
    stateId: "st-2",
    stateName: "Maharashtra",
    constituencyId: "cs-3",
    constituencyName: "Mumbai South",
    photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&auto=format&fit=crop&q=80",
    description: "Architect and urban planner advocating green public parks and solar energy initiatives.",
    education: "B.Arch",
    age: 36,
    status: "approved",
    voteCount: 70000
  }
];

export const initialVoteHistory = [
  {
    id: "vt-801",
    userId: "u-102",
    electionId: "el-103",
    electionName: "Maharashtra Civic Corporation Election 2025",
    electionType: "State",
    votedAt: "2025-11-03T14:22:10Z",
    status: "Verified",
    receiptHash: "0x8F9A...43B1",
    constituencyName: "Mumbai South"
  }
];

export const initialStats = {
  totalVoters: 950000,
  activeElections: 2,
  completedElections: 1,
  upcomingElections: 1,
  registeredCandidates: 24,
  politicalParties: 4,
  totalVotesCast: 669900,
  turnoutPercentage: 70.5
};
