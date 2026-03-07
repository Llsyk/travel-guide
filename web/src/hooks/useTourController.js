import { useState, useEffect, useCallback, useRef } from 'react';

export const useTourController = (location) => {
  const [isTourActive, setIsTourActive] = useState(false);
  const [currentStopIndex, setCurrentStopIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(false);
  const [speechState, setSpeechState] = useState('stopped'); // stopped, playing, paused
  const [volume, setVolume] = useState(1);
  
  const tourStops = location?.tourStops || [];
  const autoPlayTimerRef = useRef(null);
  const synth = window.speechSynthesis;

  const stopNarration = useCallback(() => {
    if (synth) {
      synth.cancel();
      setSpeechState('stopped');
    }
  }, [synth]);

  const playNarration = useCallback((text) => {
    if (!synth) return;
    stopNarration();
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.volume = volume;
    utterance.rate = 0.9;
    
    utterance.onend = () => {
      setSpeechState('stopped');
    };
    
    utterance.onerror = () => {
      setSpeechState('stopped');
    };

    synth.speak(utterance);
    setSpeechState('playing');
  }, [synth, volume, stopNarration]);

  const pauseNarration = useCallback(() => {
    if (synth && speechState === 'playing') {
      synth.pause();
      setSpeechState('paused');
    }
  }, [synth, speechState]);

  const resumeNarration = useCallback(() => {
    if (synth && speechState === 'paused') {
      synth.resume();
      setSpeechState('playing');
    }
  }, [synth, speechState]);

  const startTour = useCallback(() => {
    if (tourStops.length === 0) return;
    setIsTourActive(true);
    setCurrentStopIndex(0);
    playNarration(tourStops[0].narration);
  }, [tourStops, playNarration]);

  const exitTour = useCallback(() => {
    setIsTourActive(false);
    setIsAutoPlay(false);
    stopNarration();
    if (autoPlayTimerRef.current) {
      clearTimeout(autoPlayTimerRef.current);
    }
  }, [stopNarration]);

  const nextStop = useCallback(() => {
    if (currentStopIndex < tourStops.length - 1) {
      const nextIndex = currentStopIndex + 1;
      setCurrentStopIndex(nextIndex);
      playNarration(tourStops[nextIndex].narration);
    } else if (isAutoPlay) {
      setIsAutoPlay(false);
    }
  }, [currentStopIndex, tourStops, isAutoPlay, playNarration]);

  const previousStop = useCallback(() => {
    if (currentStopIndex > 0) {
      const prevIndex = currentStopIndex - 1;
      setCurrentStopIndex(prevIndex);
      playNarration(tourStops[prevIndex].narration);
    }
  }, [currentStopIndex, tourStops, playNarration]);

  const toggleAutoPlay = useCallback(() => {
    setIsAutoPlay(prev => !prev);
  }, []);

  // Handle AutoPlay logic
  useEffect(() => {
    if (isAutoPlay && isTourActive && speechState === 'stopped') {
      autoPlayTimerRef.current = setTimeout(() => {
        nextStop();
      }, 5000);
    }
    return () => {
      if (autoPlayTimerRef.current) {
        clearTimeout(autoPlayTimerRef.current);
      }
    };
  }, [isAutoPlay, isTourActive, speechState, nextStop]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isTourActive) return;
      if (e.key === 'ArrowRight') nextStop();
      if (e.key === 'ArrowLeft') previousStop();
      if (e.key === 'Escape') exitTour();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isTourActive, nextStop, previousStop, exitTour]);

  return {
    isTourActive,
    currentStopIndex,
    isAutoPlay,
    tourStops,
    speechState,
    volume,
    setVolume,
    startTour,
    exitTour,
    nextStop,
    previousStop,
    toggleAutoPlay,
    playNarration: () => playNarration(tourStops[currentStopIndex]?.narration),
    pauseNarration,
    resumeNarration,
    stopNarration
  };
};