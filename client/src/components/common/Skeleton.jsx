import React from 'react';

export const Skeleton = ({ className = '', variant = 'rectangular' }) => {
  const baseClasses = 'animate-pulse bg-gray-200';
  
  const variants = {
    circular: 'rounded-full',
    rectangular: 'rounded-md',
    text: 'rounded h-4',
  };

  return (
    <div className={`${baseClasses} ${variants[variant]} ${className}`} />
  );
};

export const TableSkeleton = ({ rows = 5, cols = 4 }) => (
  <div className="w-full bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
    <div className="h-12 bg-gray-50 border-b border-gray-100 flex items-center px-6 gap-4">
      {Array(cols).fill(0).map((_, i) => (
        <Skeleton key={`h-${i}`} className="h-4 flex-1" />
      ))}
    </div>
    {Array(rows).fill(0).map((_, i) => (
      <div key={`r-${i}`} className="h-16 border-b border-gray-50 flex items-center px-6 gap-4">
        {Array(cols).fill(0).map((_, j) => (
          <Skeleton key={`c-${i}-${j}`} className="h-4 flex-1" />
        ))}
      </div>
    ))}
  </div>
);

export const CardSkeleton = () => (
  <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex flex-col gap-4">
    <div className="flex items-center justify-between">
      <Skeleton className="h-6 w-32" />
      <Skeleton variant="circular" className="h-10 w-10" />
    </div>
    <Skeleton className="h-8 w-24" />
    <Skeleton className="h-4 w-48 mt-2" />
  </div>
);
