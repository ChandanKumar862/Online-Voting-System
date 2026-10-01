import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { electionService } from '../../services/electionService';
import ElectionCard from '../../components/election/ElectionCard';
import StatCard from '../../components/common/StatCard';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import {
  ShieldCheck,
  Vote,
  UserCheck,
  CheckCircle2,
  Lock,
  BarChart3,
  Search,
  ArrowRight,
  Sparkles,
  Award
} from 'lucide-react';

export const Home = () => {
  const [elections, setElections] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchElections = async () => {
      try {
        const data = await electionService.getAll();
        setElections(data);
      } catch (err) {
        console.error('Failed to load home page elections:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchElections();
  }, []);

  const activeElectionsCount = elections.filter(e => e.status === 'ongoing').length;
  const upcomingElections = elections.filter(e => e.status === 'upcoming');
  const ongoingElections = elections.filter(e => e.status === 'ongoing');

  return (
    <div className="space-y-16 pb-16">
      {/* Hero Section */}
      <section className="relative bg-slate-900 text-white rounded-3xl overflow-hidden shadow-xl border border-slate-800 my-4">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/40 to-slate-900/90 pointer-events-none"></div>
        <div className="relative max-w-7xl mx-auto px-6 py-20 lg:py-28 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-400/20 text-blue-300 text-xs font-semibold">
              <ShieldCheck className="w-4 h-4 text-blue-400" />
              <span>Official Election Commission Digital Voting Portal</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
              Secure. Simple. <br />
              <span className="text-blue-500">Transparent.</span>
            </h1>

            <p className="text-slate-300 text-base sm:text-lg max-w-2xl leading-relaxed">
              Empowering citizens with a modern, cryptographic online voting infrastructure. Cast your eligible votes securely from anywhere, verify submission receipts, and track election results live.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-4">
              <Link
                to="/elections"
                className="px-6 py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm rounded-xl shadow-lg transition-all flex items-center gap-2"
              >
                <Vote className="w-4 h-4" />
                View Active Elections
              </Link>
              <Link
                to="/login"
                className="px-6 py-3.5 bg-slate-800 hover:bg-slate-700 text-slate-100 font-semibold text-sm rounded-xl border border-slate-700 transition-all flex items-center gap-2"
              >
                Login to Vote
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md bg-slate-800/80 border border-slate-700 p-8 rounded-3xl shadow-2xl backdrop-blur-md space-y-6">
              <div className="flex items-center justify-between border-b border-slate-700 pb-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-blue-600/20 text-blue-400 rounded-2xl border border-blue-500/30">
                    <Lock className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-sm">256-Bit Cryptographic Security</h4>
                    <span className="text-slate-400 text-xs">Tamper-proof voting receipts</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="bg-slate-900/70 p-3.5 rounded-xl border border-slate-700/60 flex items-center justify-between">
                  <span className="text-slate-300 text-xs">Voter Identity Verification</span>
                  <span className="text-emerald-400 text-xs font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Biometric Ready
                  </span>
                </div>
                <div className="bg-slate-900/70 p-3.5 rounded-xl border border-slate-700/60 flex items-center justify-between">
                  <span className="text-slate-300 text-xs">Double-Voting Prevention</span>
                  <span className="text-blue-400 text-xs font-semibold">Enforced</span>
                </div>
                <div className="bg-slate-900/70 p-3.5 rounded-xl border border-slate-700/60 flex items-center justify-between">
                  <span className="text-slate-300 text-xs">Live Tally Auditing</span>
                  <span className="text-purple-400 text-xs font-semibold">Active</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Live Statistics Section */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-slate-900">Election Platform Statistics</h2>
          <p className="text-slate-500 text-sm">Real-time metrics across national and state constituencies</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Active Elections"
            value={activeElectionsCount}
            icon={Vote}
            description="Currently open for voting"
            color="emerald"
          />
          <StatCard
            title="Registered Voters"
            value="950,000+"
            icon={UserCheck}
            description="Verified citizen accounts"
            color="blue"
          />
          <StatCard
            title="Registered Candidates"
            value="142"
            icon={Award}
            description="Approved political nominees"
            color="purple"
          />
          <StatCard
            title="Completed Elections"
            value="18"
            icon={CheckCircle2}
            description="Official certified results"
            color="indigo"
          />
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 max-w-7xl mx-auto shadow-xs">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
            Simple 5-Step Process
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900">How Online Voting Works</h2>
          <p className="text-slate-600 text-sm">Seamless experience designed for all registered citizens</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 relative">
          {[
            { step: '1', title: 'Register / Login', desc: 'Authenticate with your official credentials and voter ID.' },
            { step: '2', title: 'Check Eligibility', desc: 'View active elections matching your state and constituency.' },
            { step: '3', title: 'Select Candidate', desc: 'Browse party symbols, manifestos, and make your selection.' },
            { step: '4', title: 'Confirm Vote', desc: 'Review your choices carefully and confirm final vote submission.' },
            { step: '5', title: 'View Results', desc: 'Receive your cryptographic receipt and view live election tallies.' }
          ].map((item, idx) => (
            <div key={idx} className="bg-slate-50 p-6 rounded-2xl border border-slate-100 relative group hover:border-blue-200 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-blue-600 text-white font-bold text-lg flex items-center justify-center mb-4 shadow-sm group-hover:scale-105 transition-transform">
                {item.step}
              </div>
              <h4 className="font-bold text-slate-900 text-sm mb-1">{item.title}</h4>
              <p className="text-slate-500 text-xs leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Key Features Section */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <h2 className="text-3xl font-extrabold text-slate-900">Platform Features</h2>
          <p className="text-slate-600 text-sm">Built for transparency, security, and administrative precision</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: 'Secure Voting System',
              desc: 'Cryptographic hashing and strict authorization prevent double voting and guarantee complete vote secrecy.',
              icon: Lock
            },
            {
              title: 'Central & State Management',
              desc: 'Flexible architecture supporting parliamentary elections, state assembly races, and local civic bodies.',
              icon: ShieldCheck
            },
            {
              title: 'Candidate Profiles & Manifestos',
              desc: 'Complete transparency with party symbols, candidate education background, and political manifestos.',
              icon: UserCheck
            },
            {
              title: 'Transparent Live Results',
              desc: 'Automated vote tallies with clear percentage breakdowns, winner declarations, and official statistics.',
              icon: BarChart3
            },
            {
              title: 'Voter Status Tracking',
              desc: 'Instant verification of your vote registration status without revealing your confidential candidate pick.',
              icon: CheckCircle2
            },
            {
              title: 'Accessible & Responsive UI',
              desc: 'Optimized touch-friendly interface accessible across smartphones, tablets, and desktop computers.',
              icon: Sparkles
            }
          ].map((feature, idx) => (
            <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition-shadow">
              <div className="p-3 bg-blue-50 text-blue-600 rounded-xl w-fit mb-4 border border-blue-100">
                <feature.icon className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-900 text-base mb-2">{feature.title}</h3>
              <p className="text-slate-600 text-xs leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Active & Upcoming Elections Section */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Active & Upcoming Elections</h2>
            <p className="text-slate-500 text-sm">Participate in current democratic proceedings</p>
          </div>
          <Link
            to="/elections"
            className="text-sm font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1"
          >
            Explore All Elections <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {loading ? (
          <LoadingSpinner label="Loading elections..." />
        ) : elections.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {elections.slice(0, 3).map((election) => (
              <ElectionCard key={election.id} election={election} />
            ))}
          </div>
        ) : (
          <p className="text-slate-500 text-sm text-center py-8">No elections listed currently.</p>
        )}
      </section>
    </div>
  );
};

export default Home;
