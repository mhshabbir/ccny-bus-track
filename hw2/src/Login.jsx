import React from 'react';
import { useState } from 'react';

function Login({setIsLoggedIn}) {
    const [driverLogIn, setDriverLogIn] = useState(false)
    const [currDriverStage, setCurrDriverStage] = useState('initial')
    const [driverUserName, setDriverUserName] = useState('')

    const handleStudentLogIn = () => {
        setIsLoggedIn(true)
        setDriverLogIn(false)
    }
    const handleDriverLogIn = () => {
      setDriverLogIn(true)
      setCurrDriverStage('username')
    }

    const handleLogInSubmit = (e) => {
      e.preventDefault()
      if (driverUserName === 'Driver1') {
        setCurrDriverStage("driverLoggedIn")
      }
    }

    const handleDriverLogout = () => {
      setDriverUserName('');
      setDriverLogIn(false)
      setCurrDriverStage('initial')
    };

  return (
    <>
        {driverLogIn === false ? (
          <>
            <button onClick={handleStudentLogIn}>Student</button>
            <button onClick={handleDriverLogIn}>Bus Driver</button>
          </>
        ) : (
          <>
            {currDriverStage === 'username' && (
              <>
                <h2>For now, simply enter Driver1 as username</h2>
                <form onSubmit={handleLogInSubmit}>
                  <label>
                    Username:
                    <input type="text" value={driverUserName} onChange={(e) => setDriverUserName(e.target.value)} />
                  </label>
                  <button type="submit">Submit</button>
                </form>
              </>
            )}
            {currDriverStage === 'driverLoggedIn' && (
              <>
                <h2>Welcome {driverUserName}! Unfortunately, data rendering is still being worked on.</h2>
                <h2>However, your account is successfully logged into.</h2>
                <button onClick={handleDriverLogout}>Log Out</button>
              </>
            )}

          </>
        )
      }
    </>
  );
}

export default Login