import React, { useState } from 'react';
// import { Coords125, CoordsCCNY, Coords145 } from './Coordinates';
// import './Street145.module.css';
import './Street.css'
import { useNavigate } from 'react-router-dom';

function Street145() {
  const navigate = useNavigate();
  const [currPage, setCurrPage] = useState('125')

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
        {currPage === '125' &&(
            <>
              <div className="App">
                  <div className='input-container'>
                      <h2>Your current location is 145 Street Station</h2>
                      <div className="Street125Container">
                        <div className="image-container">
                          <img src="https://www.ccny.cuny.edu/sites/default/files/styles/600px_wide/public/2023-06/ColinPowellSchool_CCNY_Economics%26Business_GuestFaculty_DemetriosPapacostasNoPhoto.png?itok=5r-pw_fF" alt="Street 125" />
                          <h2>City College</h2>
                        </div>
                        <h3>8 minutes away</h3>
                      </div>
                      <button onClick={handleHomeClick}>Back to home</button>
                  </div>
              </div>
            </>
        )}
    </>
  )
}

export default Street145