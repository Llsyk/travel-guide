import 'leaflet/dist/leaflet.css';
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L, { Icon } from 'leaflet';
import Navbar from '../components/Navbar.jsx';
import MapDrawer from '../components/MapDrawer.jsx';
import { locations } from '../data/locations.js';

const Explore = () => {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Center map on Myanmar
  const myanmarCenter = [21.9162, 95.9560];

  useEffect(() => {
    // Debugging logs as requested
    console.log('Leaflet loaded:', !!L);
    console.log('Locations array:', locations);
    locations.forEach(loc => {
      const isValid = Array.isArray(loc.coordinates) && 
                      loc.coordinates.length === 2 && 
                      !isNaN(loc.coordinates[0]) && 
                      !isNaN(loc.coordinates[1]);
      console.log(`Location: ${loc.name} | Coordinates: [${loc.coordinates}] | Valid: ${isValid}`);
    });
  }, []);

  // Custom marker icon
  const customIcon = new Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

  const handleMarkerClick = (location) => {
    console.log('Marker clicked:', location.name, location.coordinates);
    setSelectedLocation(location);
    setIsDrawerOpen(true);
  };

  return (
    <>
      <Helmet>
        <title>Explore Myanmar - Interactive Map</title>
        <meta name="description" content="Explore Myanmar's iconic destinations on an interactive map. Click on markers to discover Bagan, Shwedagon Pagoda, Inle Lake, and more beautiful locations." />
      </Helmet>

      <div className="flex flex-col w-full h-screen overflow-hidden">
        <div className="z-50 relative">
          <Navbar />
        </div>

        {/* Map Container */}
        <div className="flex-1 relative w-full z-0">
          <MapContainer
            center={myanmarCenter}
            zoom={6}
            scrollWheelZoom={true}
            style={{ height: '100vh', width: '100%' }}
            zoomControl={true}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
              url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
              errorTileUrl="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {locations.map((location) => (
              <Marker
                key={location.id}
                position={location.coordinates}
                icon={customIcon}
                eventHandlers={{
                  click: () => handleMarkerClick(location)
                }}
              >
                <Popup>
                  <div className="text-center">
                    <h3 className="font-bold text-gray-800 mb-1">{location.name}</h3>
                    <p className="text-sm text-gray-600">{location.tagline}</p>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>

          {/* Map Drawer */}
          <MapDrawer
            isOpen={isDrawerOpen}
            onClose={() => setIsDrawerOpen(false)}
            location={selectedLocation}
          />
        </div>
      </div>
    </>
  );
};

export default Explore;