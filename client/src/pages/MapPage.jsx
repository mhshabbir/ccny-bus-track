// src/pages/MapPage.jsx
import React, { useEffect, useState } from 'react';
import MapComponent from '../components/Map';
import './MapPage.css'; 

function MapPage() {
    const [waitTimes, setWaitTimes] = useState({ ccny: 0, uptown: 0, downtown: 0 });

    // Function to fetch bus data
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('http://localhost:5000/api/busData');
            const data = await response.json();
            if (data && data.wait) {
                setWaitTimes({
                    ccny: data.wait.ccny,
                    uptown: data.wait.uptown,
                    downtown: data.wait.downtown
                });
            }
        };

        const interval = setInterval(fetchData, 3000); // Fetch data every 3 seconds
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="map-page">
            <h1>Real-Time Bus Tracker</h1>
            <div className="wait-times">
                <div className="wait-info">
                    <h2>CCNY Campus Station</h2>
                    <p>{waitTimes.ccny} minutes away</p>
                </div>
                <div className="wait-info">
                    <h2>125 Street Station</h2>
                    <p>{waitTimes.uptown} minutes away</p>
                </div>
                <div className="wait-info">
                    <h2>145 Street Station</h2>
                    <p>{waitTimes.downtown} minutes away</p>
                </div>
            </div>
            <MapComponent />
        </div>
    );
}

export default MapPage;