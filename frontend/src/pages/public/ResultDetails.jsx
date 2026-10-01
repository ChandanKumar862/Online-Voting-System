import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { resultService } from '../../services/resultService';
import StatusBadge from '../../components/common/StatusBadge';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import ErrorState from '../../components/common/ErrorState';
import { Trophy, ArrowLeft, BarChart2, CheckCircle2, ShieldCheck, Users } from 'lucide-react';

export const ResultDetails = () => {
  const { electionId } = useParams();
  const [resultData, setResultData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);
      try {
        const data = await resultService.getElectionResults(electionId);
        setResultData(data);
      } catch (err) {
        setError(err.message || 'Failed to load election results');
      } finally {
        setLoading(false);
      }
    };
    fetchResults();
  }, [electionId]);

  if (loading) return <LoadingSpinner label="Compiling certified tally results..." />;
  if (error || !resultData) return <ErrorState message={error || 'Results not found'} />;

  const { electionName, electionType, status, totalVoters, votesCast, turnoutPercentage, winner, results } = resultData;

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">
      <Link
        to="/results"
        className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Results Overview
      </Link>

      {/* Header Banner */}
      <div className="bg-slate-900 text-white rounded-3xl p-8 border border-slate-800 shadow-md">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full border border-blue-400/30">
                {electionType} Election
              </span>
              <StatusBadge status={status} />
            </div>
            <h1 className="text-3xl font-extrabold">{electionName}</h1>
            <p className="text-slate-300 text-xs">Official Certified Result Certificate</p>
          </div>

          <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700 text-center space-y-1">
            <span className="text-slate-400 text-xs block">Voter Turnout</span>
            <span className="text-2xl font-extrabold text-emerald-400">{turnoutPercentage}%</span>
            <span className="text-[11px] text-slate-400 block">{votesCast.toLocaleString()} / {totalVoters.toLocaleString()} Votes</span>
          </div>
        </div>
      </div>

      {/* Declared Winner Highlight Card */}
      {winner && (
        <div className="bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent border-2 border-amber-400/40 rounded-3xl p-6 shadow-sm">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="relative">
              <img
                src={winner.photo}
                alt={winner.candidateName}
                className="w-24 h-24 rounded-2xl object-cover border-2 border-amber-400 shadow-md"
              />
              <div className="absolute -top-2 -right-2 p-1.5 bg-amber-500 text-white rounded-full shadow-lg">
                <Trophy className="w-4 h-4" />
              </div>
            </div>

            <div className="space-y-1 text-center sm:text-left flex-1">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-600 bg-amber-100 px-2.5 py-0.5 rounded-full border border-amber-200 inline-block">
                Declared Winner &bull; Highest Votes
              </span>
              <h2 className="text-2xl font-bold text-slate-900">{winner.candidateName}</h2>
              <p className="text-sm font-semibold text-blue-600">
                {winner.partyLogo} {winner.partyName} ({winner.symbol})
              </p>
              <div className="text-xs text-slate-500 flex flex-wrap gap-4 pt-1">
                <span>Position: <strong>{winner.positionName}</strong></span>
                <span>Constituency: <strong>{winner.constituencyName}</strong></span>
              </div>
            </div>

            <div className="text-right bg-white p-4 rounded-2xl border border-amber-200 shadow-xs min-w-[140px]">
              <span className="text-xs text-slate-500 block">Total Votes</span>
              <strong className="text-xl font-bold text-slate-900">{winner.voteCount.toLocaleString()}</strong>
              <span className="text-xs font-semibold text-emerald-600 block">{winner.percentage}% share</span>
            </div>
          </div>
        </div>
      )}

      {/* Detailed Vote Distribution Table & Visual Chart */}
      <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-xs space-y-6">
        <h3 className="text-lg font-bold text-slate-900">Vote Breakdown by Candidate</h3>

        <div className="space-y-6">
          {results.map((item, idx) => (
            <div key={item.candidateId} className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-slate-100 text-slate-700 font-bold text-xs flex items-center justify-center">
                    #{idx + 1}
                  </span>
                  <span className="font-bold text-slate-900">{item.candidateName}</span>
                  <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                    {item.partyLogo} {item.partyName}
                  </span>
                </div>
                <div className="text-right">
                  <strong className="text-slate-900">{item.voteCount.toLocaleString()} votes</strong>
                  <span className="text-xs text-slate-500 ml-2">({item.percentage}%)</span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all duration-500 ${
                    idx === 0 ? 'bg-blue-600' : idx === 1 ? 'bg-indigo-500' : 'bg-slate-400'
                  }`}
                  style={{ width: `${item.percentage}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ResultDetails;
