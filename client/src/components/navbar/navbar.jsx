import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import './navbar.css'

const navbar = ({token, setToken}) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // console.log('token')
    sessionStorage.removeItem('token');
    setToken(false);
    // console.log({token})
    navigate('/login');
  };


  return (
    <nav className="navbar">
      <Link to="/">Home</Link>
      <Link to="/publicsafety">Public Safety</Link>
      <Link to="/map">Map</Link>
      <Link to="/ccny">
        <img src="https://www.ccny.cuny.edu/sites/default/files/styles/600px_wide/public/2023-06/ColinPowellSchool_CCNY_Economics%26Business_GuestFaculty_DemetriosPapacostasNoPhoto.png?itok=5r-pw_fF" alt="Street 125" />
      </Link>
      <Link to="/qrcode">My QR Code</Link>
      <Link to="/schedule">Schedule</Link>
      {token ? (
        <button className='logoutButton23' onClick={handleLogout}>
          Logout
        </button>
      ) : (
        <Link to="/login">
        Login/Signup
        </Link>
      )}
    </nav>
  )
}

export default navbar



