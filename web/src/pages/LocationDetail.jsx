import React, { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet';
import { useParams, useNavigate } from 'react-router-dom';
import { MapPin, Play, Pause, ArrowLeft, Volume2, Square, Compass } from 'lucide-react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import GalleryModal from '../components/GalleryModal.jsx';
import VirtualTourPanel from '../components/VirtualTourPanel.jsx';
import TourControlBar from '../components/TourControlBar.jsx';
import TourMarkerHighlight from '../components/TourMarkerHighlight.jsx';
import { locations } from '../data/locations.js';
import { useToast } from '../hooks/use-toast';
import { useTourController } from '../hooks/useTourController.js';
const LocationDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const mapRef = useRef(null);
  
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  
  const location = locations.find((loc) => loc.id === id);
  const tourState = useTourController(location);

  useEffect(() => {
    if (tourState.isTourActive && mapRef.current && location?.tourStops?.length) {
      const currentStop = location.tourStops[tourState.currentStopIndex];
      mapRef.current.flyTo(currentStop.coordinates, 16, {
        duration: 1,
        easeLinearity: 0.25
      });
    } else if (!tourState.isTourActive && mapRef.current && location) {
      mapRef.current.flyTo(location.coordinates, 13, { duration: 1 });
    }
  }, [tourState.isTourActive, tourState.currentStopIndex, location]);

  if (!location) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Location not found</h1>
          <button onClick={() => navigate('/')} className="text-accent hover:underline">
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  const customIcon = new Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

  const handleImageClick = (index) => {
    setSelectedImageIndex(index);
    setIsGalleryOpen(true);
  };

  return (
    <>
      <Helmet>
        <title>{`${location.name} - Myanmar Explorer`}</title>
        <meta name="description" content={`${location.description} Explore 360° views, historical insights, and stunning gallery of ${location.name}.`} />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 relative">
        <Navbar />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center space-x-2 text-gray-600 hover:text-accent transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back</span>
          </button>
        </div>

        {/* Hero Section */}
        <section className="relative h-[500px] mt-4">
          <div className="absolute inset-0">
            <img src={location.thumbnail} alt={location.name} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          </div>

          <div className="relative z-10 h-full flex items-end">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 w-full flex flex-col md:flex-row md:items-end justify-between gap-6">
              <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                <div className="flex items-center space-x-2 text-primary mb-4">
                  <MapPin className="w-5 h-5" />
                  <span className="font-medium">Myanmar</span>
                </div>
                <h1 className="text-5xl font-bold text-white mb-4">{location.name}</h1>
                <p className="text-xl text-gray-200 italic">{location.tagline}</p>
              </motion.div>

              {location.tourStops && location.tourStops.length > 0 && !tourState.isTourActive && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.05 }}
                  onClick={tourState.startTour}
                  className="bg-accent hover:bg-accent/90 text-white px-8 py-4 rounded-2xl font-bold shadow-xl shadow-accent/30 flex items-center space-x-3 transition-all"
                >
                  <Compass className="w-6 h-6" />
                  <span>Start Virtual Tour</span>
                </motion.button>
              )}
            </div>
          </div>
        </section>

        {/* Map Section (Moved up for tour visibility) */}
        <section className="bg-white py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="rounded-3xl overflow-hidden shadow-xl h-[60vh] relative">
              <MapContainer
                center={location.coordinates}
                zoom={13}
                style={{ height: '100%', width: '100%' }}
                zoomControl={true}
                ref={mapRef}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                
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
            </div>
          </div>
        </section>

        {/* History Section */}
        <section className="bg-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Historical Insights</h2>
              <div className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-3xl shadow-lg border border-gray-100">
                <p className="text-gray-700 leading-relaxed text-lg">{location.history}</p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Image Gallery Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Image Gallery</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {location.gallery.map((image, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  className="aspect-square rounded-2xl overflow-hidden shadow-lg cursor-pointer"
                  onClick={() => handleImageClick(index)}
                >
                  <img src={image} alt={`${location.name} gallery image ${index + 1}`} className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        <Footer />

        <GalleryModal
          isOpen={isGalleryOpen}
          onClose={() => setIsGalleryOpen(false)}
          images={location.gallery}
          initialIndex={selectedImageIndex}
        />

        {/* Virtual Tour Overlays */}
        <VirtualTourPanel tourState={tourState} />
        <TourControlBar tourState={tourState} />
      </div>
    </>
  );
};

export default LocationDetail;