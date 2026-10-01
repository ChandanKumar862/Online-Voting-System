import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { electionService } from '../../services/electionService';
import { votingService } from '../../services/votingService';
import StatCard from '../../components/common/StatCard';
import StatusBadge from '../../components/common/StatusBadge';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { formatDate } from '../../utils/formatters';
import { Vote, CheckCircle2, Calendar, History, User, AlertCircle, ArrowRight } from 'lucide-react';

export const VoterDashboard = () => {
  const { user } = useAuth();
  const [elections, setElections] = useState([]);
  const [userVotes, setUserVotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      try {
        const [elData, votesData] = await Promise.all([
          electionService.getAll(),
          votingService.getVoteHistory()
        ]);
        setElections(elData);
        setUserVotes(votesData);
      } catch (err) {
        console.error('Failed to load voter dashboard data:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  const activeElections = elections.filter((e) => e.status === 'ongoing');
  const upcomingElections = elections.filter((e) => e.status === 'upcoming');
  const votesCastCount = userVotes.length;

  const votedElectionIds = new Set(userVotes.map((v) => v.electionId));

  if (loading) return <LoadingSpinner label="Preparing voter portal dashboard..." />;

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-4 py-6">
      {/* Welcome Banner */}
      <div className="bg-slate-900 text-white rounded-3xl p-8 border border-slate-800 shadow-md flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-800/60 w-fit">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Identity Verified Voter</span>
          </div>
          <h1 className="text-3xl font-extrabold">Welcome, {user?.fullName || 'Voter'}!</h1>
          <p className="text-slate-300 text-xs sm:text-sm">
            Voter ID: <strong className="text-white">{user?.voterId || 'IND-VOT-882'}</strong> &bull; Constituency: <strong className="text-white">{user?.constituency || 'Patna Sahib'}, {user?.state || 'Bihar'}</strong>
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/elections"
            className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
          >
            <Vote className="w-4 h-4" />
            View All Elections
          </Link>
          <Link
            to="/my-votes"
            className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs rounded-xl border border-slate-700 transition-colors flex items-center gap-1.5"
          >
            <History className="w-4 h-4" />
            Vote History
          </Link>
        </div>
      </div>

      {/* Voter Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Eligible Elections"
          value={activeElections.length + upcomingElections.length}
          icon={Vote}
          description="Elections for your region"
          color="blue"
        />
        <StatCard
          title="Active Elections"
          value={activeElections.length}
          icon={Calendar}
          description="Open for voting right now"
          color="emerald"
        />
        <StatCard
          title="Votes Cast"
          value={votesCastCount}
          icon={CheckCircle2}
          description="Verified completed votes"
          color="purple"
        />
        <StatCard
          title="Upcoming Elections"
          value={upcomingElections.length}
          icon={History}
          description="Scheduled for future dates"
          color="amber"
        />
      </div>

      {/* Active Elections Grid */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-900">Active Elections Available for You</h2>
            <p className="text-slate-500 text-xs">Cast your vote before the polling deadline closes</p>
          </div>
        </div>

        {activeElections.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {activeElections.map((election) => {
              const hasVotedThis = votedElectionIds.has(election.id);
              const voteRecord = userVotes.find((v) => v.electionId === election.id);

              return (
                <div key={election.id} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-semibold px-2.5 py-1 bg-slate-100 text-slate-700 rounded-md uppercase">
                        {election.type} Election
                      </span>
                      <StatusBadge status={election.status} />
                    </div>

                    <h3 className="text-lg font-bold text-slate-900 mb-2">{election.name}</h3>
                    <p className="text-slate-600 text-xs mb-4 line-clamp-2">{election.description}</p>

                    <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100 text-xs text-slate-500 space-y-1.5 mb-6">
                      <div className="flex justify-between">
                        <span>Constituency:</span>
                        <strong className="text-slate-800">{user?.constituency || 'Patna Sahib'}</strong>
                      </div>
                      <div className="flex justify-between">
                        <span>Poll Start:</span>
                        <strong className="text-slate-800">{formatDate(election.startDate)}</strong>
                      </div>
                      <div className="flex justify-between">
                        <span>Poll End:</span>
                        <strong className="text-slate-800">{formatDate(election.endDate)}</strong>
                      </div>
                    </div>
                  </div>

                  <div>
                    {hasVotedThis ? (
                      <div className="w-full py-2.5 px-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl font-semibold text-xs flex items-center justify-between">
                        <span className="flex items-center gap-1.5">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          Vote Submitted
                        </span>
                        <span className="text-[11px] text-emerald-700">{voteRecord?.votedAt ? formatDate(voteRecord.votedAt) : 'Recorded'}</span>
                      </div>
                    ) : (
                      <Link
                        to={`/vote/${election.id}`}
                        className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2"
                      >
                        <Vote className="w-4 h-4" />
                        Vote Now
                      </Link>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="bg-white p-8 rounded-2xl border border-slate-200 text-center text-slate-500 text-sm">
            No active polls open right now for your constituency.
          </div>
        )}
      </div>

      {/* Recent Activity Log */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
        <h3 className="text-base font-bold text-slate-900">Recent Account Activity</h3>
        {userVotes.length > 0 ? (
          <div className="divide-y divide-slate-100">
            {userVotes.map((vt) => (
              <div key={vt.id} className="py-3 flex items-center justify-between text-xs">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-emerald-100 text-emerald-700 rounded-lg">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="font-bold text-slate-900">{vt.electionName}</h5>
                    <span className="text-slate-500">Receipt Hash: {vt.receiptHash}</span>
                  </div>
                </div>
                <span className="text-slate-400 font-medium">{formatDate(vt.votedAt)}</span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-slate-400 text-xs">No voting history recorded yet.</p>
        )}
      </div>
    </div>
  );
};

export default VoterDashboard;
