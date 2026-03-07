import React from 'react';
import { X, Volume2, VolumeX, Play, Pause, Image as ImageIcon } from 'lucide-react';

const VirtualTourPanel = ({ tourState }) => {
  const {
    isTourActive,
    currentStopIndex,
    tourStops,
    speechState,
    exitTour,
    pauseNarration,
    resumeNarration,
    playNarration
  } = tourState;

  if (!isTourActive || !tourStops.length) return null;

  const currentStop = tourStops[currentStopIndex];

  return (
    <div className="fixed bottom-0 left-0 right-0 md:bottom-auto md:top-24 md:right-6 md:left-auto md:w-[400px] z-[1000] animate-slide-up md:animate-slide-right">
      <div className="bg-white/80 backdrop-blur-md shadow-xl rounded-t-2xl md:rounded-2xl border border-white/20 overflow-hidden flex flex-col max-h-[80vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200/50 bg-white/50">
          <div className="flex items-center space-x-2">
            <span className="bg-accent text-white text-xs font-bold px-2 py-1 rounded-full">
              Stop {currentStopIndex + 1} of {tourStops.length}
            </span>
            {speechState === 'playing' && (
              <Volume2 className="w-4 h-4 text-accent animate-pulse" />
            )}
          </div>
          <button onClick={exitTour} className="p-2 hover:bg-gray-200/50 rounded-full transition-colors">
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto p-4 flex-1">
          <div className="relative rounded-xl overflow-hidden mb-4 aspect-video bg-gray-100">
            <img 
              src={currentStop.image} 
              alt={currentStop.name}
              className="w-full h-full object-cover"
            />
          </div>

          <h2 className="text-2xl font-bold text-gray-800 mb-2">{currentStop.name}</h2>
          <p className="text-gray-600 mb-4 leading-relaxed">{currentStop.description}</p>

          <div className="bg-secondary/20 p-4 rounded-xl border border-secondary/30">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-semibold text-gray-700 flex items-center">
                <Volume2 className="w-4 h-4 mr-2" /> Narration
              </h3>
              <button 
                onClick={() => {
                  if (speechState === 'playing') pauseNarration();
                  else if (speechState === 'paused') resumeNarration();
                  else playNarration();
                }}
                className="text-accent hover:text-accent/80 p-1"
              >
                {speechState === 'playing' ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </button>
            </div>
            <p className="text-sm text-gray-600 italic">"{currentStop.narration}"</p>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-gray-200/50 bg-white/50">
          <button className="w-full py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-medium flex items-center justify-center transition-colors">
            <ImageIcon className="w-4 h-4 mr-2" /> View 360° (Coming Soon)
          </button>
        </div>

      </div>
    </div>
  );
};

export default VirtualTourPanel;