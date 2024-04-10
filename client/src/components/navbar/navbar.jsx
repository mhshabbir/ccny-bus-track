import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './navbar.css'

const navbar = ({setToken, isLoggedIn, setIsLoggedIn}) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    setToken(false); 
    setIsLoggedIn(false)
    navigate('/');
    // console.log("This is token: ")
    // console.log(token)
    // console.log("test")
    // console.log(token)
  };


  return (
    <nav className="navbar">
      <a href="/">Home</a>
      <a href="/publicsafety">Public Safety</a>
      <a href="/ccny">
        <img src="https://www.ccny.cuny.edu/sites/default/files/styles/600px_wide/public/2023-06/ColinPowellSchool_CCNY_Economics%26Business_GuestFaculty_DemetriosPapacostasNoPhoto.png?itok=5r-pw_fF" alt="Street 125" />
      </a>
      <a href="/qrcode">My QR Code</a>
      {isLoggedIn ? (
        <button className='logoutButton23' onClick={handleLogout}>
          Logout
        </button>
      ) : (
        <a href="/">Login/Signup</a>
      )}
    </nav>
  )
}

export default navbar

