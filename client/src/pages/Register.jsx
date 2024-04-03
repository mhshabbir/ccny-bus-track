import React from 'react';
import { useState } from 'react';
import Register from './Register'
import './Register.css'
import { supabase } from '../../../server/client';

function RegisterPage({testing, setTesting}) {
    const [formData, setFormData] = useState({
      username:'',
      email:'',
      password:''
    })
    const [error, setError] = useState('')

    console.log(formData)

    function handleChange(e) {
      setFormData((prevFormData) => {
        return{
          ...prevFormData,
          [e.target.name]:e.target.value
        }
      })
    }

    
  

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
      const { data, error } = await supabase.auth.signUp(
        {
          email: formData.email,
          password: formData.password,
          options: {
            data: {
              first_name: formData.username,handleChange
            }
          }
        }
      )
      alert("Check your email for verification Link")
     } catch (error) {
      alert(error)
     }
    }

    const handleRegisterClick = () => {
      setTesting(true)
      alert("Successful")
    };


    return (
      <>
      {!testing ? (
          <>
            <div className="login-container">
              <h2>
                <span
                  role="button"
                  onClick={handleRegisterClick}
                  style={{ color: 'blue', cursor: 'pointer' }}
                  onKeyDown={handleRegisterClick}
                  tabIndex={0} // Make it focusable
                >
                  Login
                </span>
                {' or Register'}
              </h2>
              <form className="login-form" onSubmit={handleSubmit}>
                <div className="input-group">
                  <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input type="text" id="username" name="username" onChange={handleChange} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" name="email" onChange={handleChange} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="confirm-password">Confirm Password</label>
                    <input type="password" id="password" name="password" onChange={handleChange} />
                  </div>
                </div>
                {error && <div className="error-message">{error}</div>}
                <button type="submit">Register</button> {/* Removed onClick here, using form's onSubmit instead */}
              </form>
            </div>
          </>
        ) : (
          <Register></Register>
        )
      }
    </>
    )
}

export default RegisterPage