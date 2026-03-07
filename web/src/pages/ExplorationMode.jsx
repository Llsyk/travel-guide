import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import { divIcon } from 'leaflet';
import { ArrowLeft, Volume2, Square, ChevronRight, Loader2, Footprints, PlayCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { locations } from '../data/locations.js';

const ExplorationMode = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = locations.find(l => l.id === id);
  
  const [currentStep, setCurrentStep] = useState(0);
  const [markerPos, setMarkerPos] = useState(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [timeLeft, setTimeLeft] = useState(5); // 5 second countdown
  const [isAutoPilot, setIsAutoPilot] = useState(true);
  
  const synth = window.speechSynthesis;
  const timerRef = useRef(null);

  // Initialize marker position
  useEffect(() => {
    if (location?.tourStops?.length > 0) {
      setMarkerPos(location.tourStops[0].coordinates);
    }
    return () => synth.cancel(); // Cleanup on unmount
  }, [location]);

  // --- AUTO NAVIGATION TIMER ---
  useEffect(() => {
    if (isAutoPilot && !isSpeaking) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            handleNext();
            return 5;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [isAutoPilot, isSpeaking, currentStep]);

  if (!location) return null;

  const animateMove = (startCoords, endCoords, duration = 2000) => {
    const startTime = performance.now();
    const step = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const lat = startCoords[0] + (endCoords[0] - startCoords[0]) * progress;
      const lng = startCoords[1] + (endCoords[1] - startCoords[1]) * progress;
      setMarkerPos([lat, lng]);
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  const speakDescription = (text) => {
    synth.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9;
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => {
      setIsSpeaking(false);
      setTimeLeft(5); // Start the 5s countdown after speaking ends
    };
    synth.speak(utterance);
  };

  const handleNext = () => {
    const nextStep = (currentStep + 1) % location.tourStops.length;
    const start = location.tourStops[currentStep].coordinates;
    const end = location.tourStops[nextStep].coordinates;

    animateMove(start, end, 2000);
    setCurrentStep(nextStep);
    setTimeLeft(5);
  };

  useEffect(() => {
    const currentStop = location.tourStops[currentStep];
    if (currentStop) {
      speakDescription(currentStop.description || "");
    }
  }, [currentStep]);

  const userIcon = divIcon({
    html: `
      <div class="user-walker flex flex-col items-center">
        <div class="relative">
          <div class="absolute inset-0 bg-amber-500 rounded-full animate-ping opacity-40"></div>
          <div class="w-12 h-12 bg-slate-900 rounded-full border-4 border-amber-500 flex items-center justify-center text-amber-500 shadow-2xl relative z-10">
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
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-10px) scale(1.1); }
        }
        .user-walker { animation: ${isSpeaking ? 'walking 0.8s infinite ease-in-out' : 'none'}; transition: transform 0.3s; }
      `}</style>

      {/* --- Top Bar --- */}
      <div className="absolute top-8 left-8 right-8 z-[1000] flex items-center justify-between">
        <div className="flex items-center gap-6">
          <button onClick={() => { synth.cancel(); navigate(-1); }} className="p-4 bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl text-white">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div>
            <h2 className="text-amber-500 text-[10px] font-black uppercase tracking-[0.3em] flex items-center gap-2">
              <span className="w-2 h-2 bg-amber-500 rounded-full animate-pulse" />
              Live Immersion Mode
            </h2>
            <p className="text-white text-xl font-bold">{location.name}</p>
          </div>
        </div>

        {/* Auto-Pilot Toggle */}
        <button 
          onClick={() => setIsAutoPilot(!isAutoPilot)}
          className={`px-6 py-3 rounded-full border font-black text-[10px] uppercase tracking-widest transition-all ${isAutoPilot ? 'bg-amber-500 border-amber-500 text-black' : 'bg-white/10 border-white/20 text-white'}`}
        >
          {isAutoPilot ? 'Auto-Pilot On' : 'Manual Control'}
        </button>
      </div>

      <MapContainer 
        center={location.tourStops[0].coordinates} 
        zoom={18} 
        zoomControl={false}
        className="h-full w-full"
      >
        <TileLayer url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}" />
        <TileLayer url="https://{s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}{r}.png" />
        {markerPos && <Marker position={markerPos} icon={userIcon} />}
        <RecenterMap coords={markerPos} />
      </MapContainer>

      {/* --- Footer Panel --- */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-[1000] w-[95%] max-w-4xl">
        <motion.div layout className="bg-slate-900/90 backdrop-blur-2xl border border-white/10 p-8 rounded-[3rem] flex items-center gap-8 shadow-2xl">
          
          {/* NEW SECTION: Journey Progress Radar (Replaces Image) */}
          <div className="relative flex-shrink-0">
            <svg className="w-24 h-24 transform -rotate-90">
              <circle cx="48" cy="48" r="42" stroke="currentColor" strokeWidth="4" fill="transparent" className="text-white/10" />
              <motion.circle 
                cx="48" cy="48" r="42" stroke="currentColor" strokeWidth="4" fill="transparent" className="text-amber-500"
                strokeDasharray={264}
                animate={{ strokeDashoffset: isSpeaking ? 0 : 264 - (264 * (5 - timeLeft)) / 5 }}
                transition={{ duration: 1, ease: "linear" }}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-white font-black text-2xl">{currentStep + 1}</span>
              <span className="text-[8px] text-white/40 uppercase font-bold tracking-tighter">Stop</span>
            </div>
          </div>

          <div className="flex-grow">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <h3 className="text-amber-500 text-[10px] font-black uppercase tracking-[0.3em] mb-2 flex items-center gap-2">
                    <Footprints className="w-4 h-4" /> Destination reached
                  </h3>
                  <h4 className="text-white text-3xl font-serif font-bold mb-2 italic">{location.tourStops[currentStep]?.name}</h4>
                  <p className="text-white/50 text-sm font-light leading-relaxed line-clamp-2">
                    {location.tourStops[currentStep]?.description}
                  </p>
                </motion.div>
              </AnimatePresence>
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex gap-4">
              <button 
                onClick={() => isSpeaking ? synth.cancel() : speakDescription(location.tourStops[currentStep]?.description)}
                className={`w-16 h-16 rounded-2xl transition-all flex items-center justify-center ${isSpeaking ? 'bg-amber-500 text-black animate-pulse' : 'bg-white/5 text-white'}`}
              >
                {isSpeaking ? <Loader2 className="w-6 h-6 animate-spin" /> : <Volume2 className="w-6 h-6" />}
              </button>
              <button onClick={handleNext} className="bg-white text-black h-16 px-8 rounded-2xl font-black flex items-center gap-3 hover:bg-amber-500 transition-all">
                SKIP <ChevronRight className="w-5 h-5" />
              </button>
            </div>
            {/* Auto-timer countdown bar */}
            <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
               <motion.div 
                className="h-full bg-amber-500"
                animate={{ width: isSpeaking ? "100%" : `${((5 - timeLeft) / 5) * 100}%` }}
               />
            </div>
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
      map.flyTo(coords, 18, { animate: true, duration: 1.5 });
    }
  }, [coords, map]);
  return null;
}

export default ExplorationMode;