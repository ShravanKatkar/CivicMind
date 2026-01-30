import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icons in React-Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom marker icons
const dangerIcon = new L.Icon({
    iconUrl: 'data:image/svg+xml;base64,' + btoa(`
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#DC2626" stroke-width="2.5">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
      <circle cx="12" cy="10" r="3" fill="#DC2626"/>
    </svg>
  `),
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32]
});

const workerIcon = new L.Icon({
    iconUrl: 'data:image/svg+xml;base64,' + btoa(`
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#3B82F6" stroke-width="2.5">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
      <circle cx="12" cy="10" r="3" fill="#3B82F6"/>
    </svg>
  `),
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32]
});

const safeIcon = new L.Icon({
    iconUrl: 'data:image/svg+xml;base64,' + btoa(`
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#10B981" stroke-width="2.5">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
      <circle cx="12" cy="10" r="3" fill="#10B981"/>
    </svg>
  `),
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32]
});

const InteractiveMap = ({
    center = [40.7589, -73.9851],
    zoom = 13,
    markers = [],
    dangerZones = [],
    className = '',
    height = '400px'
}) => {
    return (
        <div className={className} style={{ height, width: '100%', borderRadius: '24px', overflow: 'hidden' }}>
            <MapContainer
                center={center}
                zoom={zoom}
                style={{ height: '100%', width: '100%' }}
                zoomControl={true}
                scrollWheelZoom={true}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {/* Danger Zones (red circles) */}
                {dangerZones.map((zone, index) => (
                    <Circle
                        key={`zone-${index}`}
                        center={zone.position}
                        radius={zone.radius || 200}
                        pathOptions={{
                            fillColor: '#DC2626',
                            fillOpacity: 0.2,
                            color: '#DC2626',
                            weight: 2,
                            opacity: 0.8
                        }}
                    >
                        <Popup>
                            <div className="text-sm">
                                <strong className="text-red-600">{zone.title || 'Danger Zone'}</strong>
                                {zone.description && <p className="mt-1 text-gray-600">{zone.description}</p>}
                            </div>
                        </Popup>
                    </Circle>
                ))}

                {/* Markers */}
                {markers.map((marker, index) => {
                    let icon = safeIcon;
                    if (marker.type === 'danger') icon = dangerIcon;
                    if (marker.type === 'worker') icon = workerIcon;

                    return (
                        <Marker
                            key={`marker-${index}`}
                            position={marker.position}
                            icon={icon}
                        >
                            <Popup>
                                <div className="text-sm">
                                    <strong className="font-bold">{marker.title}</strong>
                                    {marker.description && <p className="mt-1 text-gray-600">{marker.description}</p>}
                                    {marker.time && (
                                        <p className="mt-1 text-xs text-gray-500">{marker.time}</p>
                                    )}
                                </div>
                            </Popup>
                        </Marker>
                    );
                })}
            </MapContainer>
        </div>
    );
};

export default InteractiveMap;
