import React from 'react';
import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

const TourMarkerHighlight = ({ stop, index, isActive }) => {
  const iconHtml = isActive 
    ? `<div class="marker-pulse w-6 h-6"></div>`
    : `<div class="marker-default w-4 h-4"></div>`;

  const customIcon = L.divIcon({
    html: iconHtml,
    className: 'custom-div-icon',
    iconSize: isActive ? [24, 24] : [16, 16],
    iconAnchor: isActive ? [12, 12] : [8, 8],
    popupAnchor: [0, -12]
  });

  return (
    <Marker position={stop.coordinates} icon={customIcon}>
      <Popup>
        <div className="text-center p-1">
          <span className="text-xs font-bold text-accent mb-1 block">Stop {index + 1}</span>
          <h4 className="font-semibold text-sm">{stop.name}</h4>
        </div>
      </Popup>
    </Marker>
  );
};

export default TourMarkerHighlight;