import React, { useState, createContext, useContext } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Home } from './pages/Home';
import { BrandDetails } from './pages/BrandDetails';
import { Compare } from './pages/Compare';
import { Search } from './pages/Search';
import { Navbar } from './components/Navbar';
import { Language } from './types';

// Context for Language
interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
}

export const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
});

export const useLanguage = () => useContext(LanguageContext);

// Layout Wrapper
const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-200">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        {children}
      </main>
      <footer className="py-6 text-center text-slate-600 text-sm border-t border-slate-800">
        &copy; {new Date().getFullYear()} AutoPedia. Powered by Gemini 2.5.
      </footer>
    </div>
  );
};

const App: React.FC = () => {
  const [language, setLanguage] = useState<Language>('en');

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      <HashRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/brand/:brandName" element={<BrandDetails />} />
            <Route path="/compare" element={<Compare />} />
            <Route path="/search" element={<Search />} />
          </Routes>
        </Layout>
      </HashRouter>
    </LanguageContext.Provider>
  );
};

export default App;