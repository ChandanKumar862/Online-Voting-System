import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { electionService } from '../../services/electionService';
import { candidateService } from '../../services/candidateService';
import { votingService } from '../../services/votingService';
import { useAuth } from '../../context/AuthContext';
import StatusBadge from '../../components/common/StatusBadge';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import ErrorState from '../../components/common/ErrorState';
import { formatDate } from '../../utils/formatters';
import { Calendar, MapPin, Vote, Award, ArrowLeft, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const ElectionDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  
  const [election, setElection] = useState(null);
  const [candidates, setCandidates] = useState([]);
  const [hasVoted, setHasVoted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const elData = await electionService.getById(id);
        setElection(elData);

        const candData = await candidateService.getByElection(id);
        setCandidates(candData);

        if (isAuthenticated) {
          const statusRes = await votingService.getVoteStatus(id);
          setHasVoted(statusRes.hasVoted);
        }
      } catch (err) {
        setError(err.message || 'Failed to load election details');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id, isAuthenticated]);

  if (loading) return <LoadingSpinner label="Loading election details..." />;
  if (error || !election) return <ErrorState message={error || 'Election not found'} />;

  const isOngoing = election.status?.toLowerCase() === 'ongoing';

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      {/* Back Button */}
      <Link
        to="/elections"
        className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Elections
      </Link>

      {/* Main Banner */}
      <div className="bg-slate-900 text-white rounded-3xl p-8 border border-slate-800 shadow-md">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-xs font-bold border border-blue-400/30 uppercase tracking-wider">
                {election.type} Election
              </span>
              <StatusBadge status={election.status} />
            </div>

            <h1 className="text-3xl font-extrabold">{election.name}</h1>
            <p className="text-slate-300 text-sm leading-relaxed">{election.description}</p>

            <div className="flex flex-wrap gap-6 text-xs text-slate-400 pt-2">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-blue-400" />
                <span>Start: <strong>{formatDate(election.startDate)}</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-blue-400" />
                <span>End: <strong>{formatDate(election.endDate)}</strong></span>
              </div>
              {election.stateName && (
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-emerald-400" />
                  <span>State: <strong>{election.stateName}</strong></span>
                </div>
              )}
            </div>
          </div>

          {/* Right Action */}
          <div className="bg-slate-800/80 p-6 rounded-2xl border border-slate-700 min-w-[240px] text-center space-y-3 shrink-0">
            {isOngoing ? (
              hasVoted ? (
                <div className="space-y-2">
                  <div className="p-3 bg-emerald-950/60 text-emerald-300 rounded-xl border border-emerald-700/60 text-xs font-semibold flex items-center justify-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    Vote Recorded
                  </div>
                  <p className="text-[11px] text-slate-400">You have already voted in this election.</p>
                </div>
              ) : (
                <Link
                  to={`/vote/${election.id}`}
                  className="w-full py-3 px-6 bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  <Vote className="w-4 h-4" />
                  Cast Vote Now
                </Link>
              )
            ) : election.status === 'completed' ? (
              <Link
                to={`/results/${election.id}`}
                className="w-full py-3 px-6 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
              >
                View Certified Results
              </Link>
            ) : (
              <span className="text-amber-400 text-xs font-semibold block bg-amber-950/40 p-3 rounded-xl border border-amber-800">
                Election Status: Upcoming
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Candidates List Section */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-900">Approved Candidates</h2>
            <p className="text-slate-500 text-xs">Official nominees running for contested positions</p>
          </div>
          <span className="text-xs font-semibold bg-slate-100 text-slate-700 px-3 py-1 rounded-full">
            {candidates.length} Candidates
          </span>
        </div>

        {candidates.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {candidates.map((cand) => (
              <div key={cand.id} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between">
                <div className="flex gap-4 items-start mb-4">
                  <img
                    src={cand.photo}
                    alt={cand.name}
                    className="w-16 h-16 rounded-2xl object-cover border border-slate-200 shadow-xs"
                  />
                  <div>
                    <h3 className="font-bold text-slate-900 text-base">{cand.name}</h3>
                    <p className="text-xs text-blue-600 font-semibold flex items-center gap-1 mt-0.5">
                      <span>{cand.partyLogo}</span>
                      {cand.partyName} ({cand.symbol})
                    </p>
                    <span className="text-[11px] text-slate-500 block mt-1">
                      Position: <strong>{cand.positionName}</strong>
                    </span>
                  </div>
                </div>

                <p className="text-slate-600 text-xs line-clamp-3 leading-relaxed mb-4 bg-slate-50 p-3 rounded-xl border border-slate-100">
                  {cand.description}
                </p>

                <div className="flex items-center justify-between text-[11px] text-slate-500 pt-3 border-t border-slate-100">
                  <span>Constituency: <strong>{cand.constituencyName}</strong></span>
                  <Link
                    to={`/candidates/${cand.id}`}
                    className="text-blue-600 hover:underline font-semibold"
                  >
                    View Bio &rarr;
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-slate-500 text-sm text-center py-8">No candidate records available for this election.</p>
        )}
      </div>
    </div>
  );
};

export default ElectionDetails;
