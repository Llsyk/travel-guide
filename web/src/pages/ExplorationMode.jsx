import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, useMap, Polyline } from 'react-leaflet';
import { divIcon } from 'leaflet';
import { ArrowLeft, ChevronRight, Play, Pause, Footprints, BookOpen, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { locations } from '../data/locations.js';

const ExplorationMode = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = locations.find(l => l.id === id);
  
  const [currentStep, setCurrentStep] = useState(0);
  const [prevStep, setPrevStep] = useState(0);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [showHistory, setShowHistory] = useState(false); // Toggle for History Card
  const [timeLeft, setTimeLeft] = useState(5);
  const [isAutoPilot, setIsAutoPilot] = useState(true);
  
  const synth = window.speechSynthesis;

  const currentStop = location?.tourStops[currentStep];

  const togglePlayback = () => {
    if (!isPaused) {
      synth.cancel();
      setIsPaused(true);
    } else {
      setIsPaused(false);
      if (currentStop) speakDescription(currentStop.narration || currentStop.description);
    }
  };

  const speakDescription = (text) => {
    synth.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9;
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => {
      setIsSpeaking(false);
      setTimeLeft(5); 
    };
    synth.speak(utterance);
  };

  useEffect(() => {
    let timer;
    if (isAutoPilot && !isSpeaking && !isPaused && !showHistory) {
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) { handleNext(); return 5; }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isAutoPilot, isSpeaking, isPaused, currentStep, showHistory]);

  const handleNext = () => {
    synth.cancel();
    setShowHistory(false);
    setPrevStep(currentStep);
    setCurrentStep((prev) => (prev + 1) % location.tourStops.length);
    setTimeLeft(5);
    setIsPaused(false); 
  };

  useEffect(() => {
    if (currentStop && !isPaused) {
      speakDescription(currentStop.narration || currentStop.description);
    }
  }, [currentStep]);

  if (!location) return null;

  const walkerIcon = divIcon({
    html: `
      <div class="relative flex items-center justify-center">
        <div class="absolute w-14 h-14 bg-emerald-500/30 rounded-full animate-ping"></div>
        <div class="bg-white p-2 rounded-full border-2 border-emerald-600 shadow-2xl">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#059669" stroke-width="3">
            <circle cx="12" cy="5" r="3"/><path d="M7 21v-4l5-4 3 2 4-2"/>
          </svg>
        </div>
      </div>`,
    className: '', iconSize: [48, 48], iconAnchor: [24, 24]
  });

  return (
    <div className="h-screen w-screen bg-stone-100 relative overflow-hidden text-slate-900 font-sans">
      
      {/* --- Top Bar --- */}
      <div className="absolute top-8 left-8 right-8 z-[1000] flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={() => { synth.cancel(); navigate(-1); }} className="p-4 bg-white/90 backdrop-blur-md rounded-2xl border border-black/5 shadow-xl hover:bg-black hover:text-white transition-all">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div>
            <h1 className="text-2xl font-serif font-bold italic">{location.name}</h1>
            <span className="text-slate-500 text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
               <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" /> Live Site Immersion
            </span>
          </div>
        </div>

        <button 
          onClick={() => setIsAutoPilot(!isAutoPilot)}
          className={`px-6 py-3 rounded-full border-2 font-black text-[10px] uppercase tracking-widest transition-all shadow-lg ${isAutoPilot ? 'bg-emerald-600 border-emerald-600 text-white' : 'bg-white border-slate-200 text-slate-600'}`}
        >
          {isAutoPilot ? 'Auto-Walking On' : 'Manual Control'}
        </button>
      </div>

      {/* --- Map Section --- */}
      <MapContainer center={location.tourStops[0].coordinates} zoom={19} zoomControl={false} className="h-full w-full">
        <TileLayer url="https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}" subdomains={['mt0','mt1','mt2','mt3']} />
        <Polyline positions={location.tourStops.map(s => s.coordinates)} color="#10b981" weight={4} dashArray="1, 10" opacity={0.6} />
        <MovingMarker startCoords={location.tourStops[prevStep].coordinates} endCoords={location.tourStops[currentStep].coordinates} duration={2500} icon={walkerIcon} />
      </MapContainer>

      {/* --- History Overlay Card --- */}
      <AnimatePresence>
        {showHistory && (
          <motion.div 
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            className="absolute bottom-44 left-1/2 -translate-x-1/2 z-[1001] w-[90%] max-w-2xl"
          >
            <div className="bg-white/95 backdrop-blur-3xl border border-emerald-100 rounded-[2.5rem] p-8 shadow-2xl overflow-hidden relative">
                <button 
                    onClick={() => setShowHistory(false)}
                    className="absolute top-6 right-6 p-2 hover:bg-slate-100 rounded-full transition-colors"
                >
                    <X size={20} className="text-slate-400" />
                </button>
                
                <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-emerald-100 rounded-lg text-emerald-700">
                        <BookOpen size={18} />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-emerald-600">Historical Records</span>
                </div>

                <h2 className="text-2xl font-serif font-bold mb-4">{currentStop?.name}</h2>
                <div className="max-h-60 overflow-y-auto pr-4 custom-scrollbar">
                    <p className="text-slate-600 leading-relaxed font-medium first-letter:text-4xl first-letter:font-serif first-letter:mr-2 first-letter:float-left">
                        {currentStop?.history}
                    </p>
                </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- Footer Panel --- */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-[1000] w-[95%] max-w-5xl">
        <div className="bg-white/95 backdrop-blur-3xl border border-black/5 rounded-[3.5rem] p-8 flex flex-col md:flex-row items-center gap-8 shadow-[0_20px_50px_rgba(0,0,0,0.15)]">
          
          {/* Progress / Play Ring */}
          <div className="relative cursor-pointer group shrink-0" onClick={togglePlayback}>
            <svg className="w-24 h-24 transform -rotate-90">
              <circle cx="48" cy="48" r="44" stroke="black" strokeWidth="1" fill="transparent" className="opacity-5" />
              <motion.circle 
                cx="48" cy="48" r="44" stroke="#10b981" strokeWidth="4" fill="transparent"
                strokeDasharray={276}
                animate={{ strokeDashoffset: isPaused || isSpeaking || showHistory ? 0 : 276 - (276 * (5 - timeLeft)) / 5 }}
                transition={{ duration: 1, ease: "linear" }}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              {isPaused ? <Play size={32} className="fill-emerald-600 text-emerald-600" /> : <Pause size={32} className="text-slate-900" />}
            </div>
          </div>

          <div className="flex-grow text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
              <span className="text-emerald-600 text-[10px] font-black uppercase tracking-[0.2em]">Step {currentStep + 1} of {location.tourStops.length}</span>
              <button 
                onClick={() => setShowHistory(!showHistory)}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-bold uppercase transition-all ${showHistory ? 'bg-emerald-600 text-white' : 'bg-emerald-50 text-emerald-700 border border-emerald-100'}`}
              >
                <BookOpen size={12} /> {showHistory ? 'Reading History' : 'View History'}
              </button>
            </div>
            <AnimatePresence mode="wait">
              <motion.div key={currentStep} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <h4 className="text-3xl font-serif font-bold text-slate-900 mb-2 italic line-clamp-1">{currentStop?.name}</h4>
                <p className="text-slate-500 text-sm leading-relaxed line-clamp-2 italic">
                  {currentStop?.description}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          <button 
            onClick={handleNext} 
            className="h-20 px-10 bg-slate-900 text-white rounded-3xl font-black flex flex-col items-center justify-center hover:bg-emerald-600 transition-all active:scale-95 group shadow-xl shrink-0"
          >
            <div className="flex items-center gap-2 text-lg uppercase">
              Next Point <ChevronRight size={20} />
            </div>
            <span className="text-[10px] opacity-40 uppercase tracking-tighter">Skip current stop</span>
          </button>
        </div>
      </div>
    </div>
  );
};

const MovingMarker = ({ startCoords, endCoords, duration, icon }) => {
  const [currentPos, setCurrentPos] = useState(startCoords);
  const map = useMap();

  useEffect(() => {
    let start;
    let frameId;
    const animate = (timestamp) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const lat = startCoords[0] + (endCoords[0] - startCoords[0]) * progress;
      const lng = startCoords[1] + (endCoords[1] - startCoords[1]) * progress;
      const newPos = [lat, lng];
      setCurrentPos(newPos);
      map.panTo(newPos, { animate: false });
      if (progress < 1) frameId = requestAnimationFrame(animate);
    };
    frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, [startCoords, endCoords, duration, map]);

  return <Marker position={currentPos} icon={icon} />;
};

export default ExplorationMode;