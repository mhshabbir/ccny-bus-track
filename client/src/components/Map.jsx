import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.mapboxAccessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;
mapboxgl.mapboxAccessToken = "pk.eyJ1IjoiZXh0YXN5MTIzIiwiYSI6ImNsdHRrYXEwaDB0bmQya3BlZzUzNWNucWQifQ.i-4dUpV8L9VDTd1bsJYIFw"

const MapComponent = () => {
    const mapContainerRef = useRef(null); // This ref attaches to the map container div
    const mapRef = useRef(null); // Ref to hold the Mapbox map instance
    const [busLocation, setBusLocation] = useState([-73.960478, 40.812534]); // Default coordinates to NYC

    // Function to fetch bus data
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('http://localhost:5000/api/busData');
            const data = await response.json();
            if (data && data.location) {
                setBusLocation([data.location.lng, data.location.lat]);
            }
        };
    
        const interval = setInterval(fetchData, 6000); // Fetch data every 3 seconds
        return () => {
            clearInterval(interval);
        };
    }, []);
    

    // Initialize map only once on component mount
    useEffect(() => {
        if (!mapContainerRef.current) return; // Guard clause to ensure the ref is set
    
        const map = new mapboxgl.Map({
            container: mapContainerRef.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: busLocation,
            zoom: 12
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
                    'icon-image': 'rocket-15',
                    'icon-size': 1.5
                }
            });
        });
    
        return () => {
            map.remove();
        };
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
    }, [busLocation]); // Dependency array ensures this effect runs only when busLocation updates

    return (
        <div className="map-container" ref={mapContainerRef} style={{ width: '100%', height: '100vh' }}></div>
    );
};

export default MapComponent;
