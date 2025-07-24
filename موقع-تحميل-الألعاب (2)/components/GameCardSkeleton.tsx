
import React from 'react';

const GameCardSkeleton: React.FC = () => {
  return (
    <div className="w-full animate-pulse flex flex-col gap-2">
      <div className="aspect-w-1 aspect-h-1 bg-gray-200 rounded-2xl"></div>
      <div className="space-y-2">
        <div className="h-4 bg-gray-200 rounded w-full"></div>
        <div className="h-3 bg-gray-200 rounded w-2/3"></div>
      </div>
    </div>
  );
};

export default GameCardSkeleton;
