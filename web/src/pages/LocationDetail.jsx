import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useParams, useNavigate } from 'react-router-dom';
import { MapPin, Play, Pause, ArrowLeft, Volume2, Square } from 'lucide-react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import GalleryModal from '../components/GalleryModal.jsx';
import { locations } from '../data/locations.js';
import { useToast } from '../hooks/use-toast';

const LocationDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  
  // Web Speech API State
  const [speechState, setSpeechState] = useState('stopped'); // 'stopped', 'playing', 'paused'
  const [isSpeechSupported, setIsSpeechSupported] = useState(true);

  const location = locations.find((loc) => loc.id === id);

  useEffect(() => {
    // Check if Web Speech API is supported
    if (!('speechSynthesis' in window)) {
      setIsSpeechSupported(false);
    }

    // Cleanup function to stop audio when component unmounts
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  if (!location) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Location not found</h1>
          <button
            onClick={() => navigate('/')}
            className="text-accent hover:underline"
          >
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

  const handlePlayPauseAudio = () => {
    if (!isSpeechSupported) {
      toast({
        title: "Not Supported",
        description: "Text-to-speech is not supported in your current browser.",
        variant: "destructive"
      });
      return;
    }

    const synth = window.speechSynthesis;

    if (speechState === 'playing') {
      synth.pause();
      setSpeechState('paused');
    } else if (speechState === 'paused') {
      synth.resume();
      setSpeechState('playing');
    } else {
      // Stopped state - start new utterance
      // Cancel any ongoing speech first just in case
      synth.cancel();
      
      const utterance = new SpeechSynthesisUtterance(location.history);
      
      // Optional: Configure voice settings here
      utterance.rate = 0.9; // Slightly slower for better comprehension
      utterance.pitch = 1;
      
      utterance.onend = () => {
        setSpeechState('stopped');
      };
      
      utterance.onerror = (event) => {
        console.error('SpeechSynthesisUtterance error', event);
        setSpeechState('stopped');
      };

      synth.speak(utterance);
      setSpeechState('playing');
    }
  };

  const handleStopAudio = () => {
    if (isSpeechSupported && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setSpeechState('stopped');
    }
  };

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

      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <Navbar />

        {/* Back Button */}
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
            <img
              src={location.thumbnail}
              alt={location.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          </div>

          <div className="relative z-10 h-full flex items-end">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 w-full">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="flex items-center space-x-2 text-primary mb-4">
                  <MapPin className="w-5 h-5" />
                  <span className="font-medium">Myanmar</span>
                </div>
                <h1 className="text-5xl font-bold text-white mb-4">
                  {location.name}
                </h1>
                <p className="text-xl text-gray-200 italic">
                  {location.tagline}
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* 360° Exploration Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-6">
              360° Exploration
            </h2>
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
              <div className="aspect-video bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                <div className="text-center">
                  <div className="bg-accent/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Volume2 className="w-10 h-10 text-accent" />
                  </div>
                  <p className="text-gray-600 font-medium">360° View Placeholder</p>
                  <p className="text-sm text-gray-500 mt-2">Interactive panorama coming soon</p>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* History Section */}
        <section className="bg-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
                <div className="flex items-center space-x-3">
                  <h2 className="text-3xl font-bold text-gray-800">
                    Historical Insights
                  </h2>
                  {speechState === 'playing' && (
                    <Volume2 className="w-6 h-6 text-accent animate-pulse" />
                  )}
                </div>
                
                <div className="flex items-center space-x-3">
                  <span className="text-sm font-medium text-gray-500 mr-2">
                    {speechState === 'playing' && 'Playing...'}
                    {speechState === 'paused' && 'Paused'}
                    {speechState === 'stopped' && 'Ready to listen'}
                  </span>
                  
                  <button
                    onClick={handlePlayPauseAudio}
                    className="flex items-center space-x-2 bg-accent hover:bg-accent/90 text-white font-medium py-2.5 px-5 rounded-xl transition-all duration-300 hover:shadow-lg"
                  >
                    {speechState === 'playing' ? (
                      <>
                        <Pause className="w-5 h-5" />
                        <span>Pause</span>
                      </>
                    ) : speechState === 'paused' ? (
                      <>
                        <Play className="w-5 h-5" />
                        <span>Resume</span>
                      </>
                    ) : (
                      <>
                        <Play className="w-5 h-5" />
                        <span>Listen</span>
                      </>
                    )}
                  </button>

                  {speechState !== 'stopped' && (
                    <button
                      onClick={handleStopAudio}
                      className="flex items-center justify-center bg-gray-200 hover:bg-gray-300 text-gray-700 p-2.5 rounded-xl transition-all duration-300"
                      aria-label="Stop audio"
                    >
                      <Square className="w-5 h-5 fill-current" />
                    </button>
                  )}
                </div>
              </div>

              <div className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-3xl shadow-lg">
                <p className="text-gray-700 leading-relaxed text-lg">
                  {location.history}
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Image Gallery Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-6">
              Image Gallery
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {location.gallery.map((image, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  className="aspect-square rounded-2xl overflow-hidden shadow-lg cursor-pointer"
                  onClick={() => handleImageClick(index)}
                >
                  <img
                    src={image}
                    alt={`${location.name} gallery image ${index + 1}`}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

       

        <Footer />

        {/* Gallery Modal */}
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

export default LocationDetail;