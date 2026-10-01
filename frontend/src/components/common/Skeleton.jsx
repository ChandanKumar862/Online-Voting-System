import React from 'react';

export const Skeleton = ({ className = 'h-6 w-full' }) => {
  return <div className={`animate-pulse bg-slate-200 rounded-lg ${className}`} />;
};

export default Skeleton;
