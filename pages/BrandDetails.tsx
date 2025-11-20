import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchBrandDetails } from '../services/geminiService';
import { BrandDetailsData, CarModel } from '../types';
import { useLanguage } from '../App';
import { getText, POPULAR_BRANDS } from '../constants';

export const BrandDetails: React.FC = () => {
  const { brandName } = useParams<{ brandName: string }>();
  const { language } = useLanguage();
  const [data, setData] = useState<BrandDetailsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Find logo from static list if available
  const staticBrandInfo = POPULAR_BRANDS.find(b => b.name.toLowerCase() === brandName?.toLowerCase());

  useEffect(() => {
    if (brandName) {
      setLoading(true);
      setError(null);
      fetchBrandDetails(brandName, language)
        .then(setData)
        .catch(err => setError("Failed to load brand details. Please try again."))
        .finally(() => setLoading(false));
    }
  }, [brandName, language]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        <p className="text-slate-400 animate-pulse">Loading data from Neural Engine...</p>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="text-center py-20">
        <p className="text-red-400 text-xl mb-4">{error}</p>
        <button onClick={() => window.location.reload()} className="text-primary underline">Retry</button>
      </div>
    );
  }

  return (
    <div className="space-y-12 animate-fadeIn">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 to-card border border-slate-800 rounded-3xl p-8 md:p-12 relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center md:items-start">
          {staticBrandInfo && (
             <div className="bg-white/10 p-6 rounded-2xl backdrop-blur-sm">
                <img src={staticBrandInfo.logoUrl} alt={data.name} className="w-32 h-32 object-contain" />
             </div>
          )}
          <div className="space-y-4 text-center md:text-left flex-1">
            <h1 className="text-5xl font-bold text-white">{data.name}</h1>
            <div className="flex flex-wrap justify-center md:justify-start gap-6 text-slate-400">
              <div className="flex flex-col">
                <span className="text-xs uppercase tracking-wider text-slate-500">{getText(language, 'brand.founded')}</span>
                <span className="font-mono">{data.founded}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xs uppercase tracking-wider text-slate-500">{getText(language, 'brand.hq')}</span>
                <span>{data.headquarters}</span>
              </div>
            </div>
            <p className="text-slate-300 leading-relaxed max-w-3xl">
              {data.history}
            </p>
          </div>
        </div>
        {/* Decoration */}
        <div className="absolute -right-20 -bottom-40 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
      </div>

      {/* Models Grid */}
      <div>
        <h2 className="text-3xl font-bold mb-8 pl-4 border-l-4 border-primary">
          {getText(language, 'brand.topModels')}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {data.topModels.map((model, idx) => (
            <ModelCard key={idx} model={model} lang={language} />
          ))}
        </div>
      </div>
    </div>
  );
};

const ModelCard: React.FC<{ model: CarModel, lang: any }> = ({ model, lang }) => {
  return (
    <div className="bg-card border border-slate-800 rounded-xl p-6 hover:border-slate-600 transition-colors group">
      <div className="flex justify-between items-start mb-4">
        <div>
           <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors">{model.name}</h3>
           <span className="text-xs text-slate-500 font-mono">{model.productionYears}</span>
        </div>
        <div className="text-right">
           <span className="block text-2xl font-bold text-primary">{model.horsepower} <span className="text-xs text-slate-500">HP</span></span>
        </div>
      </div>
      
      <div className="space-y-3 text-sm text-slate-300">
        <div className="flex justify-between border-b border-slate-800 pb-2">
          <span className="text-slate-500">{getText(lang, 'brand.specs.acc')}</span>
          <span className="font-mono text-white">{model.acceleration0to100}</span>
        </div>
        <div className="flex justify-between border-b border-slate-800 pb-2">
          <span className="text-slate-500">{getText(lang, 'brand.specs.speed')}</span>
          <span className="font-mono text-white">{model.topSpeed}</span>
        </div>
        <div className="flex justify-between border-b border-slate-800 pb-2">
          <span className="text-slate-500">{getText(lang, 'brand.specs.torque')}</span>
          <span className="font-mono text-white">{model.torque}</span>
        </div>
        <div className="flex justify-between pt-1">
          <span className="text-slate-500">{getText(lang, 'brand.specs.engine')}</span>
          <span className="font-mono text-white text-right">{model.engineType}</span>
        </div>
      </div>
    </div>
  );
};