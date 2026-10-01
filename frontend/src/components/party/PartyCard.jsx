import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Calendar, Flag } from 'lucide-react';

export const PartyCard = ({ party }) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-slate-100 border border-slate-200 flex items-center justify-center text-2xl shadow-xs">
              {party.logo}
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">{party.name}</h3>
              <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-100 inline-block mt-0.5">
                {party.shortName}
              </span>
            </div>
          </div>
        </div>

        <p className="text-slate-600 text-xs line-clamp-3 leading-relaxed mb-4">
          {party.description}
        </p>

        <div className="flex items-center gap-4 text-xs text-slate-500 bg-slate-50 p-3 rounded-xl border border-slate-100 mb-6">
          <div>
            <span className="text-slate-400 block text-[10px] uppercase">Symbol</span>
            <strong className="text-slate-700">{party.symbol}</strong>
          </div>
          <div className="h-6 w-px bg-slate-200"></div>
          <div>
            <span className="text-slate-400 block text-[10px] uppercase">Founded</span>
            <strong className="text-slate-700">{party.foundedYear}</strong>
          </div>
        </div>
      </div>

      <Link
        to={`/parties/${party.id}`}
        className="w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold transition-colors"
      >
        View Party & Candidates
        <ChevronRight className="w-3.5 h-3.5" />
      </Link>
    </div>
  );
};

export default PartyCard;
