import React from 'react';
import { Filter } from 'lucide-react';

export const FilterDropdown = ({ value, onChange, options, label = 'Filter' }) => {
  return (
    <div className="relative inline-flex items-center">
      <div className="absolute left-3 text-slate-400 pointer-events-none">
        <Filter className="w-3.5 h-3.5" />
      </div>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pl-8 pr-8 py-2 bg-white border border-slate-300 rounded-lg text-sm font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none cursor-pointer"
      >
        <option value="all">All {label}s</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FilterDropdown;
