import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { CheckCircle2, ShieldCheck, Home, BarChart3, Lock, Copy } from 'lucide-react';
import { formatDateTime } from '../../utils/formatters';
import { useToast } from '../../context/ToastContext';

export const VoteSuccess = () => {
  const location = useLocation();
  const { addToast } = useToast();
  const { electionName, votedAt, receiptHash } = location.state || {};

  const handleCopyReceipt = () => {
    if (receiptHash) {
      navigator.clipboard.writeText(receiptHash);
      addToast('Receipt hash copied to clipboard!', 'success');
    }
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-12">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden p-8 text-center space-y-6">
        {/* Animated Check Icon */}
        <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-md animate-bounce">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-extrabold text-slate-900">✓ Vote Submitted Successfully</h1>
          <p className="text-slate-600 text-xs sm:text-sm">
            Your vote has been recorded securely in the election database.
          </p>
        </div>

        {/* Audit Receipt Card */}
        <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 text-left space-y-3">
          <div className="flex items-center justify-between border-b border-slate-200 pb-2">
            <span className="text-xs text-slate-400 font-semibold uppercase">Official Transaction Receipt</span>
            <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-bold">VERIFIED</span>
          </div>

          <div className="text-xs space-y-1.5 text-slate-600">
            <div className="flex justify-between">
              <span>Election:</span>
              <strong className="text-slate-900 font-bold">{electionName || 'Parliamentary Election 2026'}</strong>
            </div>
            <div className="flex justify-between">
              <span>Timestamp:</span>
              <strong className="text-slate-900 font-bold">{votedAt ? formatDateTime(votedAt) : 'Just Now'}</strong>
            </div>
            <div className="flex justify-between items-center pt-1">
              <span>Receipt Hash:</span>
              <div className="flex items-center gap-1 font-mono font-bold text-slate-900 bg-white px-2 py-1 rounded border border-slate-200 text-[11px]">
                <span>{receiptHash || '0x8F9A...43B1'}</span>
                <button
                  onClick={handleCopyReceipt}
                  title="Copy Receipt"
                  className="text-slate-400 hover:text-slate-700"
                >
                  <Copy className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Secrecy Assurance Note */}
        <div className="p-3 bg-blue-50 border border-blue-200 text-blue-800 rounded-xl text-xs flex items-center justify-center gap-2">
          <Lock className="w-4 h-4 text-blue-600 shrink-0" />
          <span>For voter confidentiality, your specific candidate choice is not displayed on confirmation screens.</span>
        </div>

        {/* Navigation Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link
            to="/dashboard"
            className="w-full sm:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2"
          >
            <Home className="w-4 h-4" />
            Back to Dashboard
          </Link>
          <Link
            to="/results"
            className="w-full sm:w-auto px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl border border-slate-300 transition-colors flex items-center justify-center gap-2"
          >
            <BarChart3 className="w-4 h-4" />
            View Election Results
          </Link>
        </div>
      </div>
    </div>
  );
};

export default VoteSuccess;
