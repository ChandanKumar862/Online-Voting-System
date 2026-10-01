import React from 'react';
import { Link } from 'react-router-dom';
import { Award, MapPin, ExternalLink, Flag } from 'lucide-react';

export const CandidateCard = ({ candidate }) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
      <div>
        {/* Candidate Header with Photo & Symbol */}
        <div className="relative h-44 bg-slate-100 overflow-hidden">
          <img
            src={candidate.photo}
            alt={candidate.name}
            className="w-full h-full object-cover object-top"
          />
          <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-xs px-2.5 py-1 rounded-full text-xs font-bold shadow-xs border border-slate-200 flex items-center gap-1.5 text-slate-800">
            <span>{candidate.partyLogo}</span>
            <span>{candidate.partyShort}</span>
          </div>
        </div>

        <div className="p-5">
          <div className="mb-2">
            <h3 className="text-base font-bold text-slate-900 line-clamp-1">{candidate.name}</h3>
            <p className="text-xs text-blue-600 font-medium flex items-center gap-1 mt-0.5">
              <Flag className="w-3 h-3" />
              {candidate.partyName} ({candidate.symbol})
            </p>
          </div>

          <div className="space-y-1.5 text-xs text-slate-500 my-4 bg-slate-50 p-3 rounded-xl border border-slate-100">
            <div className="flex items-center gap-2">
              <Award className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span className="truncate">{candidate.positionName}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span className="truncate">{candidate.constituencyName}, {candidate.stateName}</span>
            </div>
          </div>

          <p className="text-slate-600 text-xs line-clamp-2 leading-relaxed">
            {candidate.description}
          </p>
        </div>
      </div>

      <div className="p-4 pt-0">
        <Link
          to={`/candidates/${candidate.id}`}
          className="w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-colors"
        >
          View Full Profile
          <ExternalLink className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
};

export default CandidateCard;
