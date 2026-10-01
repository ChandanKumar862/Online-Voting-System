import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { candidateService } from '../../services/candidateService';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import ErrorState from '../../components/common/ErrorState';
import { ArrowLeft, Flag, Award, MapPin, GraduationCap, Calendar, CheckCircle2 } from 'lucide-react';

export const CandidateDetails = () => {
  const { id } = useParams();
  const [candidate, setCandidate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCandidate = async () => {
      setLoading(true);
      try {
        const data = await candidateService.getById(id);
        setCandidate(data);
      } catch (err) {
        setError(err.message || 'Candidate not found');
      } finally {
        setLoading(false);
      }
    };
    fetchCandidate();
  }, [id]);

  if (loading) return <LoadingSpinner label="Loading candidate profile..." />;
  if (error || !candidate) return <ErrorState message={error || 'Candidate profile not found'} />;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      <Link
        to="/candidates"
        className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Candidate Directory
      </Link>

      <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
        {/* Banner Header */}
        <div className="bg-slate-900 text-white p-8 sm:p-10 relative">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            <img
              src={candidate.photo}
              alt={candidate.name}
              className="w-32 h-32 rounded-2xl object-cover border-4 border-slate-800 shadow-xl shrink-0"
            />
            <div className="space-y-3 text-center sm:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-semibold border border-blue-400/30">
                <span>{candidate.partyLogo}</span>
                <span>{candidate.partyName} ({candidate.symbol})</span>
              </div>
              <h1 className="text-3xl font-extrabold">{candidate.name}</h1>
              <p className="text-slate-300 text-sm">{candidate.positionName}</p>

              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs text-slate-400 pt-1">
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                  {candidate.constituencyName}, {candidate.stateName}
                </span>
                <span className="flex items-center gap-1.5">
                  <GraduationCap className="w-3.5 h-3.5 text-blue-400" />
                  {candidate.education}
                </span>
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-purple-400" />
                  Age: {candidate.age} Years
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-8 space-y-6">
          <div>
            <h3 className="text-base font-bold text-slate-900 mb-2">Biography & Public Service Manifesto</h3>
            <p className="text-slate-600 text-sm leading-relaxed whitespace-pre-line">
              {candidate.description}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50 p-5 rounded-2xl border border-slate-100">
            <div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">Contested Election</span>
              <span className="text-slate-800 font-semibold text-sm">{candidate.electionName}</span>
            </div>
            <div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">Political Party Symbol</span>
              <span className="text-slate-800 font-semibold text-sm">{candidate.symbol} ({candidate.partyLogo})</span>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
            <span className="text-xs text-slate-400 flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Nominee Vetted & Verified
            </span>
            <Link
              to={`/elections/${candidate.electionId}`}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-xl shadow-xs transition-colors"
            >
              View Contested Election &rarr;
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidateDetails;
