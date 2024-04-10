import React, { useState } from 'react';
import './Street.css'
import { useNavigate } from 'react-router-dom';

function Street125() {
  const navigate = useNavigate();

  return (
    <>
      <div className="App">
        <div className='input-container'>
          <h2>Your current location is 125 Street Station</h2>
          <div className="Street125Container">
            <div className="image-container">
              <img src="https://www.ccny.cuny.edu/sites/default/files/styles/600px_wide/public/2023-06/ColinPowellSchool_CCNY_Economics%26Business_GuestFaculty_DemetriosPapacostasNoPhoto.png?itok=5r-pw_fF" alt="Street 125" />
              <h2>City College</h2>
            </div>
            <h3>4 minutes away</h3>
          </div>
          <button onClick={()=> navigate('/Home')}>Back to home</button>
        </div>
      </div>
    </>
  )
}

export default Street125