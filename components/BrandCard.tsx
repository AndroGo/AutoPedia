import React from 'react';
import { Link } from 'react-router-dom';
import { Brand } from '../types';

interface BrandCardProps {
  brand: Brand;
}

export const BrandCard: React.FC<BrandCardProps> = ({ brand }) => {
  return (
    <Link to={`/brand/${brand.name}`}>
      <div className="group bg-card border border-slate-800 rounded-2xl p-6 flex flex-col items-center justify-center gap-4 transition-all duration-300 hover:scale-105 hover:border-primary/50 hover:shadow-[0_0_30px_rgba(59,130,246,0.15)] cursor-pointer h-full">
        <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center p-4 group-hover:bg-white/10 transition-colors">
          <img 
            src={brand.logoUrl} 
            alt={brand.name} 
            className="w-full h-full object-contain drop-shadow-lg"
            loading="lazy"
            onError={(e) => {
               // Fallback if SVG fails or is blocked
               (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${brand.name}&background=random&color=fff`;
            }}
          />
        </div>
        <div className="text-center">
          <h3 className="text-lg font-bold text-white group-hover:text-primary transition-colors">{brand.name}</h3>
          <p className="text-xs text-slate-500 uppercase tracking-wider mt-1">{brand.country}</p>
        </div>
      </div>
    </Link>
  );
};