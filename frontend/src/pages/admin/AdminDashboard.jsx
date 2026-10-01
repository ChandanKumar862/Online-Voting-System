import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import StatCard from '../../components/common/StatCard';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { electionService } from '../../services/electionService';
import { candidateService } from '../../services/candidateService';
import { partyService } from '../../services/partyService';
import { userService } from '../../services/userService';
import { mockStore } from '../../services/mockStore';
import { ShieldCheck, Vote, Users, UserCheck, Flag, BarChart3, CheckCircle2, Plus } from 'lucide-react';

export const AdminDashboard = () => {
  const [stats, setStats] = useState({
    users: 0,
    elections: 0,
    activeElections: 0,
    completedElections: 0,
    candidates: 0,
    parties: 0,
    votes: 0
  });
  const [recentActivities, setRecentActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdminStats = async () => {
      setLoading(true);
      try {
        const [uList, eList, cList, pList] = await Promise.all([
          userService.getAll(),
          electionService.getAll(),
          candidateService.getAll(),
          partyService.getAll()
        ]);

        const activeCount = eList.filter(e => e.status === 'ongoing').length;
        const completedCount = eList.filter(e => e.status === 'completed').length;
        const totalVotesCast = eList.reduce((acc, curr) => acc + (curr.votesCast || 0), 0);

        setStats({
          users: uList.length,
          elections: eList.length,
          activeElections: activeCount,
          completedElections: completedCount,
          candidates: cList.length,
          parties: pList.length,
          votes: totalVotesCast
        });

        setRecentActivities([
          { text: 'General Election 2026 launched', time: '2 hours ago', icon: Vote },
          { text: 'New candidate Dr. Vikramaditya Singh approved', time: '4 hours ago', icon: UserCheck },
          { text: '3,450 votes recorded in Bihar Assembly Election', time: '5 hours ago', icon: CheckCircle2 },
          { text: 'New voter account created (rahul@gmail.com)', time: 'Yesterday', icon: Users }
        ]);
      } catch (err) {
        console.error('Failed to load admin stats:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchAdminStats();
  }, []);

  if (loading) return <LoadingSpinner label="Loading admin analytics..." />;

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-4 py-6">
      {/* Admin Header */}
      <div className="bg-slate-950 text-white rounded-3xl p-8 border border-slate-800 shadow-md flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-400 bg-indigo-950 px-3 py-1 rounded-full border border-indigo-800/80 w-fit">
            <ShieldCheck className="w-4 h-4" />
            Central Administrator Console
          </div>
          <h1 className="text-3xl font-extrabold">Executive Dashboard</h1>
          <p className="text-slate-400 text-xs sm:text-sm">Manage elections, states, candidates, political parties, and live voting tallies.</p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Link
            to="/admin/elections"
            className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            Create Election
          </Link>
          <Link
            to="/admin/results"
            className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs rounded-xl border border-slate-700 transition-colors flex items-center gap-1.5"
          >
            <BarChart3 className="w-4 h-4" />
            Audit Analytics
          </Link>
        </div>
      </div>

      {/* Grid of 7 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Registered Users" value={stats.users} icon={Users} color="blue" />
        <StatCard title="Total Elections" value={stats.elections} icon={Vote} color="purple" />
        <StatCard title="Active Elections" value={stats.activeElections} icon={CheckCircle2} color="emerald" trend="LIVE" />
        <StatCard title="Completed Elections" value={stats.completedElections} icon={BarChart3} color="indigo" />
        <StatCard title="Total Candidates" value={stats.candidates} icon={UserCheck} color="amber" />
        <StatCard title="Political Parties" value={stats.parties} icon={Flag} color="rose" />
        <StatCard title="Total Votes Cast" value={stats.votes.toLocaleString()} icon={ShieldCheck} color="emerald" />
      </div>

      {/* Analytics & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Participation Widget */}
        <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
          <h3 className="text-base font-bold text-slate-900">Voter Participation Overview</h3>
          <div className="space-y-4 pt-2">
            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-slate-700">Parliamentary Election 2026 Turnout</span>
                <span className="text-blue-600">43.4% (412,500 votes)</span>
              </div>
              <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-blue-600 w-[43.4%]"></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-slate-700">Bihar Assembly Election Turnout</span>
                <span className="text-emerald-600">49.6% (89,400 votes)</span>
              </div>
              <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 w-[49.6%]"></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-slate-700">Maharashtra Civic Election (Final Certified)</span>
                <span className="text-purple-600">80.0% (168,000 votes)</span>
              </div>
              <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-purple-600 w-[80%]"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Admin Activity */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
          <h3 className="text-base font-bold text-slate-900">Recent Admin Audit Log</h3>
          <div className="divide-y divide-slate-100">
            {recentActivities.map((act, idx) => (
              <div key={idx} className="py-3 flex items-start gap-3 text-xs">
                <div className="p-2 bg-slate-100 text-slate-700 rounded-lg shrink-0 mt-0.5">
                  <act.icon className="w-3.5 h-3.5" />
                </div>
                <div>
                  <p className="font-semibold text-slate-900 leading-snug">{act.text}</p>
                  <span className="text-slate-400 text-[10px]">{act.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
