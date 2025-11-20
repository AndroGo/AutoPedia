import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../App';
import { TRANSLATIONS, getText } from '../constants';
import { Language } from '../types';

export const Navbar: React.FC = () => {
  const { language, setLanguage } = useLanguage();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path ? "text-primary border-b-2 border-primary" : "text-slate-400 hover:text-slate-100";

  return (
    <nav className="bg-slate-900/80 backdrop-blur-md sticky top-0 z-50 border-b border-slate-800">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
           <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
             <span className="font-bold text-white">A</span>
           </div>
           <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
             AutoPedia
           </span>
        </Link>

        <div className="hidden md:flex items-center gap-6 font-medium">
          <Link to="/" className={isActive('/')}>{getText(language, 'nav.home')}</Link>
          <Link to="/compare" className={isActive('/compare')}>{getText(language, 'nav.compare')}</Link>
          <Link to="/search" className={isActive('/search')}>{getText(language, 'nav.search')}</Link>
        </div>

        <div className="flex items-center gap-2 bg-slate-800 rounded-full p-1">
          {(['en', 'az', 'tr'] as Language[]).map((lang) => (
            <button
              key={lang}
              onClick={() => setLanguage(lang)}
              className={`px-3 py-1 rounded-full text-xs font-bold transition-colors ${
                language === lang 
                ? 'bg-primary text-white shadow-lg' 
                : 'text-slate-400 hover:text-white'
              }`}
            >
              {lang.toUpperCase()}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};