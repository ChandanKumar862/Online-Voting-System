import React from 'react';
import { Link } from 'react-router-dom';
import { Vote, Shield, Lock, CheckCircle2 } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-400 border-t border-slate-800 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand Col */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-blue-600 rounded-lg text-white">
                <Vote className="w-5 h-5" />
              </div>
              <span className="font-bold text-white text-base">Online Voting System</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Official academic online voting platform ensuring secure, transparent, and verified democratic elections.
            </p>
            <div className="flex items-center gap-3 text-xs text-slate-400">
              <span className="flex items-center gap-1"><Lock className="w-3.5 h-3.5 text-emerald-400" /> 256-bit Encrypted</span>
              <span className="flex items-center gap-1"><Shield className="w-3.5 h-3.5 text-blue-400" /> Verified</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Quick Links</h4>
            <ul className="space-y-2.5 text-xs">
              <li><Link to="/elections" className="hover:text-white transition-colors">Active Elections</Link></li>
              <li><Link to="/candidates" className="hover:text-white transition-colors">Candidate Directory</Link></li>
              <li><Link to="/parties" className="hover:text-white transition-colors">Political Parties</Link></li>
              <li><Link to="/results" className="hover:text-white transition-colors">Election Results</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">About Platform</Link></li>
            </ul>
          </div>

          {/* Voter Services */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Voter Support</h4>
            <ul className="space-y-2.5 text-xs">
              <li><Link to="/login" className="hover:text-white transition-colors">Voter Login</Link></li>
              <li><Link to="/register" className="hover:text-white transition-colors">Voter Registration</Link></li>
              <li><Link to="/my-votes" className="hover:text-white transition-colors">Vote Status Verification</Link></li>
              <li><Link to="/forgot-password" className="hover:text-white transition-colors">Password Assistance</Link></li>
            </ul>
          </div>

          {/* Official Notice */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Compliance</h4>
            <p className="text-xs text-slate-400 leading-relaxed mb-3">
              Designed according to election standards. All voting receipts are cryptographically hashed for non-repudiation.
            </p>
            <span className="inline-block bg-slate-800 text-slate-300 text-[10px] px-2.5 py-1 rounded border border-slate-700">
              Academic Project &copy; {new Date().getFullYear()}
            </span>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>&copy; {new Date().getFullYear()} Online Voting System. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-slate-400">Privacy Policy</a>
            <a href="#" className="hover:text-slate-400">Terms of Service</a>
            <a href="#" className="hover:text-slate-400">Security Audit</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
