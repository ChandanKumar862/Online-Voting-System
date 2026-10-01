import React, { useState, useEffect } from 'react';
import { partyService } from '../../services/partyService';
import PartyCard from '../../components/party/PartyCard';
import SearchBar from '../../components/common/SearchBar';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import EmptyState from '../../components/common/EmptyState';
import { Flag } from 'lucide-react';

export const Parties = () => {
  const [parties, setParties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchParties = async () => {
      setLoading(true);
      try {
        const data = await partyService.getAll();
        setParties(data);
      } catch (err) {
        console.error('Failed to load political parties:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchParties();
  }, []);

  const filteredParties = parties.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.shortName.toLowerCase().includes(search.toLowerCase()) ||
      p.symbol.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="bg-slate-900 text-white rounded-3xl p-8 border border-slate-800 shadow-md">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-300 text-xs font-semibold border border-blue-400/20">
            <Flag className="w-3.5 h-3.5" />
            <span>Recognized Entities</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight">Political Parties</h1>
          <p className="text-slate-300 text-sm leading-relaxed">
            Registered political alliances, party emblems, symbols, and affiliated candidate portfolios.
          </p>
        </div>
      </div>

      {/* Control Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
        <SearchBar value={search} onChange={setSearch} placeholder="Search party by name or symbol..." />
      </div>

      {/* Parties Grid */}
      {loading ? (
        <LoadingSpinner label="Loading parties..." />
      ) : filteredParties.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredParties.map((party) => (
            <PartyCard key={party.id} party={party} />
          ))}
        </div>
      ) : (
        <EmptyState
          title="No Political Parties Found"
          message="No political parties match your search query."
          onAction={() => setSearch('')}
          actionLabel="Clear Search"
        />
      )}
    </div>
  );
};

export default Parties;
