-- Online Voting System PostgreSQL Schema for Supabase

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. USERS TABLE
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(50) CHECK (role IN ('voter', 'candidate', 'admin')) DEFAULT 'voter',
    voter_id VARCHAR(100),
    state VARCHAR(255),
    constituency VARCHAR(255),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. ELECTIONS TABLE
CREATE TABLE IF NOT EXISTS elections (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    election_type VARCHAR(50) CHECK (election_type IN ('central', 'state')) NOT NULL,
    description TEXT,
    start_date TIMESTAMPTZ,
    end_date TIMESTAMPTZ,
    status VARCHAR(50) CHECK (status IN ('upcoming', 'ongoing', 'completed')) DEFAULT 'upcoming',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. STATES TABLE
CREATE TABLE IF NOT EXISTS states (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) UNIQUE NOT NULL,
    code VARCHAR(10),
    total_constituencies INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. CONSTITUENCIES TABLE
CREATE TABLE IF NOT EXISTS constituencies (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    state_id UUID REFERENCES states(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    constituency_type VARCHAR(50) DEFAULT 'Parliamentary',
    constituency_number INT DEFAULT 1,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. POSITIONS TABLE
CREATE TABLE IF NOT EXISTS positions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    election_id UUID REFERENCES elections(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. PARTIES TABLE
CREATE TABLE IF NOT EXISTS parties (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) UNIQUE NOT NULL,
    short_name VARCHAR(50),
    symbol VARCHAR(255),
    logo TEXT,
    color VARCHAR(50),
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. CANDIDATES TABLE
CREATE TABLE IF NOT EXISTS candidates (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    election_id UUID REFERENCES elections(id) ON DELETE CASCADE,
    constituency_id UUID REFERENCES constituencies(id) ON DELETE SET NULL,
    position_id UUID REFERENCES positions(id) ON DELETE SET NULL,
    party_id UUID REFERENCES parties(id) ON DELETE SET NULL,
    photo TEXT,
    description TEXT,
    education VARCHAR(255),
    age INT,
    status VARCHAR(50) DEFAULT 'approved',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. VOTING_STATUS TABLE
CREATE TABLE IF NOT EXISTS voting_status (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    voter_id UUID REFERENCES users(id) ON DELETE CASCADE,
    election_id UUID REFERENCES elections(id) ON DELETE CASCADE,
    has_voted BOOLEAN DEFAULT TRUE,
    voted_at TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT unique_voter_election UNIQUE (voter_id, election_id)
);

-- 9. BALLOTS TABLE
CREATE TABLE IF NOT EXISTS ballots (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    election_id UUID REFERENCES elections(id) ON DELETE CASCADE,
    constituency_id UUID REFERENCES constituencies(id) ON DELETE SET NULL,
    position_id UUID REFERENCES positions(id) ON DELETE SET NULL,
    candidate_id UUID REFERENCES candidates(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- INDEXES FOR PERFORMANCE
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_candidates_election ON candidates(election_id);
CREATE INDEX IF NOT EXISTS idx_candidates_constituency ON candidates(constituency_id);
CREATE INDEX IF NOT EXISTS idx_voting_status_voter_election ON voting_status(voter_id, election_id);
CREATE INDEX IF NOT EXISTS idx_ballots_election ON ballots(election_id);
