import React, { useMemo, useState, useEffect } from 'react';
import Card from '../../../components/common/Card';
import InteractiveMap from '../../../components/map/InteractiveMap';
import { getDistrictCoordinates } from '../../../data/districtData';

const MapPanel = ({ className, district = 'Mumbai City' }) => {
    const [gpsLocation, setGpsLocation] = useState(null);

    // Get real GPS location on mount
    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setGpsLocation([position.coords.latitude, position.coords.longitude]);
                },
                (error) => {
                    console.error("Error getting location:", error);
                }
            );
        }
    }, []);

    // Get coordinates: Prioritize GPS, fallback to District
    const centerCoords = useMemo(() => {
        if (gpsLocation) return gpsLocation;
        const coords = getDistrictCoordinates(district);
        return [coords.lat, coords.lng];
    }, [district, gpsLocation]);

    // Generate mock markers around the center (Real GPS or District)
    const markers = useMemo(() => {
        const [lat, lng] = centerCoords;
        // Helper to add small random offset
        const offset = () => (Math.random() - 0.5) * 0.04;

        const baseMarkers = [
            {
                position: [lat + offset(), lng + offset()],
                type: 'safe',
                title: 'Site A - Operations',
                description: 'All clear - 8 workers on site'
            },
            {
                position: [lat + offset(), lng + offset()],
                type: 'danger',
                title: 'Site B - Alert',
                description: 'High gas level detected',
                time: '10:32 AM'
            },
            {
                position: [lat + offset(), lng + offset()],
                type: 'worker',
                title: 'Worker #1234',
                description: 'Rajesh Kumar - Active'
            },
            {
                position: [lat + offset(), lng + offset()],
                type: 'worker',
                title: 'Worker #5678',
                description: 'Priya Sharma - Patrol'
            },
            {
                position: [lat + offset(), lng + offset()],
                type: 'worker',
                title: 'Worker #9012',
                description: 'Amit Patel - Break'
            }
        ];

        // Add "My Location" marker if GPS is active
        if (gpsLocation) {
            baseMarkers.push({
                position: gpsLocation,
                type: 'worker', // Using worker icon for "Me" for now, or could add custom
                title: 'Your Location',
                description: 'Device GPS'
            });
        }

        return baseMarkers;
    }, [centerCoords, gpsLocation]);

    // Generate mock danger zone relative to center
    const dangerZones = useMemo(() => {
        const [lat, lng] = centerCoords;
        // Simulate a "Heatmap" of high-risk areas
        return [
            {
                position: [lat + 0.015, lng - 0.01],
                radius: 300,
                title: 'Gas Leak Zone',
                description: 'Evacuation in progress',
                color: 'red'
            },
            {
                position: [lat - 0.008, lng + 0.02],
                radius: 150,
                title: 'Unstable Ground',
                description: 'Recent collapse reported',
                color: 'orange'
            },
            {
                position: [lat + 0.005, lng + 0.005],
                radius: 100,
                title: 'Chemical Spill',
                description: 'Containment active',
                color: 'yellow'
            }
        ];
    }, [centerCoords]);

    return (
        <Card className={`relative overflow-hidden p-0 border border-gray-100 ${className}`}>
            <div className="absolute top-4 left-4 z-10 bg-white/90 backdrop-blur px-4 py-2 rounded-xl shadow-sm">
                <p className="text-xs text-gray-500 font-bold uppercase">Live Site View</p>
                <h3 className="font-bold flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-success animate-pulse"></span>
                    {gpsLocation ? 'Live GPS Feed' : `${district} Sites`}
                </h3>
            </div>

            {/* Interactive Map */}
            <InteractiveMap
                center={centerCoords}
                zoom={12}
                height="100%"
                markers={markers}
                dangerZones={dangerZones}
                key={centerCoords.join(',')} // Force re-render on location change to recenter
            />
        </Card>
    );
};

export default MapPanel;
