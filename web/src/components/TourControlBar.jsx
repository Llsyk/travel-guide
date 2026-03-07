import React from 'react';
import { ChevronLeft, ChevronRight, Play, Pause, Square } from 'lucide-react';

const TourControlBar = ({ tourState }) => {
  const {
    isTourActive,
    currentStopIndex,
    tourStops,
    isAutoPlay,
    toggleAutoPlay,
    nextStop,
    previousStop,
    exitTour
  } = tourState;

  if (!isTourActive || !tourStops.length) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[1000] animate-slide-up">
      <div className="bg-white/90 backdrop-blur-md shadow-2xl rounded-full border border-white/20 px-6 py-3 flex items-center space-x-4">
        
        <button 
          onClick={previousStop}
          disabled={currentStopIndex === 0}
          className="p-2 rounded-full hover:bg-gray-100 disabled:opacity-50 disabled:hover:bg-transparent transition-colors"
        >
          <ChevronLeft className="w-6 h-6 text-gray-700" />
        </button>

        <div className="flex flex-col items-center px-4 border-x border-gray-200">
          <button 
            onClick={toggleAutoPlay}
            className={`p-3 rounded-full transition-colors ${isAutoPlay ? 'bg-accent text-white shadow-lg shadow-accent/30' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
          >
            {isAutoPlay ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
          </button>
          <span className="text-[10px] font-medium text-gray-500 mt-1 uppercase tracking-wider">
            Auto
          </span>
        </div>

        <button 
          onClick={nextStop}
          disabled={currentStopIndex === tourStops.length - 1}
          className="p-2 rounded-full hover:bg-gray-100 disabled:opacity-50 disabled:hover:bg-transparent transition-colors"
        >
          <ChevronRight className="w-6 h-6 text-gray-700" />
        </button>

        <button 
          onClick={exitTour}
          className="ml-2 p-2 rounded-full hover:bg-red-50 text-red-500 transition-colors"
          title="Exit Tour"
        >
          <Square className="w-5 h-5" />
        </button>

      </div>
    </div>
  );
};

export default TourControlBar;