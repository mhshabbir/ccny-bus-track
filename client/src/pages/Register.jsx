import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js'
import './Register.css'

function Register() {
  const apikey = process.env.REACT_APP_SUPABASEKEY
  const apiurl = process.env.REACT_APP_SUPABASEURL
  const supabase = createClient(apiurl, apikey)
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '', // Added confirmPassword field
  });
  const [error, setError] = useState('');

  function handleChange(e) {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [e.target.name]: e.target.value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!formData.email.includes('@')) {
      setError('Invalid email address');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            first_name: formData.username,
          },
        },
      });
      alert('Check your email for verification Link');
    } catch (error) {
      alert(error.message);
    }
  }

  const handleRegisterClick = () => {
    navigate('/login');
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
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input type="password" id="confirmPassword" name="confirmPassword" onChange={handleChange} />
            </div>
          </div>
          {error && <div className="errorMessage">{error}</div>}
          <button type="submit">Register</button> {/* Removed onClick here, using form's onSubmit instead */}
        </form>
      </div>
    </>
  );
}

export default Register;
