
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Button from './Button';

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };
  
  const UserIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );

  const StoreIcon = () => (
     <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-500" viewBox="0 0 24 24" fill="currentColor">
        <path d="M9.5 13.09L3.93 18.66c-.44.44-.44 1.15 0 1.59.44.44 1.15.44 1.59 0L11 14.68V20h2v-6.91l.01.01L18.48 7.52c.44-.44.44-1.15 0-1.59s-1.15-.44-1.59 0L11.41 11.4 9.5 13.09zM13.41 4.59c-1.56-1.56-4.09-1.56-5.66 0-1.56 1.56-1.56 4.09 0 5.66l5.66-5.66z" />
    </svg>
  );


  return (
    <header className="bg-white dark:bg-gray-800 shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-3 text-2xl font-bold text-gray-800 dark:text-white">
              <StoreIcon />
              <span>متجر التطبيقات</span>
            </Link>
          </div>
          
          <div className="flex items-center gap-4">
            {user ? (
              <div className="relative group">
                <button className="flex items-center gap-2 p-2 rounded-full bg-gray-200 dark:bg-gray-700">
                  <UserIcon />
                  <span className="hidden sm:inline">{user.name}</span>
                </button>
                <div className="absolute ltr:left-0 rtl:right-auto ltr:right-auto rtl:left-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none group-hover:pointer-events-auto">
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">الملف الشخصي</a>
                  <button
                    onClick={handleLogout}
                    className="w-full text-right block px-4 py-2 text-sm text-red-500 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    تسجيل الخروج
                  </button>
                </div>
              </div>
            ) : (
              <Link to="/login">
                <Button>تسجيل الدخول</Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
