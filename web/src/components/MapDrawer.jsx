import React from 'react';
import { useNavigate } from 'react-router-dom';
import { X, MapPin, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const MapDrawer = ({ isOpen, onClose, location }) => {
  const navigate = useNavigate();

  if (!location) return null;

  const handleViewDetails = () => {
    navigate(`/location/${location.id}`);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop - High Z-Index */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[1000]"
          />

          {/* Desktop Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 w-full sm:w-96 bg-white shadow-2xl z-[1100] overflow-y-auto hidden md:block"
          >
            <div className="p-6">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                <X className="w-5 h-5 text-gray-800" />
              </button>

              <div className="mt-8 rounded-2xl overflow-hidden shadow-lg">
                <img
                  src={location.thumbnail}
                  alt={location.name}
                  className="w-full h-56 object-cover"
                />
              </div>

              <div className="mt-6 space-y-4">
                <div className="flex items-center space-x-2 text-red-600">
                  <MapPin className="w-5 h-5" />
                  <span className="text-sm font-medium">Myanmar</span>
                </div>
                <h2 className="text-2xl font-bold text-gray-800">{location.name}</h2>
                <p className="text-gray-600 leading-relaxed">{location.description}</p>
                <p className="text-sm text-gray-400 italic">{location.tagline}</p>

                <button
                  onClick={handleViewDetails}
                  className="w-full mt-6 bg-red-600 hover:bg-red-700 text-white font-medium py-3 px-6 rounded-xl flex items-center justify-center space-x-2 transition-all"
                >
                  <span>View Details</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>

          {/* Mobile Bottom Drawer */}
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed bottom-0 left-0 right-0 bg-white shadow-2xl z-[1100] rounded-t-3xl md:hidden max-h-[85vh] overflow-y-auto"
          >
            <div className="p-6">
              <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto mb-4" />
              <button onClick={onClose} className="absolute top-4 right-4 p-2">
                <X className="w-6 h-6 text-gray-800" />
              </button>
              
              <img
                src={location.thumbnail}
                alt={location.name}
                className="w-full h-48 object-cover rounded-2xl"
              />
              
              <div className="mt-4 space-y-3">
                <h2 className="text-xl font-bold text-gray-800">{location.name}</h2>
                <p className="text-sm text-gray-600">{location.description}</p>
                <button
                  onClick={handleViewDetails}
                  className="w-full mt-4 bg-red-600 text-white py-3 rounded-xl font-medium"
                >
                  View Details
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default MapDrawer;