import React, { useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { votingService } from '../../services/votingService';
import { useToast } from '../../context/ToastContext';
import ConfirmDialog from '../../components/common/ConfirmDialog';
import { AlertTriangle, ArrowLeft, CheckCircle2, ShieldCheck, Vote } from 'lucide-react';

export const VoteReview = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { addToast } = useToast();

  const state = location.state || {};
  const { election, candidate, positionName, constituencyName } = state;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  if (!election || !candidate) {
    return (
      <div className="max-w-md mx-auto px-4 py-16 text-center space-y-4">
        <p className="text-slate-600 text-sm">No vote selection payload found. Please select a candidate first.</p>
        <Link to="/elections" className="px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-semibold inline-block">
          Go to Elections
        </Link>
      </div>
    );
  }

  const handleFinalSubmit = async () => {
    setSubmitting(true);
    try {
      const result = await votingService.submitVote({
        electionId: election.id,
        candidateId: candidate.id,
        positionId: candidate.positionId || 'pos-1'
      });

      addToast('Vote recorded successfully!', 'success');
      setIsModalOpen(false);

      navigate('/vote-success', {
        state: {
          electionName: election.name,
          votedAt: result.votedAt,
          receiptHash: result.receiptHash
        },
        replace: true
      });
    } catch (err) {
      addToast(err.message || 'Failed to submit vote.', 'error');
      setIsModalOpen(false);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 border border-slate-800 shadow-md">
        <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block mb-1">
          Verification Step &bull; Step 2 of 3
        </span>
        <h1 className="text-2xl font-extrabold">Review Ballot Selection</h1>
        <p className="text-slate-300 text-xs mt-1">Carefully confirm your selected candidate before final submission.</p>
      </div>

      {/* Warning Box */}
      <div className="p-4 rounded-2xl bg-amber-50 border-2 border-amber-300 text-amber-900 flex items-start gap-3 shadow-xs">
        <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div className="text-xs space-y-1">
          <strong className="font-bold block">Important Voter Declaration:</strong>
          <p className="leading-relaxed">
            Please verify your selection carefully. Your vote cannot be altered, canceled, or re-cast after final submission.
          </p>
        </div>
      </div>

      {/* Review Details Card */}
      <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-xs space-y-6">
        <div className="border-b border-slate-100 pb-4">
          <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider block mb-1">Contested Election</span>
          <h3 className="text-xl font-bold text-slate-900">{election.name}</h3>
        </div>

        <div className="grid grid-cols-2 gap-4 text-xs">
          <div>
            <span className="text-slate-400 block mb-0.5">Constituency:</span>
            <strong className="text-slate-800 text-sm">{constituencyName}</strong>
          </div>
          <div>
            <span className="text-slate-400 block mb-0.5">Contested Position:</span>
            <strong className="text-slate-800 text-sm">{positionName}</strong>
          </div>
        </div>

        {/* Selected Candidate Card */}
        <div className="bg-blue-50/60 p-5 rounded-2xl border border-blue-200 flex items-center gap-4">
          <img
            src={candidate.photo}
            alt={candidate.name}
            className="w-16 h-16 rounded-xl object-cover border border-blue-300 shadow-xs shrink-0"
          />
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700 bg-blue-100 px-2 py-0.5 rounded border border-blue-200 inline-block mb-1">
              Your Selected Candidate
            </span>
            <h4 className="text-lg font-bold text-slate-900">{candidate.name}</h4>
            <p className="text-xs font-semibold text-blue-600 flex items-center gap-1 mt-0.5">
              <span>{candidate.partyLogo}</span>
              {candidate.partyName} &bull; Symbol: {candidate.symbol}
            </p>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between gap-4">
        <button
          type="button"
          onClick={() => navigate(-1)}
          disabled={submitting}
          className="px-5 py-3 rounded-xl border border-slate-300 font-semibold text-xs text-slate-700 hover:bg-slate-50 transition-colors flex items-center gap-1.5"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Ballot
        </button>

        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="px-8 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md transition-all flex items-center gap-2"
        >
          <CheckCircle2 className="w-4 h-4" />
          Confirm & Cast Vote
        </button>
      </div>

      {/* Confirmation Modal */}
      <ConfirmDialog
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleFinalSubmit}
        title="Submit Official Vote?"
        message={`Are you sure you want to submit your vote for ${candidate.name}? This action is irreversible.`}
        confirmText="Submit Vote"
        cancelText="Review Again"
        type="warning"
        isLoading={submitting}
      />
    </div>
  );
};

export default VoteReview;
