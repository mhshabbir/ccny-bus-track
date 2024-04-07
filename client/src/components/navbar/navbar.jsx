import React from 'react'
import './style.css'

const navbar = () => {
  return (
    <div className='body'>
      <ul className="nav-links">
        <li><a href="Home.html">Home</a></li>
        <li className="center"><a href="PublicSafety.html">Public Safety</a></li>
        <li className="logo"><img src="ccnybuslogo.png" alt="CCNY Bus Logo" /></li> 
        <li className="upward"><a href="MyQRCode.html">My QR Code</a></li>
        <li className="forward"><a href="LoginSignup.html">Login/Signup</a></li>
    </ul>
    </div>
  )
}

export default navbar

