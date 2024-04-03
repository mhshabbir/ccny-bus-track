import React, { useState } from 'react';
// import { Coords125, CoordsCCNY, Coords145 } from './Coordinates';
import './Street.css'
import Street125 from './Street125';
import Street145 from './Street145';
import Ccny from './CCNY';

function HomePage() {
  const [currPage, setCurrPage] = useState('Home')
  const [coordinates, setCoordinates] = useState('')
  const [selectedStop, setSelectedStop] = useState('')

  const handleClick = (busStop) => {
    if (busStop === '125 Street') {
      // setCoordinates(`Latitude: ${Coords125.lat}, Longitude: ${Coords125.lng}`)
      setCurrPage('125')
    } else if (busStop === '145 Street') {
      // setCoordinates(`Latitude: ${Coords145.lat}, Longitude: ${Coords145.lng}`)
      setCurrPage('145')
    }
    else if (busStop === 'CCNY') {
      // setCoordinates(`Latitude: ${CoordsCCNY.lat}, Longitude: ${CoordsCCNY.lng}`)
      setCurrPage('Ccny')
    }
    setSelectedStop(busStop)
  };


  return (
    <>
        {currPage === 'Home' &&(
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
        )}
        {currPage === '125' &&(
            <>
                <Street125></Street125>
            </>
        )}
         {currPage === '145' &&(
            <>
                <Street145></Street145>
            </>
        )}
         {currPage === 'Ccny' &&(
            <>
                {/* <h1>{selectedStop}</h1> */}
                <Ccny></Ccny>
            </>
        )}
    </>
  )
}

export default HomePage