import React from 'react';
import { useState } from 'react';
import Register from '../pages/Register'
import './Login.css'
import { supabase } from '../../../server/client';
import { useNavigate } from 'react-router-dom';

function Login( {setToken} ) {
    const navigate = useNavigate()
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
  
    async function handleSubmit(e){
      e.preventDefault();
      // console.log(formData)
     try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      })


      if (error) throw error
      console.log(data)
      setToken(data)
      navigate('/')


     } catch (error) {
      alert(error)
     }
    }

    const handleRegisterClick = () => {
      setTesting(false)
      navigate('/signup')
    };


    return (
      <>
      {testing ? (
          <>
            <div className="loginContainer">
              <h2>
                Login or
                {' '}
                  <span
                    role="button"
                    onClick={handleRegisterClick}
                    style={{ color: 'purple', cursor: 'pointer', textDecoration: 'underline' }}
                    onKeyDown={handleRegisterClick}
                    tabIndex={0} // Make it focusable
                  >
                    Register
                  </span>
              </h2>
              <form className="loginForm" onSubmit={handleSubmit}>
                <div className="inputGroup">
                  <div className="formGroup">
                    <label htmlFor="username">Email</label>
                    <input type="text" id="email" name="email" onChange={handleChange} />
                  </div>
                  <div className="formGroup">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" name="password" onChange={handleChange} />
                  </div>
                </div>
                {error && <div className="errorMessage">{error}</div>}
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