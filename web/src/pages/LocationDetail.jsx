import React, { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Compass, Info, Image as ImageIcon, Map as MapIcon, Maximize2, Navigation } from 'lucide-react';
import { MapContainer, TileLayer, Marker, ZoomControl, LayersControl } from 'react-leaflet';
import { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { motion, AnimatePresence } from 'framer-motion';

// Components
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import GalleryModal from '../components/GalleryModal.jsx';
import VirtualTourPanel from '../components/VirtualTourPanel.jsx';
import TourControlBar from '../components/TourControlBar.jsx';
import TourMarkerHighlight from '../components/TourMarkerHighlight.jsx';
import { locations } from '../data/locations.js';
import { useTourController } from '../hooks/useTourController.js';

const LocationDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const mapRef = useRef(null);
  
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  
  const location = locations.find((loc) => loc.id === id);
  const tourState = useTourController(location);

  if (!location) return null;

  // Modern Red Pin Icon
  const customIcon = new Icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/2776/2776067.png',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });

  return (
    <>
      <Helmet>
        <title>{`${location.name} | Myanmar Explorer`}</title>
      </Helmet>

      <div className="min-h-screen bg-[#FDFDFD] text-slate-900">
        <Navbar />

        {/* --- Hero Section: Cinematic & Clear --- */}
        <section className="relative h-[70vh] w-full overflow-hidden">
          <motion.img 
            initial={{ scale: 1.1 }} 
            animate={{ scale: 1 }} 
            transition={{ duration: 1.5 }}
            src={location.thumbnail} 
            className="w-full h-full object-cover" 
            alt={location.name}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          
          <div className="absolute top-10 left-10 z-20">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-white/80 hover:text-white transition-all group bg-black/20 backdrop-blur-md px-4 py-2 rounded-full border border-white/20"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span className="text-xs font-bold uppercase tracking-widest">Back</span>
            </button>
          </div>

          <div className="absolute bottom-16 left-0 w-full px-8 md:px-20">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <span className="text-amber-400 font-black uppercase tracking-[0.3em] text-xs mb-2 block">Featured Destination</span>
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 drop-shadow-lg">{location.name}</h1>
              <p className="text-white/90 text-xl font-light italic max-w-2xl">{location.tagline}</p>
            </motion.div>
          </div>
        </section>

        {/* --- Main Content Split --- */}
        <main className="max-w-7xl mx-auto px-6 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            
            {/* Left: Info and History */}
            <div className="lg:col-span-7 space-y-12">
              <section>
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-8 w-1 bg-amber-500 rounded-full" />
                  <h2 className="text-2xl font-bold tracking-tight">The Story of {location.name}</h2>
                </div>
                <p className="text-slate-600 text-lg leading-relaxed font-light mb-6">
                  {location.history}
                </p>
                <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 italic text-slate-500 leading-relaxed">
                  "{location.description}"
                </div>
              </section>

              {/* Gallery Grid */}
              <section>
                <h3 className="text-xl font-bold mb-8 flex items-center gap-2">
                  <ImageIcon className="w-5 h-5 text-amber-500" /> Captured Moments
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {location.gallery.map((img, i) => (
                    <motion.div 
                      key={i}
                      whileHover={{ scale: 1.02 }}
                      className="aspect-square rounded-2xl overflow-hidden cursor-pointer shadow-sm border border-slate-100"
                      onClick={() => { setSelectedImageIndex(i); setIsGalleryOpen(true); }}
                    >
                      <img src={img} className="w-full h-full object-cover" alt="Gallery" />
                    </motion.div>
                  ))}
                </div>
              </section>
            </div>

            {/* Right: Natural Realistic Map */}
            <div className="lg:col-span-5">
              <div className="sticky top-28 space-y-6">
                <div className="bg-white rounded-[2.5rem] p-4 shadow-2xl shadow-slate-200 border border-slate-100 overflow-hidden">
                  <div className="flex items-center justify-between mb-4 px-4 pt-2">
                    <h3 className="font-bold text-slate-800 flex items-center gap-2">
                      <Navigation className="w-4 h-4 text-blue-500" /> Geographic View
                    </h3>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Natural Satellite</span>
                  </div>
                  
                  {/* --- THE NATURAL MAP --- */}
                  <div className="h-[450px] w-full rounded-[2rem] overflow-hidden relative">
                    <MapContainer
                      center={location.coordinates}
                      zoom={16} // Closer zoom to see pagodas clearly
                      zoomControl={false}
                      className="h-full w-full z-0"
                      ref={mapRef}
                    >
                      {/* Using World Imagery for a natural, clear look at the landscape */}
                      <TileLayer 
                        url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                        attribution='&copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EBP, and the GIS User Community'
                      />
                      {/* Adding a transparent label layer so you can see road names over the satellite */}
                      <TileLayer 
                        url="https://{s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}{r}.png"
                      />
                      
                      <ZoomControl position="bottomright" />
                      {!tourState.isTourActive && (
                        <Marker position={location.coordinates} icon={customIcon} />
                      )}
                      
                      {tourState.isTourActive && location.tourStops?.map((stop, index) => (
                        <TourMarkerHighlight 
                          key={stop.id} 
                          stop={stop} 
                          index={index} 
                          isActive={index === tourState.currentStopIndex} 
                        />
                      ))}
                    </MapContainer>

                    {/* Quick Start Button Overlay */}
                    {!tourState.isTourActive && (
                      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-[1000] w-[85%]">
                   
<button
  onClick={() => navigate(`/explore/${location.id}`)} // Redirects to full screen exploration
  className="w-full bg-amber-500 text-slate-900 py-4 rounded-2xl font-black shadow-xl flex items-center justify-center gap-3 hover:bg-amber-400 transition-all uppercase text-xs tracking-widest"
>
  <Compass className="w-4 h-4" /> Start Exploration
</button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Info Card */}
                <div className="bg-amber-50 p-8 rounded-[2rem] border border-amber-100">
                  <div className="flex items-center gap-3 mb-2">
                    <Info className="w-5 h-5 text-amber-600" />
                    <h4 className="font-bold text-amber-900">Visiting Guide</h4>
                  </div>
                  <p className="text-amber-800/70 text-sm leading-relaxed">
                    The {location.name} is best viewed during the early morning hours to avoid the heat and see the golden architecture in natural sunlight.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </main>

        <Footer />

        <GalleryModal
          isOpen={isGalleryOpen}
          onClose={() => setIsGalleryOpen(false)}
          images={location.gallery}
          initialIndex={selectedImageIndex}
        />

        <AnimatePresence>
          {tourState.isTourActive && (
            <>
              <VirtualTourPanel tourState={tourState} />
              <TourControlBar tourState={tourState} />
            </>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default LocationDetail;