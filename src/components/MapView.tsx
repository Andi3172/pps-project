'use client';

import { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Location } from '@/types';
import { locations, MAP_CENTER, MAP_ZOOM } from '@/data/locations';

// Fix Leaflet default icon paths broken by webpack
delete (L.Icon.Default.prototype as { _getIconUrl?: unknown })._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

interface MapViewProps {
  selectedLocation: Location | null;
  onMarkerClick: (location: Location) => void;
}

/** Creates a custom HTML div icon for a location marker */
function createMarkerIcon(location: Location, isSelected: boolean) {
  const baseClasses = `
    flex items-center justify-center
    text-base font-bold
    rounded-2xl border-2
    shadow-lg
    transition-all duration-200
    select-none
    cursor-pointer
  `;

  const selectedClasses = isSelected
    ? 'border-indigo-600 bg-indigo-500 text-white scale-125 shadow-indigo-400/50 shadow-xl'
    : 'border-white bg-white text-slate-800 hover:scale-110 hover:border-indigo-300';

  const html = `
    <div class="marker-wrapper ${isSelected ? 'marker-selected' : ''}">
      <div class="marker-bubble ${isSelected ? 'selected' : ''}">
        ${location.iconEmoji}
      </div>
      ${isSelected ? '<div class="marker-pulse"></div>' : ''}
    </div>
  `;

  return L.divIcon({
    html,
    className: '',
    iconSize: [44, 44],
    iconAnchor: [22, 22],
    popupAnchor: [0, -22],
  });
}

/** Inner component: renders markers imperatively using Leaflet's JS API */
function MarkersLayer({
  selectedLocation,
  onMarkerClick,
}: {
  selectedLocation: Location | null;
  onMarkerClick: (location: Location) => void;
}) {
  const map = useMap();
  const markersRef = useRef<Record<string, L.Marker>>({});

  useEffect(() => {
    // Clear existing markers
    Object.values(markersRef.current).forEach((m) => m.remove());
    markersRef.current = {};

    // Add fresh markers
    locations.forEach((loc) => {
      const isSelected = selectedLocation?.id === loc.id;
      const icon = createMarkerIcon(loc, isSelected);
      const marker = L.marker(loc.coordinates, { icon });
      marker.on('click', () => onMarkerClick(loc));
      marker.addTo(map);
      markersRef.current[loc.id] = marker;
    });

    return () => {
      Object.values(markersRef.current).forEach((m) => m.remove());
      markersRef.current = {};
    };
  }, [map, selectedLocation, onMarkerClick]);

  return null;
}

/** Pan map to selected location */
function MapFlyTo({ location }: { location: Location | null }) {
  const map = useMap();
  useEffect(() => {
    if (location) {
      map.flyTo(location.coordinates, Math.max(map.getZoom(), 17), {
        animate: true,
        duration: 0.8,
      });
    }
  }, [location, map]);
  return null;
}

export function MapView({ selectedLocation, onMarkerClick }: MapViewProps) {
  return (
    <MapContainer
      center={MAP_CENTER}
      zoom={MAP_ZOOM}
      zoomControl={false}
      style={{ width: '100%', height: '100%' }}
      className="z-0"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        maxZoom={19}
      />
      <MarkersLayer
        selectedLocation={selectedLocation}
        onMarkerClick={onMarkerClick}
      />
      <MapFlyTo location={selectedLocation} />
    </MapContainer>
  );
}
