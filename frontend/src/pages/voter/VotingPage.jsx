import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { electionService } from '../../services/electionService';
import { candidateService } from '../../services/candidateService';
import { votingService } from '../../services/votingService';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import ErrorState from '../../components/common/ErrorState';
import { Vote, ArrowLeft, CheckCircle2, ShieldAlert, Award, MapPin } from 'lucide-react';

export const VotingPage = () => {
  const { electionId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { addToast } = useToast();

  const [election, setElection] = useState(null);
  const [candidates, setCandidates] = useState([]);
  const [selectedCandidateId, setSelectedCandidateId] = useState(null);
  const [alreadyVoted, setAlreadyVoted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVotingData = async () => {
      setLoading(true);
      setError(null);
      try {
        const [elData, candData, statusRes] = await Promise.all([
          electionService.getById(electionId),
          candidateService.getByElection(electionId),
          votingService.getVoteStatus(electionId)
        ]);

        if (statusRes.hasVoted) {
          setAlreadyVoted(true);
        }

        setElection(elData);
        setCandidates(candData);
      } catch (err) {
        setError(err.message || 'Failed to initialize voting page');
      } finally {
        setLoading(false);
      }
    };
    fetchVotingData();
  }, [electionId]);

  if (loading) return <LoadingSpinner label="Loading ballot candidates..." />;
  if (error || !election) return <ErrorState message={error || 'Election not found'} />;

  if (alreadyVoted) {
    return (
      <div className="max-w-xl mx-auto px-4 py-16 text-center space-y-6">
        <div className="p-4 bg-emerald-100 text-emerald-600 rounded-full w-fit mx-auto">
          <CheckCircle2 className="w-12 h-12" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900">Vote Already Cast</h2>
        <p className="text-slate-600 text-sm">
          You have already submitted your official ballot for <strong>{election.name}</strong>.
        </p>
        <div className="flex justify-center gap-4">
          <Link
            to="/dashboard"
            className="px-5 py-2.5 bg-blue-600 text-white font-semibold text-xs rounded-xl shadow-xs"
          >
            Back to Dashboard
          </Link>
          <Link
            to="/my-votes"
            className="px-5 py-2.5 bg-slate-100 text-slate-700 font-semibold text-xs rounded-xl border border-slate-300"
          >
            View Vote History
          </Link>
        </div>
      </div>
    );
  }

  const handleProceedToReview = () => {
    if (!selectedCandidateId) {
      addToast('Please select a candidate before proceeding.', 'warning');
      return;
    }
    const selectedCandidate = candidates.find((c) => c.id === selectedCandidateId);
    navigate('/vote-review', {
      state: {
        election,
        candidate: selectedCandidate,
        positionName: selectedCandidate.positionName || 'Member of Parliament (MP)',
        constituencyName: user?.constituency || 'Patna Sahib'
      }
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      {/* Step Indicator Header */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 border border-slate-800 shadow-md">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold text-blue-400 uppercase tracking-wider block mb-1">
              Official Electronic Ballot &bull; Step 1 of 3
            </span>
            <h1 className="text-2xl font-extrabold">{election.name}</h1>
            <div className="flex items-center gap-4 text-xs text-slate-300 mt-1">
              <span>Constituency: <strong className="text-white">{user?.constituency || 'Patna Sahib'}</strong></span>
              <span>State: <strong className="text-white">{user?.state || 'Bihar'}</strong></span>
            </div>
          </div>
          <div className="px-3 py-1.5 bg-blue-500/20 text-blue-300 rounded-xl border border-blue-400/30 text-xs font-semibold">
            Single Candidate Choice
          </div>
        </div>
      </div>

      {/* Candidate Ballot Selection Cards */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-900">Select Nominee for {candidates[0]?.positionName || 'Parliamentary Position'}</h2>
          <span className="text-xs text-slate-500 font-medium">Select exactly 1 candidate</span>
        </div>

        {candidates.length > 0 ? (
          <div className="space-y-4">
            {candidates.map((cand) => {
              const isSelected = selectedCandidateId === cand.id;

              return (
                <div
                  key={cand.id}
                  onClick={() => setSelectedCandidateId(cand.id)}
                  className={`p-5 rounded-2xl border-2 transition-all cursor-pointer flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
                    isSelected
                      ? 'bg-blue-50/70 border-blue-600 shadow-md ring-2 ring-blue-500/20'
                      : 'bg-white border-slate-200 hover:border-slate-300 shadow-xs'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    {/* Radio circle */}
                    <div
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 ${
                        isSelected ? 'border-blue-600 bg-blue-600' : 'border-slate-300 bg-white'
                      }`}
                    >
                      {isSelected && <div className="w-2.5 h-2.5 rounded-full bg-white"></div>}
                    </div>

                    <img
                      src={cand.photo}
                      alt={cand.name}
                      className="w-14 h-14 rounded-xl object-cover border border-slate-200 shadow-xs shrink-0"
                    />

                    <div>
                      <h3 className="font-bold text-slate-900 text-base">{cand.name}</h3>
                      <p className="text-xs font-semibold text-blue-600 flex items-center gap-1 mt-0.5">
                        <span className="text-sm">{cand.partyLogo}</span>
                        {cand.partyName} ({cand.symbol})
                      </p>
                      <p className="text-xs text-slate-500 line-clamp-1 mt-1">{cand.description}</p>
                    </div>
                  </div>

                  <div className="text-right sm:self-center shrink-0">
                    <span className="text-xs font-bold text-slate-600 bg-slate-100 px-3 py-1 rounded-lg border border-slate-200 block sm:inline">
                      Symbol: {cand.symbol}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-slate-500 text-sm py-8 text-center bg-white rounded-2xl border border-slate-200">
            No candidate entries found for this ballot.
          </p>
        )}
      </div>

      {/* Review Button Footer Bar */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
        <button
          type="button"
          onClick={() => navigate('/dashboard')}
          className="px-4 py-2.5 text-xs font-semibold text-slate-600 hover:text-slate-900 flex items-center gap-1.5"
        >
          <ArrowLeft className="w-4 h-4" />
          Cancel
        </button>

        <button
          type="button"
          onClick={handleProceedToReview}
          disabled={!selectedCandidateId}
          className={`px-6 py-3 rounded-xl font-bold text-sm shadow-md transition-all flex items-center gap-2 ${
            selectedCandidateId
              ? 'bg-blue-600 hover:bg-blue-700 text-white cursor-pointer'
              : 'bg-slate-200 text-slate-400 cursor-not-allowed'
          }`}
        >
          <span>Review Vote Selection</span>
          <Vote className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default VotingPage;
