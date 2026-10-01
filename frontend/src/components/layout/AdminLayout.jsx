import React, { useState } from 'react';
import { Outlet, Link } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import DemoBanner from '../common/DemoBanner';
import { useAuth } from '../../context/AuthContext';
import { Menu, ShieldCheck, User } from 'lucide-react';

export const AdminLayout = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user } = useAuth();

  return (
    <div className="min-h-screen flex flex-col bg-slate-100 text-slate-900 font-sans">
      <DemoBanner />
      <div className="flex flex-1">
        <AdminSidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />

        <div className="flex-1 flex flex-col min-w-0">
          {/* Mobile Admin Bar */}
          <header className="bg-slate-950 text-white border-b border-slate-800 sticky top-0 z-20 px-4 py-3 flex items-center justify-between md:hidden">
            <button
              onClick={() => setMobileOpen(true)}
              className="p-2 rounded-lg text-slate-300 hover:bg-slate-900"
            >
              <Menu className="w-6 h-6" />
            </button>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-indigo-400" />
              <span className="font-bold text-sm">Admin Console</span>
            </div>
            <Link to="/profile" className="p-1.5 rounded-full bg-slate-800 text-slate-300">
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

export default AdminLayout;
