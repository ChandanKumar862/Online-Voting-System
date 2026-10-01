import React from 'react';
import { ShieldCheck, Vote, Lock, Server, CheckCircle2, Award } from 'lucide-react';

export const About = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-12">
      {/* Header */}
      <div className="bg-slate-900 text-white rounded-3xl p-10 border border-slate-800 shadow-md text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 text-blue-300 text-xs font-semibold border border-blue-400/20">
          <ShieldCheck className="w-4 h-4 text-blue-400" />
          <span>Academic Full-Stack Project</span>
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight">About Online Voting System</h1>
        <p className="text-slate-300 text-base max-w-2xl mx-auto leading-relaxed">
          An advanced digital voting infrastructure designed for central parliamentary elections, state assembly races, and local civic governance.
        </p>
      </div>

      {/* Core Principles */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-xl w-fit">
            <Lock className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-slate-900 text-lg">Cryptographic Secrecy</h3>
          <p className="text-slate-600 text-xs leading-relaxed">
            Ensures that every vote is linked to an authenticated citizen while keeping individual choices cryptographically decoupled on public interfaces.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl w-fit">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-slate-900 text-lg">One Vote Guarantee</h3>
          <p className="text-slate-600 text-xs leading-relaxed">
            Strict database constraints and token verification eliminate duplicate voting across central and state elections.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
          <div className="p-3 bg-purple-50 text-purple-600 rounded-xl w-fit">
            <Server className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-slate-900 text-lg">Full-Stack Architecture</h3>
          <p className="text-slate-600 text-xs leading-relaxed">
            Built using React.js, Tailwind CSS, Lucide icons, and structured for seamless REST API integration with Node.js + Express + Supabase backend.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
