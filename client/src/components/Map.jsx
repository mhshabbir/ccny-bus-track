import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken = 'YOUR_MAPBOX_ACCESS_TOKEN';

const MapComponent = () => {
    const mapContainerRef = useRef(null);
    const mapRef = useRef(null);
    const [busLocation, setBusLocation] = useState([0, 0]);  // Default coordinates

    // Function to fetch bus data
    const fetchBusData = async () => {
        try {
            const result = await readBusData('1');
            if (result && result.document && result.document.location) {
                setBusLocation([result.document.location.lng, result.document.location.lat]);
            }
        } catch (error) {
            console.error('Failed to fetch bus data:', error);
        }
    };

    // Initialize map
    useEffect(() => {
        const bounds = new mapboxgl.LngLatBounds(
            [-73.960478, 40.812534],  // Southwest coordinates
            [-73.938767, 40.822371]   // Northeast coordinates
        );

        const map = new mapboxgl.Map({
            container: mapContainerRef.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            bounds: bounds,
            fitBoundsOptions: { padding: 20 }  // Adjust padding as needed
        });
        mapRef.current = map;

        map.on('load', () => {
            map.addSource('gps', {
                type: 'geojson',
                data: {
                    type: 'Feature',
                    geometry: {
                        type: 'Point',
                        coordinates: busLocation
                    }
                }
            });
            map.addLayer({
                id: 'gps',
                type: 'symbol',
                source: 'gps',
                layout: {
                    'icon-image': 'rocket-15',  // Ensure you have this icon in your Mapbox style or use a valid icon
                    'icon-size': 1.5
                }
            });
        });

        return () => map.remove();
    }, []);

    // Update bus location on map
    useEffect(() => {
        const interval = setInterval(() => {
            fetchBusData();
        }, 2000);

        return () => clearInterval(interval);
    }, []);

    // Update the map source when busLocation changes
    useEffect(() => {
        if (mapRef.current) {
            mapRef.current.getSource('gps').setData({
                type: 'Feature',
                geometry: {
                    type: 'Point',
                    coordinates: busLocation
                }
            });
            mapRef.current.flyTo({ center: busLocation, speed: 0.5 });
        }
    }, [busLocation]);

    return <div className="map-container" ref={mapContainerRef} style={{ width: '100%', height: '100vh' }} />;
};

export default MapComponent;