import React, { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import './Street.css'
import MapComponent from '../components/Map';

function Ccny({token}) {
  const navigate = useNavigate();

  if(!token){
    return <Navigate  to="/" replace={true}/>
  }


  return (
    <>
      <div className="App">
        <div className="input-container">
            <h2 style={{marginTop: '0px'}}>Your current location is City College</h2>
                <div className="CcnyContainer" style={{}}>
                    <div className="streetInfo">
                        <h2>CCNY Campus STATION</h2>
                        <p>2 minutes away</p>
                    </div>
                    <div className="streetInfo">
                        <h2>125 Street STATION</h2>
                        <p>2 minutes away</p>
                    </div>
                    <div className="streetInfo">
                        <h2>145 Street STATION</h2>
                        <p>4 minutes away</p>
                        {/* <MapComponent width='30%'></MapComponent> */}
                    </div>
                </div>
                <div style={{ height: '350px'}}>
                  <MapComponent width='68%'/>
                </div>
            <button style = {{width:'200px', marginLeft:'45%', marginRight:'45%'}} onClick={() => navigate('/home')}>Back to home</button>
        </div>
      </div>
    </>
  )
}

export default Ccny