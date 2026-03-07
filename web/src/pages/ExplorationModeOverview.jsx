import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Polyline, useMap } from 'react-leaflet';
import { divIcon } from 'leaflet';
import { ArrowLeft, ChevronRight, Pause, Play, Navigation, Clock, MapPin, Camera, Info, Coffee } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { locations } from '../data/locations';
import { getOptimizedPath } from '../lib/routeEngine';
import 'leaflet/dist/leaflet.css';

// --- Helper: Haversine Distance ---
const getDistanceKm = (c1, c2) => {
  if (!c1 || !c2) return 0;
  const R = 6371; 
  const dLat = (c2[0] - c1[0]) * Math.PI / 180;
  const dLon = (c2[1] - c1[1]) * Math.PI / 180;
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(c1[0] * Math.PI / 180) * Math.cos(c2[0] * Math.PI / 180) * Math.sin(dLon/2) * Math.sin(dLon/2);
  return (R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))).toFixed(2);
};

// --- Component: Moving Car Marker ---
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

const ExplorationModeOverview = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const synth = window.speechSynthesis;

  const tourPath = useMemo(() => getOptimizedPath(locations, id), [id]);
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(0);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [timeLeft, setTimeLeft] = useState(5);

  const currentTemple = tourPath[currentIndex];
  const prevTemple = tourPath[prevIndex];

  const tripStats = useMemo(() => {
    const dist = getDistanceKm(prevTemple.coordinates, currentTemple.coordinates);
    const estMin = Math.ceil(dist * 4); 
    return { dist, estMin };
  }, [currentIndex, prevTemple, currentTemple]);

  const suggestion = useMemo(() => {
    const name = currentTemple.name.toLowerCase();
    if (name.includes("sulaman") || name.includes("htilo")) 
      return { icon: Camera, text: "Golden Hour Photo Spot", color: "text-orange-400" };
    if (currentTemple.history.length > 250) 
      return { icon: Info, text: "Complex Murals Inside", color: "text-blue-400" };
    return { icon: Coffee, text: "Nearby Rest Area", color: "text-emerald-400" };
  }, [currentTemple]);

  useEffect(() => {
    let timer;
    if (!isSpeaking && !isPaused) {
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) { handleNext(); return 5; }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isSpeaking, isPaused, currentIndex]);

  const handleNext = () => {
    synth.cancel();
    setPrevIndex(currentIndex);
    setCurrentIndex((prev) => (prev + 1) % tourPath.length);
    setTimeLeft(5);
  };

  const togglePlayback = () => {
    if (!isPaused) {
      synth.cancel();
      setIsPaused(true);
    } else {
      setIsPaused(false);
      speak(`${currentTemple.name}. ${currentTemple.history}`);
    }
  };

  const speak = (text) => {
    synth.cancel();
    const msg = new SpeechSynthesisUtterance(text);
    msg.onstart = () => setIsSpeaking(true);
    msg.onend = () => setIsSpeaking(false);
    synth.speak(msg);
  };

  useEffect(() => {
    if (currentTemple && !isPaused) {
      speak(`${currentTemple.name}. ${currentTemple.history}`);
    }
  }, [currentIndex]);

  const carIcon = divIcon({
    html: `
      <div class="relative flex items-center justify-center">
        <div class="absolute w-14 h-14 bg-white/40 rounded-full animate-ping"></div>
        <div class="bg-white p-2 rounded-xl border-2 border-black shadow-2xl">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="2.5">
            <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.5 2.8C2.1 10.8 2 11.1 2 11.4V16c0 .6.4 1 1 1h2" />
            <circle cx="7" cy="17" r="2" />
            <path d="M9 17h6" />
            <circle cx="17" cy="17" r="2" />
          </svg>
        </div>
      </div>`,
    className: '', iconSize: [44, 44]
  });

  return (
    <div className="h-screen w-screen bg-stone-100 relative overflow-hidden text-slate-900 font-sans">
      
      {/* Header */}
      <div className="absolute top-8 left-8 z-[1000] flex items-center gap-4">
        <button onClick={() => {synth.cancel(); navigate('/');}} className="p-4 bg-white/90 backdrop-blur-md rounded-2xl border border-black/5 shadow-xl hover:bg-black hover:text-white transition-all">
          <ArrowLeft size={20} />
        </button>
        <div>
          <h1 className="text-2xl font-serif italic font-bold">Bagan Explorer</h1>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-slate-500 text-[10px] font-black uppercase tracking-widest">Natural Satellite View</span>
          </div>
        </div>
      </div>

      {/* Map Section - REMOVED GRAYSCALE, CHANGED TILES */}
      <MapContainer 
        center={tourPath[0].coordinates} 
        zoom={17} 
        zoomControl={false} 
        className="h-full w-full"
      >
        {/* 's' = Satellite Only, 'y' = Satellite + Roads */}
        <TileLayer url="https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}" subdomains={['mt0','mt1','mt2','mt3']} />
        
        {/* Path UI */}
        <Polyline positions={tourPath.map(t => t.coordinates)} color="#ffffff" weight={10} opacity={0.3} />
        <Polyline positions={tourPath.map(t => t.coordinates)} color="#ffffff" weight={3} dashArray="10, 15" />
        
        <MovingMarker 
          startCoords={prevTemple.coordinates} 
          endCoords={currentTemple.coordinates} 
          duration={4000} 
          icon={carIcon} 
        />
      </MapContainer>

      {/* --- Intelligent UI Overlay --- */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-[1000] w-[95%] max-w-6xl space-y-4">
        
        <div className="flex justify-between items-end px-8">
          <motion.div initial={{y:20, opacity:0}} animate={{y:0, opacity:1}} className="flex gap-4 bg-white/95 backdrop-blur-md p-3 rounded-2xl shadow-xl border border-black/5">
            <div className="flex items-center gap-2 px-3 border-r border-slate-200">
              <MapPin size={14} className="text-emerald-600" />
              <span className="text-[11px] font-bold uppercase">{tripStats.dist} km</span>
            </div>
            <div className="flex items-center gap-2 px-3">
              <Clock size={14} className="text-emerald-600" />
              <span className="text-[11px] font-bold uppercase">~{tripStats.estMin} min</span>
            </div>
          </motion.div>

          <motion.div 
            key={currentTemple.id + "-suggestion"} 
            initial={{ scale: 0.8, opacity: 0 }} 
            animate={{ scale: 1, opacity: 1 }} 
            onClick={() => {
              synth.cancel();
              navigate(`/explore/${currentTemple.id}`);
            }}
            className="flex items-center gap-2 bg-emerald-600 text-white px-5 py-2.5 rounded-full cursor-pointer hover:bg-emerald-700 transition-all group shadow-2xl"
          >
            <suggestion.icon size={14} className="group-hover:scale-110 transition-transform" />
            <span className="text-[10px] font-black uppercase tracking-wider">
              Let's explore this temple
            </span>
            <ChevronRight size={12} className="opacity-0 group-hover:opacity-100 -ml-1 transition-all" />
          </motion.div>
        </div>

        {/* Main Dashboard */}
        <div className="bg-white/95 backdrop-blur-3xl border border-black/5 rounded-[3.5rem] p-8 flex flex-col md:flex-row items-center gap-8 shadow-[0_20px_50px_rgba(0,0,0,0.2)]">
          
          <div className="relative cursor-pointer group" onClick={togglePlayback}>
            <svg className="w-24 h-24 transform -rotate-90">
              <circle cx="48" cy="48" r="44" stroke="black" strokeWidth="1" fill="transparent" className="opacity-5" />
              <motion.circle 
                cx="48" cy="48" r="44" stroke="#10b981" strokeWidth="4" fill="transparent"
                strokeDasharray={276}
                animate={{ strokeDashoffset: isPaused || isSpeaking ? 0 : 276 - (276 * (5 - timeLeft)) / 5 }}
                transition={{ duration: 1, ease: "linear" }}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              {isPaused ? <Play size={32} className="fill-emerald-600 text-emerald-600" /> : <Pause size={32} className="text-slate-900" />}
            </div>
          </div>

          <div className="flex-grow text-center md:text-left text-slate-900">
            <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
              <span className="text-emerald-600 text-[10px] font-black uppercase tracking-[0.3em]">Discovery Step {currentIndex + 1}</span>
              {isSpeaking && <motion.div animate={{scaleY: [1, 1.6, 1]}} transition={{repeat: Infinity}} className="flex gap-0.5 h-3"><div className="w-0.5 bg-emerald-500" /><div className="w-0.5 bg-emerald-500" /></motion.div>}
            </div>
            <AnimatePresence mode="wait">
              <motion.div key={currentIndex} initial={{opacity:0, x:-20}} animate={{opacity:1, x:0}} exit={{opacity:0, x:20}}>
                <h3 className="text-4xl font-serif font-bold mb-1 tracking-tight text-slate-900">{currentTemple.name}</h3>
                <p className="text-slate-500 text-sm font-medium italic">"{currentTemple.tagline}"</p>
              </motion.div>
            </AnimatePresence>
          </div>

          <button 
            onClick={handleNext} 
            className="h-20 px-10 bg-slate-900 text-white rounded-3xl font-black flex flex-col items-center justify-center hover:bg-emerald-600 transition-all active:scale-95 group shadow-xl"
          >
            <div className="flex items-center gap-2 text-lg">
              DRIVE TO NEXT <ChevronRight size={20} />
            </div>
            <span className="text-[10px] opacity-50 uppercase tracking-tighter">Next: {tourPath[(currentIndex + 1) % tourPath.length].name}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExplorationModeOverview;