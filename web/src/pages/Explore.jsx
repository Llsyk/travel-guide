import 'leaflet/dist/leaflet.css';
import React, { useState, useRef } from 'react';
import { Helmet } from 'react-helmet';
import { MapContainer, TileLayer, Marker, ZoomControl, useMap } from 'react-leaflet';
import L, { Icon } from 'leaflet';
import Navbar from '../components/Navbar.jsx';
import MapDrawer from '../components/MapDrawer.jsx';
import { locations } from '../data/locations.js';

// --- Helper Component to handle "Fly To" animation ---
const MapController = ({ target }) => {
  const map = useMap();
  if (target) {
    // Zoom in close (level 16) to see surroundings clearly
    map.flyTo(target.coordinates, 16, {
      duration: 2,
      easeLinearity: 0.25
    });
  }
  return null;
};

const customIcon = new Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/684/684908.png',
  iconSize: [35, 35],
  iconAnchor: [17, 35],
  popupAnchor: [0, -35],
});

const Explore = () => {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [mapMode, setMapMode] = useState('satellite'); // Toggle state

  const myanmarCenter = [21.9162, 95.9560];

  const handleMarkerClick = (location) => {
    setSelectedLocation(location);
    setIsDrawerOpen(true);
  };

  return (
    <>
      <Helmet>
        <title>Explore Myanmar | Interactive Discovery</title>
      </Helmet>

      <div className="flex flex-col w-full h-screen overflow-hidden bg-slate-900">
        {/* Floating Navbar */}
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[2000] w-[95%] max-w-7xl">
          <div className="bg-white/10 backdrop-blur-xl shadow-2xl border border-white/20 rounded-2xl">
            <Navbar />
          </div>
        </div>

        {/* Map Area */}
        <main className="flex-1 relative w-full h-full z-0">
          <MapContainer
            center={myanmarCenter}
            zoom={6}
            zoomControl={false}
            scrollWheelZoom={true}
            className="w-full h-full"
          >
            {/* --- Satellite View (Best for seeing surroundings) --- */}
            {mapMode === 'satellite' ? (
              <TileLayer
                attribution='&copy; Esri'
                url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
              />
            ) : (
              <TileLayer
                attribution='&copy; CARTO'
                url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
              />
            )}

            {/* Labels for Satellite view so you can still see city names */}
            {mapMode === 'satellite' && (
              <TileLayer
                url="https://{s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}{r}.png"
                opacity={0.7}
              />
            )}

            <ZoomControl position="bottomright" />
            <MapController target={selectedLocation} />

            {locations.map((location) => (
              <Marker
                key={location.id}
                position={location.coordinates}
                icon={customIcon}
                eventHandlers={{
                  click: () => handleMarkerClick(location),
                }}
              />
            ))}
          </MapContainer>

          {/* --- MAP MODE TOGGLE --- */}
          <div className="absolute top-24 right-6 z-[1000] flex flex-col gap-2">
            <button 
              onClick={() => setMapMode('satellite')}
              className={`p-3 rounded-xl shadow-xl border transition-all ${mapMode === 'satellite' ? 'bg-emerald-500 border-emerald-400 text-white' : 'bg-white text-slate-600'}`}
            >
              <span className="text-[10px] font-black uppercase tracking-tighter">Satellite</span>
            </button>
            <button 
              onClick={() => setMapMode('street')}
              className={`p-3 rounded-xl shadow-xl border transition-all ${mapMode === 'street' ? 'bg-emerald-500 border-emerald-400 text-white' : 'bg-white text-slate-600'}`}
            >
              <span className="text-[10px] font-black uppercase tracking-tighter">Street</span>
            </button>
          </div>

          {/* Summary Box */}
          <div className="absolute bottom-10 left-6 z-[1000]">
            <div className="bg-slate-900/80 backdrop-blur-md p-4 rounded-2xl shadow-2xl border border-white/10 w-64 text-white">
              <h2 className="text-xs font-bold text-emerald-400 uppercase mb-1">Target Surroundings</h2>
              <p className="text-slate-300 text-sm">
                {selectedLocation ? `Exploring ${selectedLocation.name}` : "Select a marker to see the landscape"}
              </p>
            </div>
          </div>
        </main>

        <MapDrawer
          isOpen={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
          location={selectedLocation}
        />
      </div>
    </>
  );
};

export default Explore;