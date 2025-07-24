import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';

const UserProfileMenu: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { currentUser, signOut } = useAuth();
    const menuRef = useRef<HTMLDivElement>(null);

    const userInitial = currentUser?.email ? currentUser.email.charAt(0).toUpperCase() : '?';

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    if (!currentUser) return null;

    return (
        <div className="relative" ref={menuRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-10 h-10 rounded-full bg-sky-500 text-white flex items-center justify-center text-xl font-bold focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-white"
                aria-haspopup="true"
                aria-expanded={isOpen}
            >
                {userInitial}
            </button>

            {isOpen && (
                <div className="absolute left-0 mt-2 w-56 origin-top-left bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-50">
                    <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                        <div className="px-4 py-2 border-b border-gray-200">
                            <p className="text-sm text-gray-700" role="none">
                                مسجل الدخول كـ
                            </p>
                            <p className="text-sm font-medium text-gray-900 truncate" role="none">
                                {currentUser.email}
                            </p>
                        </div>
                        <button
                            onClick={signOut}
                            className="w-full text-right block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                            role="menuitem"
                        >
                            تسجيل الخروج
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserProfileMenu;
