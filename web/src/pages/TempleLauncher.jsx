import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { locations } from '../data/locations';
import { MapPin, Play } from 'lucide-react';

const TempleLauncher = () => {
  const navigate = useNavigate();
  // 1. Add language state
  const [lang, setLang] = useState('en');

  return (
    <div className={`min-h-screen bg-[#050505] text-white p-8 ${lang === 'my' ? 'font-pyidaungsu' : ''}`}>
      
      {/* Language Toggle */}
      <div className="fixed top-8 right-8 z-50 flex gap-2">
        {['en', 'my'].map((l) => (
          <button
            key={l}
            onClick={() => setLang(l)}
            className={`px-3 py-1 rounded-full text-[10px] font-black border transition-all ${
              lang === l ? 'bg-amber-500 border-white text-black' : 'bg-transparent border-amber-500 text-amber-500'
            }`}
          >
            {l.toUpperCase()}
          </button>
        ))}
      </div>

      <header className="mb-12">
        <h1 className="text-4xl font-serif italic mb-2">
          {lang === 'en' ? 'Bagan Grand Tour' : 'ပုဂံခရီးစဉ်အစ'}
        </h1>
        <p className="text-amber-500/80 tracking-[0.2em] uppercase text-xs font-bold">
          {lang === 'en' ? 'Select your starting point' : 'စတင်မည့်နေရာကို ရွေးချယ်ပါ'}
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {locations.map((temple) => (
          <div 
            key={temple.id}
            onClick={() => navigate(`/tour/${temple.id}`)}
            className="group relative bg-white/5 border border-white/10 p-6 rounded-3xl hover:border-amber-500/50 transition-all cursor-pointer overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-100 transition-opacity">
              <Play className="text-amber-500 fill-current w-8 h-8" />
            </div>
            
            {/* Conditional Name and Description */}
            <h3 className="text-xl font-bold mb-2">
              {lang === 'my' ? (temple.nameMy || temple.name) : temple.name}
            </h3>
            <p className="text-white/40 text-sm line-clamp-2 mb-4">
              {lang === 'my' ? (temple.descriptionMy || temple.description) : temple.description}
            </p>

            <div className="flex items-center gap-2 text-amber-500 text-xs font-black uppercase">
              <MapPin className="w-3 h-3" /> 
              {lang === 'en' ? 'Start Tour Here' : 'ဤနေရာမှ စတင်မည်'}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TempleLauncher;