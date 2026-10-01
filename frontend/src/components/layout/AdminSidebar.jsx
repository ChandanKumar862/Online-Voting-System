import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  LayoutDashboard,
  Vote,
  MapPin,
  Building,
  Award,
  Flag,
  UserCheck,
  Users,
  BarChart3,
  User,
  LogOut,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';

export const AdminSidebar = ({ mobileOpen, setMobileOpen }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const adminNavItems = [
    { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
    { name: 'Elections', path: '/admin/elections', icon: Vote },
    { name: 'States', path: '/admin/states', icon: MapPin },
    { name: 'Constituencies', path: '/admin/constituencies', icon: Building },
    { name: 'Positions', path: '/admin/positions', icon: Award },
    { name: 'Parties', path: '/admin/parties', icon: Flag },
    { name: 'Candidates', path: '/admin/candidates', icon: UserCheck },
    { name: 'Users', path: '/admin/users', icon: Users },
    { name: 'Results & Analytics', path: '/admin/results', icon: BarChart3 },
    { name: 'Admin Profile', path: '/profile', icon: User }
  ];

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const navContent = (
    <div className="flex flex-col h-full bg-slate-950 text-slate-300 w-64 border-r border-slate-800 shrink-0">
      {/* Admin Header */}
      <div className="p-5 border-b border-slate-800 flex items-center gap-3 bg-slate-900/60">
        <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center font-bold text-white shadow-md">
          <ShieldCheck className="w-5 h-5" />
        </div>
        <div className="overflow-hidden">
          <h4 className="font-bold text-sm text-white truncate">{user?.fullName || 'Administrator'}</h4>
          <span className="text-[10px] uppercase font-bold tracking-wider text-indigo-400 bg-indigo-950 px-2 py-0.5 rounded border border-indigo-800/80 inline-block mt-0.5">
            Admin Console
          </span>
        </div>
      </div>

      {/* Nav items */}
      <div className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
        {adminNavItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === '/admin'}
            onClick={() => setMobileOpen && setMobileOpen(false)}
            className={({ isActive }) =>
              `flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-all ${
                isActive
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200'
              }`
            }
          >
            <div className="flex items-center gap-3">
              <item.icon className="w-4 h-4" />
              <span>{item.name}</span>
            </div>
            <ChevronRight className="w-3 h-3 opacity-40" />
          </NavLink>
        ))}
      </div>

      {/* Logout */}
      <div className="p-3 border-t border-slate-800 bg-slate-900/40">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-rose-400 hover:bg-rose-950/40 hover:text-rose-300 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span>Exit Admin Session</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      <aside className="hidden md:block h-screen sticky top-0 z-30">
        {navContent}
      </aside>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-xs"
            onClick={() => setMobileOpen(false)}
          ></div>
          <div className="relative z-10">{navContent}</div>
        </div>
      )}
    </>
  );
};

export default AdminSidebar;
