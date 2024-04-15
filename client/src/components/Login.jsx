import React from 'react';
import { useState } from 'react';
import Register from '../pages/Register'
import './Login.css'
import { createClient } from '@supabase/supabase-js'
import { useNavigate } from 'react-router-dom';


function Login( {setToken} ) {
    // const apikey = process.env.REACT_APP_SUPABASEKEY
    // const apiurl = process.env.REACT_APP_SUPABASEURL

    // console.log(process.env.REACT_APP_SUPABASEKEY);
    const supabase = createClient("https://ziapwogxrlinwnniaiey.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InppYXB3b2d4cmxpbndubmlhaWV5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTE2NjQ0NDEsImV4cCI6MjAyNzI0MDQ0MX0.U3LGBYbIU527Anwv9ceNgVws5a7N9xBmhJRmilQjbb0")
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
