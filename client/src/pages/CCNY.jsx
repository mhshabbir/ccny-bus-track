import React, { useEffect, useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import MapComponent from '../components/Map';  // Import the MapComponent
import './Street.css';

function Ccny({ token }) {
  const navigate = useNavigate();
  const [busData, setBusData] = useState({ ccny: 0, uptown: 0, downtown: 0 });

  // Function to fetch bus data
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('http://localhost:5000/api/busData');
      const data = await response.json();
      if (data && data.wait) {
        setBusData({ ccny: data.wait.ccny, uptown: data.wait.uptown, downtown: data.wait.downtown });
      }
    };

    const interval = setInterval(fetchData, 3000); // Fetch data every 3 seconds
    return () => clearInterval(interval);
  }, []);

  if (!token) {
    return <Navigate to="/" replace={true} />;
  }

  return (
    <>
      <div className="App">
        <div className="input-container">
          <h2>Map Tracker</h2>
          <div className="CcnyContainer">
            <div className="streetInfo">
              <h2>CCNY Campus STATION</h2>
              <p>{busData.ccny} minutes away</p>
            </div>
            <div className="streetInfo">
              <h2>125 Street STATION</h2>
              <p>{busData.uptown} minutes away</p>
            </div>
            <div className="streetInfo">
              <h2>145 Street STATION</h2>
              <p>{busData.downtown} minutes away</p>
            </div>
          </div>
          {/* Map component embedded */}
          <div className="mapBox">
            <MapComponent />
          </div>
          <button onClick={() => navigate('/home')}>Back to home</button>
        </div>
      </div>
    </>
  );
}

export default Ccny;
