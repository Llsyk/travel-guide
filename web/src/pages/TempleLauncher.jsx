import React from 'react';
import { useNavigate } from 'react-router-dom';
import { locations } from '../data/locations';
import { MapPin, Play } from 'lucide-react';

const TempleLauncher = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#050505] text-white p-8">
      <header className="mb-12">
        <h1 className="text-4xl font-serif italic mb-2">Bagan Grand Tour</h1>
        <p className="text-amber-500/80 tracking-[0.2em] uppercase text-xs font-bold">Select your starting point</p>
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
            <h3 className="text-xl font-bold mb-2">{temple.name}</h3>
            <p className="text-white/40 text-sm line-clamp-2 mb-4">{temple.description}</p>
            <div className="flex items-center gap-2 text-amber-500 text-xs font-black uppercase">
              <MapPin className="w-3 h-3" /> Start Tour Here
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TempleLauncher;