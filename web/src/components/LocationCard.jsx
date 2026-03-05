import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const LocationCard = ({ location }) => {
  const navigate = useNavigate();

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="bg-white rounded-2xl shadow-xl overflow-hidden cursor-pointer group"
      onClick={() => navigate(`/location/${location.id}`)}
    >
      {/* Image */}
      <div className="relative h-56 overflow-hidden">
        <img
          src={location.thumbnail}
          alt={location.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        <div className="absolute bottom-4 left-4 flex items-center space-x-2 text-white">
          <MapPin className="w-4 h-4" />
          <span className="text-sm font-medium">Myanmar</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-accent transition-colors">
          {location.name}
        </h3>
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">
          {location.description}
        </p>

        {/* Explore Button */}
        <button className="flex items-center space-x-2 text-accent font-medium group-hover:space-x-3 transition-all duration-300">
          <span>Explore</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
};

export default LocationCard;