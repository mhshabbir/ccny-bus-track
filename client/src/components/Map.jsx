import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

const MapComponent = ({width}) => {
    const mapContainerRef = useRef(null); // This ref attaches to the map container div
    const mapRef = useRef(null); // Ref to hold the Mapbox map instance
    const [busLocation, setBusLocation] = useState([-73.960478, 40.812534]); // Default coordinates to NYC
    const [waitTimes, setWaitTimes] = useState({ ccny: 0, uptown: 0, downtown: 0 }); // Store wait times
    // const style = { width: `${width}px` };

    // Function to fetch bus data and wait times
    useEffect(() => {
        // const apiUrl = "https://super-duper-waffle-4q95j7grwwjfjx7r-5000.app.github.dev" // UPDATE THIS WITH ACTUAL ADDRERSS
        const apiUrl = "http://localhost:5174/api/busData"
        const fetchData = async () => {
            try {
                const response = await fetch(apiUrl, {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' }
                });
                const data = await response.json();
                if (data && data.location) {
                    setBusLocation([data.location.lng, data.location.lat]);
                }
                if (data && data.wait) {
                    setWaitTimes({
                        ccny: data.wait.ccny,
                        uptown: data.wait.uptown,
                        downtown: data.wait.downtown
                    });
                }
            } catch (error) {
                console.error("Error fetching data: ", error);
            }
        };

        const interval = setInterval(fetchData, 6000); // Fetch data every 6 seconds
        return () => clearInterval(interval);
    }, []);

    // Initialize map only once on component mount
    useEffect(() => {
        if (!mapContainerRef.current) return;
    
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

    return (
        <div className="map-container">
            {/* <h1>Real-Time Bus Tracker</h1> */}
            {/* <div className="wait-times">
                <p>CCNY Campus Station: {waitTimes.ccny} minutes away</p>
                <p>125 Street Station: {waitTimes.uptown} minutes away</p>
                <p>145 Street Station: {waitTimes.downtown} minutes away</p>
            </div> */}
            <div ref={mapContainerRef} style={{ width: width, height: '300px' }}></div>
        </div>
    );
};

export default MapComponent;
