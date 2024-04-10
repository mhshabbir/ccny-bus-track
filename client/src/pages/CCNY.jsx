import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Street.css'

function Ccny() {
  const navigate = useNavigate();

  return (
    <>
      <div className="App">
        <div className="input-container">
            <h2>You're current location is City College</h2>
                <div className="CcnyContainer">
                    <div className="streetInfo">
                        <h2>125 Street STATION</h2>
                        <p>2 minutes away</p>
                    </div>
                    <div className="streetInfo">
                        <h2>145 Street STATION</h2>
                        <p>4 minutes away</p>
                    </div>
                </div>
            <button onClick={() => navigate('/home')}>Back to home</button>
        </div>
      </div>
    </>
  )
}

export default Ccny