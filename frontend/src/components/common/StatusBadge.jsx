import React from 'react';
import { getStatusBadgeColor } from '../../utils/formatters';

export const StatusBadge = ({ status, size = 'md' }) => {
  const colorClass = getStatusBadgeColor(status);
  const sizeClasses = size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-2.5 py-1 text-xs font-semibold';

  return (
    <span
      className={`inline-flex items-center justify-center rounded-full border ${colorClass} ${sizeClasses} capitalize transition-colors`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current mr-1.5 opacity-75"></span>
      {status}
    </span>
  );
};

export default StatusBadge;
