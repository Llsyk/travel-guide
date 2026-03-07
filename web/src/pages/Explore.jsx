import 'leaflet/dist/leaflet.css';
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { MapContainer, TileLayer, Marker, ZoomControl } from 'react-leaflet';
import L, { Icon } from 'leaflet';
import Navbar from '../components/Navbar.jsx';
import MapDrawer from '../components/MapDrawer.jsx';
import { locations } from '../data/locations.js';

// Modern Custom Marker with Pulsing Effect (via CSS)
const customIcon = new Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/684/684908.png', // Sleeker pin
  iconSize: [35, 35],
  iconAnchor: [17, 35],
  popupAnchor: [0, -35],
});

const Explore = () => {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

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

      <div className="flex flex-col w-full h-screen overflow-hidden bg-slate-50">
        {/* Floating Glassmorphism Navbar */}
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[2000] w-[95%] max-w-7xl">
          <div className="bg-white/80 backdrop-blur-md shadow-lg border border-white/20 rounded-2xl">
            <Navbar />
          </div>
        </div>

        {/* Map Area */}
        <main className="flex-1 relative w-full h-full z-0">
          <MapContainer
            center={myanmarCenter}
            zoom={6}
            zoomControl={false} // Disabled default to reposition
            scrollWheelZoom={true}
            className="w-full h-full"
            style={{ background: "#f8fafc" }}
          >
            {/* Using a more minimal, "Voyager" style tile layer */}
            <TileLayer
              attribution='&copy; <a href="https://carto.com/">CARTO</a>'
              url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
            />

            <ZoomControl position="bottomright" />

            {locations.map((location) => (
              <Marker
                key={location.id}
                position={location.coordinates}
                icon={customIcon}
                eventHandlers={{
                  click: () => handleMarkerClick(location),
                  mouseover: (e) => e.target.openPopup(), // Hover for quick info
                  mouseout: (e) => e.target.closePopup(),
                }}
              />
            ))}
          </MapContainer>

          {/* Floating Search/Filter Overlay (Optional Design Addition) */}
          <div className="absolute top-24 left-6 z-[1000] hidden md:block">
            <div className="bg-white/90 backdrop-blur-md p-4 rounded-xl shadow-xl border border-slate-200 w-64">
              <h2 className="text-sm font-semibold text-slate-900 mb-2">Discovery Filter</h2>
              <div className="space-y-2">
                <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                  <div className="bg-emerald-500 h-full w-1/3"></div>
                </div>
                <p className="text-[10px] text-slate-500 uppercase tracking-wider font-bold">Showing {locations.length} Destinations</p>
              </div>
            </div>
          </div>
        </main>

        {/* Drawer Component */}
        <MapDrawer
          isOpen={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
          location={selectedLocation}
        />
      </div>

      {/* Global CSS for Leaflet customization */}
      <style dangerouslySetInnerHTML={{ __html: `
        .leaflet-container { font-family: 'Inter', sans-serif; }
        .leaflet-bar { border: none !important; shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1); }
        .leaflet-bar a { border-bottom: 1px solid #f1f5f9 !important; color: #64748b !important; }
        .leaflet-popup-content-wrapper { 
          border-radius: 12px; 
          padding: 4px; 
          box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1); 
        }
      `}} />
    </>
  );
};

export default Explore;