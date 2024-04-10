import React, { useState } from 'react';
import './Street.css'
import { useNavigate } from 'react-router-dom';

function HomePage() {
  const navigate = useNavigate()

  return (
    <>
        <div className="App">
          <div className='input-container'>
              <h2>Please select what location you are at</h2>
              <div className='button-container'>
                <button onClick={() => navigate('/Street125')}>125 Street</button>
                <button onClick={() => navigate('/CCNY')}>CCNY</button>
                <button onClick={() => navigate('/Street145')}>145 Street</button>
              </div>
          </div>
      </div>
    </>
  )
}

export default HomePage