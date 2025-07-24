
import React from 'react';
import SearchBar from './SearchBar';
import { useAuth } from '../hooks/useAuth';
import UserProfileMenu from './UserProfileMenu';

interface HeaderProps {
    searchQuery: string;
    setSearchQuery: (query: string) => void;
}

const AppLogo: React.FC = () => (
    <div className="flex items-center">
        <span className="text-white text-2xl font-bold tracking-tighter">
            <span className="text-sky-400">7</span>App Hub
        </span>
    </div>
);

const HelpIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.546-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);


const Header: React.FC<HeaderProps> = ({ searchQuery, setSearchQuery }) => {
  const { currentUser, openAuthModal } = useAuth();
  
  return (
    <header className="bg-slate-800 sticky top-0 z-40 shadow-md">
      <div className="container mx-auto px-2 sm:px-4">
        <div className="flex items-center justify-between h-16">
            
            <div className="flex items-center gap-4">
                <AppLogo />
            </div>

            <div className="flex-1 flex justify-center px-4 hidden sm:flex">
                <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
            </div>

            <div className="flex items-center gap-2 sm:gap-4">
                 <button className="p-2 rounded-full text-gray-300 hover:bg-slate-700 hover:text-white" aria-label="Help">
                    <HelpIcon className="w-6 h-6"/>
                </button>
                {currentUser ? (
                  <UserProfileMenu />
                ) : (
                  <button 
                    onClick={openAuthModal} 
                    className="border border-slate-500 text-white px-5 py-1.5 rounded-md text-sm font-semibold hover:bg-slate-700 transition-colors"
                  >
                    تسجيل الدخول
                  </button>
                )}
            </div>
        </div>
        <div className="sm:hidden pb-3 px-2">
            <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        </div>
      </div>
    </header>
  );
};

export default Header;
