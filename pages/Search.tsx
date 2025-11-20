import React, { useState } from 'react';
import { searchCars } from '../services/geminiService';
import { SearchResult } from '../types';
import { useLanguage } from '../App';
import { getText } from '../constants';
import { Link } from 'react-router-dom';

export const Search: React.FC = () => {
  const { language } = useLanguage();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    setLoading(true);
    try {
      const data = await searchCars(query, language);
      setResults(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">{getText(language, 'search.title')}</h1>
      </div>

      <form onSubmit={handleSearch} className="relative mb-12">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={getText(language, 'search.placeholder')}
          className="w-full bg-slate-900 border border-slate-700 rounded-full px-6 py-4 pr-32 text-lg text-white focus:border-primary focus:outline-none shadow-lg"
        />
        <button 
          type="submit"
          disabled={loading}
          className="absolute right-2 top-2 bottom-2 bg-primary hover:bg-blue-600 text-white px-8 rounded-full font-bold transition-colors disabled:opacity-70"
        >
          {loading ? '...' : getText(language, 'search.button')}
        </button>
      </form>

      <div className="space-y-4">
        {results.length > 0 && <h2 className="text-slate-500 text-sm uppercase tracking-wider mb-4">{getText(language, 'search.results')}</h2>}
        
        {results.map((res, idx) => (
          <Link 
            to={`/brand/${res.brand}`} 
            key={idx}
            className="block bg-card hover:bg-slate-800 border border-slate-800 rounded-xl p-6 transition-all group"
          >
            <div className="flex justify-between items-start">
              <div>
                <span className="text-xs text-primary font-bold uppercase mb-1 block">{res.brand}</span>
                <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors">{res.model}</h3>
                <p className="text-slate-400 mt-2 text-sm">{res.description}</p>
              </div>
              <div className="text-slate-600 group-hover:text-white transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};