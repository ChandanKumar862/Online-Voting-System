import React, { useState, useEffect } from 'react';
import { electionService } from '../../services/electionService';
import { votingService } from '../../services/votingService';
import { useAuth } from '../../context/AuthContext';
import ElectionCard from '../../components/election/ElectionCard';
import SearchBar from '../../components/common/SearchBar';
import FilterDropdown from '../../components/common/FilterDropdown';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import EmptyState from '../../components/common/EmptyState';
import { Vote, Filter, ArrowUpDown } from 'lucide-react';

export const Elections = () => {
  const { user, isAuthenticated } = useAuth();
  const [elections, setElections] = useState([]);
  const [userVotesMap, setUserVotesMap] = useState({});
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await electionService.getAll();
        setElections(data);

        if (isAuthenticated) {
          const history = await votingService.getVoteHistory();
          const map = {};
          history.forEach(v => {
            map[v.electionId] = true;
          });
          setUserVotesMap(map);
        }
      } catch (err) {
        console.error('Failed to fetch elections:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [isAuthenticated]);

  // Filter & Sort logic
  const filteredElections = elections.filter((e) => {
    const matchesSearch =
      e.name.toLowerCase().includes(search.toLowerCase()) ||
      e.description.toLowerCase().includes(search.toLowerCase()) ||
      (e.stateName && e.stateName.toLowerCase().includes(search.toLowerCase()));

    const matchesType = typeFilter === 'all' || e.type.toLowerCase() === typeFilter.toLowerCase();
    const matchesStatus = statusFilter === 'all' || e.status.toLowerCase() === statusFilter.toLowerCase();

    return matchesSearch && matchesType && matchesStatus;
  }).sort((a, b) => {
    if (sortBy === 'newest') return new Date(b.startDate) - new Date(a.startDate);
    if (sortBy === 'oldest') return new Date(a.startDate) - new Date(b.startDate);
    return a.name.localeCompare(b.name);
  });

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="bg-slate-900 text-white rounded-3xl p-8 border border-slate-800 shadow-md">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-300 text-xs font-semibold border border-blue-400/20">
            <Vote className="w-3.5 h-3.5" />
            <span>Public Election Directory</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight">Elections</h1>
          <p className="text-slate-300 text-sm leading-relaxed">
            Browse parliamentary, state assembly, and municipal elections across India. Authenticated voters can cast votes in eligible ongoing elections.
          </p>
        </div>
      </div>

      {/* Control Bar: Search & Filters */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        <SearchBar value={search} onChange={setSearch} placeholder="Search elections by title or state..." />

        <div className="flex items-center gap-3 flex-wrap w-full md:w-auto">
          <FilterDropdown
            label="Type"
            value={typeFilter}
            onChange={setTypeFilter}
            options={[
              { label: 'Central Election', value: 'central' },
              { label: 'State Election', value: 'state' }
            ]}
          />

          <FilterDropdown
            label="Status"
            value={statusFilter}
            onChange={setStatusFilter}
            options={[
              { label: 'Ongoing', value: 'ongoing' },
              { label: 'Upcoming', value: 'upcoming' },
              { label: 'Completed', value: 'completed' }
            ]}
          />

          <div className="flex items-center gap-1 bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-2 text-sm text-slate-700">
            <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-transparent font-medium text-xs text-slate-700 focus:outline-none cursor-pointer"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="name">Sort by Name</option>
            </select>
          </div>
        </div>
      </div>

      {/* Elections Grid */}
      {loading ? (
        <LoadingSpinner label="Loading election listings..." />
      ) : filteredElections.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredElections.map((election) => (
            <ElectionCard
              key={election.id}
              election={election}
              hasVoted={!!userVotesMap[election.id]}
            />
          ))}
        </div>
      ) : (
        <EmptyState
          title="No Elections Match Your Criteria"
          message="Try adjusting your search terms or filter selections."
          onAction={() => {
            setSearch('');
            setTypeFilter('all');
            setStatusFilter('all');
          }}
          actionLabel="Clear Filters"
        />
      )}
    </div>
  );
};

export default Elections;
