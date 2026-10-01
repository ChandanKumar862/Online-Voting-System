import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { electionService } from '../../services/electionService';
import StatusBadge from '../../components/common/StatusBadge';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import EmptyState from '../../components/common/EmptyState';
import { BarChart3, CheckCircle2, ChevronRight, Award, Trophy } from 'lucide-react';

export const Results = () => {
  const [elections, setElections] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResultsElections = async () => {
      setLoading(true);
      try {
        const data = await electionService.getAll();
        setElections(data);
      } catch (err) {
        console.error('Failed to load results elections:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchResultsElections();
  }, []);

  const completed = elections.filter(e => e.status === 'completed');
  const ongoing = elections.filter(e => e.status === 'ongoing');

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="bg-slate-900 text-white rounded-3xl p-8 border border-slate-800 shadow-md">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold border border-emerald-400/30">
            <BarChart3 className="w-3.5 h-3.5" />
            <span>Certified Election Tallies</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight">Election Results</h1>
          <p className="text-slate-300 text-sm leading-relaxed">
            View certified vote counts, turnout percentages, and declared winners for completed national and state elections.
          </p>
        </div>
      </div>

      {/* Completed Certified Elections */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Trophy className="w-5 h-5 text-amber-500" />
            Completed & Certified Results
          </h2>
        </div>

        {loading ? (
          <LoadingSpinner label="Loading election tallies..." />
        ) : completed.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {completed.map((el) => (
              <div key={el.id} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-semibold px-2.5 py-1 bg-slate-100 text-slate-700 rounded-md uppercase">
                      {el.type} Election
                    </span>
                    <StatusBadge status="completed" />
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 mb-2">{el.name}</h3>
                  <p className="text-xs text-slate-500 mb-4">{el.description}</p>

                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-2 mb-6 text-xs text-slate-600">
                    <div className="flex justify-between">
                      <span>Total Registered Voters:</span>
                      <strong className="text-slate-900">{el.totalVoters.toLocaleString()}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span>Total Votes Cast:</span>
                      <strong className="text-slate-900">{el.votesCast.toLocaleString()}</strong>
                    </div>
                    <div className="flex justify-between text-blue-600 font-semibold">
                      <span>Voter Turnout:</span>
                      <span>{((el.votesCast / el.totalVoters) * 100).toFixed(1)}%</span>
                    </div>
                  </div>
                </div>

                <Link
                  to={`/results/${el.id}`}
                  className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2"
                >
                  <BarChart3 className="w-4 h-4" />
                  View Detailed Breakdown & Winner
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-slate-500 text-sm text-center py-6 bg-white rounded-2xl border border-slate-200">
            No certified completed elections present at this time.
          </p>
        )}
      </div>

      {/* Ongoing Elections Notice */}
      <div className="space-y-6 pt-4 border-t border-slate-200">
        <div>
          <h2 className="text-lg font-bold text-slate-900">Ongoing Elections (Live Voting)</h2>
          <p className="text-slate-500 text-xs">Official results for active elections will be published after polls close.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {ongoing.map((el) => (
            <div key={el.id} className="bg-slate-50 rounded-2xl border border-slate-200 p-5 flex items-center justify-between">
              <div>
                <StatusBadge status="ongoing" size="sm" />
                <h4 className="font-bold text-slate-900 text-sm mt-2">{el.name}</h4>
                <span className="text-xs text-slate-500">Votes Cast So Far: {el.votesCast.toLocaleString()}</span>
              </div>
              <Link
                to={`/elections/${el.id}`}
                className="px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-100"
              >
                View Poll Details
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Results;
