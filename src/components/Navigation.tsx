import React from 'react';
import { FlagIcon, UserIcon, HomeIcon } from 'lucide-react';
interface NavigationProps {
  currentView: string;
  navigateTo: (view: string) => void;
  currentUser: any;
  onLogout: () => void;
}
export function Navigation({
  currentView,
  navigateTo,
  currentUser,
  onLogout
}: NavigationProps) {
  return <nav className="bg-red-600 text-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-2">
            <FlagIcon className="w-6 h-6" />
            <span className="text-xl font-bold">F1 Quiz Master</span>
          </div>
          <div className="flex items-center space-x-6">
            <button onClick={() => navigateTo('home')} className={`flex items-center space-x-1 ${currentView === 'home' ? 'font-bold border-b-2 border-white' : ''}`}>
              <HomeIcon className="w-5 h-5" />
              <span>Home</span>
            </button>
            {currentUser && <button onClick={() => navigateTo('profile')} className={`flex items-center space-x-1 ${currentView === 'profile' ? 'font-bold border-b-2 border-white' : ''}`}>
                <UserIcon className="w-5 h-5" />
                <span>Profile</span>
              </button>}
            {currentUser ? <div className="flex items-center space-x-4">
                <span>Hello, {currentUser.username}</span>
                <button onClick={onLogout} className="bg-white text-red-600 px-3 py-1 rounded-md hover:bg-gray-100">
                  Logout
                </button>
              </div> : null}
          </div>
        </div>
      </div>
    </nav>;
}