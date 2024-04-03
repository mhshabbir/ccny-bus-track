import React from 'react';
import { useState } from 'react';
import Register from './Register'
import styles from './Login.module.css';

function Login({setIsLoggedIn}) {
    const [studentId, setStudentId] = useState('')
    const [studentPassword, setStudentPassword] = useState('')
    const [error, setError] = useState('')
    const [testing, setTesting] = useState(true)

    const handleIdInput = (e) => {
      setStudentId(e.target.value)
    }

    const handlePasswordInput = (e) => {
      setStudentPassword(e.target.value)
    }

    const handleSubmit = (e) => {
      e.preventDefault();
      if (/^\d+$/.test(studentId) && studentId.length === 8 && studentPassword.length >=8){
        setIsLoggedIn(true)
      }
      else {
        setError("Incorrect username and/or password")
      }
    }

    const handleRegisterClick = () => {
      setTesting(false)
    };


    return (
      <>
      {testing ? (
          <>
            <div className={styles.loginContainer}>
              <h2>
                Login or
                {' '}
                  <span
                    role="button"
                    onClick={handleRegisterClick}
                    style={{ color: 'blue', cursor: 'pointer' }}
                    onKeyDown={handleRegisterClick}
                    tabIndex={0} // Make it focusable
                  >
                    Register
                  </span>
              </h2>
              <form className={styles.loginForm} onSubmit={handleSubmit}>
                <div className={styles.inputGroup}>
                  <div className={styles.formGroup}>
                    <label htmlFor="username">Username</label>
                    <input type="text" id="username" name="username" value={studentId} onChange={handleIdInput} />
                  </div>
                  <div className={styles.formGroup}>
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" name="password" value={studentPassword} onChange={handlePasswordInput} />
                  </div>
                </div>
                {error && <div className={styles.errorMessage}>{error}</div>}
                <button type="submit">Log in</button>
              </form>
            </div>
          </>
        ) : (
          <Register testing = {testing} setTesting={setTesting}></Register>
        )
      }
    </>
    )
}

export default Login