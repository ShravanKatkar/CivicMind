import React, { useMemo } from 'react';
import Card from '../../../components/common/Card';
import InteractiveMap from '../../../components/map/InteractiveMap';
import { getDistrictCoordinates } from '../../../data/districtData';

const MapPanel = ({ className, district = 'Mumbai City' }) => {
    // Get coordinates for the selected district (default to Mumbai)
    const centerCoords = useMemo(() => {
        const coords = getDistrictCoordinates(district);
        return [coords.lat, coords.lng];
    }, [district]);

    // Generate mock markers around the district center
    const markers = useMemo(() => {
        const [lat, lng] = centerCoords;
        // Helper to add small random offset
        const offset = () => (Math.random() - 0.5) * 0.04;

        return [
            {
                position: [lat + offset(), lng + offset()],
                type: 'safe',
                title: `Site A - ${district}`,
                description: 'All clear - 8 workers on site'
            },
            {
                position: [lat + offset(), lng + offset()],
                type: 'danger',
                title: `Site B - ${district}`,
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
    }, [centerCoords, district]);

    // Generate mock danger zone
    const dangerZones = useMemo(() => {
        const [lat, lng] = centerCoords;
        // Place danger zone near one of the markers (e.g., slightly offset from center)
        return [
            {
                position: [lat + 0.015, lng - 0.01],
                radius: 200,
                title: 'Gas Leak Zone',
                description: 'Evacuation in progress'
            }
        ];
    }, [centerCoords]);

    return (
        <Card className={`relative overflow-hidden p-0 border border-gray-100 ${className}`}>
            <div className="absolute top-4 left-4 z-10 bg-white/90 backdrop-blur px-4 py-2 rounded-xl shadow-sm">
                <p className="text-xs text-gray-500 font-bold uppercase">Live Site View</p>
                <h3 className="font-bold flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-success animate-pulse"></span>
                    {district} Sites
                </h3>
            </div>

            {/* Interactive Map */}
            <InteractiveMap
                center={centerCoords}
                zoom={12}
                height="100%"
                markers={markers}
                dangerZones={dangerZones}
            />
        </Card>
    );
};

export default MapPanel;

