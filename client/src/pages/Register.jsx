import React from 'react';
import { useState } from 'react';
// import Register from './Register'
import './Register.css'
import { supabase } from '../../../server/client';
import { useNavigate } from 'react-router-dom';

function Register({testing, setTesting}) {
    const navigate = useNavigate();
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
      console.log(formData)
     try {
      const { data, error } = await supabase.auth.signUp(
        {
          email: formData.email,
          password: formData.password,
          options: {
            data: {
              first_name: formData.username
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
      navigate('/')
    };


    return (
          <>
            <div className="loginContainerR">
              <h2>
                <span
                  role="button"
                  onClick={handleRegisterClick}
                  style={{ color: 'purple', cursor: 'pointer', textDecoration: 'underline' }}
                  onKeyDown={handleRegisterClick}
                  tabIndex={0} // Make it focusable
                >
                  Login
                </span>
                {' or Register'}
              </h2>
              <form className="loginFormR" onSubmit={handleSubmit}>
                <div className="inputGroupR">
                <div className="formGroupR">
                    <label htmlFor="username">Username</label>
                    <input type="text" id="username" name="username" onChange={handleChange} />
                  </div>
                  <div className="formGroupR">
                    <label htmlFor="email">Email</label>
                    <input type="text" id="email" name="email" onChange={handleChange} />
                  </div>
                  <div className="formGroupR">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" name="password" onChange={handleChange} />
                  </div>
                  <div className="formGroupR">
                    <label htmlFor="confirm-password">Confirm Password</label>
                    <input type="password" id="confirm-password" name="confirm-password" onChange={handleChange} />
                  </div>
                </div>
                {error && <div className="errorMessage">{error}</div>}
                <button type="submit">Register</button> {/* Removed onClick here, using form's onSubmit instead */}
              </form>
            </div>
          </>
    )
}

export default Register