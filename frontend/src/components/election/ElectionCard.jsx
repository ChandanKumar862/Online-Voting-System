import React from 'react';
import { Link } from 'react-router-dom';
import StatusBadge from '../common/StatusBadge';
import { formatDate } from '../../utils/formatters';
import { Calendar, MapPin, Users, Vote, ChevronRight } from 'lucide-react';

export const ElectionCard = ({ election, onVoteClick, hasVoted = false }) => {
  const isOngoing = election.status?.toLowerCase() === 'ongoing';

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
      <div>
        <div className="flex items-start justify-between gap-3 mb-3">
          <span className="text-xs font-semibold px-2.5 py-1 bg-slate-100 text-slate-700 rounded-md uppercase tracking-wider">
            {election.type} Election
          </span>
          <StatusBadge status={election.status} />
        </div>

        <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors mb-2">
          {election.name}
        </h3>

        <p className="text-slate-600 text-xs line-clamp-2 mb-4 leading-relaxed">
          {election.description}
        </p>

        <div className="space-y-2 text-xs text-slate-500 mb-6 bg-slate-50 p-3 rounded-xl border border-slate-100">
          <div className="flex items-center gap-2">
            <Calendar className="w-3.5 h-3.5 text-slate-400" />
            <span>
              <strong>Start:</strong> {formatDate(election.startDate)}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-3.5 h-3.5 text-slate-400" />
            <span>
              <strong>End:</strong> {formatDate(election.endDate)}
            </span>
          </div>
          {election.stateName && (
            <div className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-slate-400" />
              <span>
                <strong>Region:</strong> {election.stateName}
              </span>
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
        <Link
          to={`/elections/${election.id}`}
          className="flex-1 text-center py-2 px-3 rounded-lg border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
        >
          View Details
        </Link>
        {isOngoing && (
          hasVoted ? (
            <span className="flex-1 text-center py-2 px-3 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-semibold flex items-center justify-center gap-1">
              ✓ Vote Submitted
            </span>
          ) : (
            <Link
              to={`/vote/${election.id}`}
              className="flex-1 text-center py-2 px-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs transition-colors flex items-center justify-center gap-1"
            >
              <Vote className="w-3.5 h-3.5" />
              Vote Now
            </Link>
          )
        )}
      </div>
    </div>
  );
};

export default ElectionCard;
