import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { partyService } from '../../services/partyService';
import { candidateService } from '../../services/candidateService';
import CandidateCard from '../../components/candidate/CandidateCard';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import ErrorState from '../../components/common/ErrorState';
import { ArrowLeft, Flag, Calendar, Award } from 'lucide-react';

export const PartyDetails = () => {
  const { id } = useParams();
  const [party, setParty] = useState(null);
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const partyData = await partyService.getById(id);
        setParty(partyData);

        const candData = await candidateService.getAll({ partyId: id });
        setCandidates(candData);
      } catch (err) {
        setError(err.message || 'Party details not found');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (loading) return <LoadingSpinner label="Loading party details..." />;
  if (error || !party) return <ErrorState message={error || 'Party not found'} />;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      <Link
        to="/parties"
        className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Parties Directory
      </Link>

      {/* Party Banner */}
      <div className="bg-slate-900 text-white rounded-3xl p-8 border border-slate-800 shadow-md">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
          <div className="w-20 h-20 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-4xl shrink-0">
            {party.logo}
          </div>

          <div className="space-y-3 text-center sm:text-left flex-1">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3">
              <span className="text-xs font-bold text-blue-400 bg-blue-500/20 px-3 py-1 rounded-full border border-blue-400/30">
                {party.shortName}
              </span>
              <span className="text-xs text-slate-400 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                Est. {party.foundedYear}
              </span>
            </div>

            <h1 className="text-3xl font-extrabold">{party.name}</h1>
            <p className="text-slate-300 text-sm max-w-2xl leading-relaxed">{party.description}</p>

            <div className="pt-2 text-xs text-slate-400">
              Official Symbol: <strong className="text-white">{party.symbol}</strong>
            </div>
          </div>
        </div>
      </div>

      {/* Party Candidates Section */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-900">Nominated Candidates ({candidates.length})</h2>
            <p className="text-slate-500 text-xs">Candidates fielded by {party.name} in upcoming & active elections</p>
          </div>
        </div>

        {candidates.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {candidates.map((cand) => (
              <CandidateCard key={cand.id} candidate={cand} />
            ))}
          </div>
        ) : (
          <div className="bg-white p-8 rounded-2xl border border-slate-200 text-center text-slate-500 text-sm">
            No candidates currently fielded for this party.
          </div>
        )}
      </div>
    </div>
  );
};

export default PartyDetails;
