import React, { useState } from 'react';
import { Coords125, Coords145 } from './Coordinates';
import Login from './Login';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [coordinates, setCoordinates] = useState('')
  const [selectedStop, setSelectedStop] = useState('')

  const handleClick = (busStop) => {
    if (busStop === '125 Street') {
      setCoordinates(`Latitude: ${Coords125.lat}, Longitude: ${Coords125.lng}`)
    } else if (busStop === '145 Street') {
      setCoordinates(`Latitude: ${Coords145.lat}, Longitude: ${Coords145.lng}`)
    }
    setSelectedStop(busStop)
  };


  return (
    <>
      {isLoggedIn ? (
          <div className="App">
            {selectedStop && <h2>You are in {selectedStop}</h2>}
            <button onClick={() => handleClick('125 Street')}>125 Street</button>
            <button onClick={() => handleClick('145 Street')}>145 Street</button>
            <div data-testid="coordinates">{coordinates}</div>
          </div>
        ) : (
          <Login setIsLoggedIn={setIsLoggedIn}/>
        )
      }
    </>
  );
}

export default App