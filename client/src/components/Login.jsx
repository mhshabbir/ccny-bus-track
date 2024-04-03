import React from 'react';
import { useState } from 'react';
import Register from '../pages/Register'
import './Login.css'
import { supabase } from '../../../server/client';

function Login({setIsLoggedIn}) {
    const [formData, setFormData] = useState({
      email:'',
      password:''
    })

    console.log(formData)
    const [error, setError] = useState('')
    const [testing, setTesting] = useState(true)

    function handleChange(e) {
      setFormData((prevFormData) => {
        return{
          ...prevFormData,
          [e.target.name]:e.target.value
        }
      })
    }

    // const handleSubmit = (e) => {
    //   e.preventDefault();
    //   if (/^\d+$/.test(studentId) && studentId.length === 8 && studentPassword.length >=8){
    //     setIsLoggedIn(true)
    //   }
    //   else {
    //     setError("Incorrect username and/or password")
    //   }
    // }
  
    async function handleSubmit(e){
      e.preventDefault();
      // if (/^\d+$/.test(studentId) && studentId.length === 8 && studentPassword.length >=8){
      //   setTesting(true)
      // }
      // else {
      //   setError("Incorrect username and/or password")
      // }

      console.log(formData)
     try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      })
      alert("Check your email for verification Link")
     } catch (error) {
      alert(error)
     }
    }

    const handleRegisterClick = () => {
      setTesting(false)
      alert("Successful")
    };


    return (
      <>
      {testing ? (
          <>
            <div className="login-container">
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
              <form className="login-form" onSubmit={handleSubmit}>
                <div className="input-group">
                  <div className="form-group">
                    <label htmlFor="username">Email</label>
                    <input type="text" id="email" name="email" onChange={handleChange} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" name="password" onChange={handleChange} />
                  </div>
                </div>
                {error && <div className="error-message">{error}</div>}
                <button type="submit">Log in</button> {/* Removed onClick here, using form's onSubmit instead */}
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