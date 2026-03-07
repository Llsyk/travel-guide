import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import { divIcon } from 'leaflet';
import { ArrowLeft, Navigation, Volume2, Square, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { locations } from '../data/locations.js';

const ExplorationMode = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = locations.find(l => l.id === id);
  
  const [currentStep, setCurrentStep] = useState(0);
  const [markerPos, setMarkerPos] = useState(null); // The animated position
  const [isSpeaking, setIsSpeaking] = useState(false);
  const synth = window.speechSynthesis;

  // Initialize marker position
  useEffect(() => {
    if (location?.tourStops?.length > 0) {
      setMarkerPos(location.tourStops[0].coordinates);
    }
  }, [location]);

  if (!location) return null;

  // --- SMOOTH MOVEMENT LOGIC ---
  const animateMove = (startCoords, endCoords, duration = 2000) => {
    const startTime = performance.now();

    const step = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Linear interpolation between Lat and Lng
      const lat = startCoords[0] + (endCoords[0] - startCoords[0]) * progress;
      const lng = startCoords[1] + (endCoords[1] - startCoords[1]) * progress;

      setMarkerPos([lat, lng]);

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  };

  // --- AUDIO LOGIC ---
  const speakDescription = (text) => {
    synth.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9;
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    synth.speak(utterance);
  };

  const handleNext = () => {
    const nextStep = (currentStep + 1) % location.tourStops.length;
    const start = location.tourStops[currentStep].coordinates;
    const end = location.tourStops[nextStep].coordinates;

    // 1. Move the marker smoothly
    animateMove(start, end, 2500); // 2.5 seconds walking duration
    
    // 2. Update the data index
    setCurrentStep(nextStep);
    
    // 3. Audio will trigger via the useEffect below
  };

  useEffect(() => {
    const currentStop = location.tourStops[currentStep];
    if (currentStop) {
      speakDescription(`${currentStop.name}. ${currentStop.description || ""}`);
    }
  }, [currentStep]);

  const userIcon = divIcon({
    html: `
      <div class="user-walker flex flex-col items-center">
        <div class="relative">
          <div class="absolute inset-0 bg-blue-500 rounded-full animate-ping opacity-40"></div>
          <div class="w-12 h-12 bg-blue-600 rounded-full border-4 border-white flex items-center justify-center text-white shadow-2xl relative z-10">
             <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><circle cx="12" cy="5" r="3"/><path d="M7 21v-4l5-4 3 2 4-2"/></svg>
          </div>
        </div>
      </div>`,
    className: 'custom-user-icon',
    iconSize: [48, 48],
    iconAnchor: [24, 24]
  });

  return (
    <div className="relative h-screen w-screen bg-[#0a0a0a] overflow-hidden">
      <style>{`
        @keyframes walking {
          0%, 100% { transform: translateY(0) rotate(-2deg); }
          50% { transform: translateY(-12px) rotate(2deg); }
        }
        .user-walker { animation: ${isSpeaking ? 'walking 0.6s infinite ease-in-out' : 'none'}; transition: transform 0.3s; }
      `}</style>

      {/* --- Top Bar --- */}
      <div className="absolute top-8 left-8 z-[1000] flex items-center gap-6">
        <button onClick={() => { synth.cancel(); navigate(-1); }} className="p-4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl text-white">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <div>
          <h2 className="text-amber-500 text-[10px] font-black uppercase tracking-[0.3em]">Tour Guide Active</h2>
          <p className="text-white text-xl font-bold">{location.name}</p>
        </div>
      </div>

      <MapContainer 
        center={location.tourStops[0].coordinates} 
        zoom={18} 
        zoomControl={false}
        className="h-full w-full"
      >
        <TileLayer url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}" />
        <TileLayer url="https://{s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}{r}.png" />
        
        {/* The Moving Marker */}
        {markerPos && <Marker position={markerPos} icon={userIcon} />}
        
        <RecenterMap coords={markerPos} />
      </MapContainer>

      {/* --- Footer Panel --- */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-[1000] w-[95%] max-w-3xl">
        <motion.div className="bg-black/80 backdrop-blur-2xl border border-white/10 p-6 rounded-[2.5rem] flex flex-col md:flex-row items-center gap-6 shadow-2xl">
          <div className="relative">
            <div className="w-24 h-24 rounded-[1.5rem] overflow-hidden border-2 border-amber-500">
              <img src={location.tourStops[currentStep]?.image} className="w-full h-full object-cover" />
            </div>
            {isSpeaking && (
              <div className="absolute -top-2 -right-2 bg-amber-500 p-2 rounded-full animate-bounce">
                <Volume2 className="w-4 h-4 text-black" />
              </div>
            )}
          </div>

          <div className="flex-grow">
             <h3 className="text-white text-2xl font-bold mb-1 italic font-serif">{location.tourStops[currentStep]?.name}</h3>
             <p className="text-white/60 text-sm font-light line-clamp-2">{location.tourStops[currentStep]?.description}</p>
          </div>

          <div className="flex gap-4">
            <button 
                onClick={() => isSpeaking ? synth.cancel() : speakDescription(location.tourStops[currentStep]?.description)}
                className={`p-4 rounded-2xl transition-all ${isSpeaking ? 'bg-amber-500 text-black' : 'bg-white/10 text-white'}`}
            >
              {isSpeaking ? <Square className="w-6 h-6 fill-current" /> : <Volume2 className="w-6 h-6" />}
            </button>
            <button onClick={handleNext} className="bg-white text-black p-4 px-8 rounded-2xl font-bold flex items-center gap-2 hover:bg-amber-500 transition-all">
              Next <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

function RecenterMap({ coords }) {
  const map = useMap();
  useEffect(() => {
    if (coords) {
      map.panTo(coords, { animate: true, duration: 0.5 });
    }
  }, [coords, map]);
  return null;
}

export default ExplorationMode;