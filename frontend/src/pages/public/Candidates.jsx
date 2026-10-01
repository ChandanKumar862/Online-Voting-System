import React, { useState, useEffect } from 'react';
import { candidateService } from '../../services/candidateService';
import { partyService } from '../../services/partyService';
import { electionService } from '../../services/electionService';
import CandidateCard from '../../components/candidate/CandidateCard';
import SearchBar from '../../components/common/SearchBar';
import FilterDropdown from '../../components/common/FilterDropdown';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import EmptyState from '../../components/common/EmptyState';
import { UserCheck } from 'lucide-react';

export const Candidates = () => {
  const [candidates, setCandidates] = useState([]);
  const [parties, setParties] = useState([]);
  const [elections, setElections] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState('');
  const [partyFilter, setPartyFilter] = useState('all');
  const [electionFilter, setElectionFilter] = useState('all');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [candData, partyData, elData] = await Promise.all([
          candidateService.getAll(),
          partyService.getAll(),
          electionService.getAll()
        ]);
        setCandidates(candData);
        setParties(partyData);
        setElections(elData);
      } catch (err) {
        console.error('Failed to load candidates data:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredCandidates = candidates.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.partyName.toLowerCase().includes(search.toLowerCase()) ||
      c.constituencyName.toLowerCase().includes(search.toLowerCase());

    const matchesParty = partyFilter === 'all' || c.partyId === partyFilter;
    const matchesElection = electionFilter === 'all' || c.electionId === electionFilter;

    return matchesSearch && matchesParty && matchesElection;
  });

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="bg-slate-900 text-white rounded-3xl p-8 border border-slate-800 shadow-md">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-300 text-xs font-semibold border border-blue-400/20">
            <UserCheck className="w-3.5 h-3.5" />
            <span>Nominee Directory</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight">Candidate Profiles</h1>
          <p className="text-slate-300 text-sm leading-relaxed">
            Review detailed background profiles, party affiliations, educational qualifications, and political manifestos of running candidates.
          </p>
        </div>
      </div>

      {/* Control Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        <SearchBar value={search} onChange={setSearch} placeholder="Search candidate by name, party, or constituency..." />

        <div className="flex items-center gap-3 flex-wrap w-full md:w-auto">
          <FilterDropdown
            label="Party"
            value={partyFilter}
            onChange={setPartyFilter}
            options={parties.map((p) => ({ label: p.name, value: p.id }))}
          />
          <FilterDropdown
            label="Election"
            value={electionFilter}
            onChange={setElectionFilter}
            options={elections.map((e) => ({ label: e.name, value: e.id }))}
          />
        </div>
      </div>

      {/* Candidates Grid */}
      {loading ? (
        <LoadingSpinner label="Loading candidates..." />
      ) : filteredCandidates.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCandidates.map((candidate) => (
            <CandidateCard key={candidate.id} candidate={candidate} />
          ))}
        </div>
      ) : (
        <EmptyState
          title="No Candidates Found"
          message="No candidates match your current search or filter options."
          onAction={() => {
            setSearch('');
            setPartyFilter('all');
            setElectionFilter('all');
          }}
          actionLabel="Reset Filters"
        />
      )}
    </div>
  );
};

export default Candidates;
