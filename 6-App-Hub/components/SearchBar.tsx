
import React from 'react';

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const SearchIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M21.71 20.29 18 16.61A9 9 0 1 0 16.61 18l3.68 3.68a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.39ZM11 18a7 7 0 1 1 7-7 7 7 0 0 1-7 7Z"/>
    </svg>
);


const SearchBar: React.FC<SearchBarProps> = ({ searchQuery, setSearchQuery }) => {
  return (
    <div className="relative w-full max-w-xl">
      <input
        type="search"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="البحث"
        className="w-full bg-slate-700 border border-transparent text-gray-200 placeholder-gray-400 rounded-full py-2 pr-10 pl-4 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:bg-slate-600 transition-colors"
        aria-label="Search games and apps"
      />
      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
          <SearchIcon className="w-5 h-5 text-gray-400" />
      </div>
    </div>
  );
};

export default SearchBar;
