import React, { useState } from 'react';
// import { Coords125, CoordsCCNY, Coords145 } from './Coordinates';
// import './Street125.module.css';
import { useNavigate } from 'react-router-dom';
import './Street.css'

function Ccny() {
  const navigate = useNavigate();
  const [currPage, setCurrPage] = useState('Ccny')

  const handleHomeClick = () => {
    setCurrPage('Home')
    navigate('/Home')
  }

  return (
    <>
        {currPage === 'Home' &&(
          <>
            <Home></Home>
          </>
        )}
        {currPage === 'Ccny' &&(
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
                    <button onClick={handleHomeClick}>Back to home</button>
                </div>
              </div>
            </>
        )}
    </>
  )
}

export default Ccny