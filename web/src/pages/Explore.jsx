import 'leaflet/dist/leaflet.css';
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L, { Icon } from 'leaflet';
import Navbar from '../components/Navbar.jsx';
import MapDrawer from '../components/MapDrawer.jsx';
import { locations } from '../data/locations.js';

const Explore = () => {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const myanmarCenter = [21.9162, 95.9560];

  const customIcon = new Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

  const handleMarkerClick = (location) => {
    setSelectedLocation(location);
    setIsDrawerOpen(true);
  };

  return (
    <>
      <Helmet>
        <title>Explore Myanmar - Interactive Map</title>
      </Helmet>

      <div className="flex flex-col w-full h-screen overflow-hidden">
        {/* Navbar on top */}
        <div className="z-[1050] relative">
          <Navbar />
        </div>

        {/* Map Area */}
        <div className="flex-1 relative w-full h-full z-0">
          <MapContainer
            center={myanmarCenter}
            zoom={6}
            scrollWheelZoom={true}
            style={{ height: '100%', width: '100%' }}
            zoomControl={true}
          >
            <TileLayer
              attribution='&copy; CARTO'
              url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
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
                  <div className="text-center p-1">
                    <h3 className="font-bold text-gray-800">{location.name}</h3>
                    <p className="text-xs text-gray-500">Click to see details</p>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>

        {/* Drawer moved outside the map container flow to prevent clipping */}
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