import React, { useState } from 'react';
import { POPULAR_BRANDS, getText } from '../constants';
import { BrandCard } from '../components/BrandCard';
import { useLanguage } from '../App';
import { Brand } from '../types';

export const Home: React.FC = () => {
  const { language } = useLanguage();
  const [filter, setFilter] = useState<string>('All');

  const categories = ['All', 'German', 'Japanese', 'American', 'Electric', 'Luxury'];

  const filteredBrands = filter === 'All' 
    ? POPULAR_BRANDS 
    : POPULAR_BRANDS.filter(b => b.category === filter || (filter === 'Luxury' && ['Ferrari', 'Lamborghini', 'Porsche'].includes(b.name)));

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="text-center space-y-4 py-12 relative overflow-hidden">
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[100px] -z-10"></div>
         <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-200 to-slate-400">
           {getText(language, 'home.title')}
         </h1>
         <p className="text-xl text-slate-400 max-w-2xl mx-auto">
           {getText(language, 'home.subtitle')}
         </p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap justify-center gap-3">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-6 py-2 rounded-full text-sm font-semibold transition-all ${
              filter === cat 
              ? 'bg-white text-black shadow-lg shadow-white/10' 
              : 'bg-slate-800/50 text-slate-400 hover:bg-slate-800 hover:text-white border border-transparent hover:border-slate-700'
            }`}
          >
            {getText(language, `home.categories.${cat.toLowerCase()}`)}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
        {filteredBrands.map(brand => (
          <BrandCard key={brand.id} brand={brand} />
        ))}
      </div>
    </div>
  );
};