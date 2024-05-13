import React, { useState } from 'react';
import './Street.css'
import { useNavigate, Navigate } from 'react-router-dom';
import MapComponent from '../components/Map';

function Street145({token}) {
  const navigate = useNavigate();
  const [currPage, setCurrPage] = useState('125')

  const handleHomeClick = () => {
    setCurrPage('Home')
    navigate('/Home')
  }

  if(!token){
    return <Navigate  to="/login" replace={true}/>
  }

  return (
    <>
      <div className="App">
        <div className='input-container'>
          <h2>Your current location is 145 Street Station</h2>
          <div style={{ height: '400px'}} className="Street125Container">
            <div className="image-container" style={{}}>
              <img src="https://www.ccny.cuny.edu/sites/default/files/styles/600px_wide/public/2023-06/ColinPowellSchool_CCNY_Economics%26Business_GuestFaculty_DemetriosPapacostasNoPhoto.png?itok=5r-pw_fF" alt="Street 125" />
              <h2 style={{marginTop: '0px'}}>City College</h2>
            </div>
            <h3 style={{fontSize: '25px', marginRight: '100px'}}>8 minutes away</h3>
            <MapComponent/>
          </div>
          <button style = {{width:'200px', marginLeft:'45%', marginRight:'45%'}} onClick={()=> navigate('/Home')}>Back to home</button>
        </div>
      </div>
    </>
  )
}

export default Street145