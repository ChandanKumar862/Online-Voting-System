import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { formatDate } from '../../utils/formatters';
import { User, Mail, Shield, Key, CheckCircle2, Lock, Save } from 'lucide-react';

export const Profile = () => {
  const { user, updateProfile } = useAuth();
  const { addToast } = useToast();

  const [fullName, setFullName] = useState(user?.fullName || '');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [saving, setSaving] = useState(false);

  const handleUpdate = (e) => {
    e.preventDefault();

    if (password && password !== confirmPassword) {
      addToast('Passwords do not match.', 'error');
      return;
    }

    setSaving(true);
    setTimeout(() => {
      updateProfile({ fullName });
      setSaving(false);
      setPassword('');
      setConfirmPassword('');
      addToast('Profile updated successfully!', 'success');
    }, 600);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="bg-slate-900 text-white rounded-3xl p-8 border border-slate-800 shadow-md flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-blue-600 text-white font-extrabold text-2xl flex items-center justify-center shadow-md">
            {user?.fullName ? user.fullName[0].toUpperCase() : 'U'}
          </div>
          <div>
            <h1 className="text-2xl font-extrabold">{user?.fullName}</h1>
            <span className="text-xs text-blue-400 font-semibold bg-blue-500/20 px-2.5 py-0.5 rounded border border-blue-400/30 uppercase tracking-wider inline-block mt-1">
              Role: {user?.role || 'voter'}
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Account Meta Info */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
          <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">Account Details</h3>

          <div className="space-y-3 text-xs">
            <div>
              <span className="text-slate-400 block">Voter Identification ID</span>
              <strong className="text-slate-800 text-sm font-mono">{user?.voterId || 'IND-VOT-2025-882'}</strong>
            </div>

            <div>
              <span className="text-slate-400 block">State Registration</span>
              <strong className="text-slate-800">{user?.state || 'Bihar'}</strong>
            </div>

            <div>
              <span className="text-slate-400 block">Constituency</span>
              <strong className="text-slate-800">{user?.constituency || 'Patna Sahib'}</strong>
            </div>

            <div>
              <span className="text-slate-400 block">Registration Date</span>
              <strong className="text-slate-800">{formatDate(user?.createdAt || '2025-02-14')}</strong>
            </div>

            <div className="pt-2 border-t border-slate-100">
              <span className="text-emerald-700 bg-emerald-50 px-2 py-1 rounded text-[11px] font-bold border border-emerald-200 flex items-center gap-1 w-fit">
                <CheckCircle2 className="w-3.5 h-3.5" /> Biometric Identity Verified
              </span>
            </div>
          </div>
        </div>

        {/* Update Form */}
        <div className="md:col-span-2 bg-white rounded-3xl border border-slate-200 p-8 shadow-xs space-y-6">
          <h3 className="text-lg font-bold text-slate-900">Update Profile & Credentials</h3>

          <form onSubmit={handleUpdate} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name</label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                  className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Registered Email (Read Only)</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="email"
                  value={user?.email || ''}
                  disabled
                  className="w-full pl-9 pr-3 py-2.5 bg-slate-100 text-slate-500 border border-slate-200 rounded-xl text-sm cursor-not-allowed"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Change Password (Optional)</h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">New Password</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Confirm New Password</label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={saving}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-2"
            >
              {saving ? (
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  Save Changes
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
