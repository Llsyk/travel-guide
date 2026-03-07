import React, { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Compass, Globe, Clock, Play, Pause, ChevronRight } from 'lucide-react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import { Icon } from 'leaflet';
import { motion, useScroll, useTransform } from 'framer-motion';
import 'leaflet/dist/leaflet.css';

// Components
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import GalleryModal from '../components/GalleryModal.jsx';
import { locations } from '../data/locations.js';

const LocationDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { scrollY } = useScroll();
  const location = locations.find((loc) => loc.id === id);

  // --- State Management ---
  const [isReading, setIsReading] = useState(false);
  const [currentWordIndex, setCurrentWordIndex] = useState(-1);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  // --- Refs for Audio Persistence ---
  const utteranceRef = useRef(null);
  const synth = window.speechSynthesis;

  if (!location) return null;

  // Split history into words for highlighting
  const words = location.history.split(/\s+/);

  // --- Parallax Effects ---
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const customIcon = new Icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/2776/2776067.png',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });

  // --- Speech Initialization & Cleanup ---
  useEffect(() => {
    const msg = new SpeechSynthesisUtterance(location.history);
    
    const setVoice = () => {
      const voices = synth.getVoices();
      // Priority: Female sounding voices
      const femaleVoice = voices.find(v => 
        v.name.includes('Female') || 
        v.name.includes('Google UK English Female') || 
        v.name.includes('Samantha') ||
        v.name.includes('Microsoft Zira')
      );
      if (femaleVoice) msg.voice = femaleVoice;
    };

    setVoice();
    if (synth.onvoiceschanged !== undefined) {
      synth.onvoiceschanged = setVoice;
    }

    msg.rate = 0.9;

    msg.onboundary = (event) => {
      if (event.name === 'word') {
        const textUpToBoundary = location.history.substring(0, event.charIndex);
        const wordCount = textUpToBoundary.trim().split(/\s+/).length;
        setCurrentWordIndex(wordCount);
      }
    };

    msg.onend = () => {
      setIsReading(false);
      setCurrentWordIndex(-1);
    };

    utteranceRef.current = msg;

    return () => {
      synth.cancel(); // Stop talking if user leaves page
    };
  }, [location.history, synth]);

  const toggleSpeech = () => {
    if (isReading) {
      synth.pause();
      setIsReading(false);
    } else {
      if (synth.paused) {
        synth.resume();
      } else {
        synth.cancel(); // Reset any existing processes
        synth.speak(utteranceRef.current);
      }
      setIsReading(true);
    }
  };

  return (
    <>
      <Helmet>
        <title>{`${location.name} | Myanmar Explorer`}</title>
      </Helmet>

      <div className="min-h-screen bg-[#F8F9FA] text-slate-900">
        <Navbar />

        {/* --- 1. HERO SECTION --- */}
        <section className="relative h-screen w-full flex items-end justify-start overflow-hidden bg-black">
          <motion.div style={{ y: y1 }} className="absolute inset-0 z-0">
            <img src={location.thumbnail} className="w-full h-full object-cover opacity-80" alt={location.name} />
            <div className="absolute inset-0 bg-gradient-to-t from-[#F8F9FA] via-transparent to-black/40" />
          </motion.div>

          <div className="relative z-10 p-8 md:p-20 w-full max-w-7xl">
            <motion.button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-white mb-12 hover:gap-4 transition-all group"
            >
              <ArrowLeft className="w-5 h-5 text-amber-500" />
              <span className="text-sm font-bold uppercase tracking-widest">Return to Discovery</span>
            </motion.button>

            <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
              <span className="bg-amber-500 text-black px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-6 inline-block">
                Exclusive Heritage Site
              </span>
              <h1 className="text-7xl md:text-9xl font-serif font-bold text-slate-900 leading-none mb-6">
                {location.name}
              </h1>
              <p className="text-xl md:text-2xl text-slate-700 font-light italic max-w-2xl border-l-4 border-amber-500 pl-8 mt-10">
                {location.tagline}
              </p>
            </motion.div>
          </div>
        </section>

        {/* --- 2. CONTENT SECTION --- */}
        <section className="relative z-20 max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-16 py-32">
          
          {/* Narrative Column */}
          <div className="lg:col-span-7">
            <div className="flex items-center justify-between mb-12">
              <div className="flex items-center gap-4 flex-grow">
                <span className="text-amber-600 font-bold uppercase tracking-widest text-xs">Chronicles</span>
                <div className="h-[1px] flex-grow bg-slate-200" />
              </div>
              
              <button 
                onClick={toggleSpeech}
                className="ml-6 flex items-center gap-2 bg-amber-500 text-white px-6 py-3 rounded-full hover:bg-amber-600 transition-all font-bold text-xs shadow-lg active:scale-95"
              >
                {isReading ? <Pause className="w-4 h-4 text-white" /> : <Play className="w-4 h-4 text-white" />}
                {isReading ? "PAUSE NARRATION" : synth.paused ? "RESUME STORY" : "LISTEN TO HISTORY"}
              </button>
            </div>
            
            <h2 className="text-4xl font-serif mb-10 text-slate-800 leading-tight">
              An Architectural Testament to the <span className="italic text-amber-700">Golden Era.</span>
            </h2>
            
            <div className="prose prose-lg text-slate-600 font-light leading-relaxed mb-16">
              <div className="flex flex-wrap">
                {words.map((word, idx) => (
                  <motion.span
                    key={idx}
                    animate={{ 
                      backgroundColor: idx === currentWordIndex ? "#f59e0b" : "transparent",
                      color: idx === currentWordIndex ? "#ffffff" : "inherit",
                      scale: idx === currentWordIndex ? 1.05 : 1
                    }}
                    className="rounded-sm px-0.5 transition-all duration-200 inline-block mr-1.5 mb-1"
                  >
                    {word}
                  </motion.span>
                ))}
              </div>
            </div>
          </div>

          {/* Interactive Travel Kit Column */}
          <div className="lg:col-span-5">
            <div className="sticky top-32 space-y-8">
              
              {/* Virtual Tour / Map Card */}
              <div className="bg-white p-6 rounded-[3rem] shadow-2xl border border-slate-100 overflow-hidden group">
                <div className="flex items-center gap-3 mb-6 px-2">
                  <Globe className="w-5 h-5 text-blue-500" />
                  <h3 className="font-bold text-slate-800 uppercase tracking-tighter">Location Insight</h3>
                </div>

                <div className="h-72 w-full rounded-[2rem] overflow-hidden relative shadow-inner">
                  <MapContainer
                    center={location.coordinates}
                    zoom={15}
                    zoomControl={false}
                    className="h-full w-full"
                  >
                    <TileLayer url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}" />
                    <Marker position={location.coordinates} icon={customIcon} />
                  </MapContainer>
                  
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-all pointer-events-none" />
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-[90%]">
                    <button
                      onClick={() => navigate(`/explore/${location.id}`)}
                      className="w-full bg-white/95 backdrop-blur-md text-slate-900 py-4 rounded-2xl font-black shadow-xl flex items-center justify-center gap-2 hover:bg-amber-500 hover:text-white transition-all text-[10px] tracking-[0.2em]"
                    >
                      START VIRTUAL TOUR <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Quick Insight Card */}
              <div className="bg-slate-900 text-white p-10 rounded-[3rem] shadow-2xl relative overflow-hidden">
                 <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-6">
                    <Clock className="w-5 h-5 text-amber-400" />
                    <h4 className="font-bold uppercase tracking-widest text-xs text-amber-400">Visiting Insight</h4>
                  </div>
                  <p className="text-slate-400 text-lg font-light leading-relaxed mb-8">
                    {location.description}
                  </p>
                  <div className="pt-8 border-t border-white/10 flex justify-between items-center">
                    <span className="text-xs text-slate-500 uppercase tracking-widest">Entry status</span>
                    <span className="text-emerald-400 font-bold flex items-center gap-2 text-xs">
                      <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" /> OPEN TO PUBLIC
                    </span>
                  </div>
                </div>
                <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-amber-500/10 rounded-full blur-3xl" />
              </div>

            </div>
          </div>
        </section>

        {/* --- 3. GALLERY SECTION --- */}
        <section className="bg-white py-32 px-6">
          <div className="max-w-7xl mx-auto text-center mb-20">
            <h2 className="text-5xl font-serif mb-4 text-slate-900">The Visual Treasury</h2>
            <p className="text-slate-500 uppercase tracking-[0.4em] text-[10px] font-black">Scroll to witness the architecture</p>
          </div>
          
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-4">
            {location.gallery.map((img, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 0.98 }}
                className={`cursor-pointer overflow-hidden rounded-3xl bg-slate-100 ${
                  i === 0 ? 'md:col-span-2 md:row-span-2 h-[600px]' : 
                  i === 1 ? 'md:col-span-2 h-[292px]' : 'h-[292px]'
                }`}
                onClick={() => { setSelectedImageIndex(i); setIsGalleryOpen(true); }}
              >
                <img src={img} className="w-full h-full object-cover transition-all duration-1000 hover:scale-110" alt={`Gallery ${i}`} />
              </motion.div>
            ))}
          </div>
        </section>

        <Footer />

        <GalleryModal
          isOpen={isGalleryOpen}
          onClose={() => setIsGalleryOpen(false)}
          images={location.gallery}
          initialIndex={selectedImageIndex}
        />
      </div>
    </>
  );
};

export default LocationDetail;;