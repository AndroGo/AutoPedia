import React, { useState } from 'react';
import { compareCars } from '../services/geminiService';
import { ComparisonResult } from '../types';
import { useLanguage } from '../App';
import { getText } from '../constants';

export const Compare: React.FC = () => {
  const { language } = useLanguage();
  const [model1, setModel1] = useState('');
  const [model2, setModel2] = useState('');
  const [result, setResult] = useState<ComparisonResult | null>(null);
  const [loading, setLoading] = useState(false);

  const handleCompare = async () => {
    if (!model1 || !model2) return;
    setLoading(true);
    try {
      const data = await compareCars(model1, model2, language);
      setResult(data);
    } catch (error) {
      alert("Error comparing models. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">{getText(language, 'compare.title')}</h1>
      </div>

      {/* Input Section */}
      <div className="grid md:grid-cols-[1fr,auto,1fr] gap-4 items-center bg-card p-8 rounded-2xl border border-slate-800">
        <input 
          type="text" 
          value={model1}
          onChange={(e) => setModel1(e.target.value)}
          placeholder={getText(language, 'compare.placeholder1')}
          className="bg-slate-900 border border-slate-700 rounded-xl px-4 py-4 text-white focus:border-primary focus:outline-none w-full"
        />
        
        <div className="flex justify-center">
           <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center font-bold text-slate-500">
             {getText(language, 'compare.vs')}
           </div>
        </div>

        <input 
          type="text" 
          value={model2}
          onChange={(e) => setModel2(e.target.value)}
          placeholder={getText(language, 'compare.placeholder2')}
          className="bg-slate-900 border border-slate-700 rounded-xl px-4 py-4 text-white focus:border-primary focus:outline-none w-full"
        />
      </div>

      <div className="text-center">
        <button 
          onClick={handleCompare}
          disabled={loading || !model1 || !model2}
          className="bg-primary hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-4 px-12 rounded-full text-lg shadow-lg shadow-blue-900/20 transition-all"
        >
          {loading ? getText(language, 'compare.loading') : getText(language, 'compare.button')}
        </button>
      </div>

      {/* Results Section */}
      {result && (
        <div className="animate-fadeIn space-y-8">
          <div className="grid md:grid-cols-2 gap-8">
             {/* Model 1 Column */}
             <div className="bg-card border-t-4 border-primary rounded-xl p-6 space-y-6">
                <h2 className="text-2xl font-bold text-center">{result.model1.name}</h2>
                <SpecsList model={result.model1} winnerKey={result.winner} isModel1={true} lang={language} />
             </div>

             {/* Model 2 Column */}
             <div className="bg-card border-t-4 border-secondary rounded-xl p-6 space-y-6">
                <h2 className="text-2xl font-bold text-center">{result.model2.name}</h2>
                <SpecsList model={result.model2} winnerKey={result.winner} isModel1={false} lang={language} />
             </div>
          </div>

          {/* Summary */}
          <div className="bg-slate-900 p-8 rounded-2xl border border-slate-800">
            <h3 className="text-xl font-bold text-primary mb-4">Verdict</h3>
            <p className="text-slate-300 leading-relaxed text-lg">{result.summary}</p>
          </div>
        </div>
      )}
    </div>
  );
};

const SpecsList: React.FC<{ model: any, winnerKey: any, isModel1: boolean, lang: any }> = ({ model, winnerKey, isModel1, lang }) => {
  const checkWinner = (category: 'horsepower' | 'acceleration' | 'topSpeed') => {
    const w = winnerKey[category];
    if (w === 'tie') return 'text-slate-300';
    if (isModel1 && w === 'model1') return 'text-green-400 font-bold';
    if (!isModel1 && w === 'model2') return 'text-green-400 font-bold';
    return 'text-slate-500';
  };

  return (
    <div className="space-y-4">
      <SpecRow label={getText(lang, 'brand.specs.hp')} value={`${model.horsepower} hp`} colorClass={checkWinner('horsepower')} />
      <SpecRow label={getText(lang, 'brand.specs.torque')} value={model.torque} colorClass="text-slate-300" />
      <SpecRow label={getText(lang, 'brand.specs.acc')} value={model.acceleration0to100} colorClass={checkWinner('acceleration')} />
      <SpecRow label={getText(lang, 'brand.specs.speed')} value={model.topSpeed} colorClass={checkWinner('topSpeed')} />
      <SpecRow label={getText(lang, 'brand.specs.engine')} value={model.engineType} colorClass="text-slate-300" />
      <SpecRow label="Weight" value={model.weight || 'N/A'} colorClass="text-slate-300" />
    </div>
  );
};

const SpecRow: React.FC<{ label: string, value: string, colorClass: string }> = ({ label, value, colorClass }) => (
  <div className="flex justify-between items-center border-b border-slate-800 pb-2">
    <span className="text-sm text-slate-500">{label}</span>
    <span className={`text-lg font-mono ${colorClass}`}>{value}</span>
  </div>
);