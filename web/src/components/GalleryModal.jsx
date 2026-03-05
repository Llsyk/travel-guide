import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const GalleryModal = ({ isOpen, onClose, images, initialIndex = 0 }) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  useEffect(() => {
    setCurrentIndex(initialIndex);
  }, [initialIndex]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') handlePrevious();
      if (e.key === 'ArrowRight') handleNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, currentIndex]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  if (!isOpen || !images || images.length === 0) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-colors z-10"
          aria-label="Close gallery"
        >
          <X className="w-6 h-6 text-white" />
        </button>

        {/* Previous Button */}
        {images.length > 1 && (
          <button
            onClick={handlePrevious}
            className="absolute left-4 p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-colors z-10"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>
        )}

        {/* Image */}
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.3 }}
          className="max-w-7xl max-h-[90vh] mx-4"
        >
          <img
            src={images[currentIndex]}
            alt={`Gallery image ${currentIndex + 1}`}
            className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
          />
        </motion.div>

        {/* Next Button */}
        {images.length > 1 && (
          <button
            onClick={handleNext}
            className="absolute right-4 p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-colors z-10"
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>
        )}

        {/* Image Counter */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm">
          <span className="text-white text-sm font-medium">
            {currentIndex + 1} / {images.length}
          </span>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default GalleryModal;