
import React from 'react';
import { Sun, Moon, Bird, Home, Info } from 'lucide-react';

interface MenuBarProps {
  isDarkMode: boolean;
  toggleTheme: () => void;
  currentView: 'home' | 'about';
  onViewChange: (view: 'home' | 'about') => void;
}

const MenuBar: React.FC<MenuBarProps> = ({ isDarkMode, toggleTheme, currentView, onViewChange }) => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center p-4">
      <div className="w-full max-w-5xl backdrop-blur-md bg-white/70 dark:bg-[#1a1a1a]/70 border border-zinc-200/50 dark:border-zinc-800/50 rounded-2xl shadow-xl flex items-center justify-between px-6 py-3 transition-all">
        {/* Brand */}
        <div 
          className="flex items-center gap-3 cursor-pointer group"
          onClick={() => onViewChange('home')}
        >
          <div className="p-2 bg-red-600 rounded-lg shadow-lg group-hover:scale-110 transition-transform">
            <Bird className="w-5 h-5 text-white" />
          </div>
          <span className="nero-font font-black uppercase tracking-widest text-xs hidden sm:block dark:text-white">
            Nero
          </span>
        </div>

        {/* Links */}
        <div className="flex items-center gap-1 sm:gap-4">
          <button
            onClick={() => onViewChange('home')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
              currentView === 'home' 
                ? 'bg-zinc-900 text-white dark:bg-white dark:text-black shadow-lg' 
                : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800'
            }`}
          >
            <Home className="w-3 h-3" />
            <span className="hidden xs:block">Home</span>
          </button>
          
          <button
            onClick={() => onViewChange('about')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
              currentView === 'about' 
                ? 'bg-zinc-900 text-white dark:bg-white dark:text-black shadow-lg' 
                : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800'
            }`}
          >
            <Info className="w-3 h-3" />
            <span className="hidden xs:block">About Us</span>
          </button>

          <div className="w-px h-6 bg-zinc-200 dark:bg-zinc-800 mx-2" />

          {/* Theme Toggle */}
          <button 
            onClick={toggleTheme}
            className="p-2 rounded-xl bg-zinc-100 dark:bg-zinc-800/50 hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-400 transition-all active:scale-95"
          >
            {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default MenuBar;
