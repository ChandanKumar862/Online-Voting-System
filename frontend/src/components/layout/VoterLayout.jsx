import React, { useState } from 'react';
import { Outlet, Link } from 'react-router-dom';
import Sidebar from './Sidebar';
import DemoBanner from '../common/DemoBanner';
import { useAuth } from '../../context/AuthContext';
import { Menu, Vote, User, LogOut } from 'lucide-react';

export const VoterLayout = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans">
      <DemoBanner />
      <div className="flex flex-1">
        <Sidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />

        <div className="flex-1 flex flex-col min-w-0">
          {/* Top Bar for Voter Portal */}
          <header className="bg-white border-b border-slate-200 sticky top-0 z-20 px-4 py-3 flex items-center justify-between shadow-2xs md:hidden">
            <button
              onClick={() => setMobileOpen(true)}
              className="p-2 rounded-lg text-slate-600 hover:bg-slate-100"
            >
              <Menu className="w-6 h-6" />
            </button>
            <div className="flex items-center gap-2">
              <Vote className="w-5 h-5 text-blue-600" />
              <span className="font-bold text-sm">Voter Portal</span>
            </div>
            <Link to="/profile" className="p-1.5 rounded-full bg-slate-100 text-slate-600">
              <User className="w-4 h-4" />
            </Link>
          </header>

          <main className="flex-1 p-2 sm:p-6 overflow-x-hidden">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default VoterLayout;
