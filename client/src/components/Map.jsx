import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken = 'YOUR_MAPBOX_ACCESS_TOKEN';

const MapComponent = () => {
    const mapContainerRef = useRef(null);
    const mapRef = useRef(null);
    const [busLocation, setBusLocation] = useState([-73.960478, 40.812534]);  // Default coordinates to NYC

    // Function to fetch bus data
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('http://localhost:5000/api/busData');
            const data = await response.json();
            if (data && data.location) {
                setBusLocation([data.location.lng, data.location.lat]);
            }
        };
    
        const interval = setInterval(fetchData, 3000); // Fetch data every 3 seconds
        return () => clearInterval(interval);
    }, []);

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
            fitBoundsOptions: { padding: 20 }
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
                    'icon-image': 'rocket-15',  // Make sure this icon exists in your Mapbox account
                    'icon-size': 1.5
                }
            });
        });

        return () => map.remove();
    }, []);

    // Update the map source when busLocation changes
    useEffect(() => {
        if (mapRef.current && mapRef.current.getSource('gps')) {
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
