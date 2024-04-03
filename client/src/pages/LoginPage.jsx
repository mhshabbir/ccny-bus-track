import React, { useState } from 'react';
import { Coords125, CoordsCCNY, Coords145 } from '../components/Coordinates';
import Login from '../components/Login';
import './LoginPage.css';



const LoginPage = () => {
    

    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [coordinates, setCoordinates] = useState('')
    const [selectedStop, setSelectedStop] = useState('')
    const [registerPage, setRegisterPage] = useState(false)

    const handleClick = (busStop) => {
    if (busStop === '125 Street') {
    setCoordinates(`Latitude: ${Coords125.lat}, Longitude: ${Coords125.lng}`)
    } else if (busStop === '145 Street') {
    setCoordinates(`Latitude: ${Coords145.lat}, Longitude: ${Coords145.lng}`)
    }
    else {
    setCoordinates(`Latitude: ${CoordsCCNY.lat}, Longitude: ${CoordsCCNY.lng}`)
    }
    setSelectedStop(busStop)

};
  return (
    <>
    {isLoggedIn ? (
        <>
          <div className="App">
            <div className='input-container'>
              <h2>Please select what location you are at</h2>
              <div className='button-container'>
                <button onClick={() => handleClick('125 Street')}>125 Street</button>
                <button onClick={() => handleClick('CCNY')}>CCNY</button>
                <button onClick={() => handleClick('145 Street')}>145 Street</button>
              </div>
              {selectedStop && <h1>You are at {selectedStop}</h1>}
            </div>
            <div data-testid="coordinates">{coordinates}</div>
          </div>
        </>
      ) : (
        <Login setIsLoggedIn={setIsLoggedIn}/>
      )
    }
  </>
  )
}

export default LoginPage
